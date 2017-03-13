define(["helpers"], function(helpers) {
     /**
     * @module Charts
     * @description Method for [Wrapper for AT&T M2X Charts API]{@link https://m2x.att.com/developer/documentation/charts} endpoint.
     * @param client {object}
     * @constructor
     */
    var Charts = function(client) {
        this.client = client;
    };

    /**
     * @memberOf Charts
     * @description Method for [List Charts]{@link https://m2x.att.com/developer/documentation/v2/charts#List-Charts} endpoint.
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns Charts list
     */
    Charts.prototype.list = function(callback, errorCallback) {
        return this.client.get("/charts", callback, errorCallback);
    };

    /**
     * @memberOf Charts
     * @description Method for [Create Chart]{@link https://m2x.att.com/developer/documentation/v2/charts#Create-Chart} endpoint.
     * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns Chart details
     */
    Charts.prototype.create = function(params, callback, errorCallback) {
        return this.client.post("/charts", { params: params }, callback, errorCallback);
    };

    /**
     * @memberOf Charts
     * @description Method for [View Chart Details]{@link https://m2x.att.com/developer/documentation/v2/charts#View-Chart-Details} endpoint.
     * @param id {str} ID of the Chart to retrieve
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns Chart details
     */
    Charts.prototype.view = function(id, callback, errorCallback) {
        return this.client.get(helpers.url("/charts/{0}", id), callback, errorCallback);
    };

    /**
     * @memberOf Charts
     * @description Method for [Update Chart]{@link https://m2x.att.com/developer/documentation/v2/charts#Update-Chart} endpoint.
     * @param id {str} ID of the Chart to update
     * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Charts.prototype.update = function(id, params, callback, errorCallback) {
        return this.client.put(
            helpers.url("/charts/{0}", id),
            { params: params },
            callback, errorCallback
        );
    };

    /**
     * @memberOf Charts
     * @description Method for [Delete Chart]{@link https://m2x.att.com/developer/documentation/v2/charts#Delete-Chart} endpoint.
     * @param id {str} ID of the Chart to delete
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Charts.prototype.deleteChart = function(id, callback, errorCallback) {
        return this.client.del(helpers.url("/charts/{0}", id), callback, errorCallback);
    };

    /**
     * @memberOf Charts
     * @description Method for [Render Chart]{@link https://m2x.att.com/developer/documentation/v2/charts#Render-Chart} endpoint.
     * @param id {str} ID of the Chart to render
     * @param format {str} supported formats are png and svg
     * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Charts.prototype.render = function(id, format, params, callback, errorCallback) {
        return this.client.get(helpers.url("/charts/{0}.{1}", id, format), callback, errorCallback);
    };

    return Charts;
});
