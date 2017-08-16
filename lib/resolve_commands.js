const camelcase = require('camelcase');

module.exports = function resolveCommand(
    command,
    {
        argv = [],
        mainName = null
    } = {}
){
    if(typeof command !== 'string' && mainName){
        for(let i=0; i<argv.length; i++){
            if(mainName === argv[i]){
                command = argv[i+1] || null;
            }
        }
    }

    if(!command) return [];
    return (command + '')
    .split(' ')
    .map(s=>camelcase(s));
};
