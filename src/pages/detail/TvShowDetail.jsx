import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

import tmdbApi from "./../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "../../constants/Config";

import "./detail.scss";
import CastList from "./CastList";
import MovieList from "./../../components/movie-list/MovieList";
import SeasonList from "../../components/SessionEpisode/SeasonList"; // ✅ fixed import

const TvShowDetail = () => {
  const { category, id } = useParams();
  const history = useHistory();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await tmdbApi.detail(category, id, { params: {} });
        setItem(response);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Failed to load TV Show details:", err);
      }
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
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, index) => (
                    <span key={index} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            {/* ✅ New Season + Episode Section */}
            <div className="section mb-3">
              <SeasonList tvId={item.id} seasons={item.seasons || []} />
            </div>

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

export default TvShowDetail;
