import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ id, item }) => {
  const { genreList } = useSelector((state) => state.movie);

  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/movies/${id}`, {
      state: { value: { item }, genreContents: { genreList } },
    });
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
          <span>
            {item.adult ? "만 18세 이하 관람불가" : "만 15세 이상 관람 가능"}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
