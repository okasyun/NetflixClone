// axiosのinstanceをaxiosとしてインポート
import Reac, { FC, useEffect, useState } from "react";
import Youtube from "react-youtube";
import axios from "../axios";
import "./Row.scss";

const base_url = "https://image.tmdb.org/t/p/original";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

// trailerのoption
type Options = {
  height: string;
  width: string;
  // 0or1,undefined
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export const Row: FC<Props> = (props: Props) => {
  const { title, fetchUrl, isLargeRow } = props;
  const [movies, setMovies] = useState<Movie[]>([]);
  // union型 string型かnull型が入る
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  // urlが更新されるたびに
  useEffect(() => {
    async function fetchdata() {
      // fetchUrlを取得するまで処理を待つ
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchdata();
    // urlが変わり次第useEffectを実行
  }, [fetchUrl]);

  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=https://api.themoviedb.org/3/movie/92783/videos?api_key=9d367aa77192957ad9ba370f525d378b`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {/* ポスターコンテンツ */}
        {movies.map((movie, i) => (
          // movie.backdrop_pathがあったら
          <img
            key={movie.id}
            // 左辺がtrueなら右辺を、falseなら左辺を返す
            className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
