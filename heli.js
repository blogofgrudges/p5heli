function Heli(x, y)
{
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    
    this.applyForce = function(force)
    {
        this.acceleration.add(force);
    }
    
    this.physics = function()
    {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
    
    this.display = function()
    {
        ellipse(this.position.x, this.position.y, 20);
    }
}