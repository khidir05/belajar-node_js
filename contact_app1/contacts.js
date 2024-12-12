const { constants } = require('buffer');
const fs = require('fs');
const { resolve } = require('path');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Membuat folder jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}
//Membuat file jika belum ada
const dataPath = './data/contact.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {        
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    });
};

const simpanContact = (nama, email, noHp) => {
    const contact = {nama, email, noHp};
    const fileBuffer = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);
    contacts.push(contact);
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
    console.log('Terimakasih sudah memasukan data');
    rl.close();
};

module.exports = {tulisPertanyaan, simpanContact};