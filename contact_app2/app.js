// Mengambil argumen dari komen lain
const yargs = require("yargs");
const contacts = require('./contacts');
yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Alamat email',
            demandOption: false,
            type: 'string',
        },
        nomor: {
            describe: 'Nomor HP',
            demandOption: true,
            type: 'string',
        },
    },
    // handler(argv) {
    //     const contact = {
    //         nama: argv.nama,
    //         email: argv.email,
    //         nomor: argv.nomor,
    //     };
    //     console.log(contact);
    // }
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.nomor);
    },
})

yargs.parse()