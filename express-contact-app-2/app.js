const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const { loadContact, findContact, addContact, cekDuplikat } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator')

const app = express()
const port = 3000

//Gunakan ejs

app.set('view engine', 'ejs')

//third party middleware
app.use(expressLayouts)

//Built in middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))

//konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
    cookie: {maxAge : 6000},
    secret: 'secret',
    resave: true,
    saveUnintialized: true,
})
)
app.use(flash())

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
        contacts,
        msg: req.flash('msg')
    });
})

// Halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layouts',
        title: 'Halaman add contact',
    })
})

//Proses data contact
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value)
        if(duplikat){
            throw new Error('Nama sudah ada')
        }
        return true
    }),
    check('email', 'Email ndak valid').isEmail(), 
    check('noHP', 'No Hp ndak valid').isMobilePhone('id-ID')], 
    (req, res) =>  {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        // return res.status(404).json({ errors: errors.array() })
        res.render('add-contact', {
            title: 'Form tambah contact',
            layout: 'layouts/main-layouts',
            errors: errors.array(),
        })
    } else {
        addContact(req.body)
        req.flash('msg', 'Data berhasil ditambahkan')
        res.redirect('/contact')
    }
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