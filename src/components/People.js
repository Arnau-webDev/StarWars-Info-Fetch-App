import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Person } from './Person';

export const People = () => {

    const [pageToShow, setPageToShow] = useState(1);

    const fetchPeople = async (key, page) => {
        const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        const json = await res.json();

        return json;
    }

    const {data, status} =  useQuery(["people", pageToShow], fetchPeople, {
        staleTime: 5000,
        retry: 2
    });

    const {next, previous } = data || {next: false, previous: false};
    
    return (
        <div>
            <h2>People</h2>
            {status === "error" && (
                <div>Error fetching data</div>
            )}

            {status === "loading" && (
                <div>Loading data...</div>
            )}

            {status === "success" && (
                data.results.map((el) => {
                    return <Person person={el} key={el.name}/>
                })
            )}
                
            {!!previous && <button onClick={() => {setPageToShow(pageToShow - 1)}}>Previous</button>}
            {!!next && <button onClick={() => {setPageToShow(pageToShow + 1)}}>Next</button>}
            <small>Page: {pageToShow}</small>
        </div>
    )
}
