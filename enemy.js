export let done = null
export function notDone() {
    done = null
}
export function path1(child,self,drawPath,graphics) {
    graphics = graphics || null;
    drawPath = drawPath || false;
    if (drawPath) {
        graphics.lineStyle(70, 9849600);
        graphics.beginPath();
        graphics.moveTo(300,20);
        graphics.lineTo(300,300);
        graphics.lineTo(599,300);
        graphics.lineTo(599,589);
        graphics.strokePath();
    }else {
    if (child.y < 299) {
        child.y+=1
    } else if ((child.y>298)&&(child.x<599)) {
        child.x+= 1
    } else if (child.x > 598) {
        child.y += 1
    };
    if (child.y == 580) {
        self.enemygroup.killAndHide(child);
        done = "yes"
    }
}
}
export function path2(child,self,drawPath,graphics) {
    graphics = graphics || null;
    drawPath = drawPath || false;
    if (drawPath) {
        graphics.lineStyle(70, 9849600);
        graphics.beginPath();
        graphics.moveTo(300,20);
        graphics.lineTo(300,300);
        graphics.lineTo(30,300);
        graphics.lineTo(30,589);
        graphics.strokePath();
    }else {
    if (child.y < 299) {
        child.y+=1
    } else if ((child.y>298)&&(child.x>29)) {
        child.x-= 1
    } else if (child.x < 30) {
        child.y += 1
    };
    if (child.y == 580) {
        self.enemygroup.killAndHide(child);
        done = "yes"
    }
}
}