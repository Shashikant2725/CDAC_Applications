import React, { useState } from "react";

const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <input
            type="text"
            className="form-control"
            // style={{maxWidth:"40%",marginTop:"-2%",marginLeft:"100%",height:"100%" }}
            style={{ width: "50%",marginTop:"8%",marginLeft:"100%",height:"100%" }}
            placeholder="Search"
            value={search}
            onChange={e => onInputChange(e.target.value)}
        />
    );
};

export default Search;
