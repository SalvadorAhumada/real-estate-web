import { createContext, useState } from 'react';
import { hostUrl }  from './index';

export const OtherContext = createContext({});

const headers = {
    'Content-Type': 'application/json',
};

const credentials = 'include';

const methods = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE'
};

export const OtherContextProvider = ({ children }) => {

    const [CLUSTERS, SET_CLUSTERS] = useState([]);

    const [IS_LOADING, SET_IS_LOADING] = useState(true);

    const [IS_UPDATING, SET_IS_UPDATING] = useState(false);

    const [POPUP_DATA, SET_POPUP_DATA] = useState({
        title: '',
        body: '',
        type: ''
    })

    const [SNACK, SET_SNACK] = useState({
        value: null,
        message: '',
        severity: null
    });

    const [IS_FILTERING, SET_IS_FILTERING] = useState(false);

    const [CLUSTER_UNITS, SET_CLUSTER_UNITS] = useState([]);

    const FORMAT_CURRENCY = (amount) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

    const FORMAT_DATE = (date) => new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const CURRENT_DATE = new Date().toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });

    const GET_CLUSTERS_UNITS = async (clusterId) => {
        let units = await fetch(`${hostUrl}/api/clusters/${clusterId}`, {
            method: methods.GET,
            credentials,
            headers,
        });
        units = await units.json();
        SET_CLUSTER_UNITS(units);
        SET_IS_LOADING(false);
        return units;
    }

    const GET_CLUSTERS = async () => {
        let clusters = await fetch(`${hostUrl}/api/clusters/`, {
            method: methods.GET,
            credentials,
            headers,
        });
        clusters = await clusters.json();
        SET_CLUSTERS(clusters.clusters);
        return clusters;
    }

    const REDIRECT_TO = (url, navigate) => navigate(url, { replace: true });

    const GENERATE_PDF_PAYMENTS = async (payments, unit) => {
        let pdf = await fetch(`${hostUrl}/api/pdf-creator/payments/`, {
            method: methods.POST,
            credentials,
            headers,
            body: JSON.stringify({payments, unit})
        });
        pdf = await pdf.blob();
        return pdf;
    }

    const otherContext = {
        CLUSTERS,
        CLUSTER_UNITS,
        FORMAT_CURRENCY,
        GET_CLUSTERS,
        GET_CLUSTERS_UNITS,
        REDIRECT_TO,
        SNACK,
        SET_SNACK,
        POPUP_DATA,
        SET_POPUP_DATA,
        CURRENT_DATE,
        IS_LOADING,
        FORMAT_DATE,
        SET_IS_LOADING,
        IS_UPDATING, 
        SET_IS_UPDATING,
        GENERATE_PDF_PAYMENTS,
        SET_CLUSTER_UNITS,
        IS_FILTERING, 
        SET_IS_FILTERING
    }

    return <OtherContext.Provider value={otherContext}>
        {children}
    </OtherContext.Provider>
}
export const { OtherContextConsumer } = OtherContext;