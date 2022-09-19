import "./styles/main.css";
import { GameBanner } from "./components/GameBanner";
import { useEffect, useState } from "react";
import { CreateAdBanner } from "./components/CreateAd/Banner";

import axios from "axios";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_SERVER_URL}/games`).then(({ data }) =>
      setGames(data)
    );
  }, []);

  return (
    <div className="max-w-[1344px] px-8 mx-auto flex flex-col items-center">
      <img src="logo.svg" className="h-40 my-20" />
      <h1 className="text-6xl text-white font-black">
        Seu{" "}
        <span className="bg-duo-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-4 mt-16">
        {games.map(game => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            _count={{ Ads: game._count.Ads }}
          />
        ))}
      </div>
      <CreateAdBanner games={games} />
    </div>
  );
}

export default App;
