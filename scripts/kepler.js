function iron() {
    return Vars.content.getByName(ContentType.item, "kepler-iron");
};
function steel() {
    return Vars.content.getByName(ContentType.item, "kepler-steel");
};
function oxygen() {
    return Vars.content.getByName(ContentType.liquid, "kepler-oxygen");
};

module.exports = {
    iron: iron,
    steel: steel,
    oxygen: oxygen
}
/*
今のところあんま使えない
使うときは関数として呼ぶために最後に()をつける
*/