// const http = require('http');
// const port = 3000;
// const fs = require('fs');
// const renderHTML = (path, res) => {
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             res.writeHead(404);
//             res.write('Error: NNot Found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// };

// http
// .createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     const url = req.url;
//     switch(url) {
//         case '/about':
//             renderHTML('./about.html', res);
//             break;
//         case '/contact':
//             renderHTML('./contact.html', res);
//             break;
//         default:
//             renderHTML('./index.html', res);
//             break;
//     }

//     // if (url === '/about'){
//     //    renderHTML('./about.html', res);
//     // } else if (url === '/contact'){
//     //     renderHTML('./contact.html', res);
//     // } else {
//     // renderHTML('./index.html', res);
//     // }
// })
// .listen(port, () => {
//     console.log('Server running on port 3000');
// });

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
//   res.send('Hello World!')
    res.sendFile('./index.html', {root: __dirname});
})

app.get('/about', (req, res) => {
    // res.send('ini about')
    res.sendFile('./about.html', {root: __dirname})
})

app.get('/contact', (req, res) => {
    // res.send('ini kontak')
    res.sendFile('./contact.html', {root: __dirname})
})

app.get('/product/:id', (req, res) => {
    res.send(`product ID :  ${req.params.id} <br> category ID : ${req.query.category}`)
}) 

app.use('/', (req, res) => {
//   res.status(404),
//   res.send('<p>404</p>')
    res.json({
        nama: 'Khidir',
        no_hp: '0808080',
    });
}) // ini jangan di taruh di atas karena bisa mencegat .res yang lain

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})