class BaseScene extends Phaser.Scene {
  constructor(id){
    super(id);
    this.id = id;
    this.tileDataKey;
    this.tileDataSource;
    this.exit;
  }

  preload() {
    this.load.tilemapTiledJSON('SummerQuestVillage', 'assets/tilemap/SummerQuestJ.json')
    //this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
    this.load.image('archer', 'assets/sprites/playerarcher.png');
    this.load.image('landscape', 'assets/tilemap/kenneyrpgpack/Spritesheet/RPGpack_sheet.png');
    this.load.image('destruct', 'assets/tilemap/kenney-tileset-64px-extruded.png');
    this.load.scenePlugin('VirtualJoystickPlugin', 'js/VirtualJoystickPlugin.js', 'VirtualJoystickPlugin', 'pad');
    this.load.image('enemyarcher', 'assets/sprites/enemyarcher.png');
    this.load.image('earth', 'assets/tilemap/scorched_earth.png');
    this.load.image('bullet', 'assets/sprites/bullet.png');
  }

  create() {
    const map = this.make.tilemap({ key: this.tileDataKey });
    const tileset = map.addTilesetImage('landscape');
    this.physics.world.on('worldbounds',function(body){
      killBullet(body.gameObject)
    }, this);

    //Load in the tilemap and enable collision for the destructable layer
    this.map = this.make.tilemap({key: "SummerQuestVillage"});
    var landscape = this.map.addTilesetImage("RPGpack_sheet", "landscape");
    var solid = this.map.addTilesetImage("kenney-tileset-64px-extruded", "destruct");
    //var layer = this.map.createStaticLayer(solid, landscape);
    this.map.createStaticLayer('Water', landscape, 0, 0);
    this.map.createStaticLayer('floor', landscape, 0, 0);
    var destructLayer = this.map.createDynamicLayer('destructable', landscape, 0, 0);
    destructLayer.setCollisionByProperty({ collide: true });
    this.map.createStaticLayer('Overlap', landscape, 0, 0);
    //this.physics.arcade.collide(this.player, this.destructLayer);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    //Camera
    this.cameras.main.setBounds(0, 0).zoom=1.75;


    //Launch the UIScene at the same time
    this.scene.launch('UIScene');

    //ArcherCreate
    var w = game.config.width;
    var h = game.config.height;
    this.archer = new PlayerCharacter(this,w*1.3, h*2.0, 'archer');
    console.log(this.archer)
    this.archer.enableCollision(destructLayer);
    var outerFrame = new Phaser.Geom.Rectangle(0,0,w, h);
    var innerFrame = new Phaser.Geom.Rectangle(w*0.025,h*0.025,w*0.05, h*0.05);
    this.archer.character.setScale(1.0, );
    this.enemyBullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 10
    })

    this.physics.world.setBounds(0, 0, 1600, 1600);
    console.log ("hello")
    this.cameras.main.startFollow(this.archer.character);
  }
}
