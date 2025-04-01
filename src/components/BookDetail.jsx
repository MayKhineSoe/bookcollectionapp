import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BookDetail = () => {

  const [books, changeBooks] = useState("");
  const {bookid} = useParams()
  
      useEffect(() => {
          fetch(`http://localhost:8000/books/${bookid}`)
              .then((response) => response.json())
              .then((data) => {
                  console.log(data);
                  changeBooks(data)
  
              })
              .catch((error) => console.error("Error fetching books:", error));
      }, [bookid]);
  return (
    <div className='container mx-auto p-14'>
        <div className='flex sm:flex-cols-1 justify-between md:flex-cols-2  md:gap-5 place-items-center mt-10 mb-10'>
          <div>
            <img src={books.image} className='max-w-[350px]' alt="" />
          </div>
          <div>
            <h1 className='text-teal-500 font-mono font-bold text-3xl mb-5'>{books.title}</h1>
            <p className='text-gray-400 text-lg mb-5'>{books.desc}</p>
            <Link to="/" className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Back to Listing</Link>

          </div>

        </div>
   </div>
  )
}

export default BookDetail