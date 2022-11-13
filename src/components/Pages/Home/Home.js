import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Movie from './Movie';
import './Home.css'


const Home = () => {
    // const { result, count } = useLoaderData();
    

    const [movies, setMovies] = useState([]);
    const [count, setCount] = useState(0);
    
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);


    useEffect(() => {

        const url = `http://localhost:5000/movies?page=${page}&size=${size}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setMovies(data.result);
            })
    }, [page, size])

    const pages = Math.ceil(count / size);


    return (
        <div>
            <h1 className='text-5xl mt-10 font-bold text-center'>Unlimited movies, TV <br /> shows, and more.</h1>
            <div className='flex'>
                <fieldset className="mx-auto mt-5 space-y-1 text-gray-100">

                    <label htmlFor="Search" className="hidden">Search</label>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-gray-100">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                            </button>
                        </span>
                        <input type="search" name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-800 text-gray-100 focus:bg-gray-900 focus:border-violet-400" />
                    </div>
                </fieldset>
            </div>

            <section className="py-6 sm:py-12 dark:dark:bg-gray-800 dark:dark:text-gray-100">
                <div className="container p-6 mx-auto space-y-8">
                    <div className="space-y-2 text-center">
                        <h2 className="text-3xl font-bold">Watch anywhere. Cancel anytime.</h2>
                        <p className="font-serif text-sm dark:dark:text-gray-400">Ready to watch? Enter your email to create or restart your membership.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">

                        {
                            movies.map(movie => <Movie
                                key={movie._id}
                                movie={movie}
                            ></Movie>)
                        }


                    </div>
                </div>
            </section>


            <div className="flex justify-center space-x-1 dark:text-gray-100">
                
                    {
                        [...Array(pages).keys()].map(number => <button
                            type="button" aria-current="page" className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400"
                            key={number}
                            onClick={() => setPage(number)}
                        // className={page = number && 'selected'}
                        >{number + 1}</button>)
                    }


                    <select onChange={event => setSize(event.target.value)} className="inline-flex items-center justify-center w-10 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400">
                        <option value="5" type="button">5</option>
                        <option value="10" type="button" selected>10</option>
                        <option value="15" type="button">15</option>
                        <option value="20" type="button">20</option>
                        <option value="200" type="button">All</option>
                    </select>
             

            </div>

        </div>
    );
};

export default Home;