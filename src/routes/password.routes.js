import express from 'express';
import { createPassword } from '../controller/password.controller.js';
import {authUser} from '../middleware/auth.middleware.js';


const router = express.Router();


router.post('/add-password',authUser, createPassword);


export default router;