
function thing1(ctx, world){
    ctx.ran.push('thing1');
}

function thing2(ctx){
    ctx.ran.push('thing2');
}

function thing3(){
    throw new Error('an error');
}

const thing4 = function thing4(){

};

async function thing5(){

}
