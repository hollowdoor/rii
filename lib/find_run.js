const run = require('./run.js');
const resolveCommands = require('./resolve_commands.js');
const glob = require('globby');
const Space = require('./space.js');

module.exports = function findRun({
    command = null,
    context = {},
    ext = 'cmd.js',
    mainName = null,
    argv = process.argv,
    useInit = true
} = {}){

    let commands = resolveCommands(command, {
        argv,
        mainName
    });

    let space = new Space({
        context,
        cwd:process.cwd(),
        argv
    });

    return glob('*.'+ext).then(files=>{
        let index;
        let output;

        if(useInit && (index = files.indexOf('init.'+ext)) !== -1){
            let filename = files.splice(index, 1)[0];
            let initCommands = ['init'].concat(commands);

            if(!commands.length){
                initCommands.push('def');
            }
            output = run({
                space,
                filename, commands:initCommands,
                context
            });
        }

        files.forEach(filename=>{
            run({space, filename, commands, context});
        });

        return {
            files,
            context,
            commands
        };
    });
};
