const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/students.json');

function getAllStudents() {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
}

function saveStudents(students) {
    fs.writeFileSync(dataPath, JSON.stringify(students, null, 2));
}

module.exports = {
    getAllStudents,
    saveStudents
};

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
}