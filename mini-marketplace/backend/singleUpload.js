import express from "express";
import { uploadFile } from "./multer/singleLocal.js";
import { SingleLocal } from "./models/singleLocal.js";

const router = express.Router();

router.post("/local", uploadFile, async (req, res) => {
  try {
    const file = req.file;

    await SingleLocal({
      image: file?.path,
    });

    res.json({
      success: true,
      message: "Pic Uploaded",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
