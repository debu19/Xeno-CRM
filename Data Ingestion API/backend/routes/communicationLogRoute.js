import express from "express"
import CommunicationLog from "../models/communicationLogModel.js"

const router = express.Router();

router.post('/', async (req, res) => {
  const { customerIds, message } = req.body;

  try {
    const logs = await Promise.all(customerIds.map(async (customerId) => {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      const log = new CommunicationLog({ customerId, message, status });
      await log.save();
      return log;
    }));

    res.status(200).send(logs);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;