function Blocker(x,y,height)
{
    //each bound is made up of one rectangle
    this.width = boundWidth;
    this.x = x;
    this.y = y;
    this.isNeeded = true;

    //height of each rectangle
    this.height = height;
    
    this.position = createVector(this.x,this.y);
    this.velocity = createVector(-8,0);
    
    this.collides = function(heli)
    {
        if((heli.position.x > this.position.x) && (heli.position.x < this.position.x + this.width))
        {    
            if(heli.position.y > this.position.y && heli.position.y < this.position.y + this.height)
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
        rect(this.position.x, this.position.y, this.width, this.height);   
    }
}