import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../utils/button";
import Heading from "../utils/heading";
import Input from "../common/input";
import Modal from "../modals/modal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);



    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
        },
    });

    const onSubmit = () => {
        const { name, email, password, phoneNumber } = getValues();

        setIsLoading(true);

        fetch('http://localhost:3000/auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                phoneNumber: phoneNumber,
            })
        })
            .then(res => {
                console.log(res);

                if (!res.ok) {
                    console.log('Error!');
                    throw new Error('Could not authenticate you!');
                }
                return res.json();
            })
            .then(() => {


                toast.success("Successfully registered!", {
                    duration: 5000, iconTheme: {
                        primary: '#BC7FCD',
                    },
                });
                // localStorage.setItem('userId', resData.userId);
                setIsLoading(false);
                registerModal.onClose();
                loginModal.onOpen();



            })
            .catch(err => {
                alert("Error:" + err);
            });


    };


    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subTitle="Create an account" center />
            <div className="flex flex-col md:flex-row  gap-4  ">
                <Input
                    label="Email"
                    id="email"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    type="password"
                    label="Password"
                    id="password"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
            <div className="flex  flex-row gap-4 ">
                <Input
                    label="Name"
                    id="name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    label="Phone number"
                    id="phoneNumber"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>

        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-3 md:mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
            // onClick={() => signIn("google")}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
            // onClick={() => signIn("github")}
            />
            <div className="mt-2 font-light text-center text-neutral-500">
                <div className="flex items-center justify-center gap-2">
                    <div>Already have an account?</div>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 curssor-pointer hover:underline">
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            // footer={footerContent}
        />
    );
};

export default RegisterModal;
