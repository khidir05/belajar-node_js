const fs = require('fs')

const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}
//Membuat file jika belum ada
const dataPath = './data/contact.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

//ambil semua data di contact.json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

//cari kontak berdasrkan nama
const findContact = (nama) => { 
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

module.exports = { loadContact, findContact }