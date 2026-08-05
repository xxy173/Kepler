const kepler = require("kepler")
Events.on(ContentInitEvent, event => {
    content.load();

    require("blocks");
})