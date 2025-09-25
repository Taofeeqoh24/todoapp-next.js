"use client";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

function SearchBar({searchTerm, setSearchTerm}: SearchBarProps) {
    return (
        <div className="m-4">
            <input 
            className=" max-lg:w-80 p-3 w-150 rounded-xl bg-purple-300"
            type="text"
            placeholder="Search for tasks...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        </div>
        
    )
}

export default SearchBar;