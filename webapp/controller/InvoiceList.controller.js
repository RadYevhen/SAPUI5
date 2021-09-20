sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, JSONModel, formatter, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
        
        formatter: formatter,
        onInit: function () {
            var oViewModel = new JSONModel({
                currency: "EUR"
            });

            this.getView().setModel(oViewModel, "view");

            // var oView = this.getView();
            // this.oSF = oView.byId("searchField");
        },
        onFilterInvoices: function (oEvent) {
            // buid filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if(sQuery) {
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.byId("invoiceList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },

        onSearch: function (event) {
			var oItem = event.getParameter("suggestionItem");
			if (oItem) {
				MessageToast.show("Search for: " + oItem.getText());
			} else {
				MessageToast.show("Search is fired!");
			}
		},

		onSuggest: function (event) {
			var sValue = event.getParameter("suggestValue"),
            aFilters = [];
            if (sValue) {
                if(sValue.length == 1) { sValue = sValue.toUpperCase(); }
                aFilters.push(new Filter( "ProductName", FilterOperator.Contains, sValue ));
            }
            var oSource = event.getSource();
            var oBinding = oSource.getBinding('suggestionItems');
            oBinding.filter(aFilters);
            oBinding.attachEventOnce('dataReceived', function() {
            oSource.suggest();
            });
		},

        onPress: function (oEvent) {
            var oItem = oEvent.getSource(); //It will return the ObjectListItem that has been clicked in our case.
            // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail", {
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
            });
        }
    });
});