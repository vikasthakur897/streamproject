import React from "react";

import { Link } from "react-router-dom";

import Button from "../button/Button";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "./../../constants/Config";

const TVShowCard = (props) => {
  const item = props.item;

  const link =
    "/" + Config.HOME_PAGE + "/" + category[props.category] + "/show/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div 
        className="relative bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden aspect-[2/3] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 group"
        style={{ backgroundImage: `url(${bg})` }}
      >
       <div 
  className="relative bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden aspect-[2/3] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 group"
  style={{ backgroundImage: `url(${bg})` }}
>
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10 group-hover:from-black/70 transition-all duration-300 flex flex-col justify-between p-4">
    
    {/* 🔝 Top badge */}
    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide self-start">
      TV SHOW
    </span>

    {/* 🔻 Bottom content */}
    <div className="w-full text-white">
        {/* <h3 className="text-lg font-semibold mb-2 line-clamp-2 leading-tight">
          {item.title}
        </h3> */}
      <div className="flex justify-between items-center mb-4 text-sm opacity-90">
        <span className="font-medium">
        {item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A'}
        </span>
        <span className="flex items-center gap-1 font-medium">
          ⭐ {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
        </span>
      </div>
      <Button className="w-full translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 py-3 bg-white/90 text-black border-none rounded-lg font-semibold text-sm hover:bg-white">
        <i className="bx bx-play text-xl"></i>
        <span>Watch</span>
      </Button>
    </div>
  </div>
</div>

      </div>
    </Link>
  );
};

export default TVShowCard;
