import React from "react";
import { useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams(); 
  const embedUrl = `https://multiembed.mov/?video_id=${id}&tmdb=1`;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        allowFullScreen
        title="Movie Player"
      ></iframe>
    </div>
  );
};

export default Player;
