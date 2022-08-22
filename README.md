
# Movie and TVShow database
The goal was to create a movie and tvshow overview site with the use of TMDB API.

## Features
- responsive design
- form validation using [formik](https://formik.org/)

- pages that require loading more movies or tvshows have implemented infinite scrolling which loads more data when the user reaches bottom of the page
- movie and tvshow cards are only rendered when the user sees them, so infinite scrolling won't have much performance impact
- main movies and tv shows page consists of 3 lists of (movie / tv show) cards (Popular, New Releases / Airing, Top Rated) with each consisting of 20 cards
- each of these lists has a "View all" button which can be used to view all movies / tv shows in these lists
- in addition, main navigation can also be used to access these lists
- cards contain basic information about a movie / tv show (Title, Rating)
- hovering on a card reveals more information about a movie / tv show (Release date / First air date, Genres)
- each movie has its own respected page, which contains all information about a movie (Title, Release date, Genres, Overview, Media, Cast ....)
- each tv show has its own respected page, which contains all information about a tv show (Title, First air date, Genres, Overview, Media, Cast, Season List ....)
- ability to search movies and tv shows with the use of search bar
- ability to filter movies and tv shows based on minimum release date year, minimum rating and genres
## Used technologies

### Frontend

- Framework - [React](https://github.com/facebook/react)
- CSS framework - [TailwindCSS](https://tailwindcss.com/)

### Backend

- [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction)
- API Requests - [Axios](https://axios-http.com/docs/intro), [TanStack Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/)


## Author

- Martin Bublavý

