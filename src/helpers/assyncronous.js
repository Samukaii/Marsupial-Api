module.exports = {
    async to(promise) {
        return new Promise(resolve => {
            promise
                .then(data => {
                    resolve([data, null]);
                })
                .catch(error => {
                    resolve([null, error]);
                });
        });
    }
};
