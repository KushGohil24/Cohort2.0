import React, { useState, useEffect } from "react"

const DateTime = () => {
    const [formattedDate, setFormattedDate] = useState("")

    useEffect(() => {
        const updateTime = () => {
            const d = new Date()
            const days = d.toDateString()
            const timeString = d.toLocaleTimeString()
            
            const newFormattedDate = days.split(' ').slice(0, 3).join(' ') + ' ' + timeString.split(':')[0] + ':' + timeString.split(':')[1] + ' ' + timeString.split(' ')[1]
            setFormattedDate(newFormattedDate)
        }
        
        updateTime()
        const interval = setInterval(updateTime, 1000)
        
        return () => clearInterval(interval)
    }, [])

    return (
        <p>{formattedDate}</p>
    )
}

export default DateTime