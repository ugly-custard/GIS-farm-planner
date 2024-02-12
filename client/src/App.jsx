import { useState } from 'react'
import './App.css'
import Map from './components/Map'
import PriceIndexChart from './components/Chart'
import Signin from './pages/signin'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
