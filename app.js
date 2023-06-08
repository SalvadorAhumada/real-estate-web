const express = require('express');
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const units = require('./src/Database/Routes/units');
const users = require('./src/Database/Routes/users');
const clusters = require('./src/Database/Routes/clusters');
const { shouldRestoreDB } = require('./src/Database/Utils/index');
const dropTable = process.argv[2];

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const PORT = process.env.PORT || 3030

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.static('frontend/build'));
// To drop tables and create new ones send 'true'
shouldRestoreDB(dropTable);

app.use('/api/users', users);
app.use('/api/units', units);
app.use('/api/clusters', clusters);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});