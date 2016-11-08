States.Transition = function ()
{
    
    this.barriers = null;
    
    this.spots = null;
    
    this.Hud = null;
    
    this.joueur = true;
    
    this.place = true;
    
    this.tir = true;
}

States.Transition.prototype = {
	
	create:function()
	{        
        var backgroundMap = this.game.add.sprite(0, 0, 'map');
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.initMap();
        
        this.showImage();
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
    
    changeState:function()
    {
        if(Globals.Spots < 3)
        {
            if(this.place)
            {
                this.state.start("PlaceP1");
                this.place = false;
            }
            else
            {
                this.state.start("PlaceP2");
                this.place = true;
            }
        }
        else
        {
            if(this.tir)
            {
                this.state.start("MoveP1");
                this.tir = false;
            }
            else
            {
                this.state.start("ShootP2");
                this.tir = true;
            }
        }
            
    },
    
    showImage:function()
    {
        if(this.joueur)
        {
            var joueur = this.game.add.sprite(600, 400, 'joueur1');
            this.joueur = false;
        }
        else
        {
            var joueur = this.game.add.sprite(600, 400, 'joueur2');
            this.joueur = true;
        }
        
        joueur.alpha = 0;
        
        this.game.add.tween(joueur).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		
		//this.Hud = new HUD(this.game);
        //this.Hud.fixedToCamera = true;
        
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.changeState, this);
    }
}