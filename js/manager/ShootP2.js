States.ShootP2 = function ()
{
	this.map = null;

	this.player = null;
    
    this.shooter = null;
    
    this.barriers = null;
    
    this.spots = null;
    
    this.ball = null;
    
    this.Hud = null;
    
    this.alreadyShoot = false;
}

States.ShootP2.prototype = {
	
	create:function()
	{
        console.log("shoot p2");
        
		this.stage.backgroundColor = "#5c94fc";
        
        var backgroundMap = this.game.add.sprite(0, 0, 'map');
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.initPlayer();
		
		this.initMap();
        
        this.game.onShoot = new Phaser.Signal();
        this.game.onShoot.add(this.shootBall, this);
		
		this.Hud = new HUD(this.game,4);
        //this.Hud.fixedToCamera = true;
        
        this.game.input.mouse.capture = true;
	},
	
	/**************************
			MAP
	***************************/
	
    initMap:function()
    {
        this.barriers = this.game.add.group();
        
        this.barriers.enableBody = true;
            
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
                        bar.body.x += 70;
                        bar.body.y -= 30;
                        bar.body.setSize(20, 80);
                    }
                    
                    bar.body.immovable = true;
                    
                    this.game.debug.body(bar);
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
        this.shooter = new Shooter(this.game, Globals.ShootSpots[0][0], Globals.ShootSpots[0][1]);
        this.add.existing(this.shooter);
        
        this.player = new Player(this.game, Globals.Runner[0], Globals.Runner[1]);
        this.add.existing(this.player);
        this.player.body.immovable = true;
	},
	
	
	/**************************
			LOOP ENGINE
	***************************/
    
    shootBall:function(angle, index)
    {        
        this.ball = this.game.add.sprite(Globals.ShootSpots[index][0], Globals.ShootSpots[index][1], 'boule');
        this.ball.anchor.set(0.5,0.5);
        
        this.game.physics.arcade.enable(this.ball);
        
        this.ball.body.velocity.x = Math.sin(angle)*1000;
        this.ball.body.velocity.y = -Math.cos(angle)*1000;
        
        this.alreadyShoot = true;
    },
	
	update:function()
	{
        if(!this.alreadyShoot)
        {
            this.shooter.action();
        }   
        else if(!this.ball.inWorld)
        {
            this.missShoot();
        }
            
        
        this.game.physics.arcade.collide(this.player, this.ball, this.endGame);
        
        this.game.physics.arcade.collide(this.ball, this.barriers, this.missShoot, null, this);
    },
    
    endGame:function()
    {
        //Afficher J2 vainqueur
    },
    
    missShoot:function()
    {
        this.alreadyShoot = false;
        this.state.start("Transition");
    }
}