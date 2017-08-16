const t = require('tap');
const resolveCommands = require('../').resolveCommands;
const run = require('../').run;
const Space = require('../').Space;
const compile = require('../').compile;

let space = new Space();
t.equal(space.cwd, process.cwd());

let commands = resolveCommands(null, {
    mainName: 'bla',
    argv: ['blue', 'bla', 'cmd']
});
t.equal(commands[0], 'cmd');

let commands2 = resolveCommands(null);
t.notOk(commands2.length);

let src = compile('let m = "s";');
t.notOk(src.code);

let result = run({
    filename: 'script1.js',
    commands: ['thing2'],
    context: {},
    space: new Space({context: {}, cwd:process.cwd()})
});
t.equal(result.thing2, 2);
t.equal(result.thing1, undefined);

t.throws(()=>{
    let result2 = run({
        context: {},
        space: new Space({context: {}, cwd:process.cwd()})
    });
});

let result2 = run({
    filename: 'script1.js',
    context: {},
    space: new Space({context: {}, cwd:process.cwd()})
});
t.notOk(result2);

t.throws(()=>{
    let result3 = run({
        filename: 'bad.js',
        context: {},
        space: new Space({context: {}, cwd:process.cwd()})
    });
});

t.throws(()=>{
    let result3 = run();
});
