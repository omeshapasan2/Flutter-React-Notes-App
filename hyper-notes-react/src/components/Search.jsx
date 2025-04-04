import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ( {handleSearchNote} ) => {
    return <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 mb-6">
        <MdSearch className="text-gray-600" size="1.3em" />
        <input 
            type="text" 
            placeholder="type to search..." 
            className="bg-transparent border-none w-full ml-2 focus:outline-none"
            onChange={ (event) => handleSearchNote(event.target.value) }
        />
    </div>

};

export default Search;