import { createContext, useState } from 'react';

export const OtherContext = createContext({});

export const OtherContextProvider = ({ children }) => {
    // TOKEN is NULL at init, STRING at authenticated FALSE at not authenticated
    const [TOKEN, SET_TOKEN] = useState(null);

    const [CLUSTERS, SET_CLUSTERS] = useState([]);

    const [CLUSTER_UNITS, SET_CLUSTER_UNITS] = useState([]);

    const GET_CLUSTERS_UNITS = async (clusterId) => {
        let units = await fetch(`http://localhost:3030/api/units/cluster/${clusterId}`, {
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
        let clusters = await fetch('http://localhost:3030/api/units/clusters', {
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

    const LOG_OUT = async () => {
        let auth = await fetch('http://localhost:3030/api/users/logout', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        auth = await auth.json();
        SET_TOKEN('');
        return auth;
    }

    const AUTHENTICATE_USER = async () => {
        let auth = await fetch('http://localhost:3030/api/users/authenticate', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        auth = await auth.json();
        SET_TOKEN(auth.jwt);
        return auth;
    }

    const REDIRECT_TO = (url, navigate) => {
        navigate(url, { replace: true });
    }

    const otherContext = {
        AUTHENTICATE_USER,
        REDIRECT_TO,
        SET_TOKEN,
        TOKEN,
        LOG_OUT,
        CLUSTERS,
        GET_CLUSTERS,
        GET_CLUSTERS_UNITS,
        CLUSTER_UNITS
    }

    return <OtherContext.Provider value={otherContext}>
        {children}
    </OtherContext.Provider>
}
export const { OtherContextConsumer } = OtherContext;