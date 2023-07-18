import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ id, item }) => {
  const { genreList } = useSelector((state) => state.movie);

  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/movies/${id}`, { state: item });
  };
  console.log(item);
  return (
    <div
      className="card"
      onClick={goDetail}
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path}` +
          ")",
      }}
    >
      <div className="overlay">
        <h1>{item.title}</h1>
        <div>
          {item.genre_ids.map((id) => (
            <Badge bg="danger">
              {genreList.find((item) => item.id === id).name}
            </Badge>
          ))}
        </div>
        <div>
          <span>{item.vote_average}</span>
          <span>{item.adult ? "청불" : "Under 18"} </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
