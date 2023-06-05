import { createContext, useEffect, useState } from 'react';

export const OtherContext = createContext({});

export const OtherContextProvider = ({ children }) => {

    const [TOKEN, SET_TOKEN] = useState('');

    const IS_AUTH = async () => {
        let auth = await fetch('http://localhost:3030/api/users/authenticate', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        auth = await auth.json();
        return auth;
    }

    const REDIRECT_TO = (url, navigate) => {
        navigate(url, { replace: true });
    }
    
    const IS_LOGGED = TOKEN != '';

    const otherContext = {
        IS_AUTH,
        IS_LOGGED,
        REDIRECT_TO,
        SET_TOKEN,
        TOKEN,
    }

    return <OtherContext.Provider value={otherContext}>
        {children}
    </OtherContext.Provider>
}
export const { OtherContextConsumer } = OtherContext;