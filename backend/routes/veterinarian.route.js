import express from 'express';
import {
    createUser,
    login,
    confirming,
    profile,
    forgotPassword,
    checkToken,
    newPassword
 } from '../controllers/veterinarian.controller.js';
import checkAuth from '../middleware/auth.middleware.js';

const router = express.Router();

// PUBLIC AREA
router.post('/createVeterinarian', createUser);
router.get('/confirm/:token', confirming);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.route('/forgot-password/:token').get(checkToken).post(newPassword);

// PRIVATE AREA
router.get('/profile', checkAuth, profile);
export default router;