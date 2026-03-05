"use client"

import React, { useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'
import SidePanel from './SidePanel'


const LandingPage = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanelState = (state: boolean) => {
    setIsPanelOpen(state);
  }

  console.log("In LandingPage", isPanelOpen);
  return (
    <>
      <Navbar togglePanelState={togglePanelState} />
      <main>
        <Hero togglePanelState={togglePanelState} />
        <Features />
        <Footer />
        <SidePanel togglePanelState={togglePanelState} isPanelOpen={isPanelOpen} />
      </main>

    </>
  )
}

export default LandingPage