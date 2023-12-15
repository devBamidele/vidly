
import express, { Request, Response } from 'express';
import { getMovieGenres, movieGenreList, MovieGenre } from '../movies';
import { validateGenreInput, validateGenreAdd, validateGenreUpdate } from '../validation';

const router = express.Router();

const baseUrl = '/api/genres';

router.get(baseUrl, (req: Request, res: Response) => res.render('index', {
    title : 'My Vidly App', 
    message : 'This is my story'
}));

router.get(`${baseUrl}/:genre`, validateGenreInput, (req: Request, res: Response) => {

    const genreKey = req.params.genre.toLocaleLowerCase() as MovieGenre;

    const moviesForGenre = movieGenreList[genreKey];

    res.send(moviesForGenre);
    
});

router.post(`${baseUrl}/add`, validateGenreAdd, (req: Request, res : Response) => {

    const newGenreKey = req.body.genre?.toLocaleLowerCase();
  
    movieGenreList[newGenreKey] = [];

    res.send(movieGenreList);

});

router.put(`${baseUrl}/:genre`, validateGenreUpdate, (req: Request, res : Response) => {

    const updatedGenreKey : string | undefined = req.body.updatedGenre?.toLocaleLowerCase();

    const oldGenreKey = req.params.genre;

    if(updatedGenreKey != null){

        movieGenreList[updatedGenreKey] = movieGenreList[oldGenreKey];

        delete movieGenreList[oldGenreKey];

        res.status(200).send(`Genre updated from ${oldGenreKey} to ${updatedGenreKey} successfully`);
    }

    res.send('Update complete');

});

router.delete(`${baseUrl}/:genre`, validateGenreInput, (req: Request, res: Response) => {
    const genreKey = req.params.genre.toLocaleLowerCase() as MovieGenre;

    delete movieGenreList[genreKey];

    res.status(200).send(getMovieGenres());
});