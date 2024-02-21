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

    if (req.url === '/api/movies') {
        // 1) set atatus code
        res.status = 200

        // 2) set headers
        res.setHeader('Content-Type', 'application/json')

        // 3) get movie data from json file
        const movies = fs.readFileSync('./data/movies.json', 'utf-8')

        // 4) send response
        res.end(movies)

    } else if (baseUrl === '/api/movies' && id) {
        // take all movies:
        let data = fs.readFileSync('./data/movies.json', 'utf-8')

        // Convert Json format data to javascript format:
        data = JSON.parse(data)

        // find the film with known id:
        const movieId = data.movies.find(item => item.id == id)

        // For the situation whether the movie is found or not:
        if (movieId) {
            // If the movie is found:
            // set response settings
            res.writeHead(200, { 'Content-Type': 'application/json' })

            // send response
            res.end(JSON.stringify(movieId))

        } else {
            // If the movie is not found:
            // set response settings
            res.writeHead(404, { 'Content-Type': 'application/json' })

            // send response
            res.end(JSON.stringify({
                message: 'No movie was found matching the ID you sent.'
            }))
        }
    } else {
        // If the incoming url is wrong, send error
        // yukarida yazilian res.status ve res.setHeader in kisa yolu:
        res.writeHead(404, { 'Content-Type': "application/json" });
        res.end(JSON.stringify({
            title: 'Not found',
            message: 'The path you requested is invalid'
        }))
    }
}

