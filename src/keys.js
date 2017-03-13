define(["helpers"], function(helpers) {

    /**
     * @module Keys
     * @description Method for [Wrapper for AT&T M2X Keys API]{@link https://m2x.att.com/developer/documentation/keys} endpoint.
     * @param client {object}
     * @constructor
     */
    var Keys = function(client) {
        this.client = client;
    };

    /**
     * @memberOf Keys
     * @description Method for [List Keys]{@link https://m2x.att.com/developer/documentation/v2/keys#List-Keys} endpoint.
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns Keys list
     */
    Keys.prototype.list = function(callback, errorCallback) {
        return this.client.get("/keys", callback, errorCallback);
    };

    /**
     * @memberOf Keys
     * @description Method for [Create Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Create-Key} endpoint.
     * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns API Key details
     */
    Keys.prototype.create = function(params, callback, errorCallback) {
        return this.client.post("/keys", {
            headers: { "Content-Type": "application/json" },
            params: params
        }, callback, errorCallback);
    };

    /**
     * @memberOf Keys
     * @description Method for [View Key Details]{@link https://m2x.att.com/developer/documentation/v2/keys#View-Key-Details} endpoint.
     * @param key {str} Key associated with a developer account
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns Key details
     */
    Keys.prototype.view = function(key, callback, errorCallback) {
        return this.client.get(helpers.url("/keys/{0}", key), callback, errorCallback);
    };

    /**
     * @memberOf Keys
     * @description Method for [Update Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Update-Key} endpoint.
     * @param key {str} Key associated with a developer account
     * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Keys.prototype.update = function(key, params, callback, errorCallback) {
        return this.client.put(helpers.url("/keys/{0}", key), {
            headers: { "Content-Type": "application/json" },
            params: params
        }, callback, errorCallback);
    };

    /**
     * @memberOf Keys
     * @description Method for [Regenerate Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Regenerate-Key} endpoint.
     * Note that if you regenerate the key that you're using for authentication then you would need to change your scripts to start using the new key token for all subsequent requests.
     * @param key {str} Key associated with a developer account
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Keys.prototype.regenerate = function(key, callback, errorCallback) {
        return this.client.post(helpers.url("/keys/{0}/regenerate", key), callback, errorCallback);
    };

    /**
     * @memberOf Keys
     * @description Method for [Delete Key]{@link https://m2x.att.com/developer/documentation/v2/keys#Delete-Key} endpoint.
     * @param key {str} Key associated with a developer account
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Keys.prototype.del = function(key, callback, errorCallback) {
        return this.client.del(helpers.url("/keys/{0}", key), callback, errorCallback);
    };

    return Keys;
});
