import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import MusicPlayer from '../../Music/components/MusicPlayer'
import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.faceExpressionWrapper}>
        <FaceExpression/>
      </div>
      <div className={styles.musicPlayerWrapper}>
        <MusicPlayer/>
      </div>
    </div>
  )
}

export default Home