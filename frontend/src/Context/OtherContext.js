import { createContext, useState } from 'react';
import { hostUrl }  from './index';

export const OtherContext = createContext({});

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

    const [CLUSTER_UNITS, SET_CLUSTER_UNITS] = useState([]);

    const FORMAT_CURRENCY = (amount) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

    const FORMAT_DATE = (date) => new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const CURRENT_DATE = new Date().toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });

    const GET_CLUSTERS_UNITS = async (clusterId) => {
        let units = await fetch(`${hostUrl}/api/clusters/${clusterId}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        units = await units.json();
        SET_CLUSTER_UNITS(units);
        SET_IS_LOADING(false);
        return units;
    }

    const GET_CLUSTERS = async () => {
        let clusters = await fetch(`${hostUrl}/api/clusters/`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        clusters = await clusters.json();
        SET_CLUSTERS(clusters.clusters);
        return clusters;
    }

    const REDIRECT_TO = (url, navigate) => navigate(url, { replace: true });

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
        SET_IS_UPDATING
    }

    return <OtherContext.Provider value={otherContext}>
        {children}
    </OtherContext.Provider>
}
export const { OtherContextConsumer } = OtherContext;