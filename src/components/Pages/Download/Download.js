import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Success from './Success';

const Download = () => {

    const { user } = useContext(AuthContext);
    const [downloads, setDownloads] = useState();

    const [count, setCount] = useState(0)
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)

    console.log(size);


    useEffect(() => {
        fetch(`http://localhost:5000/download?email=${user?.email}&page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setDownloads(data.result)
                setCount(data.count)

            })
    }, [user?.email, page, size]);

    const pages = Math.ceil(count / size);

    // useEffect(() => {
    //     fetch(`http://localhost:5000/download?email=${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => setDownloads(data))
    // }, [user?.email]);




    const handleDelete = (id) => {
        fetch(`http://localhost:5000/download/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    const remaining = downloads.filter(down => down._id !== id)
                    setDownloads(remaining);
                    console.log(remaining);
                }
            })

    }



    return (
        <div className="flex mx-auto flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-900 dark:text-gray-100">

            <div className="flex justify-center space-x-1 dark:text-gray-100">

                {
                    [...Array(pages).keys()].map(number => <button onClick={() => setPage(number)} key={number} type="button"
                        className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400">{number + 1}</button>)
                }

                <select onChange={event => setSize(event.target.value)}
                className="inline-flex items-center justify-center w-10 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400"
                >
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>

            </div>

            <h2 className="text-xl font-semibold">Downloading {count} Movie </h2>
            <ul className="flex flex-col divide-y divide-gray-700">
                {
                    downloads?.map(each => <Success
                        key={each._id}
                        each={each}
                        handleDelete={handleDelete}
                    ></Success>)
                }
            </ul>
            <div className="space-y-1 text-right">
                <p>Total amount:
                    <span className="font-semibold">357 €</span>
                </p>
                <p className="text-sm dark:text-gray-400">Not including taxes and shipping costs</p>
            </div>
            <div className="flex justify-end space-x-4">
                <button type="button" className="px-6 py-2 border rounded-md dark:border-violet-400">Back
                    <span className="sr-only sm:not-sr-only">to shop</span>
                </button>
                <button type="button" className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400">
                    <span className="sr-only sm:not-sr-only">Continue to</span>Checkout
                </button>
            </div>
        </div>
    );
};

export default Download;