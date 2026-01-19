import express from 'express';
import { getFiles, upload } from '../controllers/filecontrollers.js';
import { uploadMiddleware } from '../middlewares/upload.js';


const router = express.Router();

router.post('/upload',  uploadMiddleware,  upload  );
router.get("/files", getFiles);


export default router;