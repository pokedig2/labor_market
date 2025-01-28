const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 5050;

app.get('/', (req, res) => {
    res.send('Welcome to the BLS Data API! Use /api/bls to fetch data.');
});

app.get('/api/bls', async (req, res) => {
    const { series_id, start_year, end_year } = req.query;

    // Validate required parameters
    if (!series_id || !start_year || !end_year) {
        return res.status(400).json({ error: 'Missing required query parameters: series_id, start_year, end_year' });
    }

    const blsUrl = `https://api.bls.gov/publicAPI/v2/timeseries/data/`;

    try {
        // Construct the request payload
        const payload = {
            seriesid: [series_id],
            startyear: parseInt(start_year, 10), // Ensure years are numbers
            endyear: parseInt(end_year, 10),    // Ensure years are numbers
            registrationkey: process.env.BLS_API_KEY,
        };

        // Send the POST request to the BLS API
        const response = await axios.post(blsUrl, payload);

        // Send the API response back to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from BLS API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from BLS API' });
    }
});


/*
app.get('/api/bls', async (req, res) => {
    const { series_id, start_year, end_year } = req.query;

    if (!series_id || !start_year || !end_year) {
        return res.status(400).send('Missing required query parameters: series_id, start_year, end_year');
    }

    const url = `https://api.bls.gov/publicAPI/v2/timeseries/data/${series_id}`;
    try {
        const response = await axios.post(url, {
            seriesid: [series_id],
            startyear: start_year,
            endyear: end_year,
            registrationkey: process.env.BLS_API_KEY,
        });

        // Parse years as integers
        const startYearNum = parseInt(start_year, 10);
        const endYearNum = parseInt(end_year, 10);

        // Filter data to match the requested year range
        // Replace original data with filtered data
        response.data.Results.series[0].data = response.data.Results.series[0].data.filter((entry) => {
            const entryYear = parseInt(entry.year, 10); // Ensure year from API is a number
            return entryYear >= startYearNum && entryYear <= endYearNum;
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
*/

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
