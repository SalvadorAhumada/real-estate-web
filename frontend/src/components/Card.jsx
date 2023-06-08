import { useContext } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TableShell from './Shared/TableShell';
import './Card.css';
import { OtherContext } from "../Context/OtherContext";

export default function MediaCard({ cluster, navigate }) {

  const {
    REDIRECT_TO,
  } = useContext(OtherContext);

  const dataHandler = (data) => {
    const result = {...data};
    delete result.id;
    delete result.name;
    return result;  
  }

  const selectClusterHandler = () => {
    REDIRECT_TO(`/main/detail/${cluster.name.toLowerCase()}`, navigate);
  }

  return (
    <Card className="card-modifier"onClick={selectClusterHandler}>
      <CardMedia
        sx={{ height: 140 }}
        image="/img/placeholder.jpg"
        title="Cluster"
      />
      <CardContent sx={{ padding:0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {cluster.name}
        </Typography>
        <TableShell data={cluster} dataHandler={dataHandler}/>
      </CardContent>
    </Card>
  );
}