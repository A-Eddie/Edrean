import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import contactRoutes from './routes/contact.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARE ──
app.use(helmet());
app.use(morgan('dev'));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ── ROUTES (before static files) ──
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/landing.html');
});

app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// ── API ROUTES ──
app.use('/api/contact', contactRoutes);

// ── STATIC FILES ──
app.use(express.static(__dirname));

// ── HEALTH CHECK ──
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ── 404 HANDLER ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── ERROR HANDLER ──
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
  });
});

// ── START SERVER ──
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Edrean's Portfolio Backend           ║
║   Running on port ${PORT}              ║
║   http://localhost:${PORT}             ║
╚════════════════════════════════════════╝
  `);
});
