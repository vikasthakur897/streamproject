import React, { useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const SeasonList = ({ tvId, seasons }) => {
  const [episodes, setEpisodes] = useState({});
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [activeEpisode, setActiveEpisode] = useState(null);

  const fetchEpisodes = async (seasonNumber) => {
    if (episodes[seasonNumber]) {
      setExpandedSeason(expandedSeason === seasonNumber ? null : seasonNumber);
      return;
    }
    try {
      const response = await tmdbApi.season(tvId, seasonNumber, { params: {} });
      setEpisodes((prev) => ({ ...prev, [seasonNumber]: response.episodes }));
      setExpandedSeason(seasonNumber);
    } catch (err) {
      console.error("Failed to fetch episodes:", err);
    }
  };

  return (
    <div className="season-list">
      <h2 className="mb-4 text-xl font-bold">Seasons</h2>
      {seasons.map((season, idx) => (
        <div key={idx} className="mb-6 border border-gray-600 rounded-lg p-3">
          {/* Season Header */}
          <div
            className="cursor-pointer flex items-center justify-between"
            onClick={() => fetchEpisodes(season.season_number)}
          >
            <div className="flex items-center">
              {season.poster_path && (
                <img
                  src={apiConfig.w500Image(season.poster_path)}
                  alt={season.name}
                  className="w-16 h-24 object-cover rounded mr-3"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{season.name}</h3>
                <p className="text-sm opacity-75">
                  {season.episode_count} Episodes
                </p>
                <p className="text-sm opacity-50">
                  Air Date: {season.air_date || "N/A"}
                </p>
              </div>
            </div>
            <span className="text-blue-400">▶</span>
          </div>

          {/* Episode List */}
          {expandedSeason === season.season_number &&
            episodes[season.season_number] && (
              <div className="mt-3 pl-5">
                {episodes[season.season_number].map((ep) => (
                  <div
                    key={ep.id}
                    className="flex flex-col mb-4 border-b border-gray-700 pb-4"
                  >
                    <div className="flex items-start">
                      {ep.still_path && (
                        <img
                          src={apiConfig.w300Image(ep.still_path)}
                          alt={ep.name}
                          className="w-24 h-16 object-cover rounded mr-3"
                        />
                      )}
                      <div className="flex flex-col">
                        <h4 className="font-semibold">
                          {ep.episode_number}. {ep.name}
                        </h4>
                        <p className="text-sm opacity-75">{ep.overview}</p>
                       
                      </div>
                      
                     
                    </div>

                    <div className="flex flex-col">
                      <button 
                          className="mt-2 border border-white rounded px-3 py-1 text-sm hover:bg-white hover:text-black transition"
                          onClick={() =>
                            setActiveEpisode({
                              season: season.season_number,
                              episode: ep.episode_number,
                            })
                          }
                        >
                          ▶ Watch Episode
                        </button>
                      </div>

                    {/* Inline Video Player */}
                    {activeEpisode &&
                      activeEpisode.season === season.season_number &&
                      activeEpisode.episode === ep.episode_number && (
                        <div className="mt-3 w-full">
                          <iframe
                            src={`https://multiembed.mov/?video_id=${tvId}&tmdb=1&s=${season.season_number}&e=${ep.episode_number}`}
                            title="Episode Player"
                            allowFullScreen
                            className="w-full h-[400px] rounded-lg border border-gray-700"
                          ></iframe>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default SeasonList;
