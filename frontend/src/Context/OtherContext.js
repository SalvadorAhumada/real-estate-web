import { createContext, useState } from 'react';

export const OtherContext = createContext({});

export const OtherContextProvider = ({ children }) => {

    const [CLUSTERS, SET_CLUSTERS] = useState([]);

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

    const FORMAT_CURRENCY = (amount) => {
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
    }

    const GET_CLUSTERS_UNITS = async (clusterId) => {
        let units = await fetch(`http://localhost:3030/api/clusters/${clusterId}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        units = await units.json();
        SET_CLUSTER_UNITS(units.units);
        return units;
    }

    const GET_CLUSTERS = async () => {
        let clusters = await fetch('http://localhost:3030/api/clusters/', {
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

    const REDIRECT_TO = (url, navigate) => {
        navigate(url, { replace: true });
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
        SET_POPUP_DATA
    }

    return <OtherContext.Provider value={otherContext}>
        {children}
    </OtherContext.Provider>
}
export const { OtherContextConsumer } = OtherContext;