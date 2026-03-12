import express from "express";
import { uploadFiles } from "./multer/multipleLocal.js";
import { MultipleLocal } from "./models/multipleLocal.js";

const router = express.Router();

router.post("/local", uploadFiles, async (req, res) => {
  try {
    const files = req.files;
    const imagePaths = files.map((image) => image.path);

    await MultipleLocal.create({
      image: imagePaths,
    });

    res.json({
      success: true,
      message: "Pics Uploaded",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
