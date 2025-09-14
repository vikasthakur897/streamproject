import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import tmdbApi, { category } from "../../api/tmdbApi"; // adjust path
import Input from "../input/Input";
import Button from "../button/Button";
import * as Config from "../../constants/Config";

const Search = (props) => {
  const history = useHistory();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions (movies + tv shows)
  const fetchSuggestions = useCallback(async () => {
    if (keyword.trim().length > 0) {
      try {
        const movieRes = await tmdbApi.search(category.movie, {
          params: { query: keyword },
        });
        const tvRes = await tmdbApi.search(category.tv, {
          params: { query: keyword },
        });

        const results = [...movieRes.results, ...tvRes.results].slice(0, 6);
        setSuggestions(results);
      } catch (error) {
        console.log("Suggestion error:", error);
      }
    } else {
      setSuggestions([]);
    }
  }, [keyword]);

  // Debounce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword, fetchSuggestions]);

  // Navigate to full search
  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(
        `/${Config.HOME_PAGE}/${category[props.category]}/search/${keyword}`
      );
      setSuggestions([]);
    }
  }, [keyword, props.category, history]);

  // Enter key event
  useEffect(() => {
    const enterEvent = (e) => {
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => document.removeEventListener("keyup", enterEvent);
  }, [goToSearch]);

  return (
    <div className="movie-search relative w-full max-w-md mx-auto">
      {/* Input + Button */}
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search movies or TV shows..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button className="small" onClick={goToSearch}>
          Search
        </Button>
      </div>

      {/* Suggestions as cards */}
     {keyword.trim().length > 0 && suggestions.length > 0 && (
  <ul className="absolute left-0 top-full w-full bg-white shadow-lg rounded-md mt-2 max-h-80 overflow-auto z-50">
    {suggestions.map((item) => (
      <li
        key={item.id}
        className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 transition"
        onClick={() =>
          history.push(
            `/${category[item.media_type] || props.category}/${item.id}`
          )
        }
      >
        {/* Poster Thumbnail */}
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
              : "https://via.placeholder.com/92x138?text=No+Image"
          }
          alt={item.title || item.name}
          className="w-12 h-16 object-cover rounded"
        />

        {/* Title */}
        <p className="text-sm font-medium line-clamp-1">
          {item.title || item.name}
        </p>
      </li>
    ))}
  </ul>
)}

    </div>
  );
};

export default Search;
