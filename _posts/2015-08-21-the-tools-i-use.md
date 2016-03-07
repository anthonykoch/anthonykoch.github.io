---
layout: post
author: Anthony Koch
title: The tools I use
use_excerpt_as_description: true
tags: ['development', 'tools']
post_id: 2
---

This is an overview of some of the development tools I've found useful, as well as some opinions and experiences I have had with them. 


<!-- endexcerpt -->


### Con Emu

Con Emu is a <q>Windows [console emulator](http://askubuntu.com/questions/111144/are-terminal-and-shell-the-same) with tabs</q>. It has a lot of features and settings, and is very customizable. You can change the font, color scheme (the colors of the fonts), key bindings, transparency of the window, and other features. 


<figure>
	<figcaption>A picture of Con Emu running the Git Bash shell</figcaption>
	<img src="{{site.images}}/posts/the-tools-i-use/con_emu_panels.png" alt="An image of Git Bash running through Con Emu">
</figure>


#### Transparency

One of the greatest features, in my opinion, is the the window transparency. Window transparency really helps when watching or reading a tutorial, and you don't want to keep switching back and forth between the command line and the browser. 


#### Tabs 

One of the things really lacking with the default windows command line, among lots of other things, is the lack of tabs. Con Emu not only has tabs, but allows multiple panes per tab! The panes can be aligned side be side or top and bottom. 

Each tab can be given a name for easy identification, and there is a tab restore setting that will preserve the directory the tab was closed at as well as the name the tab was given, so you don't have to keep opening up the same directory again and again. It's a great time saving feature. 


> __Update:__ Con Emu can't remember the directory by default anymore, [read for more info](/blog/remember-directories-in-con-emu/)

### Git Bash

Git Bash is a shell that provides things like SSH (which Windows by default doesn't have), Git (of course), and various commands that are used in Linux/Mac OS. The picture above shows Git Bash, which I much prefer to the windows command line. 


### Sass

Sass is my preferred CSS preprocessor. There are people that hate on Sass, and other tools like it, but I think it's extremely useful, and makes CSS suck a lot less. The first time I saw Sass in use was by [Travis Neilson](https://www.youtube.com/user/DevTipsForDesigners). He used the [indented version](https://www.youtube.com/watch?v=-Z3qznaE9vc) of Sass, which I also prefer over the SCSS syntax. To me, it's a lot cleaner looking, and will continue to boggle my mind why so few people use it.

I really like what Sass has to offer. File separation, variables, mixins, and functions make writing CSS so much easier. One useful library I use with Sass is called [Bourbon](http://bourbon.io/docs). Bourbon provides a bunch of mixins, such as `+position`, `+size`, and `+padding`. The position mixin allows you to specify the position, top, right, bottom, and left properties all in one place. This is useful to me because I like to specify properties in alphabetical order, but I also like to related properties together.

```css
/*
	An example of the indented version of Sass
	
	Btw: The `+` operator is an alternative syntax to @include
	and is exclusive to the indented syntax
*/

.card
	padding: 30px
	+position(relative, 20px 30px 0 null)
	+size(400px)


@media screen and (max-width: 500px)
	+padding(null 15px)
```

The above would be output as:

```css
.card {
	padding: 30px;

	position: relative;
	top: 20px;
	right: 30px;
	bottom: 0;

	height: 400px;
	width: 400px;
}

// Override just the right and left
@media screen and (max-width: 500px) {
	padding-right: 15px;
	padding-left: 15px;
}
```

### Gulp and Webpack

I started using Gulp because I wanted to start using Sass, and I read the gulp-sass plugin was so much faster than ruby-sass (which it is). I now use Gulp for live reloading, compiling Sass, and JavaScript minification. Getting started with Gulp was pretty easy after watching a couple [tutorials](https://www.youtube.com/playlist?list=PLLnpHn493BHE2RsdyUNpbiVn-cfuV7Fos). I was able to get up and going with it in a small amount of time. 

Some while after learning Gulp, I came across [Webpack](http://webpack.github.io/). Webpack is a bundler tool that can be used to preprocess files, bundle JavaScript, and many other tasks. My interest in it was being able to transpile ES6 code to ES5 as well as giving the ability to require modules like in nodejs. I had originally looked into Browserify for this, but I couldn't figure out how to set it up, and Webpack seemed like the easier option.

Webpack took me a much longer time to learn and get going than gulp did. I don't know why, but I just couldn't make sense of how to set it up. And that's the thing with tools like this, they are difficult to learn for a beginner, and the setup can take a long time, plus they also take up a bit of disk space. 


### Further Resources

[Con Emu](https://conemu.github.io/)
[Git Bash for Windows](https://git-for-windows.github.io/)
[GulpJS](https://github.com/gulpjs/gulp)
[Webpack](http://webpack.github.io/)
