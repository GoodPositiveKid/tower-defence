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
var game = new Phaser.Game(config);
function preload() {
    this.load.image('slot','slot.png')
    this.load.image('redcannon','cannon_red.png');
    this.load.image('enemy','enemy.png');
    this.load.image('shop',"shop.png");
}
function create() {
    var graphics = this.add.graphics();
    this.health = 100;
    this.healthobj= document.getElementById("health");
    this.healthobj.value=this.health;
    this.camera=this.cameras.main;
    this.camera.setBackgroundColor("#00FF00");
    graphics.lineStyle(70, 9849600);
    graphics.beginPath();
    graphics.moveTo(20,20);
    graphics.lineTo(20,300);
    graphics.lineTo(554,300);
    graphics.lineTo(554,589);
    graphics.strokePath();
    this.moneytext = this.add.text(70,20,'money: $'+inventory.money,{fontsize:30,color:'#FF0000'});
    this.shoptext1 = this.add.text(460,80,'Red Cannon:$25',{fontsize:12,color:'#0000FF'})
    this.cannon1group = this.physics.add.group({defaultkey:'redcannon'})
    this.enemygroup = this.physics.add.group({defaultkey:'enemy'});
    this.numenemys = 0;
    this.shopButton = this.add.sprite(575,20,'shop').setInteractive().setDataEnabled();
    this.shopIcon1 = this.add.sprite(530,50,'redcannon').setInteractive();
    this.shopButton.data.set('shop',0);
    inventory.drawSlots(this);
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
            console.log(inventory.whichSlot(pointer));
        }
    })
}
function refresh() {
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
        if (this.numenemys < 2) {
            this.enemygroup.create(20,20,'enemy');
            this.numenemys += 1;
        }
        this.healthobj.value=this.health;
        this.enemygroup.children.iterate(function (child){
            if (child.y < 299) {
                child.y+=1
            } else if ((child.y>298)&&(child.x<554)) {
                child.x+= 1
            } else if (child.x > 553) {
                child.y += 1
            };
            if (child.y == 580) {
                this.enemygroup.killAndHide(child);
                this.numenemys -= 1;
                this.health -= 4;
            }
            if (child.y == 400) {
                this.health += 2;
                this.numenemys -= 1;
            }
        },this);
        //code to close store
        this.shopIcon1.visible = false;
        this.shoptext1.visible=false;
    }
}