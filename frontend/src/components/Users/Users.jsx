import Typography from '@mui/material/Typography';
import OptionsMenu from '../Shared/OptionsMenu';
import UsersList from './UsersList';
import './Users.css';

function Users() {

  return (
    <div className="users-page-wrapper">
    <div className="detail-list">
      <section className="executives-wrapper">
        <Typography gutterBottom variant="h1" component="div">
          EJECUTIVOS
        </Typography>
        <OptionsMenu type={'users'}/>
      </section>
      <UsersList />
    </div>
    </div>
  );
}

export default Users;
