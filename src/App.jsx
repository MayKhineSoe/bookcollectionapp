import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import BookListing from './components/BookListing'
import BookEdit from './components/BookEdit'
import BookCreate from './components/BookCreate'
import BookDetail from './components/BookDetail'


const App = () => {
  return (
    <div>
      <h1 className='text-teal-500 font-mono font-bold text-3xl text-center mt-10'>Book Collection App</h1>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<BookListing />} />
      <Route path='/books/create' element={<BookCreate />} />
      <Route path='/books/edit/:bookid' element={<BookEdit />} />
      <Route path='/books/detail/:bookid' element={<BookDetail />} />

     </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App