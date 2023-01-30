import React, { useState, useEffect } from "react";
import axios from './axios';
import requests from './Requests';

import './Banner.css';

const Banner = () =>{
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchTrending);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length -1)
                ]
            )
            return request;
        }

        fetchData()
    },[])
    const truncate = (string, n) =>{
        return string?.length > n ? string.substring(0, n-1) + '...' : string;
    }


    return(
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: 'center top',
        }}>
            <div className='banner__contents'>
                <div className="banner__overlay">
                    <h1 className="banner__title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner__buttons">
                        <button className="banner__button">Play</button>
                        <button className="banner__button">Trailer</button>
                    </div>
                    <h1 className="banner__description">
                        {
                            truncate(movie?.overview,200)
                        }
                    </h1>
                </div>
            </div>
            <div className='banner--fadeBottom' />

        </header>
    );
};

export default Banner;