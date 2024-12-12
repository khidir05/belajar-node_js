
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

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


const simpanContact = (nama, email, noHp) => {
    const contact = {nama, email, noHp};
    const fileBuffer = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);

    // Cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(
            chalk.red.inverse.bold('Contact sudah ada')
        );
        return false;
    }

    //cek email
    if(email){
        if(!validator.isEmail(email))  {
            console.log(
                chalk.red.inverse.bold('Email nadak valid')
            );
            return false;  
        }
    }

    if(!validator.isMobilePhone(noHp, 'id-ID'))  {
        console.log(
            chalk.red.inverse.bold('Nomor HP ndak valid')
        );
        return false;
    }
    contacts.push(contact);
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukan data'));

};

module.exports = {simpanContact};