States.PlaceP2 = function ()
{
	this.map = null;

    this.Hud = null;
    
    this.pause = 0;
    
    this.barriers = null;
    
    this.spots = null;
    
    this.inputOK = true;
}

States.PlaceP2.prototype = {
	
	create:function()
	{        
        var backgroundMap = this.game.add.sprite(0, 0, 'map');
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.initMap();
		
		this.Hud = new HUD(this.game,2);
        //this.Hud.fixedToCamera = true;
        
        this.game.input.mouse.capture = true;
	},
    
    /**************************
			MAP
	***************************/
	
    initMap:function()
    {
        this.barriers = this.game.add.group();
            
        for(var i = 0 ; i < Globals.MapLenght-3 ; i++)
        {
            for(var j = 0 ; j < Globals.MapHeight*2 ; j++)
            {
                if(Globals.BarrierTab[i][j] == 1)
                {
                    var bar = this.barriers.create(i*80, j/2*80+80, 'barriere');
                    
                    if(j%2 == 1)
                    {
                        bar.x += 90;
                        bar.y -= 30;
                        bar.angle = 90;
                    }
                }
            }
        }
        
        this.spots = this.game.add.group();
        
        for(var i = 0 ; i < Globals.Spots ; i++)
        {
            var spot = this.spots.create(Globals.ShootSpots[i][0], Globals.ShootSpots[i][1], 'spot');
            spot.anchor.set(0.5,0.5);
        }
    },
	
	/**************************
			LOOP ENGINE
	***************************/
    
	
	update:function()
	{
        if(this.game.input.activePointer.leftButton.isDown && (this.game.input.activePointer.x>1200 || this.game.input.activePointer.x>960 && (this.game.input.activePointer.y<90 || this.game.input.activePointer.y>810)))
        {
            Globals.ShootSpots[Globals.Spots] = [this.game.input.activePointer.x, this.game.input.activePointer.y];
            var spot = this.game.add.sprite(this.game.input.activePointer.x, this.game.input.activePointer.y, 'spot');
            spot.anchor.set(0.5,0.5);
            this.add.existing(spot);
            
            Globals.Spots++;
            
            this.state.start("Transition");
        }
            
    }
}