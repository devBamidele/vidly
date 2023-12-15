import express, { Request, Response } from 'express';
import { getMovieGenres, movieGenreList, MovieGenre } from './movies';
import { validateGenreInput, validateGenreAdd, validateGenreUpdate } from './validation';

import helmet from 'helmet';
// import Debug from 'debug';
// import morgan from 'morgan';
// import config from 'config';

// const startupDebugger = Debug('app:startup');
// const dbDebugger = Debug('app:db');

const app = express();
const port = 3000;

const baseUrl = '/api/genres';

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());

/*
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server ' + config.get('mail.host'));
console.log('Mail Password ' + config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled ...')
}
*/

app.listen(port, () => console.log(`Listening on port ${port}...`));