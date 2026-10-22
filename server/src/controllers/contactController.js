import { ContactMessage } from '../models/ContactMessage.js';
import { validateContactInput } from '../validators/contactValidator.js';
import { ensureDBConnected } from '../config/db.js';

/**
 * Handle new contact message submission.
 * @route POST /api/contact
 */
export const submitContactMessage = async (req, res, next) => {
  try {
    const { isValid, isSpam, sanitized, errors } = validateContactInput(req.body);

    if (isSpam) {
      // Quietly return success to bots without recording
      return res.status(200).json({
        success: true,
        message: 'Message processed successfully.',
      });
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the input errors.',
        errors,
      });
    }

    // Wait for the database connection before attempting persistence.
    if (!(await ensureDBConnected())) {
      console.warn('[Contact] Submission attempted while MongoDB is disconnected.');
      return res.status(503).json({
        success: false,
        message:
          'MongoDB is unavailable. Start the MongoDB service or configure MONGODB_URI, then try again. You can also email directly at rohittak006@gmail.com.',
      });
    }

    // Capture anonymized IP
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

    const newMessage = await ContactMessage.create({
      name: sanitized.name,
      email: sanitized.email,
      message: sanitized.message,
      ipAddress: typeof clientIp === 'string' ? clientIp.split(',')[0].trim() : 'unknown',
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you, Rohit has received your message and will respond shortly!',
      data: {
        id: newMessage._id,
        name: newMessage.name,
        email: newMessage.email,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
