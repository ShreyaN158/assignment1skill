function validateStudent(data) {

    if (!data.name || !data.email || !data.course || !data.year) {
        return "All fields are required";
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(data.email)) {
        return "Invalid email format";
    }

    if (data.year < 1 || data.year > 4) {
        return "Year must be between 1 and 4";
    }

    return null;
}

module.exports = validateStudent;