var heli;
var gravity;
var boost;
var minimumGap;
var currentGap;
var bounds;
var boundWidth;
var blockers;
var offsetCounter;
var offsetScaleX;
var offsetScaleY;
var jitter;
var maxJitter;
var score;
var gameOver;
var scores = [];
var boundPattern;
var boundPatterns = [];
var gapPattern;
var gapPatterns = [];
var gap;
var offset;

function setup()
{
	createCanvas(1280,720);
    heli = new Heli(200, height/2);
    gravity = createVector(0,0.2);
    boost = createVector(0,-0.7);
    minimumGap = 300;
    currentGap = 680;
    boundWidth = 40;
    offsetCounter = 0;
    offsetScaleX = 200;
    offsetScaleY = 100;    
    noStroke();    
    maxJitter = 20;
    score = 0;
    hiscore = 0;
    bounds = [];
    boundPatterns = [0,1,2,3,4];
    gapPatterns = [0,1];    
    blockers = [];
    boundPattern = 0;
    gapPattern = 0;    
    gameOver = false;
    var button = createButton("RESET");
    button.mousePressed(resetSketch);
}

function resetSketch()
{
    heli = new Heli(200, height/2);
    gravity = createVector(0,0.2);
    boost = createVector(0,-0.7);
    minimumGap = 300;
    currentGap = 680;
    boundWidth = 40;
    offsetCounter = 0;
    offsetScaleX = 200;
    offsetScaleY = 50;    
    noStroke();    
    maxJitter = 20;
    scores.push(score);
    console.log(scores);
    hiscore = Math.max(...scores);
    score = 0;
    boundPattern = 0;
    boundPatterns = [0,1,2,3,4];    
    gapPattern = 0;
    gapPatterns = [0,1];        
    bounds = [];
    blockers = [];    
    gameOver = false;    
}

function draw()
{
    background(51);
    
    if(!gameOver)
    {
        //check to see if there is player input
        if(mouseIsPressed)
        {
            if(isInBounds(this.mouseX, this.mouseY))
            {
                heli.applyForce(boost);
            }
        }
        
        //apply gravity and move the player
        heli.applyForce(gravity);
        heli.physics();
        
        //add more level bounds
        if(frameCount % 5 == 0)
        {
            //currentGap start out large and shrinks down to the minimum gap
            if(currentGap > minimumGap)
            {
                currentGap -= 5;
            }      
            
            //the offset period is 2 pi and the minimum increment is the offsetScaleX
            offsetCounter += (TWO_PI/offsetScaleX);
      
            //reset the offsetCounter once it exceeds two pi
            if(offsetCounter > TWO_PI)
            {
                offsetCounter = 0;
                changeBoundPattern();
                changeGapPattern();
            }

            //console.log(offsetCounter*(180/PI));     

            //add a jitter value in to make it look less uniform
            jitter = random(maxJitter);
            
            switch(boundPattern)
            {
                case 0:
                    offsetScaleX = 200;
                    offset = jitter + offsetScaleY * ((0.75*sin(offsetCounter)) + sin(2*offsetCounter) + (0.3*sin(3*offsetCounter)));
                break;
                case 1:
                    offsetScaleX = 100;                
                    offset = jitter + offsetScaleY * (sin(offsetCounter) + (0.3*sin(3*offsetCounter)));          
                break;
                case 2:
                    offsetScaleX = 200;                   
                    offset = jitter + offsetScaleY * ((0.75*sin(offsetCounter)) + (sin(4*offsetCounter)));          
                break;                
                case 3:
                    offsetScaleX = 300;                   
                    offset = jitter + offsetScaleY * ((0.75*sin(6*offsetCounter)) + (sin(4*offsetCounter)));          
                break;    
                case 4:
                    offsetScaleX = 400;                   
                    offset = jitter + offsetScaleY * ((0.55*sin(10*offsetCounter)) + (sin(2*offsetCounter)));          
                break;                    
            }  
      
            switch(gapPattern)
            {
                //gentle
                case 0:
                    gap = currentGap + (offsetScaleY * sin(offsetCounter) * 0.75);                    
                break;
                //bumpy
                case 1:
                    gap = currentGap + (offsetScaleY * sin(offsetCounter) * 0.3);                    
                break;
            }              
            
            bounds.push(new Bound(width, offset, gap));      
            score++;
        }
        
        //add a blocker bar
        if(frameCount % 100 == 0 && currentGap <= 400)
        {
            var top = ((height - gap)/2) - offset;
            var bottom = height - ((height - gap)/2) - offset;
            blockers.push(new Blocker(width, random(top-50, bottom+50), currentGap/3));         
        }
    }
    
    for(var i=bounds.length-1; i>=0; i--)
    {
        if(!gameOver)
        {
            bounds[i].move();
        }
        
        push();
        fill(102, 255, 102);
        bounds[i].display();
        pop();
        
        if(bounds[i].collides(heli))
        {
            gameOver = true;
        }
        
        if(!bounds[i].isNeeded)
        {
            bounds.splice(i,1);
        }
    }
    
    for(var i=blockers.length-1; i>=0; i--)
    {
        if(!gameOver)
        {
            blockers[i].move();
        }
        
        push();
        fill(102, 255, 102);
        blockers[i].display();
        pop();
        
        if(blockers[i].collides(heli))
        {
            gameOver = true;
        }        
        
        if(!blockers[i].isNeeded)
        {
            blockers.splice(i,1);
        }        
    }    
    
    //draw the player
    push();
    fill(255,255,255);
    heli.display();
    pop();
    
    textSize(32);
    text("SCORE: " + score, 10, 30);
    text("HIGH SCORE: " + hiscore, 500, 30);    
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

function changeBoundPattern()
{
    boundPattern++;
    if(boundPattern == boundPatterns.length)
    {
        boundPattern = 0;
    }
    console.log("bound = " + boundPattern);    
}

function changeGapPattern()
{
    gapPattern++;
    if(gapPattern == gapPatterns.length)
    {
        gapPattern = 0;
    }
    console.log("gap = " + gapPattern);    
}