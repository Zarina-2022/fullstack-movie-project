const http = require('http')
const getRequest = require('./methods/get-request')
const postRequest = require('./methods/post-request')
const deleteRequest = require('./methods/delete-request')

// 1) create http server

// CORS error nedir? => Cross-Origin Resource Sharing (Kökenler arası kaynak paylaşımı) 
// anlamına gelen CORS, web tarayıcısı tarafından yönetilen ve ek HTTP başlıkları kullanılarak, 
// bir kökende çalışan web uygulamasının, farklı bir kökende yer alan web uygulamasına erişim
// izni kontrolünü sağlayan mekanizmadır. Web uygulaması, internet tarayıcısı üzerinden farklı
// bir kökene (protokol, domain ve port) herhangi bir istek gönderirse cross-origin HTTP isteği oluşturmuş olur.

// butun isteklerde gonderilecek header ekleyelim ki, backend ile frontend arasinda veri alisverisinde CORS error(baglanti) vermesin:
// '*'=> tum site lar erisebilir. Ama belli bir domain (www.amazon.com) yazarsak sadece onlar erisebilir.Diger site lardan istek gelirse CORS error verecektir.

const server = http.createServer((req, res) => {

       // Allow requests from any origin
       res.setHeader('Access-Control-Allow-Origin', '*');

       // Allow the specified methods
       res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
   
       // Allow specific headers (modify as needed)
       res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   
       // Allow credentials (if applicable)
       res.setHeader('Access-Control-Allow-Credentials', 'true');

    switch (req.method) {
        // cors hatasi olmamasi icin:
        case 'OPTIONS':
            res.setHeader('Content-Type', 'application/json');
            res.end();
            break;
        case "GET":
            getRequest(req, res);
            break;
        case "POST":
            if (req.headers['content-type'] !== 'application/json') {
                res.statusCode = 415; // Unsupported Media Type
                res.end(JSON.stringify({ message: 'Unsupported Media Type' }));
                return;
            }
            postRequest(req, res);
            break;
        case "DELETE":
            deleteRequest(req, res);
            break;
        default:
            // update the status of response:
            res.statusCode = 404
            // add new header to the sent response:
            res.setHeader("Content-Type", "application/json")
            // the message to be sent must be in json style:
            // JSON.stringify turns JS data intio json data:
            res.write(
                JSON.stringify({
                    message: 'Page is not found'
                }))
            res.end()
            break;
    }
})
// 2) listen for requests coming to specific port
port = 9000
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})