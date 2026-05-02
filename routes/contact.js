import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { sendContactEmail, sendConfirmationEmail } from '../utils/emailService.js';

const router = Router();

/**
 * POST /api/contact
 * Handle contact form submissions
 */
router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),

    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),

    body('subject')
      .trim()
      .notEmpty()
      .withMessage('Subject is required')
      .isLength({ min: 3, max: 200 })
      .withMessage('Subject must be between 3 and 200 characters'),

    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ min: 10, max: 5000 })
      .withMessage('Message must be between 10 and 5000 characters'),
  ],

  async (req, res) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map((err) => ({
            field: err.param,
            message: err.msg,
          })),
        });
      }

      const { name, email, subject, message } = req.body;

      // Send email to site owner
      await sendContactEmail({ name, email, subject, message });

      // Send confirmation email to user (non-blocking)
      sendConfirmationEmail(email, name).catch((err) =>
        console.log('Confirmation email failed (non-critical):', err)
      );

      res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.',
      });
    } catch (error) {
      console.error('Contact form error:', error);

      res.status(500).json({
        success: false,
        message: 'There was an error sending your message. Please try again later.',
        ...(process.env.NODE_ENV !== 'production' && { error: error.message }),
      });
    }
  }
);

/**
 * GET /api/contact/health
 * Check if contact service is available
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'contact-form',
    timestamp: new Date().toISOString(),
  });
});

export default router;
