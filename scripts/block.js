const kepler = require("kepler")

const steelMill = extend(GenericCrafter, "steel-mill", {
    init() {
        kepler.load();

        this.mediumMultiplier = 2;
        this.mediumUsePerTick = 0.05;
        this.craftTime = 90;

        this.consumeItems(
            ItemStack.with(
                kepler.iron, 3,
                Items.coal, 1
            )
        );
        /*        
                上のは
                this.consumeItems(
                    new ItemStack(iron, 3),
                    new ItemStack(Items.coal, 1)
                 );
                 と同じ
        */

        this.consumePower(1);
        this.consumeLiquid(kepler.oxygen, this.mediumUsePerTick).boost();
        this.outputItem = new ItemStack(kepler.steel, 3);

        this.super$init();
    },

    setBars() {
        this.super$setBars();
        this.addBar("craftSpeed", build => new Bar(
            prov(() => {
                const oxygenMultiplier = build.liquids.get(kepler.oxygen) > 0 ? this.mediumMultiplier : 1;
                const baseSpeed = this.outputItem.amount * 60 / this.craftTime;
                const speed = baseSpeed * oxygenMultiplier * build.efficiency * build.timeScale;
                return "Craft Speed: " + speed.toFixed(2) + "/s";
            }),
            prov(() => Pal.ammo),
            floatp(() => build.efficiency)
        ));
    },

    setStats() {
        this.super$setStats();
        this.stats.add(Stat.booster, StatValues.string("[accent]" + this.mediumMultiplier + "x[] speed"));
    }
});

steelMill.buildType = () => extend(GenericCrafter.GenericCrafterBuild, steelMill, {
    getProgressIncrease(baseTime) {
        const hasOxygen = this.liquids.get(kepler.oxygen) > 0;
        return this.super$getProgressIncrease(baseTime) * (hasOxygen ? steelMill.mediumMultiplier : 1);
    },
});