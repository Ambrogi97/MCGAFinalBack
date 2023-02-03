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
    body('email', 'The email is required').notEmpty().isEmail(),
    body('password', 'The password is required').notEmpty(),
    validateMiddlewares
]

export const signupValidator = [
    body('name', 'The name is required').notEmpty(),
    body('email', 'The email is required').notEmpty().isEmail(),
    body('password', 'The password is required').notEmpty(),
    validateMiddlewares
]