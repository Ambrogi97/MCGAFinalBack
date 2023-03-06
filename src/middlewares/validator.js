import { body, validationResult } from 'express-validator';

const validateMiddlewares = (req, res, next) => {

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) =>
        `${location}[${param}]: ${msg}`;

    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty())
        return res.status(400).json({ errors: result.array() });

    next()
}

export const loginValidator = [
    body('email', 'El correo es requerido').notEmpty().isEmail(),
    body('password', 'La contraseña es requerida').notEmpty(),
    validateMiddlewares
]

export const signupValidator = [
    body('name', 'El nombre es requerido').notEmpty(),
    body('email', 'El correo es requerido').notEmpty().isEmail(),
    body('password', 'La contraseña es requerida').notEmpty(),
    validateMiddlewares
]

export const productValidator = [
    body('name', 'El nombre es requerido').notEmpty(),
    body('price', 'El precio es requerido').notEmpty().isNumeric(),
    body('stock', 'El stock es requerido').notEmpty().isNumeric(),
    validateMiddlewares
]