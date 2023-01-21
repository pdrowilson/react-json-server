import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [config, setConfig] = useState(null)
  const [method, setMethod] = useState(null)
  const [callFetch, setCallFetch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errMessage, setErrMessage] = useState(false)
  const [itemId, setItemId] = useState(null)

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
    } else if(method === "DELETE") {
      setConfig({
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        }
      })
      setMethod(method)
      setItemId(data)

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
      let json
      if(method === "POST") {
        let fetchOptions = [url, config]
        const res = await fetch(...fetchOptions)
        json = await res.json()
      } else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`
        const res = await fetch(deleteUrl, config)
        json = await res.json()
      }
      setCallFetch(json)
    }
    httpRequest()
  }, [config, method, url])

  return {data, handleHttpResquest, loading, errMessage, closeErrMessage};
}