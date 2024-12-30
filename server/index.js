import express from 'express';
import cors from 'cors';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/pg';
import * as dotenv from 'dotenv';
import Razorpay from 'razorpay';

dotenv.config();

AdminJS.registerAdapter({ Database, Resource });

const PORT = process.env.PORT || 3000;
const app = express();

// Razorpay initialization
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Middleware
app.use(cors());
app.use(express.json());

// AdminJS Setup
const start = async () => {
  const admin = new AdminJS({
    databases: [],
    rootPath: '/admin',
    resources: [
      // Resources will be added here
    ],
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  // API Routes
  app.post('/api/create-order', async (req, res) => {
    try {
      const { amount } = req.body;
      const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: 'receipt_' + Date.now(),
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/verify-payment', async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      // Verify payment signature
      // Update booking status
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();