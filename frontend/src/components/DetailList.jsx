import { useContext, useEffect } from "react";
import { OtherContext } from "../Context/OtherContext";
import { useParams } from "react-router-dom";

function DetailList() {

  const { clusterName } = useParams();

  console.log(clusterName);

  const {
    GET_CLUSTERS,
    GET_CLUSTERS_UNITS,
    CLUSTER_UNITS
  } = useContext(OtherContext);

  useEffect(()=> {
    GET_CLUSTERS().then(({ clusters }) => {
      const selectedCluster = clusters.find(c => c.name === clusterName.toUpperCase());
      GET_CLUSTERS_UNITS(selectedCluster.id)
    })
  },[])

  console.log(CLUSTER_UNITS);

  return (
    <div className="detail-list">
        <p>Yay! detail list</p>
        {JSON.stringify(CLUSTER_UNITS)}
    </div>
  );
}

export default DetailList;
