//液体排出面をカスタマイズできる工場
const customLiquidFactory = extend(GenericCrafter, "custom-liquid-factory", {});

// 設定値をマルチプレイでも同期させる
customLiquidFactory.config(java.lang.Integer, (build, value) => {
    build.setLiquidDirections(value);
});

customLiquidFactory.configurable = true;
customLiquidFactory.saveConfig = true;

customLiquidFactory.buildType = () => extend(GenericCrafter.GenericCrafterBuild, customLiquidFactory, {
    liquidDirections: 0,

    // 各液体の方向を2ビットずつ保存する
    getLiquidDirection(index) {
        return (this.liquidDirections >> (index * 2)) & 3;
    },

    setLiquidDirection(index, direction) {
        const shift = index * 2;
        const mask = 3 << shift;

        const next =
            (this.liquidDirections & ~mask) |
            ((direction & 3) << shift);

        // 直接代入せず、configure()を使って同期する
        this.configure(java.lang.Integer.valueOf(next));
    },

    dumpOutputs() {
        const outputs = this.block.outputLiquids;

        if (outputs == null) return;

        for (let i = 0; i < outputs.length; i++) {
            const direction = this.getLiquidDirection(i);

            // 毎フレーム出ると多すぎるので、方向変更の調査時だけ使用
            Log.infoOnce(
                "[Kepler] dumping index="
                + i
                + " direction="
                + direction
                + " packed="
                + this.liquidDirections
            );

            this.dumpLiquid(
                outputs[i].liquid,
                2,
                direction
            );
        }
    },

    buildConfiguration(table) {
        const names = ["前", "上", "後", "下"];

        for (let i = 0; i < this.block.outputLiquids.length; i++) {
            const liquid = this.block.outputLiquids[i].liquid;

            table.image(liquid.uiIcon).size(32);
            table.label(() =>
                liquid.localizedName + ": " + names[this.getLiquidDirection(i)]).width(140);

            table.button("変更", () => {
                const next = (this.getLiquidDirection(i) + 1) % 4;

                this.setLiquidDirection(i, next);
            }).size(70, 40);

            table.row();
        }
    },

    setLiquidDirections(value) {
        // JavaのIntegerとJSのnumberの両方に対応
        this.liquidDirections = Number(value);

        Log.info(
            "[Kepler] config received: pos=@ value=@",
            this.pos(),
            this.liquidDirections
        );
    },

    // 建築コピー時の設定
    config() {
        return java.lang.Integer.valueOf(this.liquidDirections);
    },

    // セーブデータへの保存
    write(write) {
        this.super$write(write);
        write.i(this.liquidDirections);
    },

    read(read, revision) {
        this.super$read(read, revision);
        this.liquidDirections = read.i();
    }
});