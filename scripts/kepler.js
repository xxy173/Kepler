module.exports = {
    iron(){
        return Vars.content.getByName(ContentType.item, "kepler-iron");      
    },
    steel(){
        return Vars.content.getByName(ContentType.item, "kepler-steel");
    },
    oxygen(){
        return Vars.content.getByName(ContentType.liquid, "kepler-oxygen");
    }
}
