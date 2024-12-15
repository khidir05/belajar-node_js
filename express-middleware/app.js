const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000

//Gunakan ejs

app.set('view engine', 'ejs')

//third party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//Built in middleware
app.use(express.static('public'))

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
        title: 'Halaman home abcd',
        mahasiswa,
        layout: 'layouts/main-layouts'
    });
})

app.get('/about', (req, res) => {
    // res.send('ini about')
    res.render('about', {
        layout: 'layouts/main-layouts',
        title: 'Halaman about'});
})

app.get('/contact', (req, res) => {
    // res.send('ini kontak')
    res.render('contact', {
        layout: 'layouts/main-layouts',
        title: 'Halaman contact'});
})

//Aplication level middleware
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
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