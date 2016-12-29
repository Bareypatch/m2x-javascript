/*globals jQuery,localStorage,alert,M2X*/
(function($) {
    function M2XExample() {
        this.$statusBar = $("#status-bar span");
        this.$apiKey = $("input[name=api-key]");
        this.$deviceID = $("input[name=device-id]");
        this.$deviceView = $("#device-view");
        this.$updateMetadata = $("#update-metadata-field");
        this.$streamPush = $("#stream-push");
        this.$streamView = $("#stream-view");
        this.$sendCommand = $("#send-command");
        this.$commandsView = $("#commands-view");
        this.$locationHistory = $("#location-history");
        this.$deleteLocationHistory = $("#delete-location-history");
        this.$addDeviceToCollection = $("#add-device-to-collection");
        this.$removeDeviceFromCollection = $("#remove-device-from-collection");
        this.$searchDevice = $("#search-device");
        this.$iterateOverDevices = $("#iterate-over-devices");
        this.$exportValues = $("#export-values");

        this.bindEvents();

        // Load api/device values from localStorage (if any)
        this.$apiKey.val( localStorage.getItem("api-key") || "" );
        this.$deviceID.val( localStorage.getItem("device-id") || "" );
        this.onKeyChange();
        this.ondeviceChange();
    }

    M2XExample.prototype.handleError = function(error) {
        var text = error.message;

        if (error.responseJSON) {
            console.log(error);
            text = JSON.stringify(error.responseJSON);
        } else {
            text = error.message;
        }

        this.setLoading(false, text);
    };

    M2XExample.prototype.onReceiveDeviceDetails = function(data) {
        $("code", this.$deviceView).text(JSON.stringify(data));

        this.setLoading(false);
    };


    M2XExample.prototype.onReceiveIterateDeviceDetails = function(data) {
        var deviceCount = 1;
        data.devices.forEach(function (device) {
            this.textorder += "Page" + data.current_page + ", Device " + deviceCount++ + " :: " + device.name + '\n';
            });

        $("out", this.$iterateOverDevices).text(textorder);
        this.setLoading(false);
    };

    M2XExample.prototype.onReceiveExportValues = function(data) {
        var result = "The job has been completed! You can download the result from " + data["result"]["url"];
        $("out", this.$exportValues).text(result);
        this.setLoading(false);
    };

    M2XExample.prototype.onReceiveStreamValues = function(data) {
        $("code", this.$streamView).text(JSON.stringify(data));

        this.setLoading(false);
    };

    M2XExample.prototype.onReceiveCommandsList = function(data) {
        $("code", this.$commandsView).text(JSON.stringify(data));

        this.setLoading(false);
    };

    M2XExample.prototype.onReceiveLocationHistory = function(data) {
        $("code", this.$locationHistory).text(JSON.stringify(data));
        this.setLoading(false);
    };

    M2XExample.prototype.onReceiveSearchDetails = function(data) {
        $("code", this.$searchDevice).text(JSON.stringify(data));

        this.setLoading(false);
    };

    M2XExample.prototype.bindEvents = function() {
        // Call onKeyChange when api key input changes
        this.$apiKey.on("change", $.proxy(this, "onKeyChange"));

        // Call ondeviceChange when device-id input changes
        this.$deviceID.on("change", $.proxy(this, "ondeviceChange"));

        // Hook this event on all buttons so that we share the check
        // for api-key/device-id, which is needed for all three operations
        $("button").on("click", $.proxy(function(ev) {
            if (! this.m2x) {
                alert("You must type an API Key first.");
            } else if (! this.deviceID) {
                alert("You must type a device ID first.");
            } else {
                return;
            }

            ev.stopPropagation();
        }, this));

        // Handler for getting device information
        this.$deviceView.on("click", "button", $.proxy(function() {
            this.setLoading(true);

            this.m2x.devices.view(this.deviceID,
                $.proxy(this, "onReceiveDeviceDetails"),
                $.proxy(this, "handleError")
            );
        }, this));

        // Handler for updating device metadata field
        this.$updateMetadata.on("click", "button", $.proxy(function() {
            var fieldName = $("input[name=field-name]", this.$updateMetadata).val();
            var fieldValue = $("input[name=field-value]", this.$updateMetadata).val();

            if (! fieldName) {
                alert("You must type an field name first.");
            } else if (! fieldValue) {
                alert("You must type a field value to be updated.");
            } else {
                this.setLoading(true);

                this.m2x.devices.updateMetadataField(this.deviceID, fieldName, fieldValue,
                    $.proxy(function() { this.setLoading(false); }, this),
                    $.proxy(this, "handleError")
                );
            }
        }, this));

        // Handler for sending command to device
        this.$sendCommand.on("click", "button", $.proxy(function() {
            var commandName = $("input[name=command-name]", this.$sendCommand).val();

            if (! commandName) {
                alert("You must type an Command name first.");
            } else {
                this.setLoading(true);

                this.m2x.commands.send({ name: commandName, targets: { devices: [this.deviceID] } },
                    $.proxy(function() { this.setLoading(false); }, this),
                    $.proxy(this, "handleError")
                );
            }
        }, this));

        // Handler for getting device's commands list
        this.$commandsView.on("click", "button", $.proxy(function() {
            this.setLoading(true);

            this.m2x.devices.commands(this.deviceID,
                $.proxy(this, "onReceiveCommandsList"),
                $.proxy(this, "handleError")
            );
        }, this));

        // Handler for getting location history
        this.$locationHistory.on("click", "button", $.proxy(function() {
            this.setLoading(true);

            this.m2x.devices.locationHistory(this.deviceID,
                $.proxy(this, "onReceiveLocationHistory"),
                $.proxy(this, "handleError")
            );
        }, this));

        // Handler for deleting the location history
        this.$deleteLocationHistory.on("click", "button", $.proxy(function() {
            var fromTime = $("input[name=fromTime]", this.$deleteLocationHistory).val();
            var endTime = $("input[name=endTime]", this.$deleteLocationHistory).val();

            if (! fromTime) {
                alert("You must type an from time.");
            } else if (! endTime) {
                alert("You must type an end time.");
            } else {
                this.setLoading(true);

                this.m2x.devices.deleteLocationHistory(this.deviceID, {from: fromTime, end: endTime},
                    $.proxy(function() { this.setLoading(false); }, this),
                    $.proxy(this, "handleError")
                );
            }
        }, this));

        // Handler for pushing values to a data stream
        this.$streamPush.on("click", "button", $.proxy(function() {
            var streamName = $("input[name=stream-name]", this.$streamPush).val();
            var value = $("input[name=stream-value]", this.$streamPush).val();

            if (! streamName) {
                alert("You must type an Stream name first.");
            } else if (! value) {
                alert("You must type a value to be pushed.");
            } else {
                this.setLoading(true);

                this.m2x.devices.setStreamValue(this.deviceID, streamName, { value: value },
                    $.proxy(function() { this.setLoading(false); }, this),
                    $.proxy(this, "handleError")
                );
            }
        }, this));

        // Handler for fetching values from a data stream
        this.$streamView.on("click", "button", $.proxy(function() {
            var streamName = $("input[name=stream-name]", this.$streamView).val();

            if (! streamName) {
                alert("You must type an Stream name first.");
            } else {
                this.setLoading(true);

                this.m2x.devices.streamValues(this.deviceID, streamName,
                    $.proxy(this, "onReceiveStreamValues"),
                    $.proxy(this, "handleError")
                );
            }
        }, this));

        // Handler for adding the device to collection
        this.$addDeviceToCollection.on("click", "button", $.proxy(function() {
            var collectionId = $("input[name=collection-id]", this.$addDeviceToCollection).val();

            if(! collectionId){
                alert("You must type the Collection Id.");
            } else {
                this.setLoading(true);

                this.m2x.collections.addDeviceToCollection(collectionId, this.deviceID,
                    $.proxy(function() { this.setLoading(false); }, this),
                    $.proxy(this, "handleError")
                );
            }

        }, this));

        // Handler for removing the device from collection
        this.$removeDeviceFromCollection.on("click", "button", $.proxy(function() {
            var collectionId = $("input[name=collection-id-rm]", this.$removeDeviceFromCollection).val();

            if(! collectionId){
                alert("You must type the Collection Id.");
            } else {
                this.setLoading(true);

                this.m2x.collections.removeFromCollection(collectionId, this.deviceID,
                    $.proxy(function() { this.setLoading(false); }, this),
                    $.proxy(this, "handleError")
                );
            }

        }, this));

        //Handler to search device
        this.$searchDevice.on("click", "button", $.proxy(function() {
            var deviceVisibility = $("input[name=device-visibility]", this.$searchDevice).val();
            var limit = $("input[name=limit]", this.$searchDevice).val();
            var status = $("input[name=status]", this.$searchDevice).val();
            if (! deviceVisibility) {
                alert("You must type the device visibility.");
            }else if (! limit) {
                alert("You must type the limit.");
            }else if (! status) {
                alert("You must type the Status.");
            }else {
                this.setLoading(true);

                this.m2x.devices.search({ visibility: deviceVisibility, limit:limit,status:status},
                    $.proxy(this, "onReceiveSearchDetails"),
                    $.proxy(this, "handleError")
                );
            }

        }, this));

        //Handler to iterate over devices
        this.$iterateOverDevices.on("click", "button", $.proxy(function () {
            var limit = $("input[name=limit]", this.$iterateOverDevices).val();
            if (!limit) {
                alert("You must type the Limit.");
            } else {
                this.setLoading(true);
                this.m2x.devices.list({limit:limit},
                $.proxy(function (data) {
                    textorder="";
                    this.limit=limit;
                    var pageCount = data["pages"];
                    for (var page = 1; page <= pageCount; page++) {
                        var params = {
                            page: page,
                            limit:limit
                        };
                        this.m2x.devices.list(params,
                            $.proxy(this, "onReceiveIterateDeviceDetails"),
                            $.proxy(this, "handleError")
                        );
                    }
                }, this),
                $.proxy(this, "handleError")
            );
            }
        }, this));

	    //Handler to export stream values
	    this.$exportValues.on("click", "button", $.proxy(function () {
            var limit = $("input[name=limit]", this.$exportValues).val();
            var streams = $("input[name=streams]", this.$exportValues).val();
            var params = "";
            if (limit && streams) {
                params = {
                    limit: limit,
                    streams: streams
                };
            } else if (limit) {
                params = {
                    limit: limit
                };
            } else if (streams) {
                params = {
                    streams: streams
                };
            }
            this.setLoading(true);
            var response = this.m2x.devices.valuesExport(this.deviceID, params,
                $.proxy(function (data) {
                    var location = response.getResponseHeader("Location");
                    var jobid = location.split('/').reverse()[0];
                    console.log("Processing job ...");
                    var root = this;
                    setTimeout(function () {
                        root.m2x.jobs.view(jobid,
                            $.proxy(root, "onReceiveExportValues"),
                            $.proxy(root, "handleError")
                        );
                    }, 8000);
                }, this),
                $.proxy(this, "handleError")
            );
        }, this));
    };

    M2XExample.prototype.ondeviceChange = function() {
        this.deviceID = this.$deviceID.val();
        localStorage.setItem("device-id", this.deviceID);
    };

    M2XExample.prototype.onKeyChange = function() {
        // In this example we create a new M2X object each time the api key changes,
        // but in most cases you'll be using the same api key all the time, so what we
        // do here might not necessarily apply for your use case.
        var key = this.$apiKey.val();

        if (key) {
            this.m2x = new M2X(key);
        } else {
            this.m2x = undefined;
        }

        localStorage.setItem("api-key", key);
    };

    M2XExample.prototype.setLoading = function(enabled, error) {
        if (enabled) {
            this.$statusBar.text("Loading...");
        } else {
            if (error) {
                this.$statusBar.text("Error (" + error + ")");
            } else {
                this.$statusBar.text("Done!");
            }
        }
    };

    $(function() {
        new M2XExample();
    });
}(jQuery));
