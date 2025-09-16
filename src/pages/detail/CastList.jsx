import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const CastList = (props) => {
  const { category } = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmdbApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 10));
    };
    getCredits();
  }, [category, props.id]);

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-5 text-white border-l-4 border-red-600 pl-3">
        🎭 Top Cast
      </h3>
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4">
        {casts.map((cast, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-28 text-center hover:scale-110 transform transition duration-300"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-2 border-red-600 mx-auto mb-3">
              <img
                src={apiConfig.w500Image(cast.profile_path)}
                alt={cast.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-semibold text-white truncate">
              {cast.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
