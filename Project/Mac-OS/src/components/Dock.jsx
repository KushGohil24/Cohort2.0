import React from 'react'
import "./dock.scss"
const Dock = ({ windowsState, setWindowsState }) => {
    const handleWindowOpen = (windowName) => {
        setWindowsState((prev) => ({ ...prev, [windowName]: true }))
    }
    return (
        <footer className='dock'>
            <div className='icon github' onClick={() => handleWindowOpen('github')}><img src='./doc-icons/github.svg' alt='github' /></div>
            <div className='icon note' onClick={() => handleWindowOpen('note')}><img src='./doc-icons/note.svg' alt='note' /></div>
            <div className='icon pdf' onClick={() => handleWindowOpen('resume')}><img src='./doc-icons/pdf.svg' alt='pdf' /></div>
            <div className='icon calender' onClick={() => { window.open("https://calendar.google.com", "_blank")}}><img src='./doc-icons/calender.svg' alt='calender' /></div>
            <div className='icon spotify' onClick={() => handleWindowOpen('spotify')}><img src='./doc-icons/spotify.svg' alt='spotify' /></div>
            <div className='icon mail' onClick={() => { window.open("mailto:gohilkush761@gmail.com", "_blank") }}><img src='./doc-icons/mail.svg' alt='mail' /></div>
            <div onClick={() => { window.open("https://www.linkedin.com/in/kushgohil2407/", "_blank") }} className="icon link"><img src="./doc-icons/link.svg" alt="" /></div>
            <div className='icon cli' onClick={() => handleWindowOpen('cli')}><img src='./doc-icons/cli.svg' alt='cli' /></div>
        </footer>
    )
}

export default Dock
