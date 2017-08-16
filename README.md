rii
===

Install
-------

`npm install --global rii`

Command Line Usage
------------------

`rii <command> --some-flag`

About
-----

`rii` is a mechanism to consume scripts that contain functions that are called by name as `<command>`. For instance if you were to run `rii <command>` on the command line.

Any file with a `.cmd.js` extension will run by executing `rii`.

Example
-------

**my_directory/script.cmd.js**

```javascript
function thing1(ctx, world){
    //To run this function:
    //rii thing1
    console.log('I am thing one.');
}

function thing2(ctx, world){
    //To run this function:
    //rii thing2
    console.log('I am thing two.');
}

function throwError(){
    //To run this function:
    //rii throw-error
    //This error will print to the console.
    throw new Error('an error');
}
```

Change to `my_directory` run `rii thing1`, and the console prints `I am thing one.`.

Run `rii "thing1 thing2"`, and the console will print:

```
I am thing one.
I am thing two.
```

init
----

If you have an `init.cmd.js` file in the directory you run `rii` this `init.cmd.js` will be run first. If you have an `init()` function defined in `init.cmd.js` that function will be ran before all others.

Arguments
---------

Each function you define will receive two arguments `ctx` (first parameter), and `world` (second parameter).

`ctx` is a regular object where you can set properties at your leasure. All properties/values set on `ctx` will be shared.

`world` is an object that gives you access to values, and operation(s).

world
-----

The world parameter will look something like this:

```javascript
World {
  cwd: '/path/to/my_project',
  argv: [
       '/usr/bin/nodejs',
       '/path/to/rii' ],
  filename: 'script1.cmd.js',
  extend(object){
      //Passing object here extends `ctx`
  }
}
```

To do
-----

* Better documentation
* Show coverage
* Add sub-directory runner

Support [acorn](https://github.com/ternjs/acorn) which is used in `rii` source.
