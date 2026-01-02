import {createText , getText} from '../controllers/textController.js';
import express from 'express';


const router = express.Router();

router.post('/text', createText);
router.get('/gettext', getText);

export default router;