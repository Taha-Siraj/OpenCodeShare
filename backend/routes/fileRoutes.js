import express from 'express';
import { getFiles, upload, downloadFile, previewFile } from '../controllers/filecontrollers.js';
import { uploadMiddleware } from '../middlewares/upload.js';

const router = express.Router();

router.post('/upload', uploadMiddleware, upload);
router.get("/files", getFiles);
router.get("/download/:name", downloadFile);
router.get("/preview/:name", previewFile);

export default router;