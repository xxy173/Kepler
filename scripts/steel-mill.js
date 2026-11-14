const kepler = require("kepler")
const fun = require("fun")

const steelMill = extend(GenericCrafter, "steel-mill", {
    init() {
        kepler.load();

        this.boostMultiplier = 2;
        this.boostUsePerTick = 0.05;
        this.craftTime = 90;

        this.consumeItems(
            ItemStack.with(
                kepler.iron, 3,
                Items.coal, 1
            )
        );

        this.consumePower(1);
        this.consumeLiquid(kepler.oxygen, this.boostUsePerTick).boost();

        this.outputItem = new ItemStack(kepler.steel, 3);

        this.super$init();
    },

    setBars() {
        this.super$setBars();

        fun.setBoostBar(this, kepler.oxygen, this.boostMultiplier, this.craftTime, this.outputItem.amount)
    },


    setStats() {
        this.super$setStats();
        this.stats.add(Stat.booster, StatValues.string("[accent]" + this.boostMultiplier + "x[] speed"));
    },
});

steelMill.buildType = () => extend(GenericCrafter.GenericCrafterBuild, steelMill, {
    getProgressIncrease(baseTime) {
        const hasOxygen = this.liquids.get(kepler.oxygen) > 0;
        return this.super$getProgressIncrease(baseTime) * (hasOxygen ? steelMill.boostMultiplier : 1);
    },
});