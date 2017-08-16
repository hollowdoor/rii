const acorn = require('acorn');
const path = require('path');

module.exports = function compile(source, {
    commands = [],
    filename = null,
    dirname = process.cwd(),
    cwd = null
} = {}){
    let footer = '';
    let ast;
    let fullName = path.join(dirname, filename + '');

    try{
        ast = acorn.parse(source, {
            locations: true,
            sourceFile: fullName,
            ecmaVersion: 8
        });
    }catch(e){
        let message = 'Unexpected token ('+e.loc.line+':'+e.loc.column+')'
        +'\n\n  in directory '+dirname
        +'\n  in filename  '+filename
        +'\n';

        let err = new SyntaxError(message);
        throw err;
    }

    ast.body.forEach(item=>{
        if(item.type === 'FunctionDeclaration'){

            let name = item.id.name;
            //console.log('item.id.name ',item.id.name);
            if(commands.indexOf(name) !== -1){
                footer += '\n___output[\''+name+'\']='+name+'.apply(null, ___args);';
            }
        }
    });

    if(!footer.length){
        return {
            code: null
        };
    }

    let code = (
`(function (___args, require, __dirname, __filename){
${source}
let ___output = {};
${footer}
return ___output; });`
);

    return {
        code
    };

}
