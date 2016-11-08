var HUD = function(game, phase)
{
	Phaser.Group.call(this, game);
	
    this.Text = null;
	
	this.init(phase);
}

HUD.prototype = Object.create(Phaser.Group.prototype);
HUD.prototype.constructor = HUD;

HUD.prototype.init = function(phase)
{   
    if(phase == 1)
	   this.Text = this.game.add.text(35,15, "J1 : Fleches pour positionner, Espace pour poser protection", FontStyle.style1);
    else if(phase == 2)
	   this.Text = this.game.add.text(35,15, "J2 : Clic pour positionner spot de tir dans zone gardien", FontStyle.style1);
    else if(phase == 3)
	   this.Text = this.game.add.text(5,15, "J1 : Fleches pour se déplacer, 3 déplacements ou Espace pour finir tour", FontStyle.style1);
    else if(phase == 4)
	   this.Text = this.game.add.text(55,15, "J2 : Fleches pour changer spot, Clic pour tirer", FontStyle.style1);
}