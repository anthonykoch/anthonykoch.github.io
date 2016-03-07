---
layout: post
author: Anthony Koch
title: Why you shouldn't loop arrays with for-in
use_excerpt_as_description: true
tags: ['JavaScript', 'arrays']
post_id: 4
---


I had a friend ask me why you shouldn't iterate over arrays with a for-in loop, since after all, when he tried it everything worked as expected. Well, the reasoning for why you shouldn't do this is not immediately apparent, especially if you do not understand how property lookup and prototypes work. 


<!-- endexcerpt -->


### What does a for-in loop do?

A for-in loop enumerates over an object's properties, including the properties in the object's prototype chain. Arrays are a type of object, exhibiting the same characteristics as objects, but with extended functionality. Array indices are properties, which is why they are enumerated in for-in loops.

```javascript
var arr = [1, 2, 3];

for (var key in arr) {
  // Would log 0, 1, 2
  console.log(key);
}
```

If you enter the above code into the console, it will log `0`, `1`, and `2`, which are the indices of the items in the array. So, what's the issue? Well, let's just say we wanted to include a polyfill in our script that implements some cool, new upcoming feature for arrays and that the method is called `coolMethod`. Here comes the issue, since a for-in loop enumerates over an object's properties, and includes the object's prototype chain in the enumeration, we would find that `coolMethod` would also be logged to the console along with the indices of the array. 

```javascript
Array.prototype.coolMethod = function() {
  // coolMethod polyfill 
};

var arr = [1, 2, 3];

for (var key in arr) {
  // Would log 0, 1, 2, 'coolMethod'
  console.log(key);
}
```

You could technically get around this by using `Object.defineProperty` to define `coolMethod` as non-enumerable, but you can't ensure every library you're using will do this. 

Now, here's something that may blow your mind if you aren't familiar with the way JavaScript prototypes work. We don't even have to set `coolMethod` on `Array.prototype`. Since the prototype chain of an array leads back to `Object.prototype`, we can set `coolMethod` on `Object.prototype` and have it show up in the for-in enumeration of the array. 

```javascript
Object.prototype.coolMethod = function () {};

var arr = [1, 2, 3];

for (var key in arr) {
  // Would log 0, 1, 2, 'coolMethod'
  console.log(key);
}
```


### Alternatives

Either use a for-loop, or even better, use the built-in Array methods such as `.forEach`, `.map`, `.filter` and `.reduce`. I personally like the Array methods since they're a lot cleaner looking. A while loop could also be used, and can not only be useful for iterating an array forwards, but also backwards. It's also possible to iterate an array backwards with a regular for-loop, but the syntax is a little bit cleaner with a while loop. 

```javascript
var arr = [1, 2, 3];

// for loop 
for (var i = 0; i < arr.length; i++) {
  var item = arr[i];
}

// backwards iteration with a for loop
for (var i = arr.length; i >= 0; i--) {
  var item = arr[i];
}

// Backwards iteration with a while loop
var i = arr.length;
while (i--) {
  var item = arr[i];
}

arr.forEach(function (item) {
  console.log(item);
});

var newArr = arr.map(function (item) {
  return item * 2;
});
console.log(newArr); // [2, 4, 6]

var newArr = arr.filter(function (item) {
  return item !== 1;
});
console.log(newArr); // [2, 3]
```

Map and filter are useful because they reduce the boilerplate that you would have to set up with a for-loop or a while loop to accomplish the same task. You don't have to create a new array yourself, write an if statement to filter, or manually add or remove elements. For example, with filter you just pass a callback function that returns true for the elements you want to keep, and returns false for the elements of the array you want to remove. There's no need to create a new array, write an if statement for filtering, or manually adding to the new array with `.push`, it's all done in the background.


### Conclusion 

I'm sure there are even more reasons why for-in loops shouldn't be used for looping over arrays, but this is just a few I know. Just don't do it, leave the for-in loops for plain objects. 


### Further Reading

[2ality - Arrays](http://www.2ality.com/2012/12/arrays.html)