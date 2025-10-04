import React, { useCallback, useState, useEffect } from "react";
import useRentModal from "../../../hooks/useRentModal";
import useLoginModal from "../../../hooks/useLoginModal";
import useRegisterModal from "../../../hooks/useRegisterModal";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../../utils/avatar";
import MenuItem from "./menuItem";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../services/user";
import Notifications from "./notification";




function UserMenu() {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [cookie, , removeCookie] = useCookies(['access-token']);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    useEffect(() => {
        getUser(cookie, setUser);
    }, [cookie])

    useEffect(() => {
        if (cookie['access-token']) {
            setIsLogged(true)
        }
    }, [cookie]);

    const onRent = useCallback(() => {
        if (!isLogged) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    }, [isLogged, loginModal, rentModal]);

    const logout = () => {
        removeCookie('access-token');
        navigate(0);
    }

    return (
        <>

            <div className="relative">
                <div className="flex flex-row items-center gap-3">
                    <div
                        onClick={onRent}
                        className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100">
                        Rent your home
                    </div>

                    {isLogged ? <Notifications /> : null
                    }

                    <div
                        onClick={toggleOpen}
                        className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                        <AiOutlineMenu />
                        <div className="hidden md:block">
                            <Avatar src={user.avatar_url} width={30} height={30} />
                        </div>
                    </div>

                </div>
                {isOpen && (
                    <>

                        <div className="absolute rounded-xl filter drop-shadow-xl w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                            <div className="flex flex-col cursor-pointer inset-0 z-50">
                                {isLogged ? (
                                    <>
                                        <MenuItem
                                            onClick={() => navigate("/profile")}
                                            label="My Profile"
                                        />
                                        <MenuItem
                                            onClick={() => navigate("/chat")}
                                            label="My messages"
                                        />
                                        <MenuItem
                                            onClick={() => navigate("/favorites")}
                                            label="My favorites"
                                        />
                                        <MenuItem
                                            onClick={() => navigate("/reservations")}
                                            label="My reservations"
                                        />
                                        <MenuItem
                                            onClick={() => navigate("/properties")}
                                            label="My properties"
                                        />
                                        <hr />
                                        <MenuItem
                                            onClick={() => logout()}
                                            label="Logout" />
                                    </>
                                ) : (
                                    <>
                                        <MenuItem
                                            onClick={loginModal.onOpen}
                                            label="Login" />
                                        <MenuItem
                                            onClick={registerModal.onOpen}
                                            label="Sign up" />
                                    </>
                                )}
                            </div>
                        </div>


                    </>
                )}
            </div>
            {isOpen && (<div
                className="fixed  inset-0 -z-10 "
                onClick={toggleOpen}
            ></div>)}




        </>

    );
};

export default UserMenu;
