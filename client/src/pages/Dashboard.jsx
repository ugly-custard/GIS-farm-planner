import React from 'react'
import '../styles/Dashboard.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import YeildPredictor from '../components/YeildPredictor'
import DiseasePredictor from '../components/DiseasePredictor'
import CropRecommendation from '../components/CropRecommendation'
import FertilizerRecommendation from '../components/FertilizerRecommendation'

function Dashboard() {

  const [active, setActive] = React.useState('Dashboard')

  const data = {
    name: 'John Doe',
    email: 'name@example.com',
    location: 'Mumbai',
  }

  const options = [
    {
      label: 'Dashboard',
      onclick: () => setActive('Dashboard'),
      active: active === 'Dashboard' // Check if the option is active
    },
    {
      label: 'Yeild Predictor',
      onclick: () => setActive('Yeild Predictor'),
      active: active === 'Yeild Predictor' // Check if the option is active
    },
    {
      label: 'Disease Pedictor',
      onclick: () => setActive('Disease Pedictor'),
      active: active === 'Disease Pedictor' // Check if the option is active
    },
    {
      label: 'Crop Recommendation',
      onclick: () => setActive('Crop Recommendation'),
      active: active === 'Crop Recommendation' // Check if the option is active
    },
    {
      label: 'Fertilizer Recommendation',
      onclick: () => setActive('Fertilizer Recommendation'),
      active: active === 'Fertilizer Recommendation' // Check if the option is active
    },
    {
      label: 'Market Trends',
      onclick: () => setActive('Market Trends'),
      active: active === 'Market Trends' // Check if the option is active
    },
    {
      label: 'Settings',
      onclick: () => setActive('Settings'),
      active: active === 'Settings' // Check if the option is active
    }
  ]

  const renderActive = () => {
    switch (active) {
      case 'Dashboard':
        return <Map />
      case 'Yeild Predictor':
        return <YeildPredictor />
      case 'Disease Pedictor':
        return <DiseasePredictor />
      case 'Crop Recommendation':
        return <CropRecommendation />
      case 'Fertilizer Recommendation':
        return <FertilizerRecommendation />
      case 'Market Trends':
        return <h1>Market Trends</h1>
      case 'Settings':
        return <h1>Settings</h1>
      default:
        return <Map />
    }
  }

  return (
    <div className='dashboard'>
      <div className="dashboard__top">
        <Navbar />
      </div>
      <div className="dashboard__bottom">
        <div className="dashboard__bottom__left">
          <Sidebar
            name={data.name}
            email={data.email}
            location={data.location}
            options={options}
            active={active} // Pass the active option as a prop to the Sidebar component
          />
        </div>
        <div className="render__active__container">
          {renderActive()}
        </div>
      </div>
    </div>
  )
}

export default Dashboard