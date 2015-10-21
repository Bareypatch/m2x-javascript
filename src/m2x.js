define(["client", "jobs", "keys", "devices", "charts", "distributions"],
function(Client, Jobs, Keys, Devices, Charts, Distributions) {
    var M2X = function(apiKey, apiBase) {
        this.client = new Client(apiKey, apiBase);

        this.jobs = new Jobs(this.client);
        this.keys = new Keys(this.client);
        this.devices = new Devices(this.client, this.keys);
        this.charts = new Charts(this.client);
        this.distributions = new Distributions(this.client);
    };

    M2X.prototype.status = function(callback, errorCallback) {
        return this.client.get("/status", callback, errorCallback);
    };

    return M2X;
});
