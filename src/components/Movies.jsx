import React, { Component } from "react";
import Pagination from "./common/Pagination";
import ListGroup from './common/ListGroup'
import MoviesTable from './MoviesTable'
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService'
import { paginate } from '../utils/paginate'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: ""
  };

  componentDidMount() {
    const genres = [{name: "All Genres", _id: "all_genres"}, ...getGenres()]
    this.setState( {movies: getMovies(), genres} )
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((item) => item._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({currentPage: page})
  };

  handleGenreSelect = (genre) => {
    this.setState( {selectedGenre: genre, currentPage: 1 })
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
    } = this.state;
    
    if (count === 0) return <p>There are no movies in the database.</p>;

    const filtered = selectedGenre && selectedGenre.name !== "All Genres" ? allMovies.filter(movie => movie.genre._id === selectedGenre._id) : allMovies;
    const movies = paginate(filtered, currentPage, pageSize); //gets the right items for current page given the size

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable movies={movies} onDelete={this.handleDelete} onLike={this.handleLike}/>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
