import axios from 'axios';

export const getConversations = async (setConversations, cookies) => {
    axios.get(`http://localhost:3000/conversations/current`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies["access-token"]}`,
        },
        withCredentials: true,
    }).then(response => response.data)
        .then(data => { setConversations(data); })
        .catch(err => console.log(err))
}



export const sendMessage = async (setValue, cookies, data) => {
    fetch(`http://localhost:3000/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies["access-token"]}`,
        },
        credentials: "include",
        body: JSON.stringify({
            conversationId: data.conversationId,
            receiverMail: data.receiverMail,
            message: data.message,
        })
    }).then(response => response.json())
        .then(data => { console.log(data); setValue(''); })
        .catch(err => console.log(err))
}


// export const getMessages = async (setMessages, cookies, conversationId) => {
//     axios.get(`http://localhost:3000/messages/${conversationId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${cookies["access-token"]}`,
//         },
//         withCredentials: true,
//     }).then(response => response.data)
//         .then(data => { setMessages(data); console.log(data); })
//         .catch(err => console.log(err))
// }