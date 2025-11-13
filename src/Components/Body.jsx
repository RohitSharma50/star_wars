import { useState, useEffect, useRef } from "react";
import { Cards } from "./Cards";
import { API_URL } from "../utils/Constant";
import Shimmer from "./Shimmer";
import { filteringData } from "../utils/filteringData";
import { useNavigate } from "react-router-dom";

function Body({ isLoginTrue }) {
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const cacheRef = useRef(new Map()); // in-memory cache

  const [list, setList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let mounted = true;
    if (isLoginTrue === false) {
      navigate("/login");
    }
    async function load() {
      setLoading(true);
      setError(null);

      if (cacheRef.current.has(page)) {
        const cached = cacheRef.current.get(page);
        if (!mounted) return;
        setList(cached.results || []);
        setFilteredData(cached.results || []);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}?page=${page}`, { signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        cacheRef.current.set(page, json);
        if (!mounted) return;
        setList(json.results || []);
        setFilteredData(json.results || []);
      } catch (err) {
        if (err.name === "AbortError") return;
        if (!mounted) return;
        setError(err.message || "Unknown error");
        setList([]);
        setFilteredData([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [page]);

  const retry = () => setPage((p) => p); // retry current page
  const Prev = () => setPage((p) => Math.max(1, p - 1));
  const Next = () => {
    const cached = cacheRef.current.get(page);
    if (cached && !cached.next) return; // no next page
    setPage((p) => p + 1);
  };

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600 mb-2">Error: {error}</div>
        <button
          onClick={retry}
          className="px-3 py-1 rounded bg-blue-600 text-white"
          disabled={loading}
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading && list.length === 0) {
    return <Shimmer />;
  }

  return (
    <>
      {/* container centers content and limits width */}
      <div className="max-w-6xl mx-auto">
        {/* Search + Filters */}
        <section className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
          <select
            className="p-2 rounded-lg border border-gray-300 w-full sm:w-auto"
            value={searchText}
            onChange={(e) => {
              const data = filteringData(e.target.value, list);
              setSearchText("");
              setFilteredData(data);
            }}
          >
            <option value="none">Filterby</option>
            <option value="films">film less than 5</option>
            <option value="species">species filled</option>
          </select>

          <input
            type="text"
            className="border border-gray-300 rounded-lg w-full sm:w-1/3 p-2"
            placeholder="eg. pizza"
            value={searchText}
            id="search"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            className="px-4 py-2 bg-purple-800 text-white rounded-lg w-full sm:w-auto"
            onClick={() => {
              const data = filteringData(searchText, list);
              setFilteredData(data);
            }}
          >
            Search
          </button>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 justify-items-center">
          {filteredData.map((item) => (
            <div
              key={item.url || item.created}
              className="w-full justify-items-center sm:w-[260px] md:w-[270px] lg:w-[300px]"
            >
              <Cards
                name={item.name}
                height={item.height}
                gender={item.gender}
                skin_color={item.skin_color}
                birth_year={item.birth_year}
                Mass={item.mass}
                species={item.species} // remove this line if
                date_added={item.created
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
                films_count={item.films.length}
                homeworld={item.homeworld}
              />
            </div>
          ))}
        </section>

        {/* Pagination */}
        <section className="flex flex-col sm:flex-row justify-center items-center gap-4 p-4">
          <button
            onClick={Prev}
            disabled={page === 1 || loading}
            className="px-3 py-1 bg-gray-500 rounded border w-full sm:w-auto"
          >
            Prev
          </button>

          <section className="px-2">
            Page {page} {loading ? "(loading...)" : ""}
          </section>

          <button
            onClick={Next}
            disabled={loading || cacheRef.current.get(page)?.next === null}
            className="px-3 py-1 bg-gray-500 rounded border w-full sm:w-auto"
          >
            Next
          </button>
        </section>
      </div>
    </>
  );
}

export default Body;
