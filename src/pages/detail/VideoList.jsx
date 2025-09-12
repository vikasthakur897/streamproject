import React from "react";
import { useParams } from "react-router";

const VideoList = () => {
  const { id } = useParams(); // TMDB movie/TV id

  // MultiEmbed streaming URL
  const embedUrl = `https://multiembed.mov/?video_id=${id}&tmdb=1`;

  return (
    <div className="flex justify-center items-center w-full my-10 px-4">
      <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
          frameBorder="0"
          title="Movie Player"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoList;
