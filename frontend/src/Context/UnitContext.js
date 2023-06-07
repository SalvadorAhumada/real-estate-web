import { createContext, useState } from 'react';

export const UnitContext = createContext({});

export const UnitContextProvider = ({ children }) => {

    const [TOTAL_COUNT, SET_TOTAL_COUNT] = useState([]);

    const [AVAILABLE_STATUS, SET_AVAILABLE_STATUS] = useState({});

    const [SELECTED_UNIT, SET_SELECTED_UNIT] = useState({});

    const GET_AVAILABLE_STATUS = async () => {
        let status = await fetch('http://localhost:3030/api/units/status', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        status = await status.json();
        SET_AVAILABLE_STATUS(status.data);
        return status;
    }

    const GET_COUNT = async () => {
        let units = await fetch('http://localhost:3030/api/clusters/count', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        units = await units.json();
        GET_AVAILABLE_STATUS();
        SET_TOTAL_COUNT(units.data);
        return units;
    }

    const UPDATE_STATUS = async (data) => {
        let updatedUnit = await fetch('http://localhost:3030/api/units/update_status', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        updatedUnit = await updatedUnit.json();
        return updatedUnit;
    }

    const UPDATE_USER = async (data) => {
        let updatedUser = await fetch('http://localhost:3030/api/units/update_user', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        updatedUser = await updatedUser.json();
        return updatedUser;
    }

    const userContext = {
        GET_AVAILABLE_STATUS,
        GET_COUNT,
        TOTAL_COUNT,
        SET_SELECTED_UNIT,
        SELECTED_UNIT,
        AVAILABLE_STATUS,
        UPDATE_STATUS,
        UPDATE_USER
    }

    return <UnitContext.Provider value={userContext}>
        {children}
    </UnitContext.Provider>
}
export const { UnitContextConsumer } = UnitContext;