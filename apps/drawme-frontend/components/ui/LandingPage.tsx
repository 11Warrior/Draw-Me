import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'


const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Footer />
      </main>
    </>
  )
}

export default LandingPage