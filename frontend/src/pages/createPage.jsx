import Input from "../components/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation

    //Inputla girilen yeni verilerden bir obje olusturmamiz lazim.
    // Inputlara girilen verilere nasil ulasabilirim? FormData() ile:
    const form = new FormData(e.target);

    // Elde edilen input verileri (object'e cevirelim) ile yeni bir object olusturalim:
    const data = Object.fromEntries(form.entries());
    console.log(data);

    // simdi veriyi api'ye gonderelim:
    axios
      .post("http://127.0.0.1:9000/api/movies", data)
      .then((res) => {
        // show notification
        toast.success("New movie is added successfully!!!"),
          console.log(toast.success);
        // go back to home page
        navigate("/");
      })
      .catch((err) => {
        // show notification
        toast.error("Adding movie failed :(");
      });
  };
  return (
    <div className="grid place-items-center bg-yellow-600 h-[100vh]">
      <div className="max-w-[1000px] grid grid-cols-1 sm:grid-cols-2 gap-10 bg-white rounded p-10 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold mb-5">Add new film</h1>

          <Input label="Title" type="text" name="title" />
          <Input label="Genre" type="text" name="genre" />
          <Input label="Rating" type="number" name="rating" />
          <Input label="Year" type="number" name="year" />

          <button className="bg-yellow-600 p-1 rounded-md text-white font-semibold hover:bg-yellow-500">
            Add
          </button>
        </form>

        <div className="flex items-center justify-center">
          <img
            className="rounded-full max-h-[250px]"
            src="film.jpeg"
            alt="movie-pic"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
