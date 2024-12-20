
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

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

const simpanContact = (nama, email, noHp) => {
    const contact = {nama, email, noHp};
    // const fileBuffer = fs.readFileSync('data/contact.json', 'utf8');
    // const contacts = JSON.parse(fileBuffer);
    const contacts = loadContact();

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
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukan data'));

};

const listContacts = () => {
 const contact = loadContact();
 console.log(chalk.blueBright.inverse.bold('Daftar kontak'));
 contact.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
 })
};

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`))
        return false
    }
    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHp);
    if (contact.email) {
        console.log(contact.email);
    }

};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus`));

}

module.exports = {simpanContact, listContacts, detailContact, deleteContact};