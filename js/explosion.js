/* Explosion.js
 * Author : Alexander Ovchinnikov 
 * Licence : CC BY (http://creativecommons.org/licenses/by/3.0/)
 */


// Explosion class
function Explosion(particlesCount,x,y,canvas){
	this.state_alive = 0;
	this.state_dead	 = 1;
	this._init(particlesCount,x,y,canvas);
}

Explosion.prototype = {
	_init: function(particlesCount,x,y,canvas){
		this.canvas = canvas;
		this.cContext = canvas.getContext('2d');
		this.state = this.state_alive;
		this.particles = new Array(particlesCount);
		var idx;
		for (idx=0; idx<this.particles.length; idx++){
			this.particles[idx] = new Particle(x,y);
		}
		this.size = particlesCount;
	},
	update: function(){
		if (this.state != this.state_dead) {
			var isDead = true;
			var idx;
			for (idx=0; idx<this.particles.length; idx++){
				if (this.particles[idx].state === 0) {
					this.particles[idx].update(this.canvas);
					isDead = false;
				}
			}
			if(isDead) { 
				this.state = this.state_dead; 
				clearInterval(this.t);
			}
		}
	},
	draw: function(){
		var idx;
		for(idx=0; idx < this.particles.length; idx++){
			if (this.particles[idx].state === 0) {
				this.particles[idx].draw(this.cContext);
			}
		}
	}
}


// Particle Class
function Particle(x,y) {
	this.state_alive 	= 0;
	this.state_dead  	= 1;
	this.def_lifetime 	= 200;
	this.max_dimension	= 6;
	this.min_dimension	= 1;
	this.max_speed 		= 10;
	
	this._init(x,y);
}

Particle.prototype = {
	_init: function(x,y) {
		this.state 		= this.state_alive;
		this.width 		= this.getRandomInt(this.min_dimension,this.max_dimension);
		this.height		= this.width;
		this.x			= x;
		this.y			= y;
		this.xv			= ( (this.max_speed * 2) * Math.random() - this.max_speed);
		this.yv			= ( (this.max_speed * 2) * Math.random() - this.max_speed);
		this.age		= 0;
		this.lifetime 	= this.def_lifetime;
		this.color		= { alpha:1,
							red:this.getRandomInt(0,255),
							green:this.getRandomInt(0,255),
							blue:this.getRandomInt(0,255) 
		}
		//Smooth diagonal speed
		if (Math.pow(this.xv,2) + Math.pow(this.yv,2) > Math.pow(this.max_speed,2)){
			this.xv *= 0.7;
			this.yv *= 0.7;
		}
	},
	update: function(canvas){
		if (this.state != this.state_dead){			
			// Reverse direction in case of collision
			if (this.x <= 0 || this.x >= canvas.width) {
				this.xv *= -(this.getRandomInt(1,100)*0.01);	
			} 
			if(this.y <=0 || this.y >= canvas.height) {
				this.yv *= -(this.getRandomInt(1,100)*0.01);
			}

			this.x += this.xv;
			this.y += this.yv;

			var alpha = this.color.alpha;
			alpha -= 0.01;

			if (alpha <= 0) { this.state = this.state_dead }	// End of life
			else {
				this.color.alpha = alpha;
				this.age++;
			}

			// End of life
			if (this.age >= this.lifetime) {
				this.state = this.state_dead;
			}

		}
	},
	draw: function(cContext) {
		cContext.fillStyle = 'rgba(' +
							this.color.red +
							',' +
							this.color.green +
							',' +
							this.color.blue +
							',' +
							this.color.alpha +
							')';
		cContext.fillRect(this.x,this.y,this.width,this.height);	
	},
	// Helper for range randomization
	getRandomInt: function(min,max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}