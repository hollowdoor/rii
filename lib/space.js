class World {
    constructor(world_factory, local){
        Object.defineProperty(this, 'context', {
            value: world_factory.context
        });

        ['cwd', 'argv']
        .forEach(key=>this[key] = world_factory[key]);

        Object.keys(local)
        .forEach(key=>this[key] = local[key]);

        Object.defineProperty(this, 'extend', {
            value: function(obj){
                Object.keys(obj).forEach(key=>{
                    this.context[key] = obj[key];
                });
            },
            enumerable: true
        });
    }
}

class Space {
    constructor({
        context = {},
        cwd = process.cwd(),
        argv = process.argv
    } = {}){
        this.context = context;
        this.cwd = cwd;
        this.argv = argv;
    }
    createWorld(local){
        return new World(this, local);
    }
}

module.exports = Space;
