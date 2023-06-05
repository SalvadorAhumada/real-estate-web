import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import './Card.css';

export default function MediaCard() {
  return (
    <Card sx={{ width: 345, borderRadius: 0 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/img/placeholder.jpg"
        title="Cluster"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Nombre
        </Typography>
        <Typography variant="body2" color="text.secondary">
            TABLE DE UNIDADES
        </Typography>
      </CardContent>
      <CardActions>
        <Button>
            <ReadMoreIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}