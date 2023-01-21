import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [animes, setAnimes] = useState([])
  const url = 'http://localhost:3000/animes'

  useEffect(() => {
    async function fetchData() {

      const res = await fetch(url)
      
      const data = await res.json()
      
      setAnimes(data)
    }
    fetchData()

  }, [])

  console.log(animes);
  
  return (
    <>
      <h1>Animes</h1>
      <ul>
        {animes.map((anime, index) => 
          <li key={index}>
            <span>{anime.title}</span>: {anime.episodes} episodes | {anime.year}
          </li>
        )}
      </ul>
    </>
  )
}

export default App
