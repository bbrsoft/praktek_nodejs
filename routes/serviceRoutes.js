const express = require('express');
const router = express.Router();
const { getServices } = require('../models/service');

router.get('/', async (req, res) => {
  try {
    const services = await getServices();
    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      status: 1,
      message: 'Gagal mengambil data layanan',
      data: [],
    });
  }
});

module.exports = router;
