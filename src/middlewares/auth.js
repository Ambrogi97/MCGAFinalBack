import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'ID de usuario invalido';
        } else {
            next();
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Autenticación fallida'
        });
    }
};
