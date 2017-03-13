define(["helpers"], function(helpers) {
    /**
     * @module Metadata
     * @description Method for Generic Metadata methods for M2X resources endpoint.
     * @param client {object}
     * @constructor
     */
    var Metadata = function(client) {
        this.client = client;
    };

    /**
     * @memberOf Metadata
     * @description Method for Read resource's metadata for [devices]{@link https://m2x.att.com/developer/documentation/v2/device#Read-Device-Metadata}, [distributions]{@link https://m2x.att.com/developer/documentation/v2/distribution#Read-Distribution-Metadata}, [collections]{@link https://m2x.att.com/developer/documentation/v2/collections#Read-Collection-Metadata} endpoint.
     * @param resource {str} Device or distribution or collection
     * @param id {str} ID of the resource
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Metadata.prototype.read = function(resource, id, callback, errorCallback) {
        return this.client.get(helpers.url("/{0}/{1}/metadata", resource, id), callback, errorCallback);
    };

    /**
     * @memberOf Metadata
     * @description Method for Update resource's metadata for [devices]{@link https://m2x.att.com/developer/documentation/v2/device#Update-Device-Metadata}, [distributions]{@link https://m2x.att.com/developer/documentation/v2/distribution#Update-Distribution-Metadata}, [collections]{@link https://m2x.att.com/developer/documentation/v2/collections#Update-Collection-Metadata} endpoint.
     * @param resource {str} Device or distribution or collection
     * @param id {str} ID of the resource
     * @param params {params} Query parameters passed as keyword arguments. View M2X API Docs for listing of available parameters.
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Metadata.prototype.update = function(resource, id, params, callback, errorCallback) {
        return this.client.put(helpers.url("/{0}/{1}/metadata", resource, id), {
            headers: { "Content-Type": "application/json" },
            params: params
        }, callback, errorCallback);
    };

    /**
     * @memberOf Metadata
     * @description Method for Read resource's metadata field for [devices]{@link https://m2x.att.com/developer/documentation/v2/device#Read-Device-Metadata-Field}, [distributions]{@link https://m2x.att.com/developer/documentation/v2/distribution#Read-Distribution-Metadata-Field}, [collections]{@link https://m2x.att.com/developer/documentation/v2/collections#Read-Collection-Metadata-Field} endpoint.
     * @param resource {str} Device or distribution or collection
     * @param id {str} ID of the resource
     * @param field {str} Resource's metadata field to be read
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Metadata.prototype.readField = function(resource, id, field, callback, errorCallback) {
        return this.client.get(helpers.url("/{0}/{1}/metadata/{2}", resource, id, field), callback, errorCallback);
    };

    /**
     * @memberOf Metadata
     * @description Method for Update resource's metadata field for [devices]{@link https://m2x.att.com/developer/documentation/v2/device#Update-Device-Metadata-Field}, [distributions]{@link https://m2x.att.com/developer/documentation/v2/distribution#Update-Distribution-Metadata-Field}, [collections]{@link https://m2x.att.com/developer/documentation/v2/collections#Update-Collection-Metadata-Field} endpoint.
     * @param resource {str} Device or distribution or collection
     * @param id {str} ID of the resource
     * @param field {str} Resource's metadata field to be update
     * @param fieldValue {str} Value to be updated
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Metadata.prototype.updateField = function(resource, id, field, fieldValue, callback, errorCallback) {
        return this.client.put(helpers.url("/{0}/{1}/metadata/{2}", resource, id, field), {
            headers: { "Content-Type": "application/json" },
            params: { value: fieldValue }
        }, callback, errorCallback);
    };

    return Metadata;
});
