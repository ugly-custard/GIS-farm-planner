import React from 'react'
import '../styles/Dashboard.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import YeildPredictor from '../components/YeildPredictor'

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
      onclick: () => setActive('Dashboard')
    },
    {
      label: 'Yeild Predictor',
      onclick: () => setActive('Yeild Predictor')
    },
    {
      label: 'Disease Pedictor',
      onclick: () => setActive('Disease Pedictor')
    },
    {
      label: 'Crop Recommendation',
      onclick: () => setActive('Crop Recommendation')
    },
    {
      label: 'Fertilizer Recommendation',
      onclick: () => setActive('Fertilizer Recommendation')
    },
    {
      label: 'Market Trends',
      onclick: () => setActive('Market Trends')
    },
    {
      label: 'Settings',
      onclick: () => setActive('Settings')
    }
  ]

  const renderActive = () => {
    switch (active) {
      case 'Dashboard':
        return <Map />
      case 'Yeild Predictor':
        return <YeildPredictor />
      case 'Disease Pedictor':
        return <h1>Disease Pedictor</h1>
      case 'Crop Recommendation':
        return <h1>Crop Recommendation</h1>
      case 'Fertilizer Recommendation':
        return <h1>Fertilizer Recommendation</h1>
      case 'Market Trends':
        return <h1>Market Trends</h1>
      case 'Settings':
        return <h1>Settings</h1>
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