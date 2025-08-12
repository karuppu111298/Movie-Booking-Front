import React from "react";

const Home = () => {
  
  return (
    <div className="w-full">
      {/* Banner Section */}
      <div
        className="relative h-[60vh] md:h-[80vh] flex items-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-6 md:px-12 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Avengers: Endgame
          </h1>
          <p className="max-w-lg mb-6">
            The Avengers assemble once more in order to reverse Thanos'
            actions and restore balance to the universe.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold">
            Watch Now
          </button>
        </div>
      </div>

      {/* Trending Movies */}
    </div>
  );
};

export default Home;
