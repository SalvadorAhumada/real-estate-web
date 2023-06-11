import Typography from '@mui/material/Typography';
import OptionsMenu from '../Shared/OptionsMenu';
import UsersList from './UsersList';
import './Users.css';
import CreateUser from './CreateUser';
import { useState } from 'react';

function Users() {

  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div className="users-page-wrapper">
    <div className="detail-list">
      <section className="executives-wrapper">
        <Typography gutterBottom variant="h1" component="div">
          EJECUTIVOS
        </Typography>
        <OptionsMenu type={'users'} openCreate={setOpenCreate}/>
      </section>
      <UsersList />
      <CreateUser open={openCreate} close={setOpenCreate}/>
    </div>
    </div>
  );
}

export default Users;
