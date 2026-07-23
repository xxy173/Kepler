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
        this.consumeLiquid(oxygen, this.mediumUsePerTick).boost();
        this.super$init();
    },

    setBars() {
        this.super$setBars();
        const oxygen = Vars.content.getByName(ContentType.liquid, "kepler-oxygen");
        this.addBar("craftSpeed", build => new Bar(
            prov(() => {
                const oxygenMultiplier = build.liquids.get(oxygen) > 0 ? this.mediumMultiplier : 1;
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
        const oxygen = Vars.content.getByName(ContentType.liquid, "kepler-oxygen");
        const hasOxygen = this.liquids.get(oxygen) > 0;
        return this.super$getProgressIncrease(baseTime) * (hasOxygen ? steelMill.mediumMultiplier : 1);
    },
})


const factory = extend(GenericCrafter, "custom-liquid-factory", {});

// 設定値をマルチプレイでも同期させる
factory.config(java.lang.Integer, (build, value) => {
    build.liquidDirections = value.intValue();
});

factory.configurable = true;
factory.saveConfig = true;

factory.buildType = () => extend(
    GenericCrafter.GenericCrafterBuild,
    factory,
    {
        liquidDirections: 0,

        // 各液体の方向を2ビットずつ保存する
        getLiquidDirection(index){
            return (this.liquidDirections >> (index * 2)) & 3;
        },

        setLiquidDirection(index, direction){
            const shift = index * 2;
            const mask = 3 << shift;

            const next =
                (this.liquidDirections & ~mask) |
                ((direction & 3) << shift);

            // 直接代入せず、configure()を使って同期する
            this.configure(java.lang.Integer.valueOf(next));
        },

        dumpOutputs(){
            const outputs = this.block.outputLiquids;
            if(outputs == null) return;

            for(let i = 0; i < outputs.length; i++){
                this.dumpLiquid(
                    outputs[i].liquid,
                    2,
                    this.getLiquidDirection(i)
                );
            }
        },

        buildConfiguration(table){
            const names = ["前", "上", "後", "下"];

            for(let i = 0; i < this.block.outputLiquids.length; i++){
                const liquid = this.block.outputLiquids[i].liquid;

                table.image(liquid.uiIcon).size(32);
                table.label(() =>
                    liquid.localizedName + ": " +
                    names[this.getLiquidDirection(i)]
                ).width(140);

                table.button("変更", () => {
                    const next =
                        (this.getLiquidDirection(i) + 1) % 4;

                    this.setLiquidDirection(i, next);
                }).size(70, 40);

                table.row();
            }
        },

        // 建築コピー時の設定
        config(){
            return java.lang.Integer.valueOf(this.liquidDirections);
        },

        // セーブデータへの保存
        write(write){
            this.super$write(write);
            write.i(this.liquidDirections);
        },

        read(read, revision){
            this.super$read(read, revision);
            this.liquidDirections = read.i();
        }
    }
);