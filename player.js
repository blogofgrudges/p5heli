function handleInputs()
{
    if(mouseIsPressed)
    {
        if(isInBounds(this.mouseX, this.mouseY))
        {
            heli.applyForce(boost);
        }
    }
}

function isInBounds(x, y)
{
    //check to make sure the point that was clicked on is within the canvas bounds
    if((x >= 0 && x <= width) && 
       (y >= 0 && y <= height))
    {
        return true;
    }
    return false;
}