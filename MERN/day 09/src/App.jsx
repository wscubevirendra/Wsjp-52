import React, { useEffect, useState } from 'react'
import InputBox from './InputBox'
import Display from './Display'

export default function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")


  const getMovies = async () => {
    let API = ""
    if (search != "") {
      API = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${search}`
    } else {
      API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
    }

    const responce = await fetch(API)
    const data = await responce.json()
    setMovies(data.results)
  }


  useEffect(
    () => {
      getMovies()
    },
    [search]
  )

  return (
    <div className='container'>
      <InputBox setSearch={setSearch}/>
      <Display movies={movies}/>
    </div>
  )
}
