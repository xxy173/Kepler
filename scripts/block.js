const steelMill = extend(GenericCrafter, "steel-mill", {
    hasItems: true,
    hasLiquids: true,
    hasPower: true,
    itemCapacity: 20,
    liquidCapacity: 20,
    size: 3,
});

steelMill.requirements(
  Category.crafting,
  ItemStack.with(
    Items.copper, 30,
    Items.lead, 15
  )
);

steelMill.consumeItem(Items.lead, 1);
steelMill.consumeLiquid(Liquids.water, 0.1);
steelMill.consumePower(1);

steelMill.craftTime = 60;
steelMill.outputItem = new ItemStack(Items.copper, 1);