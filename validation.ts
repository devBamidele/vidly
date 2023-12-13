// validation.ts
import { Request, Response, NextFunction } from 'express';
import { getMovieGenres } from './movies';
import Joi from 'joi';

export const validateGenreInput = (req: Request, res: Response, next: NextFunction) => {
    const validGenres = getMovieGenres();

    const schema = Joi.object({
        genre: Joi.string().valid(...validGenres).required(),
    });

    const result = schema.validate({ genre: req.params.genre.toLocaleLowerCase() });

    if (result.error) {
        const errorMessages = result.error.details.map(detail => detail.message);
        res.status(400).send(errorMessages);
    } else {
        next();
    }
}

export const validateGenreAdd = (req: Request, res: Response, next: NextFunction) => {
    const validGenres = getMovieGenres();
    const requestedGenre = req.body.genre?.toLocaleLowerCase();

    const schema = Joi.object({
        genre:  Joi.string().min(3).max(20).required(),
    });

    const result = schema.validate({ genre: requestedGenre });

    if (result.error) {
        const errorMessages = result.error.details.map(detail => detail.message);
        res.status(400).send(errorMessages);

        return;
    } 

    // Check if the requested genre is already in the validGenres list
    if (validGenres.includes(requestedGenre)) {
        res.status(400).send(['Genre already exists']);

        return;
    }

    next();
}

export const validateGenreUpdate = (req: Request, res: Response, next: NextFunction) => {
    const validGenres = getMovieGenres();
    const currentGenre = req.params.genre?.toLocaleLowerCase()

    const schema = Joi.object({
        genre: Joi.string().valid(...validGenres).required(),
    });

    const result = schema.validate({ genre: currentGenre });

    if (result.error) {
        const errorMessages = result.error.details.map(detail => detail.message);
        res.status(400).send(errorMessages);
        return;
    } 

    const updatedGenre : string | null = req.body.updatedGenre?.toLocaleLowerCase();

    if (updatedGenre != null) {
        const schema = Joi.object({
            genre: Joi.string()
                .min(3)
                .max(20)
                .required()
                .custom((value, helpers) => {
                    if (validGenres.includes(value)) {
                        return helpers.error('any.invalid');
                    }
                    return value;
                })
                .messages({
                    'any.invalid': 'The updated genre already exists',
                }),
        });
        
    
        const result = schema.validate({ genre: updatedGenre });
    
        if (result.error) {
            const errorMessages = result.error.details.map((detail) => detail.message);
            res.status(400).send(errorMessages);
            return;
        }
    }
    
    next();
}
