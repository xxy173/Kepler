function setBoostBar(building, booster, boostMultiplier, craftTime, outputItemAmount) {
    building.addBar("craftSpeed", build => new Bar(
        prov(() => {
            const boosterMultiplier = build.liquids.get(booster) > 0 ? boostMultiplier : 1;
            const baseSpeed = outputItemAmount * 60 / craftTime;
            const speed = boosterMultiplier * baseSpeed * build.efficiency * build.timeScale;
            return "Craft Speed: " + speed.toFixed(2) + "/s";
        }),
        prov(() => Pal.ammo),
        floatp(() => build.efficiency)
    ))
};

module.exports = {
    setBoostBar: setBoostBar
};