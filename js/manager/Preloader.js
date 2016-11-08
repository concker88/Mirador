States.Preloader = function ()
{
	this.preloadBar = null;
    
    this.UI = null;
}

States.Preloader.prototype = {
	
	init:function()
	{
        //var backgroundMap = this.game.add.sprite(0, 0, 'ecran');
        
        //this.game.time.events.add(Phaser.Timer.SECOND * 4, this.advance, this);
    },
	
	preload:function()
	{
        this.load.image('joueur', 'assets/joueur.png');
        this.load.image('barriere', 'assets/barriere.png');
        this.load.image('map', 'assets/map.png');
        this.load.image('spot', 'assets/spot.png');
        this.load.image('boule', 'assets/boule.png');
        this.load.image('fleche', 'assets/fleche.png');
        this.load.image('joueur1', 'assets/joueur1.png');
        this.load.image('joueur2', 'assets/joueur2.png');
        this.load.image('ecran', 'assets/ecran.png');
        
		//this.load.spritesheet('ball', 'assets/ball.png?', 20, 20, 4);
		
		//this.load.tilemap('terrain', '_map/map.json?', null, Phaser.Tilemap.TILED_JSON);
        
        
	},
	
	loadUpdate:function()
	{
		//this.preloadBar.scale.x = this.load.progress/100;
	},
    
    update:function()
    {
        Globals.BarrierTab = new Array(Globals.MapLenght-3);
        
        for(var i = 0 ; i < Globals.MapLenght-3 ; i++)
        {
            Globals.BarrierTab[i] = new Array(Globals.MapHeight*2);
        }
        
        for(var i = 0 ; i < Globals.MapLenght-3 ; i++)
        {
            for(var j = 0 ; j < Globals.MapHeight*2 ; j++)
            {
                Globals.BarrierTab[i][j] = 0;
            }
        }
        
        this.state.start("Info");
    },
    
    advanceLoading:function()
    {

    }
}