sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "./controller/HelloDialog"
], function (UIComponent, JSONModel, HelloDialog) {
    "use strict";

    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
        metadata : {
            //interfaces: ["sap.ui.core.IAsyncContentCreation"],
            manifest: "json"
        },
        init : function () {
            // call init function
            UIComponent.prototype.init.apply(this, arguments);

            // set data models
            var oData = {
                recipient : {
                    name : "UI5"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            // set Dialog
            this._helloDialog = new HelloDialog(this.getRootControl());

            // create the views based on the url/hash
            this.getRouter().initialize();
        },

        exit: function () {
            this._helloDialog.destroy();
            delete this._helloDialog;
        },

        openHelloDialog: function () {
            this._helloDialog.open();
        }
    });
});