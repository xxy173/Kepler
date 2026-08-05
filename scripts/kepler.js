const kepler = {
    iron: null,
    steel: null,
    oxygen: null,

    load(){
        this.iron = Vars.content.getByName(contentType.item, "kepler-iron")
        this.steel = Vars.content.getByName(contentType.item, "kepler-steel")
        this.oxygen = Vars.content.getByName(contentType.liquid, "kepler-oxygen")
    }
}

module.exports = kepler;
/*
今のところあんま使えない
使うときは関数として呼ぶために最後に()をつける
*/