import mongoose from 'mongoose';

import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Ignore if restricted
}

let connectionAttempt;
let lastConnectionError = null;

export const getLastConnectionError = () => lastConnectionError;

const getConnectionErrorCategory = (error) => {
  const causes = [error, error?.cause, error?.reason?.cause];
  const codes = causes.map((cause) => cause?.code);
  const names = causes.map((cause) => cause?.name).filter(Boolean);

  if (codes.some((code) => code === 18 || code === 8000)) {
    return 'authentication';
  }
  if (codes.includes(13)) {
    return 'authorization';
  }
  if (names.some((name) => ['MongoParseError', 'MongoInvalidArgumentError'].includes(name))) {
    return 'configuration';
  }
  if (codes.some((code) => ['ENOTFOUND', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT'].includes(code))) {
    return 'network';
  }
  if (names.includes('MongooseServerSelectionError')) {
    return 'server-selection';
  }

  return 'unknown';
};

const logConnectionError = (context, error) => {
  console.error(
    `[Database Error] ${context} (category=${getConnectionErrorCategory(error)}).`
  );
};

/**
 * Connect to MongoDB and monitor the connection lifecycle.
 * @param {string} [customUri] - Optional custom URI (e.g. for testing)
 * @returns {Promise<typeof mongoose | null>}
 */
export const connectDB = (customUri) => {
  if (connectionAttempt) {
    return connectionAttempt;
  }

  const configuredUri = customUri || process.env.MONGODB_URI?.trim();
  const uri =
    configuredUri ||
    (process.env.NODE_ENV === 'production'
      ? null
      : 'mongodb://127.0.0.1:27017/rohit_portfolio');

  if (!uri) {
    lastConnectionError = 'MONGODB_URI is missing or empty in environment variables';
    console.error('[Database Error] Connection unavailable (category=configuration; reason=MONGODB_URI_missing).');
    return Promise.resolve(null);
  }

  connectionAttempt = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 10000,
    })
    .then((conn) => {
      lastConnectionError = null;
      console.log('[Database] MongoDB connection established.');
      return conn;
    })
    .catch((error) => {
      lastConnectionError = error?.message || 'Connection attempt failed';
      logConnectionError('Connection attempt failed', error);
      return null;
    })
    .finally(() => {
      connectionAttempt = undefined;
    });

  return connectionAttempt;
};

mongoose.connection.on('disconnected', () => {
  console.warn('[Database] MongoDB disconnected.');
});

mongoose.connection.on('error', (error) => {
  logConnectionError('Connection error event', error);
});

mongoose.connection.on('reconnected', () => {
  console.log('[Database] MongoDB reconnected.');
});

export const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

export const ensureDBConnected = async () => {
  if (isDatabaseConnected()) {
    return mongoose.connection;
  }

  const connection = await connectDB();
  return connection && isDatabaseConnected() ? mongoose.connection : null;
};

export const closeDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('[Database] Connection closed.');
  }
};
