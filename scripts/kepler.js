const iron = Vars.content.getByName(ContentType.item, "kepler-iron");
const steel = Vars.content.getByName(ContentType.item, "kepler-steel");
const oxygen = Vars.content.getByName(ContentType.liquid, "kepler-oxygen");

print(iron + steel + oxygen)

module.exports = {
    iron: iron,
    steel: steel,
    oxygen: oxygen
}