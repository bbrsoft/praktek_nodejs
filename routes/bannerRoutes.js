const express = require('express');
const router = express.Router();
const { getBanners } = require('../models/banner');


router.get('/', async (req, res) => {
  try {
    const banners = await getBanners();
     res.status(200).json({
        status: 0,
        message: "Sukses",
        data: banners,
      });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve banners',
    });
  }
});

module.exports = router;
