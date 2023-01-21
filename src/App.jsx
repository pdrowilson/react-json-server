import { useState } from 'react'

import { useFetch } from "./hooks/useFetch"

const url = 'http://localhost:3000/animes'

function App() {
  const { data: animes, handleHttpResquest} = useFetch(url)
  const [title, setTitle] = useState("")
  const [episodes, setEpisodes] = useState("")
  const [errMessage, setErrMessage] = useState("")

  const anime = { title, episodes}
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || episodes === "") {
      setErrMessage("Input is empty!")
      return
    }

    handleHttpResquest(anime, "POST")

    setTitle("")
    setEpisodes("")
    setErrMessage("")
  }

  const handleClose = () => setErrMessage("")

  return (
    <div className='flex justify-center h-screen'>
      <div className='self-center'>
        <h1 className='text-2xl text-blue-500'>Animes</h1>
        <ul>
          {animes && animes.map((anime, index) => 
            <li key={index}>
              <span>{anime.title}</span>: {anime.episodes} episodes
            </li>
          )}
        </ul>
        <hr className='my-6' />
        {
          errMessage &&
          <div className='flex justify-between bg-red-400 rounded p-2 mb-3 animate-shake'>
            <div className=''>
              {errMessage}
            </div>
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
              Anime Title
              <input 
                className='p-2 mb-3 rounded w-full text-black' 
                type="text" 
                value={title} 
                name="name" 
                onChange={e => setTitle(e.target.value)}/>
            </label>
            <label>
              Episodes
              <input 
                className='p-2 mb-3 rounded w-full text-black' 
                type="text" 
                value={episodes} 
                name="episodes" 
                onChange={e => setEpisodes(e.target.value)}/>
            </label>
            <input
              className='py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 cursor-pointer' 
              type="submit" 
              value="Submit"/>
          </form>

        </div>
      </div>
    </div>
  )
}

export default App
