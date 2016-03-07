---
layout: post
author: Anthony Koch
title: Medium style image loading
use_excerpt_as_description: true
tags: ['stackblur', 'medium', 'lazy loading']
post_id: 5
---

I was on the [Medium](https://medium.com/) website and noticed a cool effect  they do when they lazy load their images. The image first appears blurry, and then slowly unblurs or fades out to reveal the actual image. I thought this was pretty cool, and wanted to see if I could achieve a similar effect. 

<!-- endexcerpt -->

### The parts

I believe the component that does this is called "ProgressiveMedia". The parts of the component are a canvas element, a thumbnail image (which I will refer to as "thumbnail"), and the actual image (which I will refer to as "image"). There is also an element we will call "aspect ratio fill", which I'll get to later. 

```html
<div class="aspect-ratio-fill">

	<!-- The component -->
	<div class="ProgressiveMedia">

		<!-- The canvas -->
		<canvas class="ProgressiveMedia-canvas" width="75" height="38"></canvas>

		<!-- The thumbnail -->
		<img class="ProgressiveMedia-thumbnail" src="/scones-thumbnail.jpg" alt="A thumbnail">

		<!-- The image -->
		<img class="ProgressiveMedia-image" 
			data-src="/scones.jpg"
			src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" 
			alt="The main image">
	</div>
</div>
```

#### Thumbnail 

The thumbnail is a scaled down version of the original image, around 30px in width. It's important to keep the aspect ratio and to scale the image down proportionately. The thumbnail is an initial substitute of for the actual image that will be shown. Since it's such a small image, its download time should be pretty quick. Now, we don't actually want to see the thumbnail, so it's going to be set to `display: none;`. The purpose of the thumbnail is to draw it onto the canvas so we can blur it. 

We could technically skip the canvas altogether and just use `filter: blur(4px);`, but the blur filter fades out the edges of the image, which I don't really like. 


#### Image and Canvas

The component, image, and canvas are set to position absolute, with height and width set to 100%, causing them all to expand to the height and width of their container, (with position relative set on the `aspect-ratio-fill` element so they don't expand outside). 

```css
.aspect-ratio-fill {
	position: relative;
}

.ProgressiveMedia,
.ProgressiveMedia-canvas, 
.ProgressiveMedia-image {
	position: absolute;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
}

.ProgressiveMedia-image {
	// We will transition the opacity so it fades in nicely
	transition: opacity 0.2s;
	opacity: 0; 
	// The image is z-indexed over the canvas
	z-index: 1; 
}

// When the image is loaded, fade in the image
.ProgressiveMedia-image.isLoaded {
	opacity: 1;
}

.ProgressiveMedia-thumbnail {
	display: none;
}
```

Since the point of this is to lazy load images, the src of the image is initially set to a small transparent image. In the HTML example above, I've used an image [data URI](https://css-tricks.com/data-uris/) I found on [CSSWizardy](http://csswizardry.com/2013/01/your-logo-is-still-an-image-and-so-is-mine/). There will also need to be a `data-src` property pointing to the URL of the actual image that we want to show once the actual image has been loaded

From what I can see on the Medium website, the canvas width attribute is usually set to `75`, and the canvas height attribute is calculated by `(75 * height) / width`, where the height and width are the real dimensions of the image.

#### Aspect ratio fill

Since neither the canvas nor the image have their dimensions set, but instead expand to fill their container, a container element somewhere up the line needs to actually have height. Without it, the image and canvas wouldn't have any space to expand in, and as a result wouldn't show.

They way that I see that Medium has done this is with a very clever use of the padding-bottom property set as a percentage. The element the padding is set on is an element with a class name of `aspect-ratio-fill`. 

```html
<div class="aspect-ratio-fill" style="padding-bottom: 40%">
	<div class="ProgressiveMedia">
		...
	</div>
</div>
```

The padding set on the `.aspect-ratio-fill` is calculated with the equation below. 

```
var percentage = (image.naturalHeight / image.naturalWidth) * 100;
```

It took me some reading and thinking to figure out the math on this, and why it works, but I think I've figured it out. The equation calculates the height of the image relative to the width of the image, expressed as a percentage.  For example, an image that has a height of `900px`, and a width of `1600px` calculates to a height of `0.5625`, because `1600px / 900px = 0.5625`. But that is in decimal form, and we need it in percentage form, so we multiply it by 100, resulting in `56.25%`. In other words, the height is `56.25%` of the width, because `0.5625 * 1600` equals `900`.

The reason why setting we set the padding bottom as a percentage is because when padding is set as a percentage, the amount of resulting padding is a percentage of the element's width. For example, if you set a padding bottom of 5%, and the element has a width of `900px`, the resulting padding bottom the browser will calculate is `900px * 0.05`, which is `45px`. It doesn't matter if you set it as padding top, bottom, left or right. The resulting amount of padding is always a percentage of the element's width. 

If we set the padding bottom of our `aspect-ratio-fill` element to the height of the image as a percentage, it will cause the element to have maintain the aspect ratio of the actual image. To test this, let's go back to the `1600px by 900px` image example. Let's say we have a wrapping element that has a max-width of `800px` causing our aspect ratio fill element to be restricted to `800px`. I chose `800px` as the containing width because it's exactly half of the image's original size, meaning if the aspect ratio is to be preserved, the resulting padding bottom should be exactly half of the image's height. Now, the calculation is the width multiplied by the height percentage, and if we plug in the numbers we get `800px * 0.5625 = 450px`. Woohoo! We got `450px`, which is exactly half of the image's height, meaning the aspect ratio has been preserved.  

### The process

In short, the process for lazy loading the image is as follows:

1. Once the thumbnail image has loaded, draw it onto the canvas.
2. Blur the canvas using StackBlur, which is the library we will use to blur our canvas.
3. Calculate the padding bottom of the aspect ratio fill element.
4. Set the src of the of the image to its `data-src` attribute and wait for it to load.
5. Once the image has loaded, set a class on the image to fade it in over the canvas.

#### Drawing the thumbnail

The first part of the process is to draw the thumbnail onto the canvas. So, we grab the thumbnail image and assign it to a thumbnail variable. If the thumbnail image has not yet been loaded, we'll wait for it to load. Once it has been loaded we will draw it onto the canvas using our `drawCanvasWithBlur` function.

```javascript
// The amount we want to blur the canvas
const CANVAS_BLUR_RADIUS = 8;

// Grab the elements
var component = document.querySelector('.ProgressiveMedia');
var image     = document.querySelector('.ProgressiveMedia-image');
var canvas    = document.querySelector('.ProgressiveMedia-canvas');
var thumbnail = document.querySelector('.ProgressiveMedia-thumbnail');

// Wait for the thumbnail to load if it hasn't
if ( ! thumbnail.complete || thumbnail.naturalWidth === 0) {
	thumbnail.addEventListener('load', function onImageLoaded() {
		// It's good practice to remove unecessary listeners
		thumbnail.removeEventListener('load', onThumbnailLoad);

		// Draw the canvas
		drawCanvasWithBlur(canvas, thumbnail, CANVAS_BLUR_RADIUS);
	});
} else {
	// The thumbnail is already loaded, draw it onto the canvas
	drawCanvasWithBlur(canvas, thumbnail, CANVAS_BLUR_RADIUS);
}
```

The `drawCanvasWithBlur` function will look like this. It will accept a canvas element that we want to draw onto, the image element that we want to draw on to the canvas, as well as the amount to blur the canvas. 

```javascript
/**
 * Draws an image into the canvas. The image can be optionally blurred
 * @param  {Element} canvas     The canvas to draw the image onto
 * @param  {Element} thumbnail  The image used to draw onto the canvas
 * @param  {Number}  blurRadius The amount to blur the canvas
 * @return {void}
 */
function drawCanvasWithBlur(canvas, thumbnail, blurRadius) {
	var context = canvas.getContext('2d');

	// Draw the thumbnail onto the canvas
	context.drawImage(thumbnail, 0, 0, 

		// These two arguments allow the canvas image to scale 
		thumbnail.naturalWidth, thumbnail.naturalHeight, 

		0, 0, canvas.width, canvas.height);

	// Blur the canvas
	StackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, blurRadius);
}
```

__Note:__ I'm not really familiar with canvas, so it's very possible I'll be what I'm doing is neither the best way nor the correct way. Also, the code below is just a simple example of how you could do this for one image, and is not meant to be representative example of how to do this for a real website. I imagine the way Medium actually does this is a lot more complicated than this. 


### Setting the padding

Technically since the thumbnail is scaled down proportionately, keeping the aspect ratio, we can use the height and width of the thumbnail in the calculation of the padding bottom. I imagine you could also calculate the padding server side so that it's set onto the `aspect-ratio-fill` so that it doesn't shift the layout of the page. 

```javascript
var aspectRatioFill = document.querySelector('.aspect-ratio-fill');
var percentage = (thumbnail.naturalHeight / thumbnail.naturalWidth) * 100;
aspectRatioFill.style.paddingBottom = percentage + '%';
```

### Loading the image

The next part is to load in the actual image we want to show. We will do this by setting the image's `src` property to its `data-src` property. If you remember from earlier, the `data-src` property is the URL of the actual image. The `load` event of the image is then watched so that we can set the `isLoaded` class onto the image once it loads. This will set the opacity of the image to `1`, and will result in the image being fading in (refer to the CSS near the beginning of the article). 

Now, I'm not totally sure if the image should be faded in, the canvas should be faded out, or both. To my eye, they both give a slightly different effect, but for now we'll just fade the image in.

```javascript
/* Set the src and then wait till page load */

image.src = image.dataset.src;
image.addEventListener('load', function onImageLoaded() {
	image.removeEventListener('load', onImageLoaded);
	image.classList.add('isLoaded');
});
```

Once the image has loaded and the class has been added, the image will fade in over the canvas, making it almost appear as if the canvas is slowing being unblurred. 

### The finished product

The example in the codepen demo uses a little bit different code because of it had to be setup for display in codepen. 

<div class="full-width" style="min-height: 480px">
	<div class="row u-collapse">
		<p data-height="480" data-theme-id="20490" data-slug-hash="WrOQQz" data-default-tab="result" data-user="anthonykoch" class='codepen'>See the Pen <a href='http://codepen.io/anthonykoch/pen/WrOQQz/'>Medium style image loading</a> by Anthony Koch (<a href='http://codepen.io/anthonykoch'>@anthonykoch</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
	</div>
</div>


### Conclusion

Although it may not be the exact same as Medium's, I think it's still looks pretty good. There are a number of ways this could be improved if this was  actually used, such as fallbacks for browsers with javascript disabled, but that's outside the scope of this post. 

