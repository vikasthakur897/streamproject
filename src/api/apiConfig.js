const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "5d2eaa8d3f1c842b00ed750a576a2e9f",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  w300Image: (imgPath) => `https://image.tmdb.org/t/p/w300${imgPath}`,
};

export default apiConfig;
