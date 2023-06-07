import { useContext, useEffect } from "react";
import { OtherContext } from "../Context/OtherContext";
import { useParams } from "react-router-dom";
import ListUnits from './ListUnits';
import Typography from '@mui/material/Typography';

function DetailList() {

  const { clusterName } = useParams();

  const {
    GET_CLUSTERS,
    GET_CLUSTERS_UNITS,
    CLUSTER_UNITS,
    CLUSTERS
  } = useContext(OtherContext);

  useEffect(() => {
    GET_CLUSTERS()
  }, [])

  useEffect(() => {

    if (CLUSTERS.length !== 0) {
      const selectedCluster = CLUSTERS.find(c => c.name === clusterName.toUpperCase());
      GET_CLUSTERS_UNITS(selectedCluster.id)
    }

  }, [CLUSTERS])

  const name = CLUSTER_UNITS[0] ? CLUSTER_UNITS[0].cluster.name : '';

  return (
    <div className="detail-list">
      <Typography gutterBottom variant="h1" component="div">
        {name}
      </Typography>
      <ListUnits data={CLUSTER_UNITS} />
    </div>
  );
}

export default DetailList;
