const t = require('tap');
const run = require('../').run;
const runAny = require('../').runAny;

t.test('runAny 1', t=>{
    return runAny({
        mainName: __filename,
        command: 'thing1'
    }).then(result=>{
        let {context} = result;
        return t.test('thing1?', t=>{
            t.notEqual(context.ran.indexOf('thing1'), -1);
            t.end();
        });
    });
}).then(t=>{
    return runAny({
        mainName: __filename,
    }).then(result=>{
        let {context} = result;
        return t.test('def?', t=>{
            t.notEqual(context.ran.indexOf('def'), -1);
            t.end();
        });
    });
}).then(t=>{
    return runAny().then(result=>{
        let {context} = result;
        return t.test('def?', t=>{
            t.notEqual(context.ran.indexOf('def'), -1);
            t.end();
        });
    });
}).then(t=>{
    return runAny({
        mainName: __filename,
        command: 'init thing1',
        useInit: false
    }).then(result=>{
        let {context} = result;
        return t.test('thing1?', t=>{
            t.notEqual(context.ran.indexOf('thing1'), -1);
            t.end();
        });
    });
});
