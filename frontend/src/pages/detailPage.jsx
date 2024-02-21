import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import Loader from "../components/loader";
import Error from "../components/error";
import { FaTrash } from "react-icons/fa";
import Modal from "../components/modal";

const DetailPage = () => {
  // 1) url den filmin id'sini tanimlayan parametreyi al
  // buradaki id url deki id degerini veriyor
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const[isOpen,setIsOpen] = useState(false)

  // 2) api'den filmin verilerini al
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:9000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => setError(err?.response?.data?.message));
  }, []);

  return (
    <div className="p-10">
      {error ? (
        <Error message={error} />
      ) : !movie ? (
        <Loader />
      ) : (
        movie && (
          <div>
            <div onClick={()=>setIsOpen(true)} className="flex justify-end">
              <button className="bg-red-600 text-white p-2 rounded-md hover:bg-red-400">
                <FaTrash />
              </button>
            </div>
            <div className="flex flex-col gap-10 items-center md:flex-row">
              <div>
                <img
                  className="rounded-md"
                  src={"https://picsum.photos/400/500?grayscale"}
                  alt="poster"
                />
              </div>

              <div className="flex flex-col gap-10">
                <h1 className="mt-4 text-5xl font-semibold">
                  {movie.title} <span> ({movie.year})</span>
                </h1>

                <p className="text-gray-600 flex gap-2">
                  <span className="font-semibold me-3">User score: </span>
                  <span
                    className="left-[10px] bottom-[-10px] p-1 rounded-full text-white"
                    style={{
                      background:
                        movie.rating > 8
                          ? "green"
                          : movie.rating > 6
                          ? "orange"
                          : "red",
                    }}
                  >
                    {movie.rating}
                  </span>
                </p>

                <div className="flex gap-5">
                  <button className="bg-gray-800 text-white p-3 rounded-full">
                    <FaHeart />
                  </button>
                  <button className="bg-gray-800 text-white p-3 rounded-full">
                    <FaBookmark />
                  </button>
                  <button className="bg-gray-800 text-white p-3 rounded-full">
                    <FaStar />
                  </button>
                  <button className="bg-gray-800 text-white p-3 rounded-full">
                    <BiSolidCameraMovie />
                  </button>
                </div>

                <p className="text-gray-600 flex gap-2">
                  <span className="font-semibold me-3">Categories: </span>
                  <span className="left-[10px] bottom-[-10px] bg-yellow-600 p-1 rounded-full text-white">
                    {movie.genre}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )
      )}
        {/**Modal */}
        {
          isOpen && <Modal movie={movie} close={()=>setIsOpen(false)} />
        }
    </div>
  );
};

export default DetailPage;
