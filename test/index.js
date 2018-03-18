const fs = require('fs');
const path = require('path');
const swaggerParser = require('../dist/swagger-parser');

const swaggerJson = fs.readFileSync(path.resolve(__dirname, '../swagger-json/example.json'), {
    encoding: 'utf-8'
});

const schemaList = swaggerParser(swaggerJson);
console.log(JSON.stringify(schemaList));