import React from 'react';
const movies = [
  {
    id: 1,
    title: 'Avengers: Endgame',
    poster: 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
    rating: '8.4',
  },
  {
    id: 2,
    title: 'Inception',
    poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    rating: '8.8',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: '9.0',
  },
  {
    id: 4,
    title: 'Interstellar',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    rating: '8.6',
  },
  {
    id: 5,
    title: 'Joker',
    poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    rating: '8.5',
  },
  {
    id: 6,
    title: 'Spider-Man: No Way Home',
    poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    rating: '8.2',
  },
  {
    id: 7,
    title: 'Doctor Strange in the Multiverse of Madness',
    poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    rating: '7.4',
  },
  {
    id: 8,
    title: 'The Batman',
    poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    rating: '8.1',
  },
  {
    id: 9,
    title: 'Black Panther: Wakanda Forever',
    poster: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
    rating: '7.8',
  },
  {
    id: 10,
    title: 'Guardians of the Galaxy Vol. 3',
    poster: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    rating: '8.3',
  },
];

const Home = () => {
  return (
    <div className="px-6 py-4">
      {/* Section Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Trending Now</h2>

      {/* Movie Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
            <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800">{movie.title}</h3>
              <p className="text-xs text-gray-500 mt-1">⭐ {movie.rating}/10</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
