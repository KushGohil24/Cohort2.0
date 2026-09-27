import { useState } from 'react'
import './app.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import MacWindow from './components/windows/MacWindow'
import Github from './components/windows/Github'
import Note from './components/windows/Note'
import Resume from './components/windows/Resume'
import Spotify from './components/windows/Spotify'
import Cli from './components/windows/Cli'
function App() {

  return (
    <>
      <main>
        <Nav />
        <Github />
        <Dock />
        <Note />
        <Resume />
        <Spotify />
        <Cli />
      </main>
    </>
  )
}

export default App
