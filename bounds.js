function Bound(x,offset,gap)
{
    //each bound is made up of two rectanges roof and floor
    this.width = boundWidth;
    this.x = x;
    this.yOffset = offset;
    this.isNeeded = true;
    
    //height of each rectangle
    this.height = (height - gap) / 2;
    
    this.roofPosition = createVector(this.x,0);
    this.floorPosition = createVector(this.x,(height-this.height-this.yOffset));    

    this.velocity = createVector(-8,0);
    
    this.collides = function(heli)
    {
        if((heli.position.x > this.roofPosition.x) && (heli.position.x < this.roofPosition.x + this.width))
        {    
            if(heli.position.y < (this.height-this.yOffset) || heli.position.y > height - (this.height + this.yOffset))
            {
                return true;
            }
        }
    }
    
    this.move = function()
    {
        this.roofPosition.add(this.velocity);
        this.floorPosition.add(this.velocity);    

        if(this.roofPosition.x < -50)
        {
            this.isNeeded = false;
        }
    }
    
    this.display = function()
    {
        rect(this.roofPosition.x, this.roofPosition.y, this.width, this.height-this.yOffset);
        rect(this.floorPosition.x, this.floorPosition.y, this.width, this.height+this.yOffset);        
    }
    
    
}