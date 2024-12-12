const express = require('express')
const app = express()
const port = 3000

//Gunakan ejs

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
//   res.send('Hello World!')
    const mahasiswa = [
        {
            nama: 'Khidir Afwan',
            email: 'amlabar05@outlook.com',
        },
        {
            nama: 'Zaid Alfaruq',
            email: 'zaid05@outlook.com',
        },
        {
            nama: 'Afifan Qodarulloh',
            email: 'afif05@outlook.com',
        },
    ]
    res.render('index', { 
        nama : 'Khidir Afwan', 
        title: 'Halaman home',
        mahasiswa,
    });
})

app.get('/about', (req, res) => {
    // res.send('ini about')
    res.render('about');
})

app.get('/contact', (req, res) => {
    // res.send('ini kontak')
    res.render('contact');
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