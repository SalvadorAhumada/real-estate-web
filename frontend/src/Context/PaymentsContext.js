import { createContext, useState } from 'react';
import { hostUrl }  from './index';

export const PaymentsContext = createContext({});

const headers = {
    'Content-Type': 'application/json',
};

const credentials = 'include';

const methods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
}

export const PaymentsContextProvider = ({ children }) => {

    const [UNIT_PAYMENTS, SET_UNIT_PAYMENTS] = useState([]);

    const ADD_PAYMENT = async (data) => {
        let payment = await fetch(`${hostUrl}/api/payments/add_payment`, {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify(data)
        })

        payment = await payment.json();
        return payment;
    }

    const GET_UNIT_PAYMENTS = async (financialId) => {
        let payments = await fetch(`${hostUrl}/api/payments/${financialId}`, {
            method: methods.GET,
            credentials,
            headers
        })

        payments = await payments.json();
        SET_UNIT_PAYMENTS(payments);
        return payments;
    }

    const REMOVE_PAYMENT = async (data) => {
        let payment = await fetch(`${hostUrl}/api/payments/delete_payment/`, {
            method: methods.DELETE,
            credentials,
            headers,
            body: JSON.stringify(data)
        })

        payment = await payment.json();
        return payment;
    }

    const UPDATE_PAYMENT = async (data) => {
        let updatedPayment = await fetch(`${hostUrl}/api/payments/update_payment/`, {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify(data)
        })

        updatedPayment = await updatedPayment.json();
        return updatedPayment;
    }


    const paymentsContext = {
        ADD_PAYMENT,
        GET_UNIT_PAYMENTS,
        UNIT_PAYMENTS,
        SET_UNIT_PAYMENTS,
        REMOVE_PAYMENT,
        UPDATE_PAYMENT
    }

    return <PaymentsContext.Provider value={paymentsContext}>
        {children}
    </PaymentsContext.Provider>
}
export const { PaymentsContextConsumer } = PaymentsContext;