import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "../service/api-client";

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

export interface Platform {
  id: number;
  slug: string;
  name: string;
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const contoller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", { signal: contoller.signal })
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => contoller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
