interface Movie {
    title: string;
    year: number;
}

// Define movie genres
export type MovieGenre = 'action' | 'drama' | 'comedy' | 'sciFi' | 'adventure' | 'horror' | 'romance' | 'documentary';

// Create a list of maps
export const movieGenreList: Record<string, Movie[]> = {
    action: [
        { title: 'Die Hard', year: 1988 },
        { title: 'Mad Max: Fury Road', year: 2015 },
        // Add more action movies
    ],
    drama: [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'Forrest Gump', year: 1994 },
        // Add more drama movies
    ],
    comedy: [
        { title: 'Dumb and Dumber', year: 1994 },
        { title: 'Superbad', year: 2007 },
        // Add more comedy movies
    ],
    sciFi: [
        { title: 'Blade Runner', year: 1982 },
        { title: 'The Matrix', year: 1999 },
        // Add more sci-fi movies
    ],
    adventure: [
        { title: 'Indiana Jones: Raiders of the Lost Ark', year: 1981 },
        { title: 'Jurassic Park', year: 1993 },
        // Add more adventure movies
    ],
    horror: [
        { title: 'The Shining', year: 1980 },
        { title: 'Get Out', year: 2017 },
        // Add more horror movies
    ],
    romance: [
        { title: 'The Notebook', year: 2004 },
        { title: 'Pride and Prejudice', year: 2005 },
        // Add more romance movies
    ],
    documentary: [
        { title: 'March of the Penguins', year: 2005 },
        { title: 'An Inconvenient Truth', year: 2006 },
        // Add more documentary movies
    ],
};
 
export const getMovieGenres = (): MovieGenre[] =>
     Object.keys(movieGenreList) as MovieGenre[];

