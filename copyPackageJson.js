const fs = require('fs');
const path = require('path');

const components = fs.readdirSync('./src');

components.map((componentDir) => {
    try {
        if(!fs.lstatSync(path.resolve('.', 'src', componentDir)).isDirectory()) return;

        const source = path.resolve('.', 'src', componentDir, 'package.json');
        const destination = path.resolve('.', componentDir, 'package.json');

        fs.createReadStream(source).pipe(fs.createWriteStream(destination));
    } catch(error) {
        console.warn(error);
    }
});