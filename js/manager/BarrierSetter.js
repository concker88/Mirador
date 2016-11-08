var BarrierSetter = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'barriere');
	
    this.pos = [0,0];
    
    this.pause = 0;
    
    this.inputOK = true;
    
    this.spaceKey = null;
    
	this.init();
}

BarrierSetter.prototype = Object.create(Phaser.Sprite.prototype);
BarrierSetter.prototype.constructor = BarrierSetter;

BarrierSetter.prototype.init = function()
{
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
    //this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.game.add.tween(this).to( { alpha: 0.5 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
}

BarrierSetter.prototype.move = function()
{
    if(this.inputOK)
    {
        //Déplacement du curseur
        if(this.cursors.left.isDown && this.pos[0]>0)
            this.pos[0]--;
        else if(this.cursors.right.isDown && this.pos[0]<Globals.MapLenght-4)
            this.pos[0]++;
        else if(this.cursors.up.isDown && this.pos[1]>0) 
            this.pos[1]--;
        else if(this.cursors.down.isDown && this.pos[1]<Globals.MapHeight*2)
            this.pos[1]++;
        
        
        if(this.pos[1]%2 == 0)
        {
            this.x = this.pos[0]*80;
            this.y = this.pos[1]/2*80+80;
            this.angle = 0;
        }
        else
        {
            this.x = this.pos[0]*80+90;
            this.y = (this.pos[1]-1)/2*80+90;
            this.angle = 90;
        }
        

        if(this.spaceKey.isDown)
        {
            if(Globals.BarrierTab[this.pos[0]][this.pos[1]] != 1)
            {
                Globals.BarrierTab[this.pos[0]][this.pos[1]] = 1;
                var bar = this.game.add.sprite(this.x, this.y, 'barriere');
                if(this.pos[1]%2 == 1)
                    bar.angle = 90;
                
                Globals.Barriers++;
            }
                
        }
           
        this.inputOK = false;
    }
       
    if(this.game.time.totalElapsedSeconds() - this.pause > 0.1)
    {
        this.pause = this.game.time.totalElapsedSeconds();
        this.inputOK = true;
    }
       
}