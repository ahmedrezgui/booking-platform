import React from "react";

function CollapsedFooter({ toggleFooter }) {

    return (<>
        <footer className={`bg-white text-gray-800  h-12 fixed bottom-0  w-full border-t-[1px] `}>
            <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 relative ">
                <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-7 gap-y-2 flex justify-center  items-center font-thin">
                    <div className="flex justify-center">
                        <p className="text-md  ">© 2024 StayCation, Inc.</p>

                    </div>
                    <div className="flex justify-center">
                        <p className="text-md ">Confidentialité</p>

                    </div>
                    <div className="flex justify-center">
                        <p className="text-md  ">Conditions générales</p>

                    </div>
                    <div className="flex justify-center">
                        <p className="text-md  ">Plan du site</p>

                    </div>
                    <div className="flex justify-center">
                        <p className="text-md ">Fonctionnement du site</p>

                    </div>
                    <div className="flex justify-center">
                        <p className="text-md  ">Infos sur le site</p>

                    </div>
                    <div className=" pt-2">
                        <button
                            onClick={toggleFooter}
                            className={` text-gray-800 p-2 rounded-full  transform rotate-180`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </footer>



    </>)
}

export default CollapsedFooter;