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
    async function fetchData() {
      const res = await fetch(url)
      const json = await res.json()
      
      setData(json)
    }
    fetchData()
    setLoading(false)
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
  

  return {data, handleHttpResquest, loading, errMessage, closeErrMessage};
}