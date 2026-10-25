function setBoostBar(booster, boostMultiplier, craftTime, outputItemAmount) {
    this.addBar("craftSpeed", build => new Bar(
        prov(() => {
            const checkBoosterType = booster instanceof Item ? "items" : "liquids";

            const boosterMultiplier = build[checkBoosterType()][get(booster)] > 0 ? boostMultiplier : 1;
            const baseSpeed = outputItemAmount * 60 / craftTime;
            const speed = boosterMultiplier * baseSpeed * build.efficiency * build.timeScale;
            return `Craft Speed: ${speed.toFixed(2)}/s`;
        }),
        prov(() => Pal.ammo),
        floatp(() => build.efficientry)
    ))
}

//itemかliquidかでboosterの量の取得方法が違うかもしれない

module.exports = {
    setBoostBar: setBoostBar
};