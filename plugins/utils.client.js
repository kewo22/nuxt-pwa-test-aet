export const Marketplaces = {
    default: {
        name: "Default Marketplace",
        images: {
            full: require("~/assets/deliverooHeroFull.svg"),
            thumbnail: require("~/assets/deliveryHero.png"),
        }
    },
    deliveroo: {
        name: "Deliveroo",
        images: {
            full: require("~/assets/deliverooHeroFull.svg"),
            thumbnail: require("~/assets/deliveryHero.png"),
        }
    },
    ubereats: {
        name: "Uber Eats",
        images: {
            full: require("~/assets/ubereateFull.png"),
            thumbnail: require("~/assets/ubereats.png"),
        }
    },
    justeat: {
        name: "Just Eat",
        images: {
            full: require("~/assets/justEatFull.svg"),
            thumbnail: require("~/assets/justEat.png"),
        }
    },
}

/**
 * Get marketplace images
 * @param {String} marketplaceName Marketplace name
 * @param {String|null} imageSize thumbnail|full
 */
export const getMarketplaceImages = (
    marketplaceName = "default",
    imageSize = "thumbnail"
) => {
    return Marketplaces[marketplaceName].images[imageSize];
}


export default ({ app }, inject) => {
    inject('getMarketplaceImages', getMarketplaceImages);
}