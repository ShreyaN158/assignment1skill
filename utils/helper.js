function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            if (!body) {
                return resolve({});
            }

            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(new Error('Invalid JSON body'));
            }
        });

        req.on('error', reject);
    });
}

module.exports = getRequestBody;