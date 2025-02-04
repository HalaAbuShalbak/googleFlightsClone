import React from 'react'
import { useEffect } from 'react'
import apis from '../services/api'

const Home = () => {
useEffect(()=>{
apis.getNearbyAirports()
},[])
  return (
    <div>Home</div>
  )
}

export default Home