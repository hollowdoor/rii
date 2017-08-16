const fs = require('fs');
const vm = require('vm');
const path = require('path');
const compile = require('./compile.js');

const cwd = process.cwd();

module.exports = function run({
    filename,
    commands,
    context = null,
    space = null
} = {}){
    
    let contents = fs.readFileSync(filename, 'utf8');
    let fullName = path.join(cwd, filename);

    let world = space.createWorld({
        filename
    });

    try{

        let src = compile(contents, {
            commands,
            filename,
            dirname: cwd
        });

        if(!src.code) return null;

        let fnargs = [context, world];
        return vm.runInThisContext(src.code, {
            filename,
            displayErrors: true,
            lineOffset: -1
        })
        (
            fnargs,
            require,
            cwd,
            fullName
        );
    }catch(e){
        throw e;
    }
}
