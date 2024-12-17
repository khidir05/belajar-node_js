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

// Menulis/ menimpa file contact json dengan data baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts))
}

// Menambahkan kontak baru
const addContact = (contact) =>{
    const contacts = loadContact()
    contacts.push(contact)
    saveContacts(contacts)
}

//cek nama duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact()
    return contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase())
}

//hapus contact
const deleteContact = (nama) => {
    const contacts = loadContact()
    const fillterdContact = contacts.filter((contact) => contact.nama !== nama)
    saveContacts(fillterdContact)
}

//Mengubah contacts
const updateContacts = (contactBaru) => {
    const contacts = loadContact()
    //hilagkan kontak lama yang namanya sama dengan old nama
    const fillterdContact = contacts.filter((contact) => contact.nama !== contactBaru.oldNama)
    delete contactBaru.oldNama
    fillterdContact.push(contactBaru)
    saveContacts(fillterdContact)
}

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact }