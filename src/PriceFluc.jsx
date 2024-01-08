import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PriceFluctuation = () => {
    const [data, setData] = useState(null);

    //need fao and cgi / graphs could also be made

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api', {
                    
                });

                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {data ? (
                data.map((item) => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{item.price}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PriceFluctuation;