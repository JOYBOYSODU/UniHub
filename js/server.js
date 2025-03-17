const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'event_registration',
    password: 'your_password',
    port: 5432,
});

// Register participant
app.post('/api/register', async (req, res) => {
    const { first_name, last_name, college, email, phone_number, field_of_study, events } = req.body;
    
    try {
        // Start transaction
        await pool.query('BEGIN');
        
        // Insert participant
        const participantResult = await pool.query(
            'INSERT INTO participants (first_name, last_name, college, email, phone_number, field_of_study) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [first_name, last_name, college, email, phone_number, field_of_study]
        );
        
        const participantId = participantResult.rows[0].id;
        
        // Map event values to event IDs (you might want to store this mapping in the database)
        const eventMapping = {
            'hackathon': 1,
            'startup': 2,
            'cultural': 3,
            'research': 4,
            'workshop': 5,
            'career': 6
        };

        // Insert registrations
        for (const eventValue of events) {
            const eventId = eventMapping[eventValue];
            if (eventId) {
                await pool.query(
                    'INSERT INTO registrations (participant_id, event_id) VALUES ($1, $2)',
                    [participantId, eventId]
                );
            }
        }
        
        await pool.query('COMMIT');
        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});