function Background(x, y, img)
{   
    this.x = x;
    this.y = y;    
    this.sizeX = width;
    this.sizeY = height;
    
    this.isNeeded = true;
    
    this.position = createVector(this.x,this.y);
    this.velocity = createVector(-5,0);
    
    this.move = function()
    {
        this.position.add(this.velocity);  
        
        if(this.position.x < -1300)
        {
            this.isNeeded = false;
        }        
    }
    
    this.display = function()
    {
        image(img, this.position.x, this.position.y);
    }
}