import React from 'react'

function Chatbot() {
    const [chat, setChat] = React.useState([])

    const handleClick = () => {
        // try{
        //     fetch('http://localhost:5000/chatbot', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({chat})
        //     })
        // }catch(err){
        //     console.log(err)
        // }
        console.log(chat)
    }

   
  return (
    <div>
        <input type="text" onChange={(e) => setChat(e.target.value)}/>
        <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default Chatbot