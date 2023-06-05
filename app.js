const express = require('express');
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/Database/Routes/userRoutes');
const { shouldRestoreDB } = require('./src/Database/Utils/index');

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
shouldRestoreDB();

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});