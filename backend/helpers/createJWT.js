import jwt from 'jsonwebtoken';

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SCRET, {
        expiresIn: "30d"
    });
}

export default generateJWT;