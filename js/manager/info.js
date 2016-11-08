States.Info = function ()
{
    
}

States.Info.prototype = {
	
	create:function()
	{        
		var backgroundMap = this.game.add.sprite(0, 0, 'ecran');
        
        this.game.time.events.add(Phaser.Timer.SECOND * 4, this.advance, this);
	},
    
    advance:function()
    {
        this.state.start("Transition");
    }
    
}