import React, { useEffect, useState } from "react";
import Movie from "./Components/Movie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  var request = new XMLHttpRequest();
  const [results, setResults] = useState([]);
  const [nominees, setNominees] = useState([]);
  var nomineeIds = [];
  var movies = "";

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      movies = JSON.parse(this.responseText);
      console.log(movies);
      setResults([]);
      if (movies.Response === "True") {
        console.log(movies.Search);

        for (var index in movies.Search) {
          var movie = movies.Search[index];

          setResults((oldResults) => [...oldResults, 
            (<Movie
              Title={movie.Title}
              Id={movie.imdbID}
              Image={movie.Poster}
              Year={movie.Year}
              Function="search"
              Add={add}
              Remove={remove}
            />)
          ]);

          if (nomineeIds.includes(movie.imdbID)) {
            document.getElementById(movie.imdbID).disabled = "true";
          }
        }
      } else {
        setResults([movies.Error]);
      }
    }
  };

  useEffect(() => {
    const handleEnter = (event) => {
      if (event.key === "Enter" && event.target.nodeName === "INPUT") {
        var string =
          "https://www.omdbapi.com/?apikey=1847863f&type=movie&y=" +
          document.getElementById("searchYear").value +
          "&s=" +
          document.getElementById("searchName").value;
        request.open("GET", string);
        request.send();
      }
    };

    document.addEventListener("keydown", handleEnter);

    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  });

  const add = (event) => {
    event.target.disabled = "true";

    var movie = movies.Search.filter((m) => {
      return m.imdbID === event.target.id;
    });

    var currentMovie = movie[0];
    var title = movie[0].Title;

    console.log(movie);

    var movieObject = 
      <Movie
        Title={title}
        Id={currentMovie.imdbID}
        Image={currentMovie.Poster}
        Year={currentMovie.Year}
        Function="nomination"
        Add={add}
        Remove={remove}
      />;

    nomineeIds.push(event.target.id);

    console.log(nomineeIds);

    setNominees((oldNominees) => [...oldNominees, movieObject]);
  };

  const remove = (event) => {
    document.getElementById(event.target.id).disabled = false;

    var index = nomineeIds.indexOf(event.target.id);

    if (nomineeIds.length > 1) {
      setNominees((oldNominees) =>
        oldNominees
          .slice(0, index)
          .concat(oldNominees.slice(index + 1, oldNominees.length))
      );
    } else {
      setNominees([]);
    }

    nomineeIds.splice(index, 1);
  };

  return (
    <Container>
      <Row><h1>The Shoppies</h1></Row>
      <Row><p>Search for movies and add them as nominations</p></Row>
      <Row>
        <input id="searchName" placeholder="Search" />
        <input id="searchYear" type="number" placeholder="Year" />
		{/* Not functional currently, but would implement by storing username, password and user's nominations array in MongoDB */}
        <input type="textField" placeHolder="username" />
        <input type="password" placeHolder="password" />
        <button>Save collection</button>
        <button>Load collection</button>
      </Row>
      <Row>
        <Col>
          <h2>Results</h2>
          <div id="resultsDiv">{results}</div>
        </Col>
        <Col>
          <h2>Nominations</h2>
          <div>{nominees}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
