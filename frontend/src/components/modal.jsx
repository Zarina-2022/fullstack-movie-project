import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Modal = ({ movie, close }) => {
    const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://127.0.0.1:9000/api/movies/${movie.id}`)
      .then((res) => {
        // show notification
        toast.warning(`${movie.title} has been removed.`);
        // go back to home page
        navigate("/");
      })
      .catch((err) => {
        // show notification
        toast.error("The deletion was not completed, an error occurred :(");
      });
  };
  return (
    <>
      <div className="fixed bg-black w-full h-full inset-0 bg-opacity-50 grid place-items-center">
        <div className="bg-white p-10 rounded-md shadow">
          <h1 className="text-xl flex flex-col gap-4">
            <span className="text-center bg-yellow-500 rounded p-1">{movie.title}</span>
            <span className="font-bold">
              Are you sure you want to delete this film?
            </span>
          </h1>
          <h1 className="font-semibold text-xl my-4">
            Do you approve this transaction?
          </h1>
          <div className="flex justify-end gap-4">
            <button
              onClick={close}
              className="bg-gray-400 p-2 px-4 rounded-md text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-400 p-2 px-4 rounded-md text-white hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
