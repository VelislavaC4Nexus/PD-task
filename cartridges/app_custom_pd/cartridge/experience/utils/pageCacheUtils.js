var pageCacheUtils = {
    setCacheExpiry: function (response) {
        var expires = new Date();
        expires.setDate(expires.getDate() + 1); // This handles overflow automatically
        response.setExpires(expires);
    }
};

module.exports = pageCacheUtils;