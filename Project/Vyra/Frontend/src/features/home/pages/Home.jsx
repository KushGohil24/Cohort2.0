import React from 'react'
import Hero from '../../Shared/Components/Hero'
import CategoryShowcase from '../../Shared/Components/CategoryShowcase'
import LatestCollection from '../../products/components/LatestCollection'
import BestSeller from '../../products/components/BestSeller'
import OurPolicy from '../../Shared/Components/OurPolicy'
import NewsLetterbox from '../../Shared/Components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryShowcase />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterbox />
    </div>
  )
}

export default Home
