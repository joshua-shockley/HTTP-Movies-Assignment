import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './Movies/UpdateMovieForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState ([]);
  const[update, setUpdate] = useState();
  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies `)
    .then(res =>{console.log(res);
           setMovies(res.data );

    })
    .catch(err => console.log(err.response));


  },[update]);


 


  const handleUpdate= () => {
    setUpdate(!update);
  }
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" 
      render = {props =>{
        return <MovieList {...props} movies={movies}/>;
      }}/>
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} 
          handleUpdate={handleUpdate} 
          />;
        }}
      />
      <Route
      path="/update-movie/:id"
      render={props => {
        return <UpdateMovieForm {...props} 
        movies={movies} 
        setMovies={setMovies} 
        handleUpdate={handleUpdate} 
        />;
      }}
      />
    </>
  );
};

export default App;
