const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/studentController');

function studentRoutes(req, res) {

    const urlParts = req.url.split('/');
    const id = urlParts[2];

    if (req.method === 'GET' && req.url.startsWith('/students') && !id) {
        getStudents(req, res);
    }

    else if (req.method === 'GET' && id) {
        getStudent(req, res, id);
    }

    else if (req.method === 'POST' && req.url === '/students') {
        createStudent(req, res);
    }

    else if (req.method === 'PUT' && id) {
        updateStudent(req, res, id);
    }

    else if (req.method === 'DELETE' && id) {
        deleteStudent(req, res, id);
    }

    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            success: false,
            message: "Route not found"
        }));
    }
}

module.exports = studentRoutes;