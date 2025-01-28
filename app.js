const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000; // Change this if needed, e.g., 5000

// BLS API Endpoint
app.get('/api/bls', async (req, res) => {
    const { series_id, start_year, end_year } = req.query;

    // Validate required parameters
    if (!series_id || !start_year || !end_year) {
        return res.status(400).json({ error: 'Missing required query parameters: series_id, start_year, end_year' });
    }

    const blsUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data/${series_id}`;
    const blsApiKey = process.env.BLS_API_KEY; // Set this in a .env file

    try {
        const response = await axios.post(blsUrl, {
            seriesid: [series_id],
            startyear: start_year,
            endyear: end_year,
            registrationkey: blsApiKey,
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from BLS API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from BLS API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
