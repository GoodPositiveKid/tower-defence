export let firstEmpty = 0;
export let money = 50;
export function changemoney(amount) {
    money += amount;
}
export function drawSlots(self) {
    for(var i =1;i<6;i++) {
        self.add.image((i*40)+20,570,'slot');
    }
}
export let pocket = [null,null,null,null,null];
export let slotbetweensx = [[40,79],[80,119],[120,159],[160,199],[200,240]];
export function touchingHotbar(pointer) {
    var x = pointer.x;
    var y = pointer.y;
    if ((x>=40)&&(x<=240)&&(y>=560)&&(y<=600)) {
        return true;
    }
    return false;
};
export function whichSlot(pointer) {
    var x = pointer.x;
    for (var i in slotbetweensx) {
        if ((x>=slotbetweensx[i][0])&&(x<=slotbetweensx[i][1])) {
            return i;
        };
    };
};
export function putItems(self) {
    for(var i in pocket) {
        if (pocket[i]) {
            self.add.image(((parseInt(i)+1)*40)+20,570,pocket[i]).displayWidth = 30;
        } else {
            self.add.rectangle(60+(parseInt(i)*40),571,30,30,16777215)
        }
    };
};
export function addToHotbar(thing) {
    pocket[firstEmpty] = thing;
    firstEmpty ++;
};
export function updateCursor(self,whichslot) {
    self.pointer.x = ((parseInt(whichslot)+1)*40)+20 
}