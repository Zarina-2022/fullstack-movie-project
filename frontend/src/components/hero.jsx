

const Hero = () => {
  return (
    <div className="p-10 py-20 mb-10 bg-[url('movie-banner.jpg')] bg-center bg-cover text-white">
      <h1 className="text-4xl md:text-5xl font-bold">Welcome</h1>
      <h2 className="text-2xl md:text-3xl font-semibold">Discover millions of movies, TV series and actors.</h2>
      <div className="relative flex mt-5 overflow-hidden  rounded-full ">
        <input 
        type="text" 
        className="w-full p-2 text-black"
        placeholder="Movie, Series and Actors"
        />
        <button className="absolute bg-blue-400 end-0 h-full px-10 text-whitefont-semibold hover:bg-blue-600 transition">Search</button>
      </div>
    </div>
  )
}

export default Hero
