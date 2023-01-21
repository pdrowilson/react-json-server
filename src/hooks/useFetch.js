import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [config, setConfig] = useState(null)
  const [method, setMethod] = useState(null)
  const [callFetch, setCallFetch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errMessage, setErrMessage] = useState(false)

  const closeErrMessage = () => {
    setErrMessage(false)
  }

  const handleHttpResquest = (data, method) => {
    if (data.title === "" || data.episodes === "") {
      setErrMessage("Input is empty!")
      return
    }
    setLoading(true)

    if(method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data)
      })
      setMethod(method)
    }
  }
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await fetch(url)
      const json = await res.json()
      setLoading(false)
      
      setData(json)
    }
    fetchData()
  }, [url, callFetch])

  useEffect(() => {
    const httpRequest = async () => {
      if(method === "POST") {
        let fetchOptions = [url, config]
        const res = await fetch(...fetchOptions)
        const json = await res.json()
        
        setCallFetch(json)
      }
    }
    httpRequest()
  }, [config, method, url])

  const deleteRequest = async (id) => {
    console.log(id);
    const res = await fetch(`http://localhost:3000/animes/${id}`, {
      method: 'DELETE',
    })
    const json = await res.json()
    setCallFetch(json)
    
  }
  

  return {data, handleHttpResquest, deleteRequest, loading, errMessage, closeErrMessage};
}