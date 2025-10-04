import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import { useCookies } from 'react-cookie';
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../utils/button";
import Heading from "../utils/heading";
import Input from "../common/input";
import Modal from "../modals/modal";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const [_, setCookies] = useCookies(["access-token"]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async () => {
        const { email, password } = getValues();
        console.log(email, password)

        setIsLoading(true);

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: email,
                password: password,
            })
        })
            .then(res => {
                console.log(res);
                // if (!res.ok) {
                //     throw new Error('Validation failed.');
                // }
                if (!res.ok) {
                    console.log('Error!');
                    throw new Error('Could not authenticate you!');
                }
                return res.json();
            })
            .then(resData => {


                setCookies("access-token", resData.token);
                localStorage.setItem('userId', resData.userId);
                setIsLoading(false);
                setInterval(() => navigate(0));
                toast.success("Logging in", {
                    duration: 5000, iconTheme: {
                        primary: '#BC7FCD',
                    },
                });
                loginModal.onClose();



            })
            .catch(err => {
                alert("Error:" + err);
            });


    };

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subTitle="Login to your account" center />
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
    );

    const footerContent = (
        <div className="flex flex-col gap-3 mt-3">
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
            <div className="mt-4 font-light text-center text-neutral-500">
                <div className="flex items-center justify-center gap-2">
                    <div>First time using Airbnb?</div>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 curssor-pointer hover:underline">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            // footer={footerContent}
        />
    );
};

export default LoginModal;
