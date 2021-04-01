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
        child.y+=1
    } else if ((child.y>298)&&(child.x<554)) {
        child.x+= 1
    } else if (child.x > 553) {
        child.y += 1
    };
    if (child.y == 580) {
        self.enemygroup.killAndHide(child);
        self.numenemys -= 1;
        self.health -= 4;
    }
    if (child.y == 400) {
        self.health += 2;
        self.numenemys -= 1;
    }
}
}
export function bulletcreate1(self,x,y,angle) {
    var bullet = self.bulletgroup.create(x,y,'');
    bullet.angle = angle;
    bullet.lifespan = 800;
}