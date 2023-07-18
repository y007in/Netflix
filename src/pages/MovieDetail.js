import React, { useEffect, useDispatch } from "react";
import { Badge, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { genreList } = useSelector((state) => state.movie);
  const movieItem = location.state;
  console.log(movieItem);
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="MovieDetail">
      <div className="close" onClick={goBack}>
        X
      </div>
      <div className="MovieDetail_wrap">
        <div className="movie_img">
          <img
            src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieItem.poster_path}`}
          />
        </div>
        <div className="movie_content">
          <div>
            {movieItem.genre_ids.map((id) => (
              <Badge pill bg="danger" className="badge">
                {genreList.find((item) => item.id === id).name}
              </Badge>
            ))}
          </div>
          <div className="movie_title">{movieItem.title}</div>
          <div className="movie_overview">{movieItem.overview}</div>
          <Button className="playbtn" variant="danger">
            ▶ 재생
          </Button>
          <Button className="playbtn" variant="light">
            ❕ 상세 정보
          </Button>
        </div>
        <div className="movie_detail_content">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
