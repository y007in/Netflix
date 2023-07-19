import React, { useEffect } from "react";
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Components/Banner";
import MovieSlide from "../Components/MovieSlide";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upComingMovies, loading } =
    useSelector((state) => state.movie);
  console.log("home", popularMovies);
  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);
  if (loading) {
    return (
      <div className="loader">
        <ClipLoader color="#f00" loading={loading} size={300} />;
      </div>
    );
  }
  //loading이 true면 loading 스피너를 보여주고 (데이터 도착전)
  //loading이 false면 데이터 보여줌 (데이터 도착 후)
  return (
    <div className="slide">
      <Banner movie={popularMovies.results[0]} />
      <h1 className="slide_title">Netflix 인기 콘텐츠</h1>
      <MovieSlide movies={popularMovies} />
      <h1 className="slide_title">오늘 대한민국의 TOP 7 시리즈</h1>
      <MovieSlide movies={topRatedMovies} />
      <h1 className="slide_title">새로 올라온 콘텐츠</h1>
      <MovieSlide movies={upComingMovies} />
    </div>
  );
};

export default Home;
