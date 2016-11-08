var States = {};

var FontStyle = {};
FontStyle.style1 = {font: 'PressStart2P', fontSize: '14px', fill: '#fff'};
FontStyle.style2 = {font: 'PressStart2P', fontSize: '14px', fill: '#e36e59'};
FontStyle.style3 = {font: 'PressStart2P', fontSize: '14px', fill: '#ac0d0d'};

var Globals = {};
Globals.MapLenght = 15;
Globals.MapHeight = 9;
Globals.BarrierTab = null;
Globals.ShootSpots = [];
Globals.Barriers = 0;
Globals.Spots = 0;
Globals.Runner = [0,0];

window.onload = function()
{
	var game = new Phaser.Game(1500, 900, Phaser.AUTO, 'game-container');
	
	game.state.add("Preloader", States.Preloader);
	game.state.add("MoveP1", States.MoveP1);
    game.state.add("PlaceP1", States.PlaceP1);
    game.state.add("ShootP2", States.ShootP2);
    game.state.add("PlaceP2", States.PlaceP2);
    game.state.add("Transition", States.Transition);
    game.state.add("Info", States.Info);
	
	game.state.start("Preloader");
}