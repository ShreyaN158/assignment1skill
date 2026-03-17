const { getAllStudents, saveStudents } = require('../models/studentModel');
const validateStudent = require('../utils/validator');
const getRequestBody = require('../utils/helper');
const { randomUUID } = require('crypto');

function getStudents(req, res) {

    let students = getAllStudents();

    const url = new URL(req.url, `http://${req.headers.host}`);
    const year = url.searchParams.get('year');

    if (year) {
        students = students.filter(s => s.year == year);
    }

    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || students.length;

    const start = (page - 1) * limit;
    const end = start + limit;

    const result = students.slice(start, end);

    res.writeHead(200);
    res.end(JSON.stringify(result));
}

function getStudent(req, res, id) {

    const students = getAllStudents();

    const student = students.find(s => s.id === id);

    if (!student) {
        res.writeHead(404);
        return res.end(JSON.stringify({
            success: false,
            message: "Student not found"
        }));
    }

    res.writeHead(200);
    res.end(JSON.stringify(student));
}

async function createStudent(req, res) {

    const body = await getRequestBody(req);

    const error = validateStudent(body);

    if (error) {
        res.writeHead(400);
        return res.end(JSON.stringify({
            success: false,
            message: error
        }));
    }

    const students = getAllStudents();

    const newStudent = {
        id: randomUUID(),
        name: body.name,
        email: body.email,
        course: body.course,
        year: body.year,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    students.push(newStudent);

    saveStudents(students);

    res.writeHead(201);
    res.end(JSON.stringify(newStudent));
}

async function updateStudent(req, res, id) {

    const body = await getRequestBody(req);

    const students = getAllStudents();

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        res.writeHead(404);
        return res.end(JSON.stringify({
            success: false,
            message: "Student not found"
        }));
    }

    const error = validateStudent(body);

    if (error) {
        res.writeHead(400);
        return res.end(JSON.stringify({
            success: false,
            message: error
        }));
    }

    students[index] = {
        ...students[index],
        ...body,
        updatedAt: new Date()
    };

    saveStudents(students);

    res.writeHead(200);
    res.end(JSON.stringify(students[index]));
}

function deleteStudent(req, res, id) {

    let students = getAllStudents();

    const student = students.find(s => s.id === id);

    if (!student) {
        res.writeHead(404);
        return res.end(JSON.stringify({
            success: false,
            message: "Student not found"
        }));
    }

    students = students.filter(s => s.id !== id);

    saveStudents(students);

    res.writeHead(200);
    res.end(JSON.stringify({
        success: true,
        message: "Student deleted"
    }));
}

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
};