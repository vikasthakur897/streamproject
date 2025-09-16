import React from "react";
import { useParams, useLocation } from "react-router";

const WatchPage = () => {
  const { id } = useParams(); // tv show id
  const query = new URLSearchParams(useLocation().search);
  const season = query.get("season");
  const episode = query.get("episode");

  // Videasy TV embed URL
  const embedUrl = `https://player.videasy.net/tv/${id}/${season}/${episode}`;

  return (
<div className="w-full h-screen flex justify-center items-center bg-black">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        allowFullScreen
        allow="encrypted-media"
        title="Movie Player"
      ></iframe>
    </div>

  );
};

export default WatchPage;
