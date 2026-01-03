import express from 'express';
import { upload } from '../controllers/filecontrollers.js';
import { uploadMiddleware } from '../middlewares/upload.js';


const router = express.Router();

router.post('/upload',  uploadMiddleware.single('file'),  upload  );

export default router;