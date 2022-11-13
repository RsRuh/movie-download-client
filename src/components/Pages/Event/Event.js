import React from 'react';

const Event = () => {

    const submitItem = event => {
        
        event.preventDefault();
        const form = event.target;
        const movieName = form.movieName.value;
        const publishDate = form.publishDate.value;
        const imgURL = form.imgURL.value;
        const message = form.message.value;

        const order = {
            movieName: movieName,
            publishDate: publishDate,
            imgURL: imgURL,
            message: message
        }   
        
        fetch('http://localhost:5000/upload',{
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.acknowledged){
                alert('Upload successfully')
                form.reset();
            }
        })
        
        .catch(er => console.error(er));
    }


    return (

        <div>
            <section className='my-32'>
                <h1 className="sr-only">Checkout</h1>
                <div className="relative mx-auto max-w-screen-2xl">
                    <div>
                        <div className="bg-[#F3F3F3] py-12 rounded-lg md:py-24">
                            <div className="mx-auto px-4 lg:px-8">
                                <form onSubmit={submitItem} className="grid grid-cols-6 gap-4">
                                    <div className="col-span-3">
                                        <label htmlFor="movieName" className='text-sm ml-2 font-semibold'>Movie Title</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-2.5 pl-4 shadow-sm"
                                            type="text"
                                            id="movieName"
                                            name='movieName'
                                            placeholder='Movie Title'
                                        />
                                    </div>

                                    <div className="col-span-3">
                                            <label htmlFor="publishDate" className='text-sm ml-2 font-semibold'>Publish Date</label>
                                            <input
                                            className="w-full rounded-lg border-gray-200 p-2.5 pl-4 shadow-sm"
                                            type="date"
                                            id="publishDate"
                                            name='publishDate'
                                        />
                                    </div>

                                    <div className="col-span-6">
                                    <label htmlFor="imgURL" className='text-sm ml-2 font-semibold'>ImageURL</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-2.5 pl-4 shadow-sm"
                                            type="text"
                                            id="imgURL"
                                            name='imgURL'
                                            placeholder='Your ImageURL'
                                        />

                                    </div>

                                    <div className='col-span-6'>
                                        <textarea
                                            className="w-full rounded-lg border-gray-200 p-3"
                                            placeholder="Your Message"
                                            rows="8"
                                            name='message'
                                            id="message"

                                        ></textarea>
                                    </div>

                                    <div className="col-span-6">
                                        <button className="block w-full rounded-lg bg-[#FF3811] py-3 font-semibold text-white" type="submit">Submit Confirm</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Event;