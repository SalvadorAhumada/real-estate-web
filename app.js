const express = require('express');
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require ('./src/Database/Routes/userRoutes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const PORT = process.env.PORT || 3030

app.use(cors());

app.use(express.static('frontend/build'));

// Drop tables
/* db.sequelize.sync({ force: true }).then(() => {
  console.log("db has been re sync")
}) */

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});