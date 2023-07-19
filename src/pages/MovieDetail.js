import React, { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faThumbsUp,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const MovieDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { genreList, creditList, loading } = useSelector(
    (state) => state.movie
  );

  const movieItem = location.state.value.item;
  const [showDetail, setShowDetail] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(movieItem.vote_count);
  const [isPick, setIsPick] = useState(false);
  const togglePick = () => {
    setIsPick(!isPick);
  };
  const toggleLike = () => {
    if (!isLike) {
      setIsLike(true);
      setLikeCount((prevCount) => prevCount + 1);
    } else {
      setIsLike(false);
      setLikeCount((prevCount) => prevCount - 1);
    }
  };
  const toggleDetails = () => {
    setShowDetail(!showDetail);
  };

  console.log(movieItem);
  const goBack = () => {
    navigate(-1);
  };
  if (loading) {
    return (
      <div className="loader">
        <ClipLoader color="#f00" loading={loading} size={300} />;
      </div>
    );
  }
  return (
    <div
      className="MovieDetail"
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieItem.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="close" onClick={goBack}>
        X
      </div>

      <div className="MovieDetail_wrap">
        <div className="movie_img">
          <img
            src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieItem.backdrop_path}`}
          />
        </div>
        <div className="movie_content">
          <div className="movie_title">
            {movieItem.title}
            <span className="origin">{movieItem.original_title}</span>
          </div>
          <div>
            {movieItem.genre_ids.map((id) => (
              <Badge pill bg="danger" className="badge">
                {genreList.find((item) => item.id === id).name}
              </Badge>
            ))}
          </div>
          <div className="movie_overview">{movieItem.overview}</div>
          <div className="buttons">
            <Button className="playbtn" variant="danger">
              ▶ 재생
            </Button>
            <Button className="playbtn" variant="light" onClick={toggleDetails}>
              <FontAwesomeIcon icon={faCircleInfo} /> 상세 정보
            </Button>
            <div className="icons movie_pick" onClick={togglePick}>
              {!isPick ? (
                <FontAwesomeIcon icon={faPlus} />
              ) : (
                <FontAwesomeIcon icon={faCheck} />
              )}

              <span>
                내가 찜한
                <br /> 콘텐츠
              </span>
            </div>
            <div className="icons movie_like">
              <FontAwesomeIcon
                icon={faThumbsUp}
                onClick={toggleLike}
                className={isLike ? "heart-icon liked" : "heart-icon"}
              />
              {likeCount}
            </div>
          </div>
          {showDetail && (
            <div className="movie_detail_content">
              <div className="movie_release_date">
                개봉 일자 : {movieItem.release_date}
              </div>
              <div className="movie_heart">평점 : {movieItem.vote_average}</div>
              <div className="movie_heart">
                연령 :
                {movieItem.adult
                  ? "만 18세 이하 관람불가"
                  : "만 15세 이상 관람 가능"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
