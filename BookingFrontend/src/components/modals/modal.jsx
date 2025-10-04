import React from "react";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../utils/button";

function Modal({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);



    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);

        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }
    return (
        <>
            {/* {showModal && (
                <div
                    onClick={ onClose}
                    className="bg-black bg-opacity-40 -z-10 inset-0 fixed"
                ></div>
            )} */}



            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden   overflow-y-hidden outline-none focus:outline-none bg-neutral-800/70">
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <div className="relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto ">
                    {/* CONTENT */}
                    <div
                        className={`translate duration-300 h-full ${showModal ? "translate-y-0" : "translate-y-full"
                            } ${showModal ? "opacity-100" : "opacity-0"}`}>
                        <div className="relative flex flex-col w-full h-full bg-white border-0 rounded-lg shadow-lg outline-none translate lg:h-auto md:h-auto focus:outline-none">
                            {/* HEADER */}
                            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                                <button
                                    onClick={handleClose}
                                    className="absolute p-1 transition border-0 hover:opacity-70 right-9">
                                    <IoMdClose size={18} />
                                </button>
                                <div className="text-lg font-semibold">{title}</div>
                            </div>
                            {/* BODY */}
                            <div className="relative flex-auto px-6 py-2">{body}</div>
                            {/* FOOTER */}
                            <div className="flex flex-col gap-2 px-6 pt-2 pb-6">
                                <div className="flex flex-row items-center w-full gap-4">
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondaryActionLabel}
                                            onClick={handleSecondaryAction}
                                        />
                                    )}

                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
                {/* </form> */}
            </div>

        </>)
}

export default Modal;