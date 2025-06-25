import express from 'express';
import { createPassword,getAllPassword } from '../controller/password.controller.js';
import {authUser} from '../middleware/auth.middleware.js';
import { get } from 'mongoose';


const router = express.Router();


router.post('/add-password',authUser, createPassword);
router.get('/get-passwords',authUser,getAllPassword);


export default router;