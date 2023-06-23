import { createContext, useState } from 'react';

export const FinancialContext = createContext({});

const headers = {
    'Content-Type': 'application/json',
};

const credentials = 'include';

const methods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
}

export const FinancialContextProvider = ({ children }) => {

    const [FINANCIAL_DATA, SET_FINANCIAL_DATA] = useState({});

    const UPDATE_UNITS_FINANCIAL = async (data) => {
        let updatedPlan = await fetch(`http://localhost:3030/api/financials`, {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify(data)
        })

        updatedPlan = await updatedPlan.json();
        SET_FINANCIAL_DATA(updatedPlan);
        return updatedPlan;
    }

    const GET_UNITS_FINANCIAL = async (unitId) => {
        let updatedPlan = await fetch(`http://localhost:3030/api/financials/${unitId}`, {
            method: methods.GET,
            credentials,
            headers
        })

        updatedPlan = await updatedPlan.json();
        SET_FINANCIAL_DATA(updatedPlan);
        return updatedPlan;
    }


    const financialContext = {
        GET_UNITS_FINANCIAL,
        FINANCIAL_DATA,
        UPDATE_UNITS_FINANCIAL,
        SET_FINANCIAL_DATA
    }

    return <FinancialContext.Provider value={financialContext}>
        {children}
    </FinancialContext.Provider>
}
export const { FinancialContextConsumer } = FinancialContext;