console.log('Custom service worker!')

console.log('WORKER SCOPE', self)

const messageTypes = {
    GET_POSTS_IDB: "GET_POSTS_IDB"
}

const getDataFromDB = () => {
    return [
        { id: 2, body: "hello from SW" }
    ];
};


const SW_VERSION = '1.0';

addEventListener('message', (event) => {
    console.log(`SW Worker evt`, event);
    switch (event.data.type) {
        case messageTypes.GET_POSTS_IDB:
            const indexedDBData = getDataFromDB();
            event.ports[0].postMessage(indexedDBData);
            return;
        case "GET_VERSION":
            event.ports[0].postMessage(SW_VERSION);
            return;
        default:
            throw new Error("No operator provided");
    }
});
