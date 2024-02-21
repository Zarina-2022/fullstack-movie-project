const bodyParser = require('../utils/body-parser')
const fs = require('fs')
const crypto = require('crypto') // projedeki tum sifreleme isleri icin kullanilir

module.exports = async (req, res) => {

    if (req.url === '/api/movies') {
        try {
            // I need to access the body part of the request:
            /*
            In order to access the data sent in the body part of the request, we need to write a function in node.js.
            Since it is a auxiliary function, let's write it in a folder called utils>body-parser.js.
            */
            let body = await bodyParser(req)

            // Validation
            if (!body.title || !body.year || !body.genre || !body.rating) {
                res.writeHead(404);
                res.end('Please fill in all fields of the movie.');
                return;
            }

            // I need to give a unique id to the new movie's data: 
            // How can we add unique id using pure node.js? With crypto module:
            body.id = crypto.randomUUID()

            // I'll get all movies again after giving the id to the new movie & convert them to JS data:
            // take all movies:
            let data = fs.readFileSync('./data/movies.json', 'utf-8')

            // Convert Json format data to javascript format:
            data = JSON.parse(data)

            // Add a new movie to the other movies:
            data.movies.push(body)

            // Now update json folder:
            fs.writeFileSync('./data/movies.json', JSON.stringify(data))

            // Send response to the client:
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(body));
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'The path is not found.' }));
        }
    }
}

