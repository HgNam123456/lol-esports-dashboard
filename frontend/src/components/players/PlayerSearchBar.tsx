// frontend/src/components/players/PlayerSearchBar.tsx
import React, { useEffect, useState } from "react";
import api from "../../services/apiClient";

type PlayerSummary = {
  playername: string;
  teamname: string;
  games: number;
  winrate: number;
};

type Pagination = {
  page: number;
  size: number;
  total: number;
};

type PaginatedResponse<T> = {
  items: T[];
  pagination: Pagination;
};

interface Props {
  onSelectPlayer: (name: string) => void;
}

const MIN_QUERY_LENGTH = 2;

export default function PlayerSearchBar({ onSelectPlayer }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlayerSummary[]>([]);

  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      api
        .get<PaginatedResponse<PlayerSummary>>(
          `/players/players/search?name=${encodeURIComponent(query)}&page=1&size=10`
        )
        .then((res) => setResults(res.data.items));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="player-search">
      <input
        type="search"
        placeholder="Search player name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <div className="player-search-results">
          {results.map((p) => (
            <button
              key={p.playername + p.teamname}
              type="button"
              onClick={() => onSelectPlayer(p.playername)}
            >
              {p.playername} <span>({p.teamname})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
