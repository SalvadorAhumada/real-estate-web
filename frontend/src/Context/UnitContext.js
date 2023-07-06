import { createContext, useState } from 'react';
import { hostUrl }  from './index';

const headers = {
    'Content-Type': 'application/json',
};

const credentials = 'include';

const methods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
};

export const UnitContext = createContext({});

export const UnitContextProvider = ({ children }) => {

    const [TOTAL_COUNT, SET_TOTAL_COUNT] = useState([]);

    const [AVAILABLE_STATUS, SET_AVAILABLE_STATUS] = useState([]);

    const [SELECTED_UNIT, SET_SELECTED_UNIT] = useState({});

    const GET_AVAILABLE_STATUS = async () => {
        let status = await fetch(`${hostUrl}/api/units/status`, {
            method: methods.GET,
            credentials,
            headers
        });
        status = await status.json();
        SET_AVAILABLE_STATUS(status.data);
        return status;
    }

    const GET_COUNT = async () => {
        let units = await fetch(`${hostUrl}/api/clusters/count`, {
            method: methods.GET,
            credentials,
            headers
        });
        units = await units.json();
        GET_AVAILABLE_STATUS();
        SET_TOTAL_COUNT(units.data);
        return units;
    }

    const UPDATE_STATUS = async (data) => {
        let updatedUnit = await fetch(`${hostUrl}/api/units/update_status`, {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify(data)
        });
        updatedUnit = await updatedUnit.json();
        return updatedUnit;
    }

    const UPDATE_USER = async (data) => {
        let updatedUser = await fetch(`${hostUrl}/api/units/update_user`, {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify(data)
        });
        updatedUser = await updatedUser.json();
        return updatedUser;
    }

    const UPDATE_CUSTOMER = async (data) => {
        let updatedCustomer = await fetch(`${hostUrl}/api/units/update_customer`, {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify(data)
        });
        updatedCustomer = await updatedCustomer.json();
        return updatedCustomer;
    }

    const FILTER_UNITS = async(params) => {
        let filter = await fetch(`${hostUrl}/api/units/cluster?${params}`, {
            method: methods.GET,
            credentials,
            headers
        });
        filter = await filter.json();
        return filter;
    }

    const userContext = {
        GET_AVAILABLE_STATUS,
        GET_COUNT,
        TOTAL_COUNT,
        SET_SELECTED_UNIT,
        SELECTED_UNIT,
        AVAILABLE_STATUS,
        UPDATE_STATUS,
        UPDATE_USER,
        UPDATE_CUSTOMER,
        FILTER_UNITS
    }

    return <UnitContext.Provider value={userContext}>
        {children}
    </UnitContext.Provider>
}
export const { UnitContextConsumer } = UnitContext;