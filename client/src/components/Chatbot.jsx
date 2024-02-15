import React, { useState } from 'react';
import "../styles/ChatBot.css"

function Chatbot() {
    const [chat, setChat] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chats, setChats] = useState([]);

    const handleClick = () => {
        try {
            const res = fetch('http://localhost:5000/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ chat }),
            });
            setChats(res);
        } catch (err) {
            console.log(err);
        }
        console.log(chat);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="chat_bot_chats">
                {/* Display chats for both users and bots */}
                {chats.map((message, index) => (
                    <div key={index} className={message.isBot ? "chat_bot_message chat_bot_message_bot" : "chat_bot_message Chat_bot_message_user"}>
                        {message.text}
                    </div>
                ))}
            </div>
            <button onClick={openModal} className="chat_bot">Chat Bot</button>
            {isModalOpen && (
                <div className="chat_bot_modal">
                    <div className="chat_bot_modal_content">
                        <span className="chat_bot_close" onClick={closeModal}>
                            &times;
                        </span>
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
