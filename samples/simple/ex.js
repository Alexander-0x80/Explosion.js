function start(){
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  	window.requestAnimationFrame = requestAnimationFrame;
	
	var canvas = document.getElementById('exp');
	var cContext = canvas.getContext('2d');
	explosion = new Explosion(512,250,250,canvas);
	
	render();
	function render(){
		cContext.fillStyle = 'black';							
		cContext.fillRect(0,0,canvas.width,canvas.height);

		explosion.update();			// Update particle positions
		explosion.draw();			// Actually draw the particles
		requestAnimationFrame(render,canvas);
	}
}
