function start(){
	var canvas = document.getElementById('playground');
	var explosions = new Array(32);

	// Check for canvas support
	if (canvas.getContext){
		var cContext 	= canvas.getContext('2d');
		cContext.fillRect(0,0,canvas.width,canvas.height);
		canvas.addEventListener('click',createExplosion,false);
		render(); 
	} else {
		alert("Canvas is not supported by your browser!");
	}
	// Create new explosion and push it to explosions stack , based on mouse click .
	function createExplosion(event){
		// Get particles count from html select box
		var particlesCount  = parseInt(document.getElementById('particlesSelect').value);
		var explosionsCount = 32;
		// Get click coordinates
		var x = event.clientX;
		var y = event.clientY;
		x-=canvas.offsetLeft;
		y-=canvas.offsetTop;
		// Add explosion to explosions stack
		var explosion = new Explosion(particlesCount,x,y,canvas);
		console.log("Explosion at:" + x + ":" +y);
		// Find good place for new explosion in stack
		var idx;
		for(idx=0;idx <= explosions.length ;idx++) {
			if(explosions[idx] === undefined || explosions[idx].state === explosion.state_dead){
				explosions[idx] = explosion;
				break;
			}	
		}
	}

	// Each Frame 
	function render(){				
		var currentExplosion = 0;		 
		var ex = explosions[0];			

		// Clear the old frame
		cContext.fillStyle = 'black';							
		cContext.fillRect(0,0,canvas.width,canvas.height);
		
		// Iterate over explosions stack
		while(ex !== undefined && currentExplosion < explosions.length) {		
			// Update and draw each explosion
			ex.update();		
			ex.draw();
			currentExplosion++;
			ex = explosions[currentExplosion];
		}
		//Tell the browser to repaint the window for the next frame
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               		 window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  		window.requestAnimationFrame = requestAnimationFrame;

		requestAnimationFrame(render,canvas);
	}
}
