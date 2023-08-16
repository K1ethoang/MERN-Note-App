import { useForm } from "react-hook-form";
import { UserModel } from "../models/UserModel";
import { LoginCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import StyleUtils from "../assets/styles/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_error";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: UserModel) => void,
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await UsersApi.logIn(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
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
                <Modal.Title>Login</Modal.Title>
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
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
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
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;