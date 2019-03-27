class UIScene extends BaseScene{
  constructor(){
    super('UIScene');

  }
  preload() {
    super.preload();
    this.load.atlas('joystickcontroller', 'assets/sprites/arcade-joystick.png', 'assets/sprites/arcade-joystick.json');

  }

  create() {
    //VirtualJoystick
    this.stick = this.pad.addStick(120, 1075, 200, 'joystickcontroller');
    //this.stick.setScrollFactor(0);
    this.stick.on('update', stickUpdate, this);
    this.stick.scale = 1.0;
    this.gameScene = this.scene.manager.getScene('TownScene');
    this.gameArcher = this.gameScene.archer.character.body;
  }

  update(){
    //Put this in the UIScene. Allows it to access the game scene.
  }
}

//Stick Update
function stickUpdate (stick, force)
{
  const maxSpeed = 200;

  if (stick.isDown)
  {
    this.physics.velocityFromRotation(stick.rotation, force * maxSpeed, this.gameArcher.velocity);
    this.gameScene.archer.character.rotation = this.stick.rotation;
  }
  else{
    this.gameArcher.velocity.set(0);
  }

}
