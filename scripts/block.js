const steelMill = extend(GenericCrafter, "steel-mill", {
    init() {
        this.mediumMultiplier = 2;
        this.mediumUsePerTick = 0.05;
        const steel = Vars.content.getByName(ContentType.item, "kepler-steel");
        const iron = Vars.content.getByName(ContentType.item, "kepler-iron");
        const oxygen = Vars.content.getByName(ContentType.liquid, "kepler-oxygen");

        this.consumeItems(
            ItemStack.with(
                iron, 3,
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
        this.craftTime = 90;
        this.outputItem = new ItemStack(steel, 3);
        steelMill.multiplier = 2;
        steelMill.consumeLiquid(oxygen, this.mediumUsePerTick).boost();
        this.super$init();
    },

    setBars() {
        this.super$setBars();
        this.removeBar("liquid");
        const oxygen = Vars.content.getByName(ContentType.liquid, "kepler-oxygen");

        this.addBar("oxygen", build => new Bar(
            "Oxygen",
            oxygen.color,
            () => build.liquids.get(oxygen) / this.liquidCapacity
        )

        );
        this.addBar("craftSpeed", build => new Bar(
            prov(() => {
                const oxygenMultiplier = build.liquids.get(oxygen) > 0 ? this.mediumMultiplier : 1;
                const baseSpeed = this.outputItem.amount * 60 / this.craftTime;
                const speed = baseSpeed * oxygenMultiplier * build.efficiency * build.timeScale;
                return "Craft Speed: " + speed.toFixed(2) + "/s";
            }),
            prov(() => Pal.ammo),
            floatp(() => build.efficiency)
        )
        );
    }
});

steelMill.buildType = () => extend(GenericCrafter.GenericCrafterBuild, steelMill, {
    acceptLiquid(source, liquid) {
        const oxygen = Vars.content.getByName(ContentType.liquid, "kepler-oxygen");
        return liquid === oxygen;
    },

    getProgressIncrease(baseTime) {
        const oxygen = Vars.content.getByName(ContentType.liquid, "kepler-oxygen");
        const hasOxygen = this.liquids.get(oxygen) > 0;
        return this.super$getProgressIncrease(baseTime) * (hasOxygen ? steelMill.mediumMultiplier : 1);
    },
});