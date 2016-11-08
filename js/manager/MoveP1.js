States.MoveP1 = function ()
{
	this.map = null;

	this.player = null;
    
    this.Hud = null;
}

States.MoveP1.prototype = {
	
	create:function()
	{
		this.stage.backgroundColor = "#5c94fc";
        
        var backgroundMap = this.game.add.sprite(0, 0, 'map');
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.initMap();
		
		this.initPlayer();
        
        this.game.endMove = new Phaser.Signal();
        this.game.endMove.add(this.endMoving, this);
		
		this.Hud = new HUD(this.game,3);
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
			PLAYER
	***************************/
	
	initPlayer:function()
	{
        this.player = new Player(this.game, Globals.Runner[0], Globals.Runner[1]);
        this.add.existing(this.player);
	},
	
	
	/**************************
			LOOP ENGINE
	***************************/
    
    endMoving:function(angle)
    {
        this.state.start("Transition");
    },
	
	update:function()
	{
        this.player.move();
    }
}