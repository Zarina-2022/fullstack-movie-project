import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";
import Hero from "../components/hero";
import Loader from "../components/loader";
import Error from "../components/error";

const MainPage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:9000/api/movies")
      .then((res) => {
        setMovies(res.data.movies);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      });
  }, []);

  if(!movies) return null
  return (
    <>
      <Hero />
      <div className="p-4 grid gap-4 md:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {error ? (
          <Error message={error} />
        ) : (
          movies.map((item, i) => <Card key={item.id} item={item} index={i} />)
        )}
      </div>
    </>
  );
};

export default MainPage;
