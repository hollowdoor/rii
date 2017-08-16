
function init(ctx, world){
    ctx.str = "I'm a string";
    let argv = require('yargs-parser')(world.argv.slice(3))
    world.extend(argv);
    world.extend({ran: []});
}

function def(ctx){
    ctx.ran.push('def');
    //Sanity?
    console.log(ctx.str);
}
