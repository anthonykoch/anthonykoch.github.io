---
layout: post
author: Anthony Koch
title: Understanding JavaScript Prototypes
use_excerpt_as_description: true
tags: ['JavaScript', 'prototypes']
post_id: 6
---

Several months ago, I set out to get a deeper understanding of JavaScript, specifically in the area of prototypes. Prototypes were a fuzzy concept for me. I sort of knew how to use them, but didn't fully understand them. After a lot of study, I've started to see the picture of how prototypes work, and that they are not as complicated as I first thought.

<!-- endexcerpt -->

### What is a prototype?

Some confusion may arise when talking about prototypes because the word "prototype" may be used to describe the internal `[[Prototype]]` property of an object, or the `prototype` property of a function. These are two separate things, but later on we'll see that they relate.

#### Internal prototype

Strings, numbers, booleans, objects, arrays, and functions are created with an internal `[[Prototype]]` property. The value of this property is an object, whose purpose purpose will be explained later. Since this property is internal, it is not exposed to us through the code we write. However, when the fifth version of EcmaScript came along, the specification did allow the retrieval of this internal property with `Object.getPrototypeOf`. 

Some time later, browsers started implementing a property called  `__proto__`, which allows both reading and writing of an object's internal `[[Prototype]]` property. It's important to know that the use of this property is [highly discouraged](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto), and an alternative is explained later on. The `__proto__` property is only used here in examples as it provides a better illustration. 

Also, it's important to remember that both `Object.getPrototypeOf` and the `__proto__` property return the internal `[[Prototype]]` of an object. So, when I say `[[Prototype]]`, I'm referring to the object returned from `Object.getPrototypeOf` or `__proto__`. 

```javascript
var bob = {};
var str = 'Hello';
var num = 123;

// They all have a [[Prototype]], which we can retrieve with __proto__
console.log(typeof bob.__proto__); // 'object'
console.log(typeof str.__proto__); // 'object'
console.log(typeof num.__proto__); // 'object'

// we can also retrieve it with Object.getPrototypeOf
console.log(Object.getPrototypeOf(bob) === bob.__proto__); // true
```

#### Function prototype

Functions are created with a property called `prototype`, whose value is an object. Most people have probably found themselves using this property at some point. It is a common pattern to assign what are commonly called "methods", which are functions, or other values to this object, and then use the function as constructor, meaning the function is called with `new`. When the function is called with `new`, an object is returned that inherits the properties of the constructor's `prototype` object. This is called the "constructor" pattern.

```javascript
// Person is the constructor
function Person() {

}

// The prototype property is a normal object
console.log(Person.prototype); // {}

Person.prototype.eatFood = function() {
	console.log('scrumptious!');
};

var bob = new Person();

// bob is an object that "inherits" the eatFood function
bob.eatFood(); // 'scrumptious!'
``` 

The `eatFood` function was assigned to the `Person.prototype` object, but we can access it on `bob`. So, why does assigning values to the `prototype` object allow us to then access those values on objects returned from the constructor? Well, there are two parts to this: 

1. What happens in the constructor when the object is created.
2. How properties are resolved.

### Constructor functions

A constructor, according to the EcmaScript [spec](http://www.ecma-international.org/ecma-262/5.1/#sec-15), is a function that is meant for use with the `new` operator. There's nothing special about them; they're just functions. Normally, the name of the function is written in Pascal casing, but this is just a convention programmers use to signify that the function is intended to be used with the `new` operator.

When you call a function with the `new` operator, the function runs as it normally would, except the value of `this` is set to a newly created object, and the object created has its `[[Prototype]]` set to the `prototype` object of the constructor. After the code inside the function finishes, the newly created object is returned.

Below is an example of what happens in the background when a function is called with the `new` operator. The code below wouldn't actually run because assigning a value to `this` would generate a syntax error, but the code would otherwise run just fine. 

```javascript
function Person() {
	// Set "this" to a new object 
	var this = {};
	// Set the [[Prototype]] of the object to the constructor's prototype 
	this.__proto__ = Person.prototype;

	// The code defined in the function would run at this point

	// return the object
	return this;
}

Person.prototype.eatFood = function () {
	console.log('scrumptious!');
};

var bob = new Person();
bob.eatFood(); // 'scrumptious!'

// Bob's [[Prototype]] is Person.prototyope
console.log(bob.__proto__ === Person.prototype); // true
```

__Note:__ You can find this process in the ES5 spec [here](http://www.ecma-international.org/ecma-262/5.1/#sec-13.2.2).

This setting of the newly created object's `[[Prototype]]` to its constructor's `protototype` object is the same thing that happens for strings, numbers, booleans, objects, arrays, and functions. They all have their `[[Prototype]]` set to the `prototype` property of their associated constructor. 

```javascript
// An object's [[Prototype]] is Object.prototype
console.log({}.__proto__ === Object.prototype); // true

// An array's [[Prototype]] is Array.prototype 
console.log([].__proto__ === Array.prototype); // true

// A string's [[Prototype]] is String.prototype 
console.log('Hello'.__proto__ === String.prototype); // true
```

This is how the `[[Prototype]]` of an object relates to the `prototype` of its constructor, they're the same object. Although this is true, this doesn't explain how we can set the function `eatFood` on `Person.prototype`, and be able to call it on `bob`. This brings in the second part, which is property lookup. 

### Property lookup 

When a property isn't found on the object in question, the property lookup goes from the object to its `[[Prototype]]` object. From the earlier example of the `Person` constructor, we can see that the constructor sets `bob`'s `[[Prototype]]` to its `prototype` object. Therefore, when accessing a property on `bob` that `bob` doesn't have, the property lookup will go to the `Person.prototype` object. 

If the `Person.prototype` object didn't have the property, the property lookup would go to the `[[Prototype]]` of the `Person.prototype` object, which would be `Object.prototype`. If `Object.prototype` didn't have the property we would check its `[[Prototype]]`. However, `Object.prototype` has its `[[Prototype]]` explicitly set to null, the purpose being that the property lookup is supposed to end there, since the spec says when a `[[Prototype]]` that is null is reached, the property lookup ends and `undefined` should be returned in place of the property's value. 

__Note:__ If you're interested, you can read about the property lookup operations in the ES5 spec [here](http://www.ecma-international.org/ecma-262/5.1/#sec-8.12.2).

```javascript
The prototype chain of bob 

             Person.prototype               Object.prototype
                   |                              |
bob   ->   bob.__proto__   ->   bob.__proto__.__proto__
```

So, the purpose of the `[[Prototype]]` is as a delegate for property lookup in the case the original object doesn't have the property. In essence, it's another place to look for the properties of an object. 

An important thing to realize here is that the property lookup doesn't go from the object, to its constructor, and then to the constructor's `prototype` object. The property lookup goes from the object to whatever is set as its `[[Prototype]]`. We could at anytime change the value of `Person`'s `prototype` property to something else, and `bob`'s `[[Prototype]]` would still point to the constructor's original `prototype` object, because that's what `bob` was initialized with.

```javascript
function Person() {}
var originalPrototype = Person.prototype;

// Bob has its linking to the original prototype
var bob = new Person();

Person.prototype = {};

// Bob doesn't link to Person's new prototype
console.log(bob.__proto__ === Person.prototype);  // false

// Bob's `[[Prototype]]` is still the original Person.prototype object
console.log(bob.__proto__ === originalPrototype); // true
```

This is why you'll hear sayings such as "objects link to other objects". Objects are directly linked together through their `[[Prototype]]`, meaning the constructor is actually extraneous. `bob` links directly to another object, that object being `Person.prototype`, and `Person.prototype` links directly to another object, that object being `Object.prototype`. 

Now, knowing how property lookup works, we should be able to see this property lookup delegation at work if we were to put a property on `Object.prototype`. Since mostly all objects have a prototype chain that leads back to `Object.prototype`, we should be to access it on to strings, numbers, objects, arrays, etc.

```javascript
Object.prototype.coolStuff = function () {
	console.log('Really cool');
};

({}).coolStuff();     // 'really cool'
[].coolStuff();       // 'really cool'
''.coolStuff();       // 'really cool'
(123).coolStuff();    // 'really cool'
function eatFood() {}
eatFood.coolStuff();  // 'really cool'

Object.prototype.coolStuff.coolStuff(); // 'really cool'
``` 

The last one, where we call `coolStuff` as a property of itself, works because `coolStuff` has its `[[Prototype]]` set to `Function.prototype`. Since `Function.prototype` doesn't have a property with the name of `coolStuff`, the property lookup goes to the `[[Prototype]]` of `Function.prototype`, which is `Object.prototype`. Since `Object.prototype` has a property named `coolStuff`, the value for the property is returned.

```
The prototype chain of coolStuff

      Function.prototype                     Object.prototype 
              |                                    |
coolStuff.__proto__   ->   coolStuff.__proto__.__proto__
```

As another fun example, we'll set a property on `Object.prototype` that has a  number as the key, and then access the same key on an array.

```javascript
var arr = [];
Object.prototype[0] = 'tomatoes';
console.log(arr[0]);

var names = ['John', 'Bob', 'Jim'];
console.log(names[0]);
```

What do you think will be logged to the console with `arr[0]`? If your answer is `tomatoes`, you'd be correct! Array indices are properties, and resolve in the same way properties do. The property lookup goes from the array, to `Array.prototype`, and then to `Object.prototype`. 

What do you think will be logged to the console with `names[0]`? If you guessed `John`, you'd also be correct. Since the `names` array has a property with the name of `0`, there is no need to check the prototype chain.

### Prototypes without constructors

The examples before show objects having a `[[Prototype]]` such as `String.prototype` and `Person.prototype`, where `String` and `Person` are constructor functions. But, as was mentioned before, constructors are extraneous and aren't actually necessary for inheritance to take place. The only parts necessary are two objects, and all we have to do is set one object as the `[[Prototype]]` of the other object. 

```javascript
var bob = {};
var person = {
	eatFood: function () {
		console.log('scrumptious!');
	}
};

// Sets person as the [[Prototype]] of bob
bob.__proto__ = person;

// bob can still eat his food
bob.eatFood(); // 'scrumptious!'
```

In the above example, `person` is set as the `[[Prototype]]` of `bob`, meaning `bob` will now delegate property access to `person` when `bob` itself doesn't have the property.  

__Note:__ Although this would produce the intended result, assigning to the `__proto__` property in this way is [highly discouraged](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto). The safe way to set the `[[Prototype]]` of an object is with `Object.create`. 

#### Object.create

`Object.create` is a function that simply creates an object and sets the object's `[[Prototype]]` to what is passed as the first argument. It also allows defining new properties on the object, but we won't focus on that here. 

```javascript
var person = {
	eatFood: function () {
		console.log('scrumptious!');
	}
};

var bob = Object.create(person);

// Bob's [[Prototype]] is set to person
console.log(bob.__proto__ === person); // true 
bob.eatFood(); // 'scrumptious!'
```

With this comes the prototypal design pattern. Some may say this pattern "creates objects from other objects", but in my opinion, this isn't really accurate, since what's happening is we're just creating a new, arbitrary object, and settings its `[[Prototype]]` to another object. There isn't really a creation from another object. There isn't a copying of another object. There's just an object, which delegates property lookup to its `[[Prototype]]` object, and so on through its prototype chain.

```javascript
// The functionality representing a person
var person = {
	eatFood: function () {
		console.log('scrumptious!');
	}
};

// The functionality representing a salesman
var salesman = Object.create(person);
// We then extend salesman to have the functionality it needs
salesman.sellThings = function () {
	console.log('I am selling things');
}

// We can then create objects that have the functionality of a person and salesman
var bob = Object.create(salesman);
bob.sellThings(); // 'I am selling things'
bob.eatFood(); // 'scrumptious!'

// We can then set properties onto bob as needed
bob.firstName = 'bob';

// The prototype chain of bob looks like this:

     salesman   person  Object.prototype
        |         |          |
bob.__proto__.__proto__.__proto__
```

#### Comparing Object.create and constructors

If we compare the simplified illustration of what happens in the background of a constructor call and a simplified version of `Object.create`, we would see some similarities. 

```javascript
function Person() {
	// Create a new object 
	var this = {};
	// Set the object's [[Prototype]]
	this.__proto__ = Person.prototype;

	// The code in the function would run at this point

	// Return the object
	return this;
}

Object.create = function (prototype) {
	// Create a new object 
	var obj = {};
	// Set the object's [[Prototype]]
	obj.__proto__ = prototype;

	// Return the object
	return obj;
};
```

They both create a new object, and then set the `[[Prototype]]` of the new object to another object, which sets up the environment to allow property delegation to work. So, constructors are more like factories, returning objects pre-linked to another object, and the linking just happens to be to the constructor's `prototype` object. 

Now, you may say, "That's not the Object.create polyfill I've seen elsewhere!". That's true, it's not. If we were to look at a polyfill for `Object.create` we would see the following.

```javascript
Object.create = function (proto, properties) {
	if (typeof proto !== 'object' && typeof proto !== null) {
		throw new Error('Object prototype may only be an Object or null');
	}

	function Temp() {}
	Temp.prototype = proto;

	// Create the new object 
	var obj = new Temp();

	ObjectDefineProperties(obj, properties);

	return obj;
};
```

The reason why a constructor is used in the actual polyfill instead of `__proto__` is because assigning to `__proto__` brings performance hits, and may not entirely be cross browser. The only way to create an object with a specific `[[Prototype]]` in older browsers is with a constructor function. 

If we look at the definition of `Object.create` in NodeJS, we would see that it doesn't use a constructor function (code obtained from the [NodeJS github repository](https://github.com/nodejs/node/blob/db9e122182f7e605eba2eb2e9ddea0bf00bb572c/deps/v8/src/js/v8natives.js#L1017)).

```javascript
// ES5 section 15.2.3.5.
function ObjectCreate(proto, properties) {
  if (!IS_SPEC_OBJECT(proto) && proto !== null) {
    throw MakeTypeError(kProtoObjectOrNull, proto);
  }
  var obj = {};
  %InternalSetPrototype(obj, proto);
  if (!IS_UNDEFINED(properties)) ObjectDefineProperties(obj, properties);
  return obj;
}
```

There's no constructor function here. It literally just creates a new, empty object, and sets the newly created object's `[[Prototype]]` with some sort of internal function. 

#### Creating objects without prototypes

When `Object.create` is passed `null`, the object returned will have no object set as its `[[Prototype]]`. I have yet to find a use case for this, but it's interesting nonetheless. 

```javascript
var bob = Object.create(null);
console.log(Object.getPrototypeOf(bob)); // null

bob.toString(); // TypeError: bob.toString is not a function
```

If we try to call the `toString` property of `bob`, we'll get a TypeError saying "bob.toString is not a function". This is because the `toString` property is defined on `Object.prototype`, but since `bob` has a `[[Prototype]]` that is `null`, the property lookup has nowhere to go, which means it can't reach `Object.prototype`. As a result, the property lookup returns `undefined`, which of course is not callable, hence "bob.toString is not a function". 

### Constructors, classes, and prototypal patterns

It doesn't matter which pattern you choose, whether it be the constructor pattern, classes, the prototypal pattern, or any other pattern that claims "inheritance" in JavaScript. They __all__ use the same underlying mechanism, which is the delegation of property lookup through an object's prototype chain. 

### Primitive prototypes

I have referred to strings, numbers, and booleans as objects, and that we can access properties on them, but this is not technically true. Strings, numbers, and booleans are primitives, and they themselves don't have properties. When accessing a property on a value that is a primitive, the JS engine wraps the primitive in an object wrapper. For example, a number would be wrapped in a Number object wrapper, and a string would be wrapped in a String object wrapper. This process is called "boxing and unboxing". 

So, when I call numbers, strings, and booleans objects, I'm referring to their object wrappers. The wrappers are the ones that we are accessing properties on, not the primitive itself. 

__Note:__ The function that wraps primitives in their object wrappers can be found [here](http://www.ecma-international.org/ecma-262/5.1/#sec-9.9).

```javascript
// so this
'hello'.__proto__
// is turned into this by the JS engine automatically
new String('hello').__proto__

console.log(new String('hello')); 
// {
// 	0: "h", 
//  1: "e", 
//  2: "l", 
//  3: "l", 
//  4: "o", 
// 	length: 5,
// 	[[PrimitiveValue]]: "hello"
// }

console.log(new Number(10)); // { [[PrimitiveValue]]: 12 }
```

### Conclusion

Prototypes don't have to be magic. Once you learn how they work, it will explain a lot of the patterns that are out there. If you still don't understand how prototypes after reading this, that's normal. It took me a while before I finally understood them. Once you learn them though, you'll realize the concept is actually really simple! Keep on learning and you'll get them down!

### Further Reading 

[Why is mutating \_\_proto\_\_ bad](http://stackoverflow.com/questions/23807805/why-is-mutating-the-prototype-of-an-object-bad-for-performance)