define(["helpers"], function(helpers) {
    /**
     * @module Jobs
     * @description Method for [Wrapper for AT&T M2X Jobs API]{@link https://m2x.att.com/developer/documentation/v2/jobs} endpoint.
     * @param client {str}
     * @constructor
     */
    var Jobs = function(client) {
        this.client = client;
    };

    /**
     * @memberOf Jobs
     * @description Method for [View Job Details]{@link https://m2x.att.com/developer/documentation/v2/jobs#View-Job-Details} endpoint.
     * @param id {str} ID of the Job
     * @param callback {function} Response callback
     * @param errorCallback {function} Error callback
     * @returns HttpResponse The API response, see M2X API docs for details
     */
    Jobs.prototype.view = function(id, callback, errorCallback) {
        return this.client.get(helpers.url("/jobs/{0}", id), callback, errorCallback);
    };

    return Jobs;
});
