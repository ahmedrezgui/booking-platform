import { React, useState } from "react";
import { sendMessage } from "../../services/conversation";



const MessageInput = ({ sendSocket, cookies, conversationId, receiver, sender }) => {

    const [value, setValue] = useState("")

    const send = () => {
        sendSocket({ text: value, conversationId: conversationId, receiver, sender });
        sendMessage(setValue, cookies, { message: value, conversationId, receiverMail: receiver.email });

    }
    return (<>

        <div className="w-3/4">
            <input className="w-full text-sm p-4 border-0 shadow-md rounded-full bg-gray-50 outline-none" placeholder="type a message ..." onChange={(e) => { setValue(e.target.value) }} value={value} />
        </div>

        <div
            onClick={send}
            className={` ml-4 p-2 cursor-pointer bg-gray-50 rounded-full ${!value && 'pointer-events-none'} `}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="26" height="26" viewBox="0 0 24 24" strokeWidth="1" stroke="gray" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 14l11 -11" />
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
        </div>


    </>)
}

export default MessageInput;