const steelMill = extend(GenericCrafter, "steel-mill", {
    init(){
        const steel = Vars.content.getByName(ContentType.item, "kepler-steel");
        const iron = Vars.content.getByName(ContentType.item, "kepler-iron");

        this.consumeItems(
            ItemStack.with(
                iron, 1,
                Items.coal, 1
            )
        );
        this.consumePower(1);
        this.craftTime = 60;
        this.outputItem = new ItemStack(steel, 1);

        this.super$init();
    }
});

steelMill.buildType = () => extend(GenericCrafter.GenericCrafterBuild, steelMill, {
    getProgressIncrease(baseTime){
        const hasWater = this.liquids.get(liquids.water) > 0;
        return this.super$getProgressIncrease(baseTime) * (hasWater ? 2 : 1);
    },
    updateTile(){
        this.super$updateTile();
        const water = this.liquids.get(liquids.water);
        if(water > 0 && this.efficiency > 0){
            this.liquids.remove(liquids.water, Math.min(water, 0.1))
        }
    }
});

