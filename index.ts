import express, { Request, Response } from 'express';
import { getMovieGenres, movieGenreList, MovieGenre } from './movies';
import { validateGenreInput, validateGenreAdd, validateGenreUpdate } from './validation';

const app = express();
const port = 3000;

const baseUrl = '/api/genres';

app.use(express.json());

app.get(baseUrl, (req: Request, res: Response) => res.send(getMovieGenres()));

app.get(`${baseUrl}/:genre`, validateGenreInput, (req: Request, res: Response) => {

    const genreKey = req.params.genre.toLocaleLowerCase() as MovieGenre;

    const moviesForGenre = movieGenreList[genreKey];

    res.send(moviesForGenre);
    
});

app.post(`${baseUrl}/add`, validateGenreAdd, (req: Request, res : Response) => {

    const newGenreKey = req.body.genre?.toLocaleLowerCase();
  
    movieGenreList[newGenreKey] = [];

    res.send(movieGenreList);

});

app.put(`${baseUrl}/:genre`, validateGenreUpdate, (req: Request, res : Response) => {

    const updatedGenreKey : string | undefined = req.body.updatedGenre?.toLocaleLowerCase();

    const oldGenreKey = req.params.genre;

    if(updatedGenreKey != null){

        movieGenreList[updatedGenreKey] = movieGenreList[oldGenreKey];

        delete movieGenreList[oldGenreKey];

        res.status(200).send(`Genre updated from ${oldGenreKey} to ${updatedGenreKey} successfully`);
    }

    res.send('Update complete');

});

app.delete(`${baseUrl}/:genre`, validateGenreInput, (req: Request, res: Response) => {
    const genreKey = req.params.genre.toLocaleLowerCase() as MovieGenre;

    delete movieGenreList[genreKey];

    res.status(200).send(getMovieGenres());
});


app.listen(port, () => console.log(`Listening on port ${port}...`));