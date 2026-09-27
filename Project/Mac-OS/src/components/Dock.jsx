import React from 'react'
import "./dock.scss"
const Dock = () => {
    return (
        <footer className='dock'>
            <div className='icon github'><img src='./doc-icons/github.svg' alt='github'/></div>
            <div className='icon note'><img src='./doc-icons/note.svg' alt='note'/></div>
            <div className='icon pdf'><img src='./doc-icons/pdf.svg' alt='pdf'/></div>
            <div className='icon calender'><img src='./doc-icons/calender.svg' alt='calender'/></div>
            <div className='icon spotify'><img src='./doc-icons/spotify.svg' alt='spotify'/></div>
            <div className='icon mail'><img src='./doc-icons/mail.svg' alt='mail'/></div>
            <div className='icon cli'><img src='./doc-icons/cli.svg' alt='cli'/></div>
        </footer>
    )
}

export default Dock
