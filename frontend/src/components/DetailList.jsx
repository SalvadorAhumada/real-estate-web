import { useContext, useEffect } from "react";
import { OtherContext } from "../Context/OtherContext";
import { useParams } from "react-router-dom";
import ListUnits from './ListUnits';
import Typography from '@mui/material/Typography';
import OptionsMenu from './Shared/OptionsMenu';
import Loading from "../components/Shared/Loading"
import './DetailList.css';

function DetailList() {
  const { clusterName } = useParams();

  const {
    GET_CLUSTERS,
    GET_CLUSTERS_UNITS,
    CLUSTER_UNITS,
    CLUSTERS,
    IS_LOADING
  } = useContext(OtherContext);

  useEffect(() => {
    if (CLUSTERS.length === 0) GET_CLUSTERS()
  }, [CLUSTERS])

  useEffect(() => {
    if (CLUSTERS.length !== 0) {
      const selectedCluster = CLUSTERS.find(c => c.name === clusterName.toUpperCase());
      GET_CLUSTERS_UNITS(selectedCluster.id)
    }

  }, [CLUSTERS])

  if(IS_LOADING) return <Loading />
  
  const name = CLUSTER_UNITS[0] ? CLUSTER_UNITS[0].cluster.name : '';
  
  return (
    <div className="detail-list">
      <section className="config-wrapper">
        <Typography gutterBottom variant="h1" component="div">
          {name}
        </Typography>
        <OptionsMenu type={'units'} cluster={name}/>
      </section>
      <ListUnits data={CLUSTER_UNITS} />
    </div>
  );
}

export default DetailList;
