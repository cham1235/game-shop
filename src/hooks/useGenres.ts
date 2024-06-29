import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "../service/api-client";

interface FetchGamesResponse {
  count: number;
  results: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const contoller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/genres", {
        signal: contoller.signal,
      })
      .then((res) => {
        setGenres(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => contoller.abort();
  }, []);

  return { genres: genres, error, isLoading };
};

export default useGenres;
