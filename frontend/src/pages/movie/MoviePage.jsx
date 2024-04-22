import React, { useEffect, useState } from "react";

const MoviePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cast, setCast] = useState([]);
  const [showPopular, setShowPopular] = useState(false); // State to track if "Popular" option is selected

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/top/anime?filter=bypopularity"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAnimeList(data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = async (anime) => {
    setSelectedAnime(anime);
    document.getElementById("modalBtn").showModal();
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/characters`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCast(data?.data);
    } catch (error) {
      console.error("Error fetching cast data:", error);
    }
  };

  const handleCloseModal = () => {
    document.getElementById("modalBtn").close();
    setSelectedAnime(null);
    setCast([]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTogglePopular = () => {
    setShowPopular(!showPopular);
  };

  const filteredAnimeList = animeList.filter((anime) =>
    (showPopular ? anime.score > 9 : true) && anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="min-h-full">
      <h1 className="text-3xl text-bold text-center text-white py-8">
        Anime Movies!!
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleTogglePopular}
          className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600 mr-2 ${
            showPopular ? 'bg-blue-600' : ''
          }`}
        >
          <span className="mr-1">Popular</span>
          {showPopular && <span role="img" aria-label="fire">🔥</span>}
        </button>
        <input
          type="text"
          placeholder="Search Anime..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 mr-2"
          style={{ width: "300px" }}
        />
        <button
          onClick={() => setSearchQuery("")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
        >
          Clear
        </button>
        <button
          onClick={() => console.log("Search")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none ml-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredAnimeList.map((anime) => (
          <div
            key={anime.mal_id}
            className="flex flex-col items-center justify-center w-full max-w-sm mx-auto mt-4"
          >
            <div
              className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
              style={{ backgroundImage: `url(${anime?.images?.jpg?.image_url})` }}
            ></div>

            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase">
                {anime.title}
              </h3>

              <div className="flex items-center justify-center px-3 py-2 bg-gray-200">
                <button
                  onClick={() => handleOpenModal(anime)}
                  className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-red-800 rounded hover:bg-red-700 focus:bg-gray-700 focus:outline-none"
                >
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog id="modalBtn" className="modal">
        <div className="modal-box bg-white text-black">
          <button
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          {selectedAnime && (
            <>
              <h3 className="font-bold text-lg text-red-600">
                {selectedAnime.title}
              </h3>
              <div className="py-10">
                <iframe
                  title={selectedAnime.title}
                  width="450"
                  height="280"
                  src={selectedAnime?.trailer?.embed_url}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-bold">Type: </span>
                  {selectedAnime.type}
                </p>
                <p>
                  <span className="font-bold">Episodes: </span>
                  {selectedAnime.episodes}
                </p>
                <p>
                  <span className="font-bold">Duration: </span>
                  {selectedAnime.duration}
                </p>
                <p>
                  <span className="font-bold">Score: </span>
                  {selectedAnime.score}
                </p>
                <p>
                  <span className="font-bold">Cast: </span>
                  {cast.map((character) => (
                    <span key={character.character_id}>{character.character.name}, </span>
                  ))}
                </p>
                <p>
                  <span className="font-bold">Synopsis: </span>
                  {selectedAnime.synopsis}
                </p>
              </div>
            </>
          )}
        </div>
      </dialog>
    </section>
  );
};

export default MoviePage;
