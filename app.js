// import the express module
import express from 'express';

// create an express pplication
const app = express();

// define a port number
const PORT = 3000;

// enable static file serving 
app.use(express.static('public'));

// define our main route ('/')
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// start server and listen on designated port
app.listen(PORT, () => {
    console.log(`Server is running gloriously on http://localhost:${PORT}`);
});