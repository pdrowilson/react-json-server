import { useState } from 'react'

import { useFetch } from "./hooks/useFetch"

const url = 'http://localhost:3000/animes'

function App() {
  const { 
    data: animes, 
    handleHttpResquest, 
    deleteRequest,
    loading, 
    errMessage,
    closeErrMessage
  } = useFetch(url)
  const [title, setTitle] = useState("")
  const [episodes, setEpisodes] = useState("")

  const anime = { title, episodes}
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    handleHttpResquest(anime, "POST")

    setTitle("")
    setEpisodes("")
  }

  const handleClose = () => closeErrMessage()
  const handleDelete = (id) => {
    handleHttpResquest(id, "DELETE")
  }
  return (
    <div className='flex justify-center h-screen'>
      <div className='self-center'>
        <h1 className='text-2xl text-blue-500'>Animes</h1>
        {loading &&
          <div className='fill-white mt-5 flex justify-center'>
            <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".15"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" /></svg>
          </div>
        }
        {!loading &&
          <ul>
            {animes && animes.map((anime, index) => 
              <div key={index} className="flex space-between">
                <div className='grow'>
                  <span>{anime.title}</span>: {anime.episodes} episodes
                </div>
                <button
                onClick={() => handleDelete(anime.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </div>
            )}
          </ul>
        }
        <hr className='my-8' />
        {
          errMessage &&
          <div className='flex justify-between bg-red-400 rounded p-2 mb-3 animate-shake'>
            <div>{errMessage}</div>
            <button 
              onClick={handleClose} 
              className='px-2'>
                X
            </button>
          </div>
        }
        <div className="flex">

          <form onSubmit={handleSubmit}>
            <label>
               <span className='text-xs bold'>Anime Title:</span> 
              <input 
                disabled={loading}
                placeholder="Enter the anime title"
                className='
                  p-2 
                  mb-3 
                  rounded 
                  w-full 
                  text-black 
                  border-2
                  border-sky-200
                  focus-visible:outline-blue-500
                  disabled:border-gray-500'
                type="text" 
                value={title} 
                name="name" 
                onChange={e => setTitle(e.target.value)}/>
            </label>
            <label>
            <span className='text-xs'>Episodes:</span> 
              
              <input 
                disabled={loading}
                placeholder="Enter the number of episodes"
                className='
                  p-2 
                  mb-3 
                  rounded 
                  w-full 
                  text-black 
                  border-2
                  border-sky-200
                  focus-visible:outline-blue-500
                  disabled:border-gray-500' 
                type="text" 
                value={episodes} 
                name="episodes" 
                onChange={e => setEpisodes(e.target.value)}/>
            </label>
            {loading &&
              <button
                disabled
                className='py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 cursor-pointer disabled:bg-blue-300' 
                onClick={handleSubmit} 
                value="Submit">
                  <div className='fill-white flex'>
                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".15"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" /></svg>
                  </div>
              </button>
            }
            {!loading && 
              <button
                className='py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 cursor-pointer disabled:bg-blue-300' 
                onClick={handleSubmit} 
                value="Submit">
                  <span>Submit</span>
              </button>
            }
          </form>

        </div>
      </div>
    </div>
  )
}

export default App
