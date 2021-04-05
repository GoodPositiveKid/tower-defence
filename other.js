export function path1(child,self,drawPath,graphics) {
    graphics = graphics || null;
    drawPath = drawPath || false;
    if (drawPath) {
        graphics.lineStyle(70, 9849600);
        graphics.beginPath();
        graphics.moveTo(20,20);
        graphics.lineTo(20,300);
        graphics.lineTo(554,300);
        graphics.lineTo(554,589);
        graphics.strokePath();
    }else {
    if (child.y < 299) {
        child.y+=child.data.values.speed;
    } else if ((child.y>298)&&(child.x<554)) {
        child.x+=child.data.values.speed;
    } else if ((child.x > 553)&&(child.x<581)) {
        child.y +=child.data.values.speed;
    };
    if ((child.y >580)&&(child.active == true)) {
        self.enemygroup.killAndHide(child);
        child.body.enable = false;
        self.numenemys -= 1;
        percentage -= 1;
    };
}
}
export let level = 1;
export let speed = 1;
export let numbers = 1;
export function bulletcreate1(self,x,y,angle) {
    var bullet = self.bulletgroup.create(x,y,'');
    bullet.angle = angle;
    bullet.displayWidth = 25;
    bullet.scaleY = bullet.scaleX;
    bullet.lifespan = 800;
}
export function wave(self) {
    if(((Math.floor(Math.random() * 6)))==1){
        // boss wave!
        var health = Math.floor(Math.random() * (75 - 50) + 50); // random between 50 and 75
        level += 1;
    } else {
        if (level ==1) {
            numbers = 1;
            level += 1;
        } else {
            numbers = Math.floor(Math.random() * (10 - 5) + 5);
            level += 1;
        }
    }
    for (var i =0;i<numbers;i++){
        var enemy = self.enemygroup.create(40,40,'enemy');
        enemy.y += Math.floor(Math.random() * (70 + 20) -20);
        enemy.setDataEnabled();
        enemy.data.set('health',Math.floor(Math.random() * (3 - 2) + 2));
        if (level == 1) {enemy.data.set('speed',1);}else{
        enemy.data.set('speed',Math.floor(Math.random() * (5 - 1) + 1));
        }
        self.numenemys += 1;
    }
}
export let percentage = 100;
var healthbarshadow = new Phaser.Geom.Rectangle(360, 540, 120, 50);
var healthbar = new Phaser.Geom.Rectangle(370, 550, percentage, 30);
export function drawAll(graphics) {
    graphics.clear();
    healthbar.width = percentage;
    graphics.fillStyle(16777215,100);
    graphics.fillRectShape(healthbarshadow);
    graphics.fillStyle(6749952,100);
    graphics.fillRectShape(healthbar);
    path1(null,null,true,graphics);
};