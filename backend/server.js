require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Enable CORS so your React frontend can talk to the backend
app.use(cors());
app.use(express.json());

// Database connection using credentials from your .env file
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 1. GET ALL SEVAS (Dashboard)
app.get('/api/sevas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sevas ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Seva Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch sevas' });
  }
});

// 2. GET USER BOOKING HISTORY
app.get('/api/bookings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("History Request for User ID:", userId);
    
    // Join bookings with sevas to get full details
    const query = `
      SELECT b.id, s.seva_name, b.booking_date, s.price 
      FROM bookings b
      JOIN sevas s ON b.seva_id = s.id
      WHERE b.user_id = $1
      ORDER BY b.booking_date DESC
    `;
    
    const result = await pool.query(query, [parseInt(userId)]);
    res.json(result.rows);
  } catch (err) {
    console.error('History Fetch Error:', err);
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
});

// 3. POST NEW BOOKING
app.post('/api/bookings', async (req, res) => {
  try {
    const { user_id, seva_id, booking_date } = req.body;
    console.log("New Booking Attempt:", { user_id, seva_id, booking_date });
    
    const query = `
      INSERT INTO bookings (user_id, seva_id, booking_date) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    
    const result = await pool.query(query, [user_id, seva_id, booking_date]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Booking Write Error:", err);
    res.status(500).json({ error: 'Failed to record booking' });
  }
});

// 4. LOGIN ROUTE
app.post('/api/login', async (req, res) => {
  try {
    const { password } = req.body;
    console.log("Login attempt with password:", password);
    
    // Find the user matching the password
    const result = await pool.query('SELECT id, tier FROM users WHERE password = $1', [password]);
    
    if (result.rows.length > 0) {
      // Send back the user's ID and Tier so the frontend knows what to display
      res.json({ 
        success: true, 
        userId: result.rows[0].id, 
        tier: result.rows[0].tier 
      });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: 'Database error during login' });
  }
});

// SIGNUP ROUTE
app.post('/api/signup', async (req, res) => {
  try {
    const { password, tier } = req.body;

    const allowedTiers = [
      'initiate',
      'devotee',
      'ascendant',
      'elite'
    ];

    if (!allowedTiers.includes(tier)) {
      return res.status(400).json({
        error: 'Invalid tier selected'
      });
    }

    const query = `
      INSERT INTO users (password, tier)
      VALUES ($1, $2)
      RETURNING id, tier
    `;

    const result = await pool.query(query, [
      password,
      tier
    ]);

    res.json({
      success: true,
      userId: result.rows[0].id,
      tier: result.rows[0].tier
    });

  } catch (err) {
    console.error("Signup Error:", err);

    res.status(500).json({
      error: 'Failed to create account'
    });
  }
});

// ==========================
// ADMIN ROUTES
// ==========================


// GET ALL USERS
app.get('/api/users', async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT * FROM users
      ORDER BY id ASC
    `);

    res.json(result.rows);

  } catch (err) {

    console.error('Users Fetch Error:', err);

    res.status(500).json({
      error: 'Failed to fetch users'
    });

  }
});


// GET ALL BOOKINGS (ADMIN)
app.get('/api/bookings', async (req, res) => {
  try {

    const query = `
      SELECT
        bookings.id,
        bookings.booking_date,
        users.id AS user_id,
        users.tier,
        sevas.seva_name,
        sevas.price
      FROM bookings
      JOIN users ON bookings.user_id = users.id
      JOIN sevas ON bookings.seva_id = sevas.id
      ORDER BY bookings.booking_date DESC
    `;

    const result = await pool.query(query);

    res.json(result.rows);

  } catch (err) {

    console.error('Bookings Fetch Error:', err);

    res.status(500).json({
      error: 'Failed to fetch bookings'
    });

  }
});


// CREATE NEW SEVA
app.post('/api/sevas', async (req, res) => {

  try {

    const {
      seva_name,
      description,
      price,
      tier_required
    } = req.body;

    const query = `
      INSERT INTO sevas
      (seva_name, description, price, tier_required)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await pool.query(query, [
      seva_name,
      description,
      price,
      tier_required
    ]);

    res.json(result.rows[0]);

  } catch (err) {

    console.error('Create Seva Error:', err);

    res.status(500).json({
      error: 'Failed to create seva'
    });

  }
});


// DELETE SEVA
app.delete('/api/sevas/:id', async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      'DELETE FROM sevas WHERE id = $1',
      [id]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error('Delete Seva Error:', err);

    res.status(500).json({
      error: 'Failed to delete seva'
    });

  }
});


// DELETE USER
app.delete('/api/users/:id', async (req, res) => {

  try {

    const { id } = req.params;

    // Delete user bookings first
    await pool.query(
      'DELETE FROM bookings WHERE user_id = $1',
      [id]
    );

    // Delete user
    await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error('Delete User Error:', err);

    res.status(500).json({
      error: 'Failed to delete user'
    });

  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));