// i use bypass vip apikey for this bypass website, but u also can change it to other apiikey (using header)

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const VIP_API_KEY = '';
const VIP_API_URL = 'https://api.bypass.vip/premium/bypass';

app.post('/api/process', async (req, res) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const response = await axios.get(`${VIP_API_URL}?url=${encodeURIComponent(url)}`, {
            headers: {
                'x-api-key': VIP_API_KEY
            }
        });

        res.json({ result: response.data.result });
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ error: 'Failed to process link' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});
