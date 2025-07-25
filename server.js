const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = 'Ov23libYvrfgv3vVi7VO';
const CLIENT_SECRET = 'b8287699088f8683c9316b001350f9d6d53c3d20';

// ✅ 使用 Node.js v18+ 内置的 fetch
app.get('/auth/github', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Missing code in request' });
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || 'OAuth failed' });
    }

    res.json(tokenData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get access token', details: err.message });
  }
});

app.post('/auth/github/user', async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ error: 'Missing access_token' });
  }

  try {
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
        'User-Agent': 'bytebase-login-app',
      },
    });

    const userInfo = await userRes.json();

    if (userInfo.message === 'Bad credentials') {
      return res.status(401).json({ error: 'Invalid access_token' });
    }

    res.json(userInfo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GitHub user', details: err.message });
  }
});

app.listen(4000, () => {
  console.log('✅ Server running on http://localhost:4000');
});
