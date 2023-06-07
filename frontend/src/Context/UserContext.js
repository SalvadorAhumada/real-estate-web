import { createContext, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {

    const [TOKEN, SET_TOKEN] = useState(null);

    const [EXECUTIVES, SET_EXECUTIVES] = useState([]);

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

    const GET_EXECUTIVES = async () => {
        let executives = await fetch('http://localhost:3030/api/users/all_users', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        executives = await executives.json();
        SET_EXECUTIVES(executives.data);
        return executives;
    }

    const userContext = {
        AUTHENTICATE_USER,
        LOG_OUT,
        POST_USER,
        SET_TOKEN,
        TOKEN,
        GET_EXECUTIVES,
        EXECUTIVES
    }

    return <UserContext.Provider value={userContext}>
        {children}
    </UserContext.Provider>
}
export const { UserContextConsumer } = UserContext;