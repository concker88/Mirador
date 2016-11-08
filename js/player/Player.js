var Player = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'joueur');
	
    this.pos = [0,0];
    
    this.moves = 0;
    
    this.pause = 0;
    
    this.inputOK = true;
    
	this.init();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.init = function()
{
	console.log("INIT player");
    
    this.game.physics.arcade.enable(this);
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    this.pos[0] = Globals.Runner[0];
    this.pos[1] = Globals.Runner[1];
    
    this.x = this.pos[0]*80;
    this.y = this.pos[1]*80+90;
}

Player.prototype.move = function()
{
    if(this.inputOK)
    {
        //Déplacement du personnage du joueur 1
        if(this.cursors.left.isDown && this.pos[0]>0 && Globals.BarrierTab[this.pos[0]-1][this.pos[1]*2+1] == 0)
        {
            this.pos[0]--;
            this.moves++;
        }
        else if(this.cursors.right.isDown && this.pos[0]<Globals.MapLenght-1 && Globals.BarrierTab[this.pos[0]][this.pos[1]*2+1] == 0)
        {
            this.pos[0]++;
            this.moves++;
        }
        else if(this.cursors.up.isDown && this.pos[1]>0&& Globals.BarrierTab[this.pos[0]][this.pos[1]*2] == 0) 
        {
            this.pos[1]--;
            this.moves++;
        }
        else if(this.cursors.down.isDown && this.pos[1]<Globals.MapHeight-1 && Globals.BarrierTab[this.pos[0]][this.pos[1]*2+2] == 0)
        {
            this.pos[1]++;
            this.moves++;
        }
        
        this.inputOK = false;
    }
    
    this.x = this.pos[0]*80;
    this.y = this.pos[1]*80+90;
    
    if(this.moves == 3 || this.spaceKey.isDown)
    {
        Globals.Runner[0] = this.pos[0];
        Globals.Runner[1] = this.pos[1];
        this.game.endMove.dispatch();
    }
    
    if(this.game.time.totalElapsedSeconds() - this.pause > 0.1)
    {
        this.pause = this.game.time.totalElapsedSeconds();
        this.inputOK = true;
    }
}