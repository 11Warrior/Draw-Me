"use client"

import React, { useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'
import SidePanel from './SidePanel'


const LandingPage = () => {
  
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Footer />
        <SidePanel />
      </main>

    </>
  )
}

export default LandingPage