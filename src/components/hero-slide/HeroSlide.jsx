import React, { useEffect, useRef, useState } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Button, { OutlineButton } from "./../button/Button";
import Modal, { ModalContent } from "./../modal/Modal";

import tmdbApi, { category, movieType, tvType } from "./../../api/tmdbApi";
import apiConfig from "./../../api/apiConfig";

import "./hero-slide.scss";
import { useHistory } from "react-router";

import * as Config from "./../../constants/Config";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
  const getPopularMix = async () => {
    try {
      // Fetch latest popular movies (page 1 = newest / trending first)
      const movieResponse = await tmdbApi.getMoviesList(movieType.popular, {
        params: { page: 1 },
      });

      // Fetch latest popular TV shows
      const tvResponse = await tmdbApi.getTvList(tvType.popular, {
        params: { page: 1 },
      });

      // Merge movies + TV shows
      const combinedResults = [
        ...movieResponse.results,
        ...tvResponse.results,
      ];

      // Sort by release_date / first_air_date (latest first)
      const sorted = combinedResults.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || 0);
        const dateB = new Date(b.release_date || b.first_air_date || 0);
        return dateB - dateA; // latest first
      });

      // Pick top 4 (latest popular)
      const latestMix = sorted.slice(0, 4);

      setMovieItems(latestMix);
      console.log(latestMix);
    } catch (error) {
      console.log("error", error);
    }
  };

  getPopularMix();
}, []);



  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let history = useHistory();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button
              onClick={() =>
                history.push(`/${Config.HOME_PAGE}/movie/` + item.id)
              }
            >
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>

        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
