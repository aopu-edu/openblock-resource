const OpenblockResourceServer = require('../index');
const clc = require('cli-color');
const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('./crypto');

// const key = '@AIBIdjosf234sdfjla';
const key2 = '2';
const key1 = '@';
const keyAI = 'AI';
const keya = 'a';
const keyf = 'f';
const point = String.fromCharCode(key2.charCodeAt() - 4);
let keyTemp1 = key1 + keyAI;
const keyBI = 'BI';
const keyd = String.fromCharCode(keya.charCodeAt() + 3);
const keye = String.fromCharCode(keyd.charCodeAt() + 1);
let ivTemp2 = key2 + keye + keya;
keyTemp1 += keyBI + keyd;
const key4 = String.fromCharCode(key2.charCodeAt() + 2);
const keys = 's';
const space = String.fromCharCode(point.charCodeAt() - 14);
const keyj = String.fromCharCode(keyd.charCodeAt() + 6);
const slash = String.fromCharCode(space.charCodeAt() + 15); // /
let ivTemp1 = point + keyd;
keyTemp1 += keyj;
ivTemp2 += keys + keye;
const key3 = String.fromCharCode(key2.charCodeAt() + 1);
let cache = String.fromCharCode(keyd.charCodeAt() - 1) + keya;
const keyS = String.fromCharCode(keys.charCodeAt() - 32);
const keyt = String.fromCharCode(keyf.charCodeAt() + 14);
keyTemp1 += String.fromCharCode(keyt.charCodeAt() - 5); // o
ivTemp1 += keyf + keys + keya;
// const iv = '.dfsads4542ease!';
const keyi = String.fromCharCode(keyd.charCodeAt() + 5);
const keyv = String.fromCharCode(keyt.charCodeAt() + 2);
let iv = keyd + keys + key4;
iv += String.fromCharCode(key3.charCodeAt() + 2);
cache += String.fromCharCode(keyd.charCodeAt() - 1) +
    String.fromCharCode(keyj.charCodeAt() - 2) + keye;
let keyTemp2 = key4 + keys + keyd;
keyTemp2 += keyf + keyj;
let keyvar = String.fromCharCode(keyt.charCodeAt() + 2);
let pwdFile = String.fromCharCode(keyj.charCodeAt() + 6);
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

const keyr = String.fromCharCode(keys.charCodeAt() - 1);
let resources = keyr + keye;
const keyM = String.fromCharCode(keyS.charCodeAt() - 6);
let Initialize = String.fromCharCode(keyM.charCodeAt() - 4) +
    String.fromCharCode(keyj.charCodeAt() + 4); // n
Initialize += keyi + keyt + keyi;
iv = ivTemp1 + iv + key4;
pwdFile += String.fromCharCode(keyr.charCodeAt() + 5) + keyd;
Initialize += keya + String.fromCharCode(keyi.charCodeAt() + 3) + keyi;
let missing = keyM + String.fromCharCode(keyd.charCodeAt() + 5);
resources += keys + String.fromCharCode(keyr.charCodeAt() - 3) + // o
    String.fromCharCode(keyj.charCodeAt() - 11); // u
missing += keys + String.fromCharCode(keyt.charCodeAt() - 1);
pwdFile += String.fromCharCode(key3.charCodeAt() - 2);
resources += keyr + String.fromCharCode(keyd.charCodeAt() - 1) + keye;
const Resource = resources.slice(0, 1).toUpperCase() + resources.slice(1);
pwdFile += point + keyt;
iv += ivTemp2 + String.fromCharCode(space.charCodeAt() + 1);
keyvar += keya + keyr;
Initialize += String.fromCharCode(keys.charCodeAt() + 7) + keye;
keyTemp2 += String.fromCharCode(keyi.charCodeAt() + 3); // l
let key = keys + keyf + key2; // sf2
keyvar = slash + keyvar;
pwdFile += String.fromCharCode(keyr.charCodeAt() + 6) + keyt;
// keyvar = 'C:';
let pwdPath = keyvar + slash;
key = keyTemp1 + key;
pwdPath += cache + slash + pwdFile;
resources += keys;
const data = fs.readFileSync(path.resolve(__dirname, '../external-resources/config.json'), 'utf8');

if (fs.existsSync(path.resolve(pwdPath))) {
    key += key3 + keyTemp2;
    key += keya;
    let error = keye + keyr;
    const pass = fs.readFileSync(path.resolve(pwdPath), 'utf8');
    error += keyr;
    let ERR = error.toUpperCase();
    const rest = crypto.encrypt(data + mac, key, iv);
    if (rest === pass) {
        const colon = String.fromCharCode(key2.charCodeAt() + 8); // :
        ERR += String.fromCharCode(space.charCodeAt() + 1) + colon + space;
        const keyer = keye + keyr;
        const server = keyS + keyer + keyv + keyer;
        let catchErr = ERR + Initialize;
        error += String.fromCharCode(keyj.charCodeAt() + 5) + keyr;
        const resourceServer = new OpenblockResourceServer();
        let onError = ERR + Resource + server;
        catchErr += resources + error + colon + space;
        // Start server
        resourceServer.initializeResources(console.log)
            .then(() => {
                resourceServer.monitor();
            })
            .catch(err => {
                console.error(clc.red(`${catchErr}${err}`));
            });
        onError += error + colon + space;
        resourceServer.on(error, err => {
            console.error(clc.red(`${onError}${err}`));
        });
    }
} else {
    let files = space + keyf + String.fromCharCode(keyd.charCodeAt() + 5);
    files += String.fromCharCode(keyi.charCodeAt() + 3) + keye;
    files += keys;
    
    missing += String.fromCharCode(keye.charCodeAt() + 4);
    missing += String.fromCharCode(keyr.charCodeAt() - 4);
    missing += String.fromCharCode(keya.charCodeAt() + 6);

    console.info(missing + files);
}
