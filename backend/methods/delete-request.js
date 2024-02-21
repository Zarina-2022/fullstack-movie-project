const fs = require('fs')

module.exports = (req, res) => {
    // If we want to get the base url 
    // (the path before id (before the last slash)), we can use:
    // lastIndexOf()to find the last slash
    // and substring()to get data from which index till which index (It cuts between 0 and last /)
    // /api/movies
    const baseUrl = req.url.substring(0, req.url.lastIndexOf('/'))

    // split the url by using split() by slashes and get only id parameter :
    const id = req.url.split('/')[3]
    // [ '', 'api', 'movies', '213976be-9157-4daa-992b-5b93f68540a6' ]

    if (baseUrl === '/api/movies' && id) {
        // I need to get all movies again :
        // take all movies:
        let data = fs.readFileSync('./data/movies.json', 'utf-8')

        // Convert Json format data to javascript format:
        data = JSON.parse(data)

        // Validation:
        const foundItem = data.movies.find((item) => item.id == id)
        if(!foundItem){
            res.writeHead(404);
            return res.end('id is invalid')
        }

        // Remove movie with known ID from the array[]
        const filteredMovies = data.movies.filter((item) => item.id != id)
        data.movies = filteredMovies;

        // Now update json folder:
        fs.writeFileSync('./data/movies.json', JSON.stringify(data))
        

        // Send response to the client:
        res.writeHead(204, { 'Content-Type': 'application/json' })
        res.end();
    } else {
        // No need for { 'Content-Type': 'application/json' } as json data is not sent
        res.writeHead(404);
        res.end('The path is not found.');
    }
}