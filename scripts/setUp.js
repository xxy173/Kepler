const contents = {
    iron: null,
    steel: null,
    oxygen: null
};
Events.on(ContentInitEvent, event => {
    contents.iron = Vars.content.getByName(ContentType.item, "kepler-iron");
    contents.steel = Vars.content.getByName(ContentType.item, "kepler-steel");
    contents.oxygen = Vars.content.getByName(ContentType.liquid, "kepler-oxygen");
});

module.exports = {
    contents: contents
}
