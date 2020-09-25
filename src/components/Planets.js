import React from 'react';
import { useQuery } from "react-query";
import { Planet } from "./Planet";

export const Planets = () => {

    const fetchPlanets = async () => {
        const res = await fetch("https://swapi.dev/api/planets");
        const json = await res.json();

        return json;
    }

    const {data, status} =  useQuery("planets", fetchPlanets);

    return (
        <div>
            <h2>Planets</h2>
            {status === "error" && (
                <div>Error fetching data</div>
            )}

            {status === "loading" && (
                <div>Loading data...</div>
            )}

            {status === "success" && (
                data.results.map((el) => {
                    return <Planet planet={el} key={el.name}/>
                })
            )}

        </div>
    )
}
