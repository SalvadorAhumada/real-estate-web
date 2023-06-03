import { createContext } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {

    const POST_USER = async () => {

        const fakeData = {
            email: "chavador90@gmail.com",
            password: "123123"
        }
        /*http://localhost:3030/api/users/signup */
        return fetch('http://localhost:3030/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fakeData)
        });

    };

    const userContext = {
        POST_USER
    }

    return <UserContext.Provider value={userContext}>
        {children}
    </UserContext.Provider>
}
export const { UserContextConsumer } = UserContext;