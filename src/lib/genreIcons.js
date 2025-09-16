import { FaFilm, FaLaugh, FaGhost, FaHeart, FaFighterJet, FaDragon, FaMusic, FaBook, FaTv, FaUserSecret, FaHammer, FaTree, FaRocket } from 'react-icons/fa';
import { GiSwordman, GiMagnifyingGlass , GiFilmSpool, GiWesternHat, GiWarPick } from 'react-icons/gi';
import { MdOutlineLocalMovies } from 'react-icons/md';

// Map genre names to icon components (NOT JSX)
export const genreIcons = {
  // Movie Genres
  Action: FaFighterJet,
  Adventure: GiSwordman,
  Animation: FaTv,
  Comedy: FaLaugh,
  Crime: GiMagnifyingGlass ,
  Documentary: GiFilmSpool,
  Drama: FaBook,
  Family: FaTree,
  Fantasy: FaDragon,
  History: FaHammer,
  Horror: FaGhost,
  Music: FaMusic,
  Mystery: FaUserSecret,
  Romance: FaHeart,
  'Science Fiction': FaRocket,
  'TV Movie': MdOutlineLocalMovies,
  Thriller: FaUserSecret,
  War: GiWarPick,
  Western: GiWesternHat,

  // TV Show Genres
  'Action & Adventure': FaFighterJet,
  Kids: FaTv,
  News: FaTv,
  Reality: FaTv,
  'Sci-Fi & Fantasy': FaRocket,
  Soap: FaTv,
  Talk: FaTv,
  'War & Politics': GiWarPick,

  // Default icon if genre not found
  default: FaFilm,
};

export default genreIcons;
