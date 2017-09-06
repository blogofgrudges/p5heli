function Blocker(x, y, sizeY)
{   
    this.x = x;
    this.y = y;    
    this.sizeX = boundWidth;
    this.sizeY = sizeY;
    
    this.isNeeded = true;
    
    this.position = createVector(this.x,this.y);
    this.velocity = createVector(-8,0);
    
    //this can probably be done better
    this.collides = function(heli)
    {
        if((heli.position.x > this.position.x) && (heli.position.x < this.position.x + this.width))
        {    
            if(heli.position.y > this.position.y && heli.position.y < this.position.y + this.sizeY)
            {
                return true;
            }
        }
    }    
    
    this.move = function()
    {
        this.position.add(this.velocity);  
        
        if(this.position.x < -50)
        {
            this.isNeeded = false;
        }        
    }
    
    this.display = function()
    {
        rect(this.position.x, this.position.y, this.width, this.sizeY);   
    }
}