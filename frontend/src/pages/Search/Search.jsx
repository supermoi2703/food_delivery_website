import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Search.css"
import { assets } from "../../assets/assets";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const { addToCart, removeFromCart, url } = useContext(StoreContext);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!query) return;
            try {
                const res = await axios.get(`${url}/api/food/search?q=${query}`);
                setResults(res.data);
            } catch (err) {
                console.error("Search API failed", err);
            }
        };
        fetchData();
    }, [query]);

    return (
        <div className="search-page">
            <h2 className="search-page-title">Results for: "{query}"</h2>
            <div className="search-results">
                {results.length > 0 ? (
                    results.map(item => (
                        <div key={item._id} className="search-result-item">
                            <img
                                src={url + "/images/" + item.image}
                                alt={item.name}
                                className="search-result-image"
                            />
                            <div className="search-result-details">
                                <h3 className="search-result-name">{item.name}</h3>
                                <p className="search-result-description">{item.description}</p>
                            </div>
                            <div className="counter">
                                <img onClick={() => removeFromCart(item._id)} src={assets.remove_icon_red} alt="" />
                                <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="search-no-results">No matching food items found</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;