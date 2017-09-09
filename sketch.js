var heli;
var gravity;
var boost;
var minimumGap;
var currentGap;
var bounds;
var boundWidth;
var blockers;
var x;
var offsetScaleX;
var scaleY;
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
var version = "0.7";
var debug = false;
var backImg;
var backImg2;
var backGround;
var backs;
var allBgImgs = [];

function setup()
{
	createCanvas(1280,720);
    heli = new Heli(200, height/2);
    gravity = createVector(0,0.2);
    boost = createVector(0,-0.7);
    minimumGap = 300;
    currentGap = 680;
    boundWidth = 40;
    x = 0;
    offsetScaleX = 200;
    scaleY = 50;    
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
    var buttonDebug = createButton("DEBUG");
    buttonDebug.mousePressed(debugOnOff);    
    backImg = loadImage("back.png");
    backImg2 = loadImage("back2.png");
    backGround = new Background(0, 0, backImg);
    backs = [];
    backs.push(backGround);
    allBgImgs.push(backImg);
    allBgImgs.push(backImg2);
}

function resetSketch()
{
    heli = new Heli(200, height/2);
    gravity = createVector(0,0.2);
    boost = createVector(0,-0.7);
    minimumGap = 300;
    currentGap = 680;
    boundWidth = 40;
    x = 0;
    offsetScaleX = 200;
    scaleY = 50;    
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
    backGround = new Background(0, 0, backImg);    
    backs = [];
    backs.push(backGround);    
}

function draw()
{
    background(51);       
    backgroundManager(backs);

    if(!gameOver)
    {
        //check to see if there is player input
        handleInputs();
        
        //apply gravity and move the player
        heli.applyForce(gravity);
        heli.physics();
        
        if(frameCount % 5 == 0)
        {
            //add more level bounds
            levelBounds();
            score++;
        }
        
        //add a blocker bar
        if(frameCount % 100 == 0)
        {
            var yPos = (height/2) + random(-100, 200) - 100;
            blockers.push(new Blocker(width, yPos, 100));         
        }
    }
    
    //manage all of the obstacles
    obstacleManager(bounds);   
    obstacleManager(blockers);
    
    //draw the player
    push();
    fill(255,255,255);
    heli.display();
    pop();
    
    //draw any text
    textSize(32);
    text("SCORE: " + score, 10, 30);
    text("HIGH SCORE: " + hiscore, 500, 30);   
    
    //debug!
    if(debug)
    {
        textSize(10);
        text("boundary pattern: " + boundPattern, 500, 70);   
        text("gap pattern: " + gapPattern, 500, 90);      
        text("change in: " + (TWO_PI - x), 500, 110);
        text("bounds l: " + bounds.length, 600, 70);      
        text("block l: " + blockers.length, 600, 90);           
        text("version: " + version, 500, 130);     
    }    
}

function backgroundManager(backgrounds)
{
    for(var i=backgrounds.length-1; i>=0; i--)
    {
        if(!gameOver)
        {
            backgrounds[i].move();
        }
        
        push();
        fill(102, 255, 102);
        backgrounds[i].display();
        pop();        
        
        if(!backgrounds[i].isNeeded)
        {
            backgrounds.splice(i,1);
        }    

        if(i == backgrounds.length-1)
        {
            if((backgrounds[i].position.x + width) < width)
            {
                console.log(backgrounds.length);
                backgrounds.push(new Background(width, 0, random(allBgImgs)));    
            }
        }
    }  
}

function obstacleManager(obstacles)
{
    for(var i=obstacles.length-1; i>=0; i--)
    {
        if(!gameOver)
        {
            obstacles[i].move();
        }
        
        push();
        fill(102, 255, 102);
        obstacles[i].display();
        pop();
        
        if(obstacles[i].collides(heli))
        {
            gameOver = true;
        }        
        
        if(!obstacles[i].isNeeded)
        {
            obstacles.splice(i,1);
        }        
    }  
}

function levelBounds()
{
    //currentGap start out large and shrinks down to the minimum gap
    if(currentGap > minimumGap)
    {
        currentGap -= 5;
    }      
    
    //the offset period is 2 pi by offsetScaleX
    x += (TWO_PI/offsetScaleX);

    //reset the x once it exceeds two pi
    if(x > TWO_PI)
    {
        x = 0;
        boundPattern = random(boundPatterns);
        gapPattern = random(gapPatterns);      
        console.log("BP: " + boundPattern + "GP: " + gapPattern);
    }

    //add a jitter value in to make it look less uniform
    jitter = random(maxJitter);
    
    switch(boundPattern)
    {
        case 0:
            offsetScaleX = 200;
            boundYPos = jitter + scaleY * ((0.75*sin(x)) + sin(2*x) + (0.3*sin(3*x)));
        break;
        case 1:
            offsetScaleX = 100;                
            boundYPos = jitter + scaleY * (sin(x) + (0.3*sin(3*x)));          
        break;
        case 2:
            offsetScaleX = 200;                   
            boundYPos = jitter + scaleY * ((0.75*sin(x)) + (sin(4*x)));          
        break;                
        case 3:
            offsetScaleX = 300;                   
            boundYPos = jitter + scaleY * ((0.75*sin(6*x)) + (sin(4*x)));          
        break;    
        case 4:
            offsetScaleX = 400;                   
            boundYPos = jitter + scaleY * ((0.55*sin(10*x)) + (sin(2*x)));          
        break;                    
    }  
    
    switch(gapPattern)
    {
        case 0:
            gap = currentGap + (scaleY * sin(8*x));                    
        break;
        case 1:
            gap = currentGap + (scaleY * sin(x));                    
        break;
    }              
    
    bounds.push(new Bound(width, boundYPos, 0, height, gap));    
}

function debugOnOff()
{
    if(debug)
    {
        debug = false;
    }
    else
    {
        debug = true;
    }
}