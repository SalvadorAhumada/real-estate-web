import { useContext, useEffect } from "react";
import { OtherContext } from "../Context/OtherContext";
import { useParams } from "react-router-dom";
import ListUnits from './ListUnits';
import {
  Typography,
  Alert,
  Button
} from '@mui/material';
import OptionsMenu from './Shared/OptionsMenu';
import Loading from "../components/Shared/Loading"
import { useSearchParams } from "react-router-dom";
import './DetailList.css';

function DetailList({ navigate }) {

  const { clusterName } = useParams();

  const {
    GET_CLUSTERS,
    GET_CLUSTERS_UNITS,
    CLUSTER_UNITS,
    CLUSTERS,
    IS_LOADING,
    REDIRECT_TO,
    IS_FILTERING,
    SET_IS_FILTERING
  } = useContext(OtherContext);

  let [_searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (CLUSTERS.length === 0) GET_CLUSTERS();
  }, [CLUSTERS])

  useEffect(() => {
    if (CLUSTERS.length !== 0) {
      const selectedCluster = CLUSTERS.find(c => c.name === clusterName.toUpperCase());

      if (!selectedCluster) return REDIRECT_TO('/not-found', navigate);

      GET_CLUSTERS_UNITS(selectedCluster.id)
    }

  }, [CLUSTERS])

  const filterHandler = () => {
    SET_IS_FILTERING(false);
    setSearchParams({});
    const selectedCluster = CLUSTERS.find(c => c.name === clusterName.toUpperCase());
    GET_CLUSTERS_UNITS(selectedCluster.id);
  }

  if (IS_LOADING) return <Loading />

  let clusterData = {};

  if (CLUSTER_UNITS.length === 0) {
    
    clusterData = {id: 0, name: 'SIN RESULTADOS'};

  } else {

    clusterData = { id: CLUSTER_UNITS[0].cluster.id, name: CLUSTER_UNITS[0].cluster.name };
  
  }


  const css = {
    note: { position: 'fixed', bottom: '5px', right: '5px' }
  }

  return (
    <div className="detail-list">
      <section className="config-wrapper">
        <Typography gutterBottom variant="h1" component="div">
          {clusterData.name}
        </Typography>
        <OptionsMenu type={'units'} cluster={clusterData} />
      </section>
      <section style={css.note}>
        {IS_FILTERING ? <Alert
          onClick={filterHandler}
          severity="info"
          action={
            <Button color="inherit" size="small">
              QUITAR FILTROS
            </Button>
          }
        >
        </Alert> : ''}

      </section>
      <ListUnits data={CLUSTER_UNITS} />
    </div>
  );
}

export default DetailList;
