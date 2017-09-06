function Bound(x, y, roofY, floorY, gap)
{
    this.x = x;
    this.y = y;
    this.roofY = roofY;
    this.floorY = floorY;    
    this.sizeX = boundWidth;
    this.sizeY = (this.floorY - gap) / 2;
    
    this.roofSizeY = this.sizeY + this.y;
    this.floorSizeY = this.sizeY - this.y;
    this.roofPosition = createVector(this.x, this.roofY);
    this.floorPosition = createVector(this.x, this.floorY - this.floorSizeY);    

    this.isNeeded = true;    
    
    this.velocity = createVector(-8,0);
    
    //probably a better way to do this
    this.collides = function(heli)
    {
        if((heli.position.x > this.roofPosition.x) && (heli.position.x < this.roofPosition.x + this.sizeX))
        {    
            if(heli.position.y < (this.roofY + this.roofSizeY) || heli.position.y > this.floorPosition.y)
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
        rect(this.roofPosition.x, this.roofPosition.y, this.sizeX, this.roofSizeY);
        rect(this.floorPosition.x, this.floorPosition.y, this.sizeX, this.floorSizeY);        
    }
}