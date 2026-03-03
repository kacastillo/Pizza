// Import the mysql2 module
// mysql2 allows Node.js to communicate with a MySQL database
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DB_HOST); // Check if environment variable is loaded

const app = express();
const PORT = 3001;
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// "Middleware" that allows express to read
// form data and store it in req.body
app.use(express.urlencoded({ extended: true }));


// create a pool (bucket) of database connections
const pool = mysql2.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT
}).promise();

// create a test route database
app.get('/db-test', async (req, res) => {
    try {
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.json(pizza_orders[0]);
    } catch(err) {
        console.error('Database error:', err);
    }
});

// Default route
app.get('/', (req, res) => {
    res.render('home');
});

// Contact route
app.get('/contact-us', (req, res) => {
    res.render('contact');
});

// Confirmation route
app.get('/thank-you', (req, res) => {
    res.render('confirmation');
});

// Admin route
app.get('/admin', async (req, res) => {
    // Read all orders from DB
    // newest first
    let sql = 'SELECT * FROM orders ORDER BY timestamp DESC';
    const orders = await pool.query(sql);
    console.log(orders);


    res.render('admin', { orders: orders[0] });
});

// Submit order route
// {"fname":"a","lname":"aa","email":"a",
// "method":"delivery","toppings":["artichokes"],
// "size":"small","comment":"","discount":"on"}
app.post('/submit-order', async (req, res) => {

    const order = req.body;
    
    // Create an array of order data
    const params = [
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.size,
    req.body.method,
    Array.isArray(req.body.toppings) ? req.body.toppings.join(', ') : "none",
    ];

    // Insert the order into the database
    const sql = 'INSERT INTO orders (fname, lname, email, size, method, toppings) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await pool.execute(sql, params);
    
    res.render('confirmation', {order : order});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});