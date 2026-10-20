import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { connectDB, closeDB } from '../src/config/db.js';
import { ContactMessage } from '../src/models/ContactMessage.js';

let mongoServer;

describe('Rohit Tak Portfolio API Test Suite', () => {
  before(async () => {
    process.env.NODE_ENV = 'test';
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connectDB(uri);
  });

  after(async () => {
    await closeDB();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  beforeEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await ContactMessage.deleteMany({});
    }
  });

  describe('Health Check: GET /api/health', () => {
    it('should return 200 with healthy operational status and connected database', async () => {
      const res = await request(app).get('/api/health');

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.status, 'healthy');
      assert.strictEqual(res.body.services.api, 'operational');
      assert.strictEqual(res.body.services.database, 'connected');
      assert.ok(typeof res.body.uptime === 'number');
    });
  });

  describe('Contact Endpoint: OPTIONS /api/contact', () => {
    it('should preflight and accept contact requests from the production frontend origin', async () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      try {
        const preflight = await request(app)
          .options('/api/contact')
          .set('Origin', 'https://rohits-portfolio-tyg3.vercel.app')
          .set('Access-Control-Request-Method', 'POST')
          .set('Access-Control-Request-Headers', 'content-type');

        assert.strictEqual(preflight.status, 204);
        assert.strictEqual(
          preflight.headers['access-control-allow-origin'],
          'https://rohits-portfolio-tyg3.vercel.app'
        );
        assert.match(preflight.headers['access-control-allow-methods'], /POST/);
        assert.match(preflight.headers['access-control-allow-methods'], /OPTIONS/);
        assert.match(preflight.headers['access-control-allow-headers'], /content-type/i);

        const submission = await request(app)
          .post('/api/contact')
          .set('Origin', 'https://rohits-portfolio-tyg3.vercel.app')
          .send({
            name: 'Alex Johnson',
            email: 'alex.johnson@example.com',
            message: 'Hello Rohit, I would like to discuss a project opportunity.',
          });

        assert.strictEqual(submission.status, 201);
        assert.strictEqual(
          submission.headers['access-control-allow-origin'],
          'https://rohits-portfolio-tyg3.vercel.app'
        );
      } finally {
        if (originalNodeEnv === undefined) {
          delete process.env.NODE_ENV;
        } else {
          process.env.NODE_ENV = originalNodeEnv;
        }
      }
    });
  });

  describe('Contact Endpoint: POST /api/contact', () => {
    it('should successfully validate, store submission in MongoDB, and return 201', async () => {
      const payload = {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        message: 'Hello Rohit, loved your Muqabla project and would like to discuss an opportunity!',
      };

      const res = await request(app).post('/api/contact').send(payload);

      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.data.id);
      assert.strictEqual(res.body.data.email, 'alex.johnson@example.com');

      // Verify direct database persistence in MongoDB
      const stored = await ContactMessage.findById(res.body.data.id);
      assert.ok(stored);
      assert.strictEqual(stored.name, 'Alex Johnson');
      assert.strictEqual(stored.email, 'alex.johnson@example.com');
      assert.strictEqual(stored.status, 'unread');
    });

    it('should reject invalid email format with 400 status', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Tester',
        email: 'not-an-email',
        message: 'This is a message for testing validation.',
      });

      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.errors.some((err) => err.includes('valid email')));

      const count = await ContactMessage.countDocuments();
      assert.strictEqual(count, 0);
    });

    it('should reject message shorter than 10 characters with 400 status', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Tester',
        email: 'tester@example.com',
        message: 'Hi',
      });

      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.errors.some((err) => err.includes('10 characters')));
    });

    it('should detect honeypot bot field and quietly drop without storing', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Spam Bot',
        email: 'bot@spam.com',
        message: 'Buy cheap watches now at this url!',
        bot_field: 'I am a robot',
      });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);

      // Verify no record was inserted
      const count = await ContactMessage.countDocuments();
      assert.strictEqual(count, 0);
    });
  });

  describe('Resume Downloads', () => {
    const binaryParser = (res, callback) => {
      res.setEncoding('binary');
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        callback(null, Buffer.from(data, 'binary'));
      });
    };

    it('should serve valid PDF resume with Content-Type application/pdf', async () => {
      const res = await request(app).get('/api/resume/pdf').parse(binaryParser);

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers['content-type'], 'application/pdf');
      assert.ok(res.headers['content-disposition'].includes('Rohit_Tak_Resume.pdf'));
      // PDF binary files start with %PDF
      const header = res.body.slice(0, 4).toString('ascii');
      assert.strictEqual(header, '%PDF');
    });

    it('should serve valid DOCX resume with correct Word MIME type', async () => {
      const res = await request(app).get('/api/resume/docx').parse(binaryParser);

      assert.strictEqual(res.status, 200);
      assert.strictEqual(
        res.headers['content-type'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      assert.ok(res.headers['content-disposition'].includes('Rohit_Tak_Resume.docx'));
      // DOCX files are zip packages starting with PK
      const header = res.body.slice(0, 2).toString('ascii');
      assert.strictEqual(header, 'PK');
    });
  });

  describe('Route Shielding: 404 Handler', () => {
    it('should return 404 with structured JSON for unknown routes', async () => {
      const res = await request(app).get('/api/random-unknown-route');

      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.message.includes('API route not found'));
    });
  });
});
