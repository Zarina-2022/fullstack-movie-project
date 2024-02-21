// Create the body part of the request:

module.exports = async (request) => {

    return new Promise((resolve, reject) => {
        try {
            // We determine the body part of the request:
            let body = '';
            // Body data comes in pieces. We will add each 
            // piece we get to the body part one by one.
            // For this we need to watch the first part that comes.
            request.on('data', (chunk) => {
                body += chunk
            })

            // Watch all the pieces being finished:
            request.on('end', () => {
                resolve(JSON.parse(body))
            })
        } catch (err) {
            reject(err)
        }
    })
}