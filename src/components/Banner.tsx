import { FC, useEffect, useState } from "react";
import { requests } from "../request.js";
import axios from "../axios.js";
import "./Banner.scss";

// undefined nullの対処
type movieProps = {
  title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const Banner: FC<movieProps> = (props: movieProps) => {
  //   const { title, name, original_name, backdrop_path, overview } = props;

  const [movie, setMovie] = useState<movieProps>({});
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.feachNetflixOriginals);
      console.log(request.data.result);

      //apiからランダムで値を取得している
      const fetchMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ];
      setMovie(fetchMovie);
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);

  // descriptionの切り捨て用関数
  function truncate(str: any, n: number) {
    // undefinedを弾く
    // 150文字以上の場合は省略
    if (str !== undefined) {
      return str.length > n ? str?.substr(0, n - 1) + "..." : str;
    }
  }

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="Banner-contents">
        <h1 className="Banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>
        <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="Banner-fadeBottom" />
    </header>
  );
};
