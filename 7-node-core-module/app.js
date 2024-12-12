// core module
// file system
const fs = require('fs');

// Menuliskan string ke file (synchronous)
// try {
//     fs.writeFileSync('data/text.txt'/* Ini hanya untuk file bukan bikin folder*/, 'Hello world secara synchronous!' );
// } catch (e){
//     console.log(e);
// }

// Menuliskan string ke file (asynchronous)
// fs.writeFile('data/text.txt', 'Hello world secara asynchronous', (e) => {
//     console.log(e);
// });

// Membaca string ke file (synchronous)
// const data = fs.readFileSync('data/text.txt', 'utf-8');
// console.log(data);

// Membaca string ke file (asynchronous)
// fs.readFile('data/text.txt', 'utf-8', (e, data) => {
//     if(e) throw e;
//     console.log(data);
// });

// Readline 
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukkan nama anda : ', (nama) => {
    rl.question('Masukkan nomor HP : ', (noHp) =>{
        console.log(`Halo ${nama}, nomor HP anda adalah ${noHp}`);
        rl.close();
    })
});