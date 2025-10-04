import Bell from "../../icons/bell";
import { useState, useCallback } from "react";

function Notifications() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    return (
        <>

            <div className="relative">

                <div
                    onClick={toggleOpen}
                    className=" p-2 rounded-full cursor-pointer md:block hover:bg-neutral-100 mr-2">
                    <Bell />
                </div>

                {isOpen && (
                    <>

                        <div className="absolute rounded-xl filter drop-shadow-xl w-[400px]  bg-white overflow-y-auto right-0 top-12 text-sm">
                            <div className="flex flex-col cursor-pointer inset-0 z-50">
                                <div className="flex flex-row items-center justify-between p-4 border-b-[1px]">
                                    <div className="text-lg font-semibold">Notifications</div>
                                </div>
                                <div className="flex flex-col p-4 gap-4">
                                    <div className="flex flex-row items-center gap-3">

                                        <div className="flex flex-col">
                                            <div className="text-sm font-semibold">New booking request</div>
                                            <div className="text-xs text-neutral-500">You have a new booking request</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <div className="flex flex-col">
                                            <div className="text-sm font-semibold">New booking request</div>
                                            <div className="text-xs text-neutral-500">You have a new booking request</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <div className="flex flex-col">
                                            <div className="text-sm font-semibold">New booking request</div>
                                            <div className="text-xs text-neutral-500">You have a new booking request</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </>
                )}
            </div>
            {isOpen && (<div
                className="fixed  inset-0 -z-10 "
                onClick={toggleOpen}
            ></div>)}

        </>)
}

export default Notifications;