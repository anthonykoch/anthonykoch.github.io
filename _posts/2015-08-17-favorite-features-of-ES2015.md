---
layout: post
author: Anthony Koch
title: My favorite features of ES2015
use_excerpt_as_description: true
tags: ['JavaScript', 'ES2015']
post_id: 1
---


ES2015, formerly called ES6, brings a lot of great features to JavaScript. A lot of the new features provide a much cleaner syntax for common tasks, and makes writing JavaScript so much better. After using these features for a while, I can't imagine going back to ES5. Here's an overview of my favorite features of ES2015. 


<!-- endexcerpt -->


### Object Destructuring

Object destructuring is so far my favorite feature of ES2015. Why is destructuring so useful? The ES5 way of achieving the same result is pretty verbose, especially when there are multiple values you want to grab from an object.

```javascript
var { name, age, country } = person;

// verses assigning each one 
var name    = person.name;
var age     = person.age;
var country = person.country;
```


#### Destructuring syntax 

```javascript
var person = { name: 'John', age: 20, country: 'US' };

var { age } = person;
console.log(age); // 20
```

In the above example, the age property of the person object is assigned to a variable called `age`. This is actually a shortened form of the syntax where the name in between the curly brackets identifies the property to be assigned, as well as the variable name the you want the property to be assigned to. 

```javascript
var { age: theAgeOfThePerson } = { age: 20 };
console.log(theAgeOfThePerson); // 20
console.log(age); // ReferenceError

// verses the old way
var theAgeOfThePerson = person.age;
```

The above shows an example of the longer syntax. The name on the left side of the colon is the property name, whose associated value in the object will be used in the assignment. On the right side of the colon is the name of the variable you want to assign the property's value to.

A similiar syntax is used to retrieve nested properties. We still have a name on the left side of the colon identifying the property, but instead of a variable name on the right, the destructuring syntax just repeats on the right side of the colon, starting with the curly bracket.

```javascript
var { target: { firstElementChild } } = event;

// verses the old way 
var firstElementChild = event.target.firstElementChild;
```

Destructuring gets even better when paired with ES2015 defaults. Default values are values that will be used in the case the value you want to retrieve is `undefined`. In the example below, the friends property doesn't exist in the person object, so the variable `friends` is assigned to an empty array. 

```javascript
var person = { name: 'John', age: 20, country: 'US' };

var { name, age, country, friends=[] } = person;
console.log(friends); // []

// verses the old way
var friends = (person.friends === undefined) ? [] : person.friends;
```

#### Parameter destructuring

One great thing about destructuring is that it can be used in function parameters. This was not a favorite feature of mine at when I first saw it because I didn't like that it made the parameter list look cluttered and extremely confusing. After I started using it, though, I saw the usefulness. It really makes the body of a function a lot cleaner! However, if I find the the parameter destructuring getting too long or confusing, I will just move the destructuring into a var destructuring statement. 

```javascript
function createPerson({ name, age, country }) {
	console.log(name, age, country)
}

var person = { name: 'John', age: 20, country: 'US' };
createPerson(person); // 'John' 20 'US'

var todoItems = todos.map(function ({ id, text, completed }) {
	<TodoItem key={id} text={text} completed={completed} />
});
```

### Rest and Spread

It took me some time to understand what the rest/spread operator actually did. The reason was because this operator can be used two different ways, and the two ways accomplish two very different tasks. The two ways are rest and spread. "Rest" has to do with gathering the __rest__ of remaining items, and "spread" spreads out values so that each value acts as an individual item. Rest and spread both refer to the same `...` operator, but the two names are used to differentiate how the operator is used.


#### Rest 

```javascript
// Note: The `remaining` variable name in the parameter 
// list is arbitrary. You can name it whatever you want. 
function testRest(first, second, ...remaining) {
	console.log(first, second, remaining);
}

testRest(); // undefined, undefined, []
testRest(1, 2); // 1, 2, []
testRest(1, 2, 3, 4, 5); // 1, 2, [3, 4, 5]

// The parameter length is 2, not 3
console.log(testRest.length); // 2
```

The above code shows an example of what is called "rest parameters". It is one of the ways in which the rest operator can be used. How rest parameters work is, any number of arguments that are passed beyond the [length property of the function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length) will be gathered to an array and assigned to the variable the rest operator was used with. It's important to note that the rest parameter itself isn't counted, which is why the length property returns 2 and not 3.  

I don't use rest parameters that often. I usually only use it when I want a to use the arguments as an actual array.

```javascript
// Note: The name `args` is not a special keyword, 
// it could be named anything.
function testRest(...args) {
	console.log('args:', args);

	// verses the old way
	var args = Array.prototype.slice(arguments, 0);
}

testRest('John', 'Amy', 'Tom'); // args: ['John', 'Amy', 'Tom']
testRest(1,2,3); // args: [1, 2, 3]
```

Another way the rest operator can be used is with array destructuring. The array destructuring syntax is similar to object destructuring, except square brackets are used, and each variable name corresponds to the value of the same index in the array. For example, the first variable name corresponds to the first index, and the second variable the second index. When the rest operator is used with array destructuring, the rest variable will be assigned an array containing the rest of the items that weren't assigned to a variable. 

```javascript
var names = ['John', 'Amy', 'Nick', 'Tom', 'Jake'];

var [first, second, third, ...theRemainingItems] = names;
console.log(first, second, third); // 'John', 'Amy', 'Nick',
console.log(theRemainingItems); // ['Tom', 'Jake']
```

#### Spread

The spread operator spreads out the values of an array (or array like object) to act like individual items. It is somewhat like of Python's single star `*` operator in the fact that it allows passing the values of an iterable as individual items to a function, except it has more functionality than that alone. 

```javascript
function logPerson(name, age) {
	console.log(name, age);
}

var person = ['John', 20];

// Each item in the array in the person
// array is passed as an individual argument
logPerson(...person); // 'John' 20

// verses the old way 
logPerson.apply(null, person); // 'John', 20
```

But wait, there's more! The spread operator can also be used on arrays in arrays! 

```javascript
var names = ['Amy', 'Tom']

// Shallow copies the array
var namesCopy = [...names];
console.log(namesCopy); // ['Amy', 'Tom']

names = ['John', ...names, 'Jake']
console.log(names); // ['John', 'Amy', 'Tom', 'Jake']

// BabelJS would transpile this to
var names = ['John'].concat(people, ['Jake']);
```

I tend to use spread more often than rest. The most often use case is getting a real array from an array like object. 

```javascript
[...document.querySelectorAll('p')]
	.forEach(function (element) {
		console.log(element);
	});

// verses
Array.prototype
	.forEach.call(document.querySelectorAll('p'), 
	function () {
		console.log('this is atrocious');
	});
```

#### Not just for arrays

I've recently discovered that BabelJS supports using the rest and spread operator on objects. At the moment, it seems to just transpile down to a call to Object.assign.

```javascript
var Store = {
	items: [],
	...EventEmitter.prototype,
};

// the above gets transpiled to 
var Store = _extend({}, EventEmitter.prototype);
```

 The rest portion does what rest usually does and gathers any remaining properties that weren't assigned while destructuring. 

```javascript
var person = { name: 'John', age: 20, country: 'US', state: 'CA' };
var { name, age, ...attributes } = person;

console.log(name, age);  // 'John' 20 
console.log(attributes); // { country: 'US', state: 'CA' }
```

### Arrow functions

Although arrow functions aren't really a favorite feature of mine, I thought they deserved a mention. The first thing you should know about arrow functions is that they are not a replacement for the normal function syntax. Part of what they do,<del>is provide an alternate syntax for binding the `this` value of a function to the value of "this" in its surrounding scope.</del> Basically, it's provides the functionality of calling `.bind(this)` on a function.

> __Edit:__ This explanation is wrong. Although arrow functions provide the same functionality as calling .bind(this) on function, it is not what actually happens. Apparently, arrow functions don't actually bind the value of `this` at all, but allow `this` to resolve to the value of `this` in its outer scope.

_[Arrow this](http://blog.getify.com/arrow-this/)_ By Kyle Simpson

```javascript
var person = {
	name: 'John', 
	speak: function () {
		setTimeout(() => {
			// The value of `this` becomes person
			console.log(this.name);
		}, 1000);

		// The alternative is using .bind(this)
		setTimeout(function () {
			console.log(this.name);
		}.bind(this), 1000);
	}
};

person.speak(); // 'John'
```

An arrow function's `this` value can't be set or overriden. Trying to use call, bind, or apply will have no effect on an arrow function. This [can trip you up](http://derickbailey.com/2015/09/28/do-es6-arrow-functions-really-solve-this-in-javascript/) if you aren't careful. 

```javascript
// The outer scope here is the global scope
console.log(this === window); // true

var fn = () => {
	console.log(this === window);
};

var boundFn = fn.bind({});
boundFn(); // true
fn.call({}); // true

var button = document.querySelector('#button');
button.addEventListener('click', () => {
	// the value of `this` will resolve to window,
	// not the element that was clicked
	console.log(this === window); 
});
```

#### Arrow arguments

Arrow functions do not create an arguments object of their own, which allows an arguments reference inside an arrow function to resolve to its outer scope. 

```javascript
// No arguments object is created 
var a = () => console.log(arguments);
a(); // ReferenceError: arguments is not defined 

(function () {
	var args = arguments;
	
	var a = () => console.log(arguments === args);
	a(); // true 

	function b() {
		console.log(arguments === args);
	};
	b(); // false 
}());
```

When function `a` is called, no arguments variable is created, allowing the arguments identifier to resolve to the arguments object created by the anonymous function. When function `b` is called, it will create its own arguments variable, which results in the arguments identifier resolving to the arguments object created by function b. 

#### Shorter syntax 

Lastly, arrow functions do offer a shorter syntax. It's not just the removal of the word "function" that makes it shorter, but that arrow functions can emit the brackets and return statement, and the expression on the right side of the fat arrow will be returned. 

```javascript
// the expression (person.name === 'John') is returned
people.filter((person) => person.name === 'John');

// Also valid 
people.filter((person) => {
	return person.name === 'John';
});
```

#### When to use an arrow function

Some say you should always use the arrow function syntax, others say never use it. Personally, I do use it as an alternative `.bind()` syntax, as well as one liners for functions such as map and filter. For everything else, I still use `function () {}`. 


### Other features

There are many other syntax features and functionality ES2015 brings, as well as different ways these features can be combined. This was just an overview of my favorites. I highly recommend checking out Kyle Simpson's _You Don't Know JS_ series for a much more in depth detail of ES6 features. 





### Further Resources 

[ES6 Features](https://github.com/lukehoban/es6features)
[You Don't Know JS: ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond) by Kyle Simpson
[Six Speed](http://kpdecker.github.io/six-speed/) A peformance chart of ES6 features compared to ES5 equivalent operations.