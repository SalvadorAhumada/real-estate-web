const express = require('express');
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const units = require('./src/Database/Routes/units');
const users = require('./src/Database/Routes/users');
const clusters = require('./src/Database/Routes/clusters');
const customers = require('./src/Database/Routes/customers');
const { shouldRestoreDB } = require('./src/Database/Utils/index');
const session = require('express-session');
const dropTable = process.argv[2];

app.use(session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 3600000 },
    // TODO: Buscar si esta opcion debe de estar activa o no para produccion
    saveUninitialized: false
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const PORT = process.env.PORT || 3030

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.static('frontend/build'));

shouldRestoreDB(dropTable);
/**
 * SERVICES
 */
app.use('/api/users', users);
app.use('/api/units', units);
app.use('/api/clusters', clusters);
app.use('/api/customers', customers);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});