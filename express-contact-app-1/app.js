const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')

const app = express()
const port = 3000

//Gunakan ejs

app.set('view engine', 'ejs')

//third party middleware
app.use(expressLayouts)


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
    const contacts = loadContact()
    // res.send('ini kontak')
    res.render('contact', {
        layout: 'layouts/main-layouts',
        title: 'Halaman contact',
        contacts});
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    // res.send('ini kontak')
    res.render('detail', {
        layout: 'layouts/main-layouts',
        title: 'Halaman detail',
        contact
    });
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