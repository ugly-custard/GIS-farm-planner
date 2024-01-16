import { useState } from 'react'
import './App.css'
import Map from './Map'
import PriceIndexChart from './Chart'

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
