import { createContext, useState } from 'react';

export const UserContext = createContext({});

const headers = {
    'Content-Type': 'application/json',
};

const credentials = 'include';

const methods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
}

export const UserContextProvider = ({ children }) => {

    const [TOKEN, SET_TOKEN] = useState(null);

    const [EXECUTIVES, SET_EXECUTIVES] = useState([]);

    const [USERS, SET_USERS] = useState([]);

    const [CURRENT_USER, SET_CURRENT_USER] = useState({});

    const POST_USER = async (data) => {

        let response = await fetch('http://localhost:3030/api/users/login', {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify(data)
        });

        response = await response.json();
        
        if(response.session && response.session.user) {
            SET_CURRENT_USER(response.session.user);
        }
        return response;

    };

    const AUTHENTICATE_USER = async () => {
        let auth = await fetch('http://localhost:3030/api/users/authenticate', {
            method: methods.POST,
            credentials,
            headers
        });
        auth = await auth.json();
        if(auth.jwt) {
            SET_TOKEN(auth.jwt);
            SET_CURRENT_USER(auth.session.user)
        }
        return auth;
    }

    const LOG_OUT = async () => {
        let auth = await fetch('http://localhost:3030/api/users/logout', {
            method: methods.POST,
            credentials,
            headers
        });
        auth = await auth.json();
        SET_TOKEN(false);
        return auth;
    }

    const GET_EXECUTIVES = async () => {
        let executives = await fetch('http://localhost:3030/api/users/', {
            method: methods.GET,
            credentials,
            headers
        });
        executives = await executives.json();
        SET_EXECUTIVES(executives);
        return executives;
    }

    const GET_USERS = async () => {
        let customers = await fetch('http://localhost:3030/api/customers/', {
            method: methods.GET,
            credentials,
            headers
        });
        customers = await customers.json();
        SET_USERS(customers);
        return customers;
    }

    const UPDATE_USER = async (data) => {
        let updatedUser = await fetch('http://localhost:3030/api/users/update', {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify(data)
        });

        updatedUser = await updatedUser.json();
        return updatedUser;
    }

    const DELETE_EXECUTIVE = async (data) => {
        let deletedExec = await fetch('http://localhost:3030/api/users/delete_user', {
            method: methods.DELETE,
            credentials,
            headers,
            body: JSON.stringify(data)
        });

        deletedExec = await deletedExec.json();
        return deletedExec;
    }

    const CREATE_EXECUTIVE = async(data) => {
        let newExecutive = await fetch('http://localhost:3030/api/users/signup', {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify(data)
        })

        newExecutive = await newExecutive.json();
        return newExecutive;
    }

    const userContext = {
        AUTHENTICATE_USER,
        LOG_OUT,
        POST_USER,
        SET_TOKEN,
        TOKEN,
        GET_EXECUTIVES,
        EXECUTIVES,
        GET_USERS,
        USERS,
        UPDATE_USER,
        DELETE_EXECUTIVE,
        CURRENT_USER,
        CREATE_EXECUTIVE
    }

    return <UserContext.Provider value={userContext}>
        {children}
    </UserContext.Provider>
}
export const { UserContextConsumer } = UserContext;