import * as other from "/other.js"
import * as inventory from "/inventory.js"
if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      window.event.returnValue = false;
    });
  }
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
var place = [null,null,null]
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
    other.path1(null,this,true,graphics);
    this.camera.setBackgroundColor("#00FF00");
    this.moneytext = this.add.text(70,20,'money: $'+inventory.money,{fontsize:30,color:'#FF0000'});
    this.shoptext1 = this.add.text(460,80,'Red Cannon:$25',{fontsize:12,color:'#0000FF'})
    this.cannon1group = this.physics.add.group({defaultkey:'redcannon'})
    this.enemygroup = this.physics.add.group({defaultkey:'enemy'});
    this.bulletgroup = this.physics.add.group({defaultkey:''})
    this.physics.add.overlap(this.bulletgroup,this.enemygroup,killEnemy,null,this);
    this.time.addEvent({delay:700,callback:()=>{
        if (!((this.health<1)||(this.shopButton.data.values.shop==1))) {
        this.cannon1group.children.iterate(function (child){
            other.bulletcreate1(this,child.x+35,child.y,child.angle);
        },this)
    }
    },loop:true});
    this.numenemys = 0;
    this.shopButton = this.add.sprite(575,20,'shop').setInteractive().setDataEnabled();
    this.shopIcon1 = this.add.sprite(530,50,'redcannon').setInteractive();
    this.shopButton.data.set('shop',0);
    inventory.drawSlots(this);
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
        } else if ((inventory.pocket[hotbarslot])&&(pointer.rightButtonDown())&&(!(inventory.touchingHotbar(pointer)))){
            place = [pointer.x,pointer.y,null]
            if (inventory.pocket[hotbarslot] == "redcannon"){
                place[2] = "cannon1group";
            }
        }
        
    })
}
function refresh() {
    if (place[2]) {
        var codestring = ""
        codestring += "this." + place[2] + ".create(" + place[0] +"," + place[1] + ",'"+inventory.pocket[hotbarslot]+"');"
        eval(codestring);
        place = [null,null,null]
        inventory.pocket[hotbarslot] = null;
    }
    inventory.updateCursor(this,hotbarslot)
    this.moneytext.text = 'money: $'+Math.round(inventory.money);
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
        if (this.numenemys < 2) {
            this.enemygroup.create(20,20,'enemy');
            this.numenemys += 1;
        }
        this.healthobj.value=this.health;
        this.enemygroup.children.iterate(function (child){
            other.path1(child,this);
        },this);
        this.bulletgroup.children.iterate(function (child) {
            var vec = this.physics.velocityFromAngle(child.angle, 1);
            var vx = vec.x * 300;
            var vy = vec.y * 300;
            child.setVelocity(vx,vy);
        },this)
        //code to close store
        this.shopIcon1.visible = false;
        this.shoptext1.visible=false;
    }
}
function killEnemy(bullet,enemy){
    this.enemygroup.killAndHide(enemy);
    this.bulletgroup.killAndHide(bullet);
    enemy.body.enable=false;
    bullet.body.enable=false;
    inventory.changemoney(0.2);
    this.numenemys -= 1;
    this.health += 5;
};