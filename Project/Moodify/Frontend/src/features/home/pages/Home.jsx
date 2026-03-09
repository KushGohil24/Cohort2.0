import React, { useState } from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import MusicPlayer from '../../Music/components/MusicPlayer'
import styles from './Home.module.scss'

const Home = () => {
  const [mood, setMood] = useState('happy'); // Default or initial mood

  return (
    <div className={styles.homeContainer}>
      <div className={styles.faceExpressionWrapper}>
        <FaceExpression onClick={(detectedMood) => setMood(detectedMood)} />
      </div>
      <div className={styles.musicPlayerWrapper}>
        <MusicPlayer mood={mood} />
      </div>
    </div>
  )
}

export default Home