const currencyFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2
});

export default (_, inject) => {
    inject('currency', (value) => {
        return currencyFormatter.format(value);
    });
};
