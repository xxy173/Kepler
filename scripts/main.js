const kepler = require("kepler")
Events.on(ContentInitEvent, event => {
    kepler.load();

    require("blocks");
})