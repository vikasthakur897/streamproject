import React from 'react';

import { useParams, useLocation } from "react-router";

const WatchPage = () => {
    const { id } = useParams(); // tvId
    const query = new URLSearchParams(useLocation().search);
    const season = query.get("season");
    const episode = query.get("episode");
  
    // MultiEmbed free player (you can replace with another API if needed)
    const embedUrl = `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
  return (
    <div className="watch-page container mx-auto p-4">
    <h2 className="text-xl font-bold mb-3">
      🎬 Season {season}, Episode {episode}
    </h2>
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={embedUrl}
        title="Episode Player"
        allowFullScreen
        className="w-full h-[500px] rounded-lg border border-gray-700"
      ></iframe>
    </div>
  </div>
  )
}

export default WatchPage
