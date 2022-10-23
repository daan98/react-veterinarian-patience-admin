import jwt from 'jsonwebtoken';
import VeterinarianModel from '../models/Veterinarian.js';

const checkAuth = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // WE MUST CATCH TH TOKEN THEN VERIFY IF THERE'S A USER WITH THE TOKEN AND FIND THAT USER
            let token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SCRET)
            req.veterinarian = await VeterinarianModel.findOne(decoded.id).select("-password -isConfirm -token");
            return next(); //USING next() SO THE IF AUTHENTICATION IF SUCCESSFUL USER WILL HAS ACCESS TO PLATFORM
        } catch (error) {
            const err = new Error('There is no user with such token.');
            res.json({ message: err.message });
            return;
        }
    }

    const error = new Error('The user does not exist.');
    res.status(401).json({ message: error.message });
};

export default checkAuth;