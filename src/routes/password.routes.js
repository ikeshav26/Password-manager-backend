import express from 'express';
import { createPassword,getAllPassword,deletePassword } from '../controller/password.controller.js';
import {authUser} from '../middleware/auth.middleware.js';
import { get } from 'mongoose';


const router = express.Router();


router.post('/add-password',authUser, createPassword);
router.get('/get-passwords',authUser,getAllPassword);
router.delete('/delete-password',authUser,deletePassword);


export default router;