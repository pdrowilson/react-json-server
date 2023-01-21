import { useState, useEffect } from 'react'

function App() {
  const [animes, setAnimes] = useState([])

  const [title, setTitle] = useState("")
  const [episodes, setEpisodes] = useState("")
  const [errMessage, setErrMessage] = useState("")

  const url = 'http://localhost:3000/animes'

  useEffect(() => {
    async function fetchData() {

      const res = await fetch(url)
      
      const data = await res.json()
      
      setAnimes(data)
    }
    fetchData()

  }, [])
  
  // add animes
  const handleSubmit = async (e) => {
    e.preventDefault();

  if (title === "" || episodes === "") {
    setErrMessage("Input is empty!")
    return
  }

    const anime = {
      title,
      episodes
    }

    const postRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(anime)
    });

    const addedAnime = await postRes.json()
    console.log(addedAnime);

    setAnimes((prevAnimes) => [...prevAnimes, addedAnime])
    
    setTitle("")
    setEpisodes("")
    setErrMessage("")
  }

  console.log(animes);
  
  return (
    <div className='flex justify-center h-screen'>
      <div className='self-center'>
        <h1 className='text-2xl text-blue-500'>Animes</h1>
        <ul>
          {animes.map((anime, index) => 
            <li key={index}>
              <span>{anime.title}</span>: {anime.episodes} episodes
            </li>
          )}
        </ul>
        <hr className='my-6' />
        {
          errMessage &&
            <span className='bg-red-400 rounded text-center block p-2 mb-3 animate-shake'>{errMessage}</span>
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
