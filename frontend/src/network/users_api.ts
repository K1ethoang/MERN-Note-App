import { Response } from 'express';
import { UserModel } from "../models/UserModel";
import { fetchData } from "./notes_api";

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function getLoggedInUser(): Promise<UserModel> {
    const response = await fetchData("/api/users/", { method: "GET" });
    return response.json();
}

export async function signUp(credentials: SignUpCredentials): Promise<UserModel> {
    const response = await fetchData("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function logIn(credential: LoginCredentials): Promise<UserModel> {
    const response = await fetchData("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    });
    return response.json();
}

export async function logout() {
    await fetchData("api/users/logout", { method: "POST", });
}