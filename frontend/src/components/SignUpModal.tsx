import { useForm } from "react-hook-form";
import { UserModel } from "../models/UserModel";
import { SignUpCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import StyleUtils from "../assets/styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_error";

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: UserModel) => void,
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await UsersApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.log(error);
        }
    }

    return (

        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        className={StyleUtils.width100}
                        disabled={isSubmitting}>
                        Sign up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default SignUpModal;