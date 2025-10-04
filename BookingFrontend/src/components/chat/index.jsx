import { React, useEffect, useState } from "react";
import MessageInput from "./messageInput";
import io, { Socket } from "socket.io-client";
import Avatar from "../utils/avatar";
import { getConversations, getMessages } from "../../services/conversation";
import { useCookies } from "react-cookie";
import { getUser } from "../../services/user";
import Container from "../utils/container";
import Logo from "../partials/header/logo";
import ListingLogo from "../icons/listing";
import ReservationLogo from "../icons/reservation";
import ProfileLogo from "../icons/profile";
import LogoutLogo from "../icons/logout";
import { useNavigate } from "react-router-dom";
import FavouritesLogo from "../icons/favourites";
import toast from "react-hot-toast";


function Chat() {

    const navigate = useNavigate();
    const [socket, setSocket] = useState();
    const [messages, setMessages] = useState([]);
    const [cookies, setCookies, removeCookie] = useCookies(["access-token"]);
    const [conversations, setConversations] = useState([]);
    const [user, setUser] = useState({});
    const [currentChat, setCurrentChat] = useState(null);


    const logout = () => {


        removeCookie('access-token');
        localStorage.removeItem('userId');
        setInterval(() => navigate('/home'));
        toast.success("Logged out", {
            duration: 2000, iconTheme: {
                primary: '#5e60ce',
            },
        });


    }

    useEffect(() => {
        getUser(cookies, setUser);

    }, [])
    console.log(user.avatar_url);

    const sendSocket = (value) => {
        socket?.emit("sendMessage", value);
    };

    useEffect(() => {
        getConversations(setConversations, cookies);
    }, [messages]);

    const selectConversation = (conversation) => {
        setCurrentChat(conversation)
        setMessages(conversation.messages)
    }

    useEffect(() => {
        setSocket(io("http://localhost:8001"));
    }, [])

    const messageListener = (message) => {
        setMessages([...messages, message]);
    }

    useEffect(() => {
        socket?.emit("join", localStorage.getItem("userId"));
        socket?.on("getUsers", users => { console.log(users); });

        socket?.on("getMessage", message => { messageListener(message); console.log('here') });

        return () => {
            console.log("unregistering...");
            socket?.off('getMessage', messageListener);
        }

    }, [messages, socket, setSocket]);



    return (


        <div className="w-screen h-screen flex">
            <div className="w-1/4 h-full bg-gray-50 ">
                <div className="flex items-center my-4 mx-14">
                    <div className="border border-violet rounded-full p-[2px]"> <Avatar src={user.avatar_url} width={75} height={75} /></div>
                    <div className="ml-6">
                        <h3 className="text-2xl">{user.name}</h3>
                        <p className="text-lg font-light">{user.email}</p>
                    </div>
                </div>
                <hr />


                {
                    conversations.length === 0 ?
                        <div className="mt-8 mx-14 text-gray-200"> You have no conversations </div> :


                        <div className="mx-12 mt-8">
                            <div className="text-violet text-lg">Messages</div>
                            <div className="overflow-y-auto">
                                {conversations.map((conversation) => {

                                    return (
                                        <div key={conversation.id} className="flex items-center py-4 border-b border-b-gray-300"
                                            onClick={() => selectConversation(conversation)}
                                        >
                                            <div className="cursor-pointer flex items-center">
                                                <div> <Avatar src={conversation.members[0].avatar_url} width={55} height={55} /></div>
                                                <div className="ml-4">
                                                    <h3 className="text-lg font-semibold">{conversation.members[0].name}</h3>
                                                    <p className="text-sm font-light">{conversation.members[0].email}</p>
                                                </div>
                                            </div>
                                        </div>)
                                })

                                }
                            </div>
                        </div>
                }

            </div>


            {
                !currentChat ?
                    <div className="w-1/2  h-full py-20 text-center text-2xl text-gray-500 font-semibold  "> select a chat </div> :

                    <div className="w-1/2  h-screen flex flex-col items-center ">
                        <div className="w-3/4 bg-secondary h-[80px] mt-10 mb-2 rounded-full flex items-center px-14 shadow-md">
                            <div className="cursor-pointer"><Avatar src={currentChat.members[0].avatar_url} width={60} height={60} /></div>
                            <div className="ml-6 mr-auto">
                                <h3 className="text-lg"> {currentChat.members[0].name}</h3>
                                <p className="text-sm font-light text-gray-600"> online</p>
                            </div>
                            <div className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                    <path d="M15 9l5 -5" />
                                    <path d="M16 4l4 0l0 4" />
                                </svg>
                            </div>
                        </div>


                        <div className="h-3/4  w-full shadow-sm overflow-y-auto ">
                            <div className="px-6 py-10">

                                {
                                    messages.length === 0 &&
                                    <div className="text-center text-gray-500 "> No messages yet </div>
                                }

                                {
                                    messages.map((message, index) => {
                                        if (message.sender.email === user.email) {
                                            return (
                                                <div key={index} className="h-auto max-w-[300px] w-fit mb-2 bg-violet rounded-b-xl rounded-tl-xl p-2.5 ml-auto text-white text-sm break-words">
                                                    {message.text}
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={index} className="h-auto max-w-[300px] w-fit bg-secondary rounded-b-xl rounded-tr-xl p-2.5 text-sm mb-2 break-words">
                                                    {message.text}
                                                </div>
                                            )
                                        }

                                    })
                                }
                            </div>
                        </div>
                        <div className="p-10 w-full flex items-center justify-center ">
                            <MessageInput sendSocket={sendSocket} cookies={cookies} conversationId={currentChat.id} receiver={{ id: currentChat.members[0].id, name: currentChat.members[0].name, email: currentChat.members[0].email }} sender={{ id: user.id, name: user.name, email: user.email }} />
                        </div>
                    </div>

            }



            <div className="w-1/4 h-full bg-gray-50">
                <div className="flex items-center my-4 mx-14">
                    <div className="rounded-full ">
                        <Logo h={120} w={140} />
                    </div>
                    <div className="ml-4">
                        <div className="text-lg font-normal italic">vacation is better with <span className="text-2xl font-serif text-violet tracking-tight">StayCation</span></div>

                    </div>
                </div>
                <hr />


                <div className="mx-14 mt-8">

                    <div className="flex items-center py-4 border-b border-b-gray-300"
                        onClick={() => navigate('/profile')}
                    >
                        <div className="cursor-pointer flex items-center">
                            <div className="flex ml-4">
                                <ProfileLogo />
                                <h3 className="ml-2 text-base font-medium">My Profile</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center py-4 border-b border-b-gray-300"
                        onClick={() => navigate('/properties')}
                    >
                        <div className="cursor-pointer flex items-center">
                            <div className="flex ml-4">
                                <ListingLogo />
                                <h3 className="ml-2 text-base font-medium">My Listings</h3>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center py-4 border-b border-b-gray-300"
                        onClick={() => navigate('/reservations')}
                    >
                        <div className="cursor-pointer flex items-center">
                            <div className="flex ml-4">
                                <ReservationLogo />
                                <h3 className="ml-2 text-base font-medium">My Reservations</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center py-4 border-b border-b-gray-300"
                        onClick={() => navigate('/favorites')}
                    >
                        <div className="cursor-pointer flex items-center">
                            <div className="flex ml-4">
                                <FavouritesLogo />
                                <h3 className="ml-2 text-base font-medium">My favourites</h3>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center py-4 border-b border-b-gray-300"
                        onClick={logout}
                    >
                        <div className="cursor-pointer flex items-center">
                            <div className="flex ml-4">
                                <LogoutLogo />
                                <h3 className="ml-2 text-base font-medium">Logout</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>


    )

}
export default Chat;