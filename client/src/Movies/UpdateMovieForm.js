import React, {useState, useEffect} from 'react';
import axios from 'axios';


const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: []

}

 const UpdateMovieForm =(props)=> {
const [theMovie, setTheMovies]= useState(initialMovie);
console.log(props);

const{ movies, match, setMovies} = props;

useEffect(() => {
const id = match.params.id;
console.log(id);
const moviesToUpdate = movies.find(movie => `${movie.id}` === id);
    if(moviesToUpdate){
        console.log(moviesToUpdate);
        setTheMovies(moviesToUpdate);
        
    }
},[ movies, match]);

const changeHandler = e => {
    e.persist();
    let value = e.target.value;

    setTheMovies({
    ...theMovie,
    [e.target.name]: value
    });

};

const handleSubmit = (e) => {
e.preventDefault();
axios
.put(`http://localhost:5000/api/movies/${theMovie.id}`, theMovie)
.then(res => {
    props.handleUpdate();
    props.history.push(`/movies/${theMovie.id}`);

})
.then(res => {
    props.updateMovies(res.data);
   setTheMovies(initialMovie);
})
.catch(err => console.log(err.response));
};



return(
    <div>
        <form>
            <h2>Update Movie Info</h2>
            <fieldset>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={theMovie.title}
                />
                <div className="divider"/>
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={theMovie.director}
                />
                <div className="divider"/>
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={theMovie.metascore}
                />
                <div className="divider"/>
                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={theMovie.stars}
                />
                <div className="divider"/>

                <button  onClick={handleSubmit}>submit</button>
            </fieldset>
        </form>
    </div>

);
}
export default UpdateMovieForm;