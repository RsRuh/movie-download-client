import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Movie = ({ movie }) => {
    const { user } = useContext(AuthContext);


    const { movieName, publishDate, imgURL, message } = movie;

    const handleDownload = event => {

        const selected = {
            movieName: movieName,
            publishDate: publishDate,
            imgURL: imgURL,
            message: message,
            email: user?.email
        }

        if(user){
            fetch('http://localhost:5000/download',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(selected)
        })
        .then(data=>{
            // console.log(data)
            if(data.Response){
                alert('Downloading your movie')
            }
        })
        .catch(err=>console.error(err))
        console.log(selected);
        }
        else{
            alert('Login First')
            return
        }
    }

    return (

        <article className="flex flex-col bg-gray-200">

            <img alt="" className="object-cover w-full h-52 dark:dark:bg-gray-500" src={imgURL} />

            <div className="flex flex-col flex-1 p-6">

                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{movieName}</h3>
                <p className="text-xs tracking-wider uppercase dark:dark:text-violet-400">{
                    message? message.slice(0, 140)+'...' : ''
                }</p>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:dark:text-gray-400">
                    <span>{publishDate}</span>
                    <button onClick={()=>handleDownload(movie)} className="btn btn-xs">Download</button>
                </div>
            </div>
        </article>
    );
};

export default Movie;