#!/usr/bin/env node
const runAny = require('./index.js').runAny;

runAny({mainName: __filename})
.catch(e=>console.error(e));
