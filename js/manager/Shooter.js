var Shooter = function(game, x, y)
{
	Phaser.Sprite.call(this, game, x, y, 'fleche');
    
    this.trigger = false;
    
    this.cursors = null;
    
    this.index = 0;
    
	this.init();
}

Shooter.prototype = Object.create(Phaser.Sprite.prototype);
Shooter.prototype.constructor = Shooter;

Shooter.prototype.init = function()
{    
    this.anchor.set(0.5,1);
    
    //this.setScaleMinMax(0.1, 2)
    
    this.alpha = 0;
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
}

Shooter.prototype.action = function()
{
    this.changeSpot();
    this.aim();
}

Shooter.prototype.changeSpot = function()
{
    if(this.cursors.left.isDown)
    {
        if(this.index == 0)
            this.index = Globals.Spots-1;
        else
            this.index--;
        
        this.x = Globals.ShootSpots[this.index][0];
        this.y = Globals.ShootSpots[this.index][1];
    }
    else if(this.cursors.right.isDown)
    {
        if(this.index == Globals.Spots-1)
            this.index = 0;
        else
            this.index++;
        
        this.x = Globals.ShootSpots[this.index][0];
        this.y = Globals.ShootSpots[this.index][1];
    }
}

Shooter.prototype.aim = function()
{
    if(this.game.input.activePointer.leftButton.isDown)
    {
        this.alpha = 1;
        
        this.rotation = Math.atan2(this.game.input.activePointer.y - this.y, this.game.input.activePointer.x - this.x) - Math.PI/2;
        
        var power = Math.pow(this.game.input.activePointer.y - this.y, 2) + Math.pow(this.game.input.activePointer.x - this.x, 2);
        
        power = Math.sqrt(power)/100;
        
        if(power>2)
            power=2;
        else if(power<0.4)
            power=0.4;
        
        this.scale.setTo(power, power);
        
        this.trigger = true;
    }
    else if(this.game.input.activePointer.leftButton.isUp && this.trigger)
    {
        this.alpha = 0;
        this.game.onShoot.dispatch(this.rotation, this.index);
        this.trigger = false;
    }
}