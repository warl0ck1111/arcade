const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist/qr-code-demo/browser')));

// Define a catch-all route to serve the 'index.html' file
// Define a catch-all route to serve the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/qr-code-demo/browser/index.html'));
});
const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
