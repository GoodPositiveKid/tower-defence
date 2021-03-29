import * as enemy from "/enemy.js"
import * as inventory from "/inventory.js"
var config = {
    type: Phaser.AUTO,
    parent:'game',
    width: 600,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: refresh
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:0},
            debug: false
        }
    }
};
var hotbarslot = 0
var game = new Phaser.Game(config);
function preload() {
    this.load.image('slot','slot.png')
    this.load.image('redcannon','cannon_red.png');
    this.load.image('enemy','enemy.png');
    this.load.image('shop',"shop.png");
    this.load.image('arrow',"Arrow.png")
}
function create() {
    var graphics = this.add.graphics();
    this.health = 100;
    this.healthobj= document.getElementById("health");
    this.healthobj.value=this.health;
    this.camera=this.cameras.main;
    enemy.path1(null,this,true,graphics);
    enemy.path2(null,this,true,graphics);
    this.camera.setBackgroundColor("#00FF00");
    this.moneytext = this.add.text(70,20,'money: $'+inventory.money,{fontsize:30,color:'#FF0000'});
    this.shoptext1 = this.add.text(460,80,'Red Cannon:$25',{fontsize:12,color:'#0000FF'})
    this.cannon1group = this.physics.add.group({defaultkey:'redcannon'})
    this.enemygroup = this.physics.add.group({defaultkey:'enemy'});
    this.numenemys = 0;
    this.shopButton = this.add.sprite(575,20,'shop').setInteractive().setDataEnabled();
    this.shopIcon1 = this.add.sprite(530,50,'redcannon').setInteractive();
    this.shopButton.data.set('shop',0);
    inventory.drawSlots(this);
    this.random = (Math.floor(Math.random() * Math.floor(2)))
    this.pointer = this.add.sprite(60,540,'arrow')
    this.shopButton.on('pointerdown',function(pointer){
        if (this.data.values.shop == 1) {
            this.data.values.shop -=1;
        } else {
            this.data.values.shop += 1;
        }
    })
    this.shopIcon1.on('pointerdown',function(){
        if ((inventory.money>24)&&(inventory.firstEmpty < 5)){ 
        inventory.changemoney(-25);
        inventory.addToHotbar('redcannon');
        }
    })
    this.input.on('pointerdown',function(pointer){
        if (inventory.touchingHotbar(pointer)) {
            hotbarslot = inventory.whichSlot(pointer);
        }
    })
}
function refresh() {
    if (enemy.done) {
        console.log(enemy.done);
        this.random = (Math.floor(Math.random() * Math.floor(2)))
        enemy.notDone();
        this.numenemys -= 1;
        this.health -= 4;
    }
    inventory.updateCursor(this,hotbarslot)
    this.moneytext.text = 'money: $'+inventory.money;
    inventory.putItems(this);
    if ((this.health<1)||(this.shopButton.data.values.shop==1)) {
        if (this.health<1) {
            this.camera.shake(700)
            var lose=document.createElement("H1");
            lose.textContent = "YOU LOSE!!!"
            document.getElementById("game").appendChild(lose);
            setTimeout(function(){
            document.getElementById("game").remove()
            document.getElementById("bar").remove()},3000);
        } else {
            // code to open store
            this.shopIcon1.visible = true;
            this.shoptext1.visible=true;
        } 
    } else {
        if (this.numenemys < 1) {
            this.enemygroup.create(300,20,'enemy');
            this.numenemys += 1;
        }
        this.healthobj.value=this.health;
        this.enemygroup.children.iterate(function (child){
            if (this.random == 1) {
                enemy.path1(child,this);
            } else {
                enemy.path2(child,this);
            }
        },this);
        //code to close store
        this.shopIcon1.visible = false;
        this.shoptext1.visible=false;
    }
}