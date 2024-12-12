const { constants } = require('buffer');
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukkan nama anda : ', (nama) => {
    rl.question('Masukkan nomor HP : ', (noHp) =>{
      const contact = {nama, noHp};
      const file = fs.readFileSync('data/contact.json', 'utf8');
      const contacts = JSON.parse(file);
      contacts.push(contact);
      fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
      console.log('Terimakasih sudah memasukan data')
      rl.close();
    });
});