import { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {

    const [TOKEN, SET_TOKEN] = useState(null);

    const POST_USER = async (data) => {

        let response = await fetch('http://localhost:3030/api/users/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        response = response.json();

        return response;

    };

    const AUTHENTICATE_USER = async () => {
        let auth = await fetch('http://localhost:3030/api/users/authenticate', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        auth = await auth.json();
        SET_TOKEN(auth.jwt);
        return auth;
    }

    const LOG_OUT = async () => {
        let auth = await fetch('http://localhost:3030/api/users/logout', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        auth = await auth.json();
        SET_TOKEN(false);
        return auth;
    }

    const userContext = {
        AUTHENTICATE_USER,
        LOG_OUT,
        POST_USER,
        SET_TOKEN,
        TOKEN,
    }

    return <UserContext.Provider value={userContext}>
        {children}
    </UserContext.Provider>
}
export const { UserContextConsumer } = UserContext;