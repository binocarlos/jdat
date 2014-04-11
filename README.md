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

var HeroClass = function(arr){
  this.models = arr;
}

HeroClass.prototype.halfspeed = function(){
  return this.models[0].speed/2;
}


jdat({
  // the prototype we will extend
  proto:HeroClass.prototype,
  // the field of the prototype that contains an array of models
  field:'models',
  // the field of each model that is a child array of models
  childfield:'children',
  // a function to return a new instance from an array of models
  spawn:function(data){
  	return new HeroClass(data);
  }
})


var herodata = [{
  name:'Superman',
  speed:9,
  children:[...]
},{
  name:'Spiderman',
  speed:8,
  children:[...]
},{
  name:'SilverSurfer',
  speed:11,
  children:[...]
}]


var heroes = new HeroClass(herodata);

var speeds = heroes.map(function(hero){
  return hero.get(0).speed;
})

var silver = heroes.eq(2);

silver.children().forEach(function(silverchild){
  // silverchild is a HeroClass with the children as models
})

heroes
  .descendents()
  .each(function(instance){
    console.log(instance.get(0).name);
  })
```

## api

#### `jdat(options)`

Assign the jdat methods to a prototype - the options are:

 * proto - the prototype we will extend
 * models - the field of the prototype that contains an array of models
 * childfield - the field of each model that is a child array of models
 * spawn - a function to return a new instance from an array of models


#### `children()`

Return an instance containing all children of the models in the array:

```js
testdata.children().forEach(function(instance){
  console.log(instance.models[0].name);
})

// Superman
```

#### `descendents()`

Return an instance containing all descendents of the models in the array:

```js
testdata.descendents().forEach(function(instance){
  console.log(instance.models[0].name);
})

// Superman & children names
// Spiderman & children names
// SilverSurfer & children names
```

#### `recurse(fn)`

Run a function over each of the descendents turned into a new instance:

```js
testdata.recurse(function(instance){
  console.log(instance.models[0].name);
})

// Superman & children names
// Spiderman & children names
// SilverSurfer & children names
```


#### `each(fn)`

Loop over each model in the array and pass a spawned instance to a function:

```js
testdata.each(function(item){
  console.log(item.models[0].name);
})

// Superman
// Spiderman
// SilverSurfer
```

#### `map(fn)`

Loop over each model in the array and pass a spawned instance to a function and return the mapped results:

```js
var names = testdata.map(function(item){
  return item.models[0].name.toUpperCase();
})

// SUPERMAN
// SPIDERMAN
// SILVERSURFER
```

#### `eq(index)`

Return an instance of the class with the model from 'index' as the only model in the array:

```js
var secondone = testdata.eq(1);

console.log(secondone.models[0].name);

// Spiderman
```

#### `first()`

Return an instance with only the first model in its collection:

```js
var first = testdata.first();

console.log(first.models[0].name);

// Superman
```

#### `last()`

Return an instance with only the last model in its collection:

```js
var first = testdata.last();

console.log(first.models[0].name);

// SilverSurfer
```

#### `get(index)`

Return the raw model in the model array at 'index':

```js
var secondmodel = testdata.get(1);

console.log(secondmodel.name);

// Spiderman
```

#### `count()`

Return the length of the model array

```js
var count = testdata.count();

console.log(count);

// 3
```

#### `clone()`

Return an instance that has a copy (JSON.stringify / JSON.parse) of the models:

```js
var newone = testdata.clone();
```

#### `spawn()`

Use the factory function to return new instances of the class with different data:

```js
var newone = testdata.spawn([{
	name:'otherdata'
}])
```

#### `instances()`

Return an array of instances each with only one model in their array:

```js
var instances = testdata.instances();

console.log(instances.length);

// 3
```

## license

MIT
