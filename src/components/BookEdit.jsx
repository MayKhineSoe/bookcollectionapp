import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const BookEdit = () => {
  const [id, changeId] = useState("");
  const [title, changeTitle] = useState("");
  const [desc, changeDesc] = useState("");
  const [image, changeImage] = useState("");
  const navigate = useNavigate();
  const {bookid} = useParams()

  useEffect(() => {
            fetch(`http://localhost:8000/books/${bookid}`)
                .then((response) => response.json())
                .then((data) => {
                    changeId(data.id);
                    changeTitle(data.title);
                    changeDesc(data.desc);
                    changeImage(data.image);
    
                })
                .catch((error) => console.error("Error fetching books:", error));
        }, [bookid]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
           reader.onload=() => {
            console.log("image", reader.result);
        changeImage(reader.result); // convert file into base64 and store in state
       
      }
      reader.readAsDataURL(file);
    }
  }

  const handleForm = (e) => {
    e.preventDefault();
    const bookdata = { id, title, desc, image };
    console.log(bookdata);
    fetch(`http://localhost:8000/books/${bookid}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookdata)
    }).then((res) => {
      alert('Updated Successfully');
      navigate('/')
    }).catch((err) => {
      console.log(err.message);
    })
  }

  return (
    <div>
      <div>
      <h1 className='text-teal-500 font-mono font-bold text-2xl text-center mt-5'>Edit Your Book</h1>

      {/* Creating Form */}


      <form onSubmit={handleForm} className="max-w-md mx-auto mt-7">
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" value={id} onChange={e => changeId(e.target.value)} name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ID</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" value={title} onChange={e => changeTitle(e.target.value)} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" value={desc} onChange={e => changeDesc(e.target.value)} name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="file" onChange={handleFileChange} name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
          {image && <img src={image} alt="Selected Preview" className="w-32 h-32 object-cover mt-3" />}

        </div>


        <button type="submit" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
        <Link to='/' className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Back</Link>

      </form>


    </div>
    </div>
  )
}

export default BookEdit