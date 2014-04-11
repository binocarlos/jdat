jdat
====

![Build status](https://api.travis-ci.org/binocarlos/jdat.png)

A wrapper for an array of models with a JQuery like syntax

## installation

```
$ npm install jdat
```

## usage

jdat will add methods to an object prototype:

```js
var jdat = require('jdat');

function MyClass(arr){
  this.models = arr;
}

jdat({
  // extend the prototype of MyClass with jdat methods
  extend:MyClass.prototype,
  // reference the 'models' property of MyClass
  field:'models',
  // use '_children' as the children property of each model
  children:'_children',
  // the factory function for creating new spawned instances
  factory:function(data){
  	return new MyClass(data);
  }
})

var testdata = new MyClass([{
  name:'test1',
  _children:[{
  	name:'child1'
  }]
},{
  name:'test2'
}])

var count = 0;

testdata
  .descendents()
  .filter(function(instance){
    count++;
    return instance.get(0).name=='child1';
  })
  .each(function(instance){
    console.log(instance.get(0).name);
  })

console.log(count);

// child1
// 3
```

## api

#### `jdat(options)`

Assign the jdat methods to a prototype - the options are:

 * extend - the prototype to extend with the jdat mixin
 * field - the property of the instance that is the model array
 * children - the property of each model that is the children array
 * factory - a function that will generate a new instance

#### `instances()`

Return an array of instances each with only one model in their array:

```js
testdata.instances().forEach(function(instance){
  console.log(instance.models[0].name);
})

// test1
// test2
```

#### `children()`

Return an instance containing all children of the models in the array:

```js
testdata.children().forEach(function(instance){
  console.log(instance.models[0].name);
})

// child1
```

#### `descendents()`

Return an instance containing all descendents of the models in the array:

```js
testdata.descendents().forEach(function(instance){
  console.log(instance.models[0].name);
})

// test1
// child1
// test2
```

#### `recurse(fn)`

Run a function over each of the descendents turned into a new instance:

```js
testdata.recurse(function(instance){
  console.log(instance.models[0].name);
})

// test1
// child1
// test2
```


#### `each(fn)`

Loop over each model in the array and pass a spawned instance to a function:

```js
testdata.each(function(item){
  console.log(item.models[0].name);
})

// test1
// test2
```

#### `map(fn)`

Loop over each model in the array and pass a spawned instance to a function and return the mapped results:

```js
var names = testdata.map(function(item){
  return item.models[0].name.toUpperCase();
})

// TEST1
// TEST2
```

#### `filter(fn)`

Get an array of instances that pass the filter function:

```js
var filtered = testdata.filter(function(item){
  return item.models[0].name.match(/2$/);
})

console.log(filtered[0].models[0].name);

// test2
```


#### `eq(index)`

Return an instance of the class with the model from 'index' as the only model in the array:

```js
var secondone = testdata.eq(1);

console.log(secondone.models[0].name);

// test2
```

#### `first()`

Return an instance with only the first model in its collection:

```js
var first = testdata.first();

console.log(first.models[0].name);

// test1
```

#### `last()`

Return an instance with only the last model in its collection:

```js
var first = testdata.last();

console.log(first.models[0].name);

// test2
```

#### `get(index)`

Return the raw model in the model array at 'index':

```js
var secondmodel = testdata.get(1);

console.log(secondmodel.name);

// test2
```

#### `count()`

Return the length of the model array

```js
var count = testdata.count();

console.log(count);

// 2
```

#### `clone()`

Return an instance that has a copy (JSON.stringify / JSON.parse) of the models:

```js
var newone = testdata.spawn([{
	name:'other'
}])
```

#### `spawn()`

Use the factory function to return new instances of the class with different data:

```js
var newone = testdata.spawn([{
	name:'other'
}])
```

## license

MIT
