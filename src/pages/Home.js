import React from 'react'
import { useEffect } from 'react'
import apis from '../services/api'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'

const Home = () => {
useEffect(()=>{
apis.getNearbyAirports()
},[])
  return (
    <>
    <Navbar/>
    <Carousel/>
    </>
  )
}

export default Home