let coolingTester = extend(GenericCrafter, "cooling-tester", {});

coolingTester.health = 200;
coolingTester.size = 2;
coolingTester.requiredCooling = 10;

coolingTester.buildType = function(){
  return extend(GenericCrafter.GenericCrafterBuild, coolingTester, {
    cooling: 0,
    wasCooled: false,

    updateTile(){
      this.super$updateTile();

      let isCooled = this.cooling >= this.block.requiredCooling;

      if(isCooled !== this.wasCooled){
        if(isCooled){
          print("冷却テスター: 冷却OK");
        }else{
          print("冷却テスター: 冷却不足");
        }

        this.wasCooled = isCooled;
      }
    }
  });
};