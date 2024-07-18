import React, { useState } from "react";
import data from '../Tasks/Tasklist.json';
import "./SearchBarFilter.css"; // Import your CSS file

const SearchBarFilter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        filterData(value);
    };

    const filterData = (searchTerm) => {
        const filteredData = data.filter((item) =>
            item.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredData);
    };

    return (
        <div className="input-wrapper">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                className="search-input"
            />
            <ul className="search-results">
                {filteredData.map((item) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBarFilter;
