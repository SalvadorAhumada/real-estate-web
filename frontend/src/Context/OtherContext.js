import { createContext, useState } from 'react';

export const OtherContext = createContext({});

export const OtherContextProvider = ({ children }) => {
    // TOKEN is NULL at init, STRING at authenticated FALSE at not authenticated
    const [TOKEN, SET_TOKEN] = useState(null);

    const LOG_OUT = async () => {
        let auth = await fetch('http://localhost:3030/api/users/logout', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        auth = await auth.json();
        SET_TOKEN('');
        return auth;
    }

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

    const REDIRECT_TO = (url, navigate) => {
        navigate(url, { replace: true });
    }
    
    const IS_LOGGED = TOKEN != '';

    const otherContext = {
        AUTHENTICATE_USER,
        IS_LOGGED,
        REDIRECT_TO,
        SET_TOKEN,
        TOKEN,
        LOG_OUT
    }

    return <OtherContext.Provider value={otherContext}>
        {children}
    </OtherContext.Provider>
}
export const { OtherContextConsumer } = OtherContext;