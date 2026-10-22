import mongoose from 'mongoose';

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
  let uri =
    configuredUri ||
    (process.env.NODE_ENV === 'production'
      ? null
      : 'mongodb://127.0.0.1:27017/rohit_portfolio');

  if (!uri) {
    lastConnectionError = 'MONGODB_URI is missing or empty in environment variables';
    console.error('[Database Error] Connection unavailable (category=configuration; reason=MONGODB_URI_missing).');
    return Promise.resolve(null);
  }

  // Serverless optimization: Convert SRV to direct replica set hosts to bypass cloud DNS SRV timeout issues
  if (uri.includes('@cluster0.6wqfhls.mongodb.net')) {
    uri = uri.replace(
      /mongodb\+srv:\/\/([^@]+)@cluster0\.6wqfhls\.mongodb\.net\/?([^?]*)(\??.*)/,
      (_, auth, db, query) => {
        const cleanQuery = query ? '&' + query.replace(/^\?/, '') : '';
        return `mongodb://${auth}@ac-ai52zis-shard-00-00.6wqfhls.mongodb.net:27017,ac-ai52zis-shard-00-01.6wqfhls.mongodb.net:27017,ac-ai52zis-shard-00-02.6wqfhls.mongodb.net:27017/${db || 'rohit_portfolio'}?ssl=true&replicaSet=atlas-14d8hr-shard-0&authSource=admin${cleanQuery}`;
      }
    );
  }

  connectionAttempt = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 10000,
    })
    .catch(async (error) => {
      // Fallback: If SRV lookup fails in cloud containers, fallback to direct replica set hosts
      if (uri.includes('@cluster0.6wqfhls.mongodb.net')) {
        const directUri = uri.replace(
          /mongodb\+srv:\/\/([^@]+)@cluster0\.6wqfhls\.mongodb\.net\/?([^?]*)(.*)/,
          'mongodb://$1@ac-ai52zis-shard-00-00.6wqfhls.mongodb.net:27017,ac-ai52zis-shard-00-01.6wqfhls.mongodb.net:27017,ac-ai52zis-shard-00-02.6wqfhls.mongodb.net:27017/$2?ssl=true&replicaSet=atlas-14d8hr-shard-0&authSource=admin$3'
        );
        try {
          return await mongoose.connect(directUri, { serverSelectionTimeoutMS: 10000 });
        } catch {
          // Fall through to logging the original error
        }
      }
      lastConnectionError = error?.message || 'Connection attempt failed';
      logConnectionError('Connection attempt failed', error);
      return null;
    })
    .then((conn) => {
      if (conn) {
        lastConnectionError = null;
        console.log('[Database] MongoDB connection established.');
      }
      return conn;
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
