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

/*     const GET_FINANCIAL_UNIT = async (clusterId) => {
        let units = await fetch(`http://localhost:3030/api/clusters/${clusterId}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        units = await units.json();
        SET_CLUSTER_UNITS(units);
        return units;
    } */

    const UPDATE_UNITS_FINANCIAL = async (data) => {
        let updatedPlan =  await fetch(`http://localhost:3030/api/financials`, {
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
        let updatedPlan =  await fetch(`http://localhost:3030/api/financials/${unitId}`, {
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
        UPDATE_UNITS_FINANCIAL
    }

    return <FinancialContext.Provider value={financialContext}>
        {children}
    </FinancialContext.Provider>
}
export const { FinancialContextConsumer } = FinancialContext;