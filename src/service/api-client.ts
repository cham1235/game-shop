import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api/games",
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
});
