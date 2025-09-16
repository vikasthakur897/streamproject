import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

import tmdbApi from "./../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "../../constants/Config";
import genreIcons  from "../../lib/genreIcons.js";
import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "./../../components/movie-list/MovieList";

const Detail = () => {
  const { category, id } = useParams();
  const history = useHistory();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="flex justify-start">
  <button
    className="mt-4 px-6 py-2 rounded-xl font-semibold text-white 
               bg-red-600 border-2 border-red-600 
               hover:bg-black hover:text-red-500 hover:border-red-500 
               transition-all duration-300 shadow-md"
    onClick={() => history.push(`/${Config.HOME_PAGE}/watch/${id}`)}
  >
    ▶ Watch Now
  </button>
</div>

                
             <div className="genres flex flex-wrap gap-2 mt-2">
               {item.genres &&
                 item.genres.slice(0, 5).map((genre, index) => {
                   const Icon = genreIcons[genre.name] || genreIcons.default;
                   return (
                     <span
                       key={index}
                       className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-lg shadow-md"
                     >
                       <Icon className="text-[16px]" />
                       <span className="text-[14px]">{genre.name}</span>
                     </span>
                   );
                 })}
             </div>

              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                {/* casts list */}
                <CastList id={item.id} />
              </div>

              
            </div>
          </div>

          <div className="container">
            {/* <div className="section mb-3">
              <VideoList id={item.id} />
            </div> */}
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
