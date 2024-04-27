import React from 'react'
import axios from 'axios'
import TrendsCard from './TrendsCard'
import '../styles/TrendsCard.css'

export default function MarketTrends() {
    const [marketTrends, setMarketTrends] = React.useState([])
    const [offset, setOffset] = React.useState(0)
    const apiKey = "579b464db66ec23bdd000001657297c3e368490564dcadf4d7a11ede"

    const getData = async () => {
        try {
            const response = await axios.get(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&offset=${offset}&limit=10`)
            console.log(response.data)
            setMarketTrends(response.data.records)
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        getData()
    }, [offset])

    const handlePrevPage = () => {
        setOffset(prevOffset => prevOffset - 10)
    }

    const handleNextPage = () => {
        setOffset(prevOffset => prevOffset + 10)
    }

    return (
        <div className='marketTrends__main'>
            <h1>Market Trends</h1>

            <div className="marketTrends">
                {marketTrends.map((trend, index) => (
                    <TrendsCard
                        key={index}
                        state={trend.state}
                        district={trend.district}
                        commodity={trend.commodity}
                        minPrice={trend.min_price}
                        maxPrice={trend.max_price}
                        modalPrice={trend.modal_price}
                    />
                ))}
            </div>

            <div className="market_trends_pagination">
                <button onClick={handlePrevPage} disabled={offset === 0} className={offset === 0 ? 'disabled' : ''}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    )
}
