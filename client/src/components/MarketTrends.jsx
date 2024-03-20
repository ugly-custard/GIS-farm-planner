import React from 'react'
import axios from 'axios'

export default function MarketTrends() {

    const apiKey = "579b464db66ec23bdd000001657297c3e368490564dcadf4d7a11ede"

    const getData = async () => {
        try {
            const response = await axios.get(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json`)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <div></div>
    )
}
