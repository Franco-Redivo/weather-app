import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [location, setLocation] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim()) {
            onSearch(location);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/30 backdrop-blur sm:flex-row"
        >
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter City"
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
            />
            <button
                type="submit"
                className="rounded-xl bg-sky-500 px-5 py-3 font-medium text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
                Search
            </button>
        </form>
    );
}

export default SearchBar;