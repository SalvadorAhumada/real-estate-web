import { createContext } from 'react';

export const OtherContext = createContext({});

export const OtherContextProvider = ({ children }) => {

    const REDIRECT_TO = (url, navigate) => {
        navigate(url, { replace: true });
    }

    const userContext = {
        REDIRECT_TO
    }

    return <OtherContext.Provider value={userContext}>
        {children}
    </OtherContext.Provider>
}
export const { OtherContextConsumer } = OtherContext;