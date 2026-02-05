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

// Contact route
app.get('/contact', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
}); 

// submit-order route

app.post('/submit-order' , (req, res) => {
    res.send(req.body); // Placeholder response, you can customize this as needed
    // res.sendFile(`${import.meta.dirname}/views/confirmation.html`);

    //create json 
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        size: req.body.size,
        method: req.body.method,
        toppings: req.body.toppings,
        timestamp: new Date()
    };

    // add order to an order array
    orders.push(order);

  res.send(order); // Send the order data back as a response (for testing purposes)
}); 

// route admin that displays all orders in JSON format
app.get('/admin', (req, res) => {
    res.send(orders);
});;

// "Middleware" that allows express to read form data and store it in req.body
app.use(express.urlencoded({ extended: true }));

//Create a temp array to store orders
const orders = [];
