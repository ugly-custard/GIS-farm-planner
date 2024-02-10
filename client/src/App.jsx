import { useState } from 'react'
import './App.css'
import Map from './components/Map'
import PriceIndexChart from './components/Chart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Map />
    <PriceIndexChart />
    </>
  )
}

export default App
