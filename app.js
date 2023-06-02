const express = require('express');
const app = express();

// Serve React's static files during development
app.use(express.static('frontend/build'));

// Start the server
app.listen(3030, () => {
    console.log('Server started on port 3030');
});