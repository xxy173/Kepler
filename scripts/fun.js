function setBoostBar(building, booster, boostMultiplier, craftTime, outputItemAmount) {
    building.addBar("craftSpeed", build => new Bar(
        prov(() => {

            const boosterMultiplier = build.liquids.get(booster) > 0 ? boostMultiplier : 1;
            const baseSpeed = outputItemAmount * 60 / craftTime;
            const speed = boosterMultiplier * baseSpeed * build.efficiency * build.timeScale;
            return `Craft Speed: ${speed.toFixed(2)}/s`;
        }),
        prov(() => Pal.ammo),
        floatp(() => build.efficiency)
    ))
}

//itemかliquidかでboosterの量の取得方法が違うかもしれない
//液体のみ対応するように変更

module.exports = {
    setBoostBar: setBoostBar
};