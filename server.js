const http = require('http');
const studentRoutes = require('./routes/studentRoutes');

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json');

    studentRoutes(req, res);

});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});