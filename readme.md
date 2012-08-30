# Explosion.js

Explosion.js is a JavaScript library for creating particle based explosions on a canvas element .
It was written as an attempt to understand basic vectors in math as i never understood those in school . 

## Use of the library

Create Explosion : 
``` javascript 
var canvas 		= document.getElementById('playground');
var cContext 	= canvas.getContext('2d');
var explosion 	= new Explosion(particlesCount,x,y,canvas);
```
Now explosion is created for us , but we are responsible for drawing and updating it when needed .

Lets make a render function that will be passed later to browser schedule of repaint .
``` javascript 
function render(){
	cContext.fillStyle = 'black';							
	cContext.fillRect(0,0,canvas.width,canvas.height);

	explosion.update();			// Update particle positions
	explosion.draw();			// Actually draw the particles
	// Here we tell the browser that we wish to perform an animation 
	with the callback (render(); in our case) to be invoked before repaint .
	webkitRequestAnimationFrame(render,canvas);
}
```

Also it is worth to notice that this technology specification has not been stabilized , so 
in my example i made use of `webkitRequestAnimationFrame();` but if we want it to run on other browsers
we should make some arrangements [Check MDN for more info](https://developer.mozilla.org/en-US/docs/DOM/window.requestAnimationFrame). 
``` javascript 
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;
```

## Misc
For now i did not have time to implement various custom effects to the explosion , but you can play with some values to get what you need .
As example :

changing `max_dimension` variable in Particle class will make some particles bigger , Try to set it for 20 or 30 see what happends . or playing with Alpha values makes some good effects variation .
Check the included example to get better understanding .


Tested on FireFox 15 and Chrome 19 on Ubuntu 11.10 .






