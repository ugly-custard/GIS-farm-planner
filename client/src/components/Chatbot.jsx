import React, { useEffect, useState } from 'react';
import "../styles/ChatBot.css"

function Chatbot() {
    const [chat, setChat] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const [queries, setQueries] = useState([]);
    const [buttonChat, setButtonChat] = useState("")

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ query: chat }),
            });
            const res = await response.json()
            let new_chat = chats
            new_chat.push(chat)
            setQueries(res['queries'])
            new_chat.push(res['response'])
            setChats(new_chat)
            console.log(res)
        } catch (err) {
            console.log(err);
        }

    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const resButtonClick = async (e) => {
        setChat(e.target.value)
        setButtonChat(e.target.value)

    }

    useEffect(() => {
        handleClick()
    }, [buttonChat])



    return (
        <div>

            <button onClick={openModal} className="chat_bot">Chat Bot</button>
            {isModalOpen && (
                <div className="chat_bot_modal">
                    <div className="chat_bot_modal_content">
                        <span className="chat_bot_close" onClick={closeModal}>
                            &times;
                        </span>
                        <div className="chat_bot_chats">
                            {/* Display chats for both users and bots */}
                            {chats && chats.map((message, i) => {
                                return (
                                    <div key={i} style={{ backgroundColor: (i & 1) ? "lightblue" : "lightgreen", borderRadius: "5px", padding: "0.1rem 0.15rem", margin: "0.1rem" }}>
                                        <p>{message}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            {
                                queries && queries.map((q, i) => {

                                    return (
                                        <button key={i} value={q} onClick={resButtonClick} >
                                            {q}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className="chat_bot_input">
                            <input type="text" onChange={(e) => setChat(e.target.value)} className="chat_bot_chat_input" />
                            <button onClick={handleClick} className="chat_bot_submit_button">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;
