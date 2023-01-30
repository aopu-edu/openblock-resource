const OpenblockResourceServer = require('../index');
const clc = require('cli-color');
const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('./crypto');

const key = '@AIBIdjosf234sdfjla';
const iv = '.dfsads4542ease!';

// 获取cpu信息
const macid = os.networkInterfaces();
let mac;
for (const i in macid) {
    for (const j in macid[i]){
        if (macid[i][j].family === 'IPv4' && macid[i][j].mac !== '00:00:00:00:00:00' &&
            macid[i][j].address !== '127.0.0.1'){
            mac = macid[i][j].mac;
        }
    }
}
const pwdPath = '/var/cache/pwd.txt';
const data = fs.readFileSync(path.resolve(__dirname, '../external-resources/config.json'), 'utf8');
if (fs.existsSync(path.resolve(pwdPath))) {
    const pass = fs.readFileSync(path.resolve(pwdPath), 'utf8');
    const rest = crypto.encrypt(data + mac, key, iv);

    if (rest === pass) {
        const resourceServer = new OpenblockResourceServer();
        // Start server
        resourceServer.initializeResources(console.log)
            .then(() => {
                resourceServer.listen();
            })
            .catch(err => {
                console.error(clc.red(`ERR!: Initialize resources error: ${err}`));
            });

        resourceServer.on('error', err => {
            console.error(clc.red(`ERR!: Resource server error: ${err}`));
        });
    }
} else {
    console.info('Missing files');
}
