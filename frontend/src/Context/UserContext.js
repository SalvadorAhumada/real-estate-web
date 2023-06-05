import { createContext } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {

    const POST_USER = async (fakeData) => {

        let response = await fetch('http://localhost:3030/api/users/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fakeData)
        });

        response = response.json();

        return response;

    };

    const userContext = {
        POST_USER
    }

    return <UserContext.Provider value={userContext}>
        {children}
    </UserContext.Provider>
}
export const { UserContextConsumer } = UserContext;