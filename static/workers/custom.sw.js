const messageTypes = {
    GET_POSTS_IDB: "GET_POSTS_IDB"
}

const getDataFromDB = async () => {
    return await idbKeyVal.get("posts-data");
};

const SW_VERSION = '1.0';

addEventListener('message', (event) => {
    console.log(`SW Worker evt`, event);
    switch (event.data.type) {
        case messageTypes.GET_POSTS_IDB:
            getDataFromDB()
                .then(data => {
                    event.ports[0].postMessage(data);
                });
            return;
        case "GET_VERSION":
            event.ports[0].postMessage(SW_VERSION);
            return;
        default:
    }
});
