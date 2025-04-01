import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const BookListing = () => {

    const [books, changeBooks] = useState("");
    const [search, setSearch] = useState("")
    console.log(search)

    useEffect(() => {
        fetch("http://localhost:8000/books")
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                changeBooks(data)

            })
            .catch((error) => console.error("Error fetching books:", error));
    }, []);

    const removeFunction = (bookid) => {
        if (window.confirm("Do you want to delete?")) {
            fetch(`http://localhost:8000/books/${bookid}`, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(bookid)
            }).then((res) => {
                alert('Delted Successfully');
                window.location.reload()
            }).catch((err) => {
                console.log(err.message);
            })
        }

    }

    return (
        <div className='container mx-auto px-12'>
            <h1 className='text-teal-300 text-xl  mb-10 text-center'>Book Listing</h1>
            {/* Add New Book & Search Bar */}
            <div className='flex justify-between items-center px-8'>
                {/* Add New Book */}
                <div className='text-right items-start'>
                    <Link to="/books/create" className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5 '>Add New Book</Link>
                </div>
                {/* Search Bar */}
               <div className='w-full max-w-sm'>
               <form className="mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" onChange={(e)=> setSearch(e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:border-none dark:bg-gray-700 dark:border-teal-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
               </div>


            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2
        md:grid-cols-3 md:gap-5 place-items-center mt-10 mb-10'>
                {
                    books &&
                    books.filter((book)=> {
                        return search.toLowerCase() === '' ? book : book.title.toLowerCase().includes(search);
                    }).map((book) => {

                        return <div key={book.id} className='mt-28 px-10 py-5 rounded-2xl bg-cyan-200
                     hover:bg-blue-400 hover:text-white relatvie shadow-xl duration-high group 
                     w-[300px]'>
                            <div>
                                <img src={book.image} alt="" className='h-[200px] w-auto object-cover rounded-lg shadow-lg block mx-auto 
                                 transform -translate-y-14 group-hover:scale-105 duration-300 '/>
                            </div>
                            <div className='p4 pb-4 text-center'>
                                <h1 className='text-xl font-bold my-5'>{book.title}</h1>
                                <p className='text-gray-500 group-hover:text-white
                             duration-300 text-sm line-clamp-2'>{book.desc}

                                </p>
                                <div className='mt-5'>
                                    <Link to={`/books/detail/${book.id}`} className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 mt-5 py-2.5 text-center me-2 mb-2'>Detail</Link>
                                    <Link to={`/books/edit/${book.id}`} className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 mt-5 py-2.5 text-center me-2 mb-2'>Edit</Link>
                                    <button onClick={() => removeFunction(book.id)} className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 mt-5 py-2.5 text-center me-2 mb-2'>Delete</button>
                                </div>

                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default BookListing