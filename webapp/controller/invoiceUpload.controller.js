sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/ColumnListItem",
    "sap/m/Text"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("drlpoc.controller.invoiceUpload", {
            onInit: function () {
                var mainData = {
                    "propalDetails": {
                        "nameOfEvent": "Cardiology Meet",
                        "budgetAllc": 100000,
                        "eDetails": "Hyd Cardiology Meet",
                        "propBudget": 10000,
                        "date": "2024-03-01",
                        "tot_attendees": 5,
                        "targetDate": "2024-03-29",
                        "duration": "4 hrs"
                    }
                }

                var mainData2 = {
                     "lineItems": [
                        {
                            "itemsName": "Travel Expenditure",
                            "itemsDescription": "Stayed attocated Taj Hotel",
                            "price": "15000",
                            "rate": 0,
                            "total": "15000"
                        },
                        {
                            "itemsName": "Food Expenditure",
                            "itemsDescription": "Food expenses",
                            "price": "1200",
                            "rate": 0,
                            "total": "1200"
                        }
                    ],
                }

                var invModel = new sap.ui.model.json.JSONModel(mainData);
                this.getView().setModel(invModel, "invModel")

                var invLineModel = new sap.ui.model.json.JSONModel(mainData2);
                this.getView().setModel(invLineModel, "invLineModel")
            },
            onOpenSubmitInv: function () {

                if (this.pDialog) {
                    this.pDialog.then((oDialog) => {
                        oDialog.close();
                        oDialog.destroy();
                    });
                }
                this.pDialog = this.loadFragment({
                    name: "drlpoc.fragment.submitInvoice"
                });
                this.pDialog.then((oDialog) => {
                    oDialog.open();
                });
            },
            onCloseSubmitInv: function () {
                this.byId("submitInv").close();
            },
        });
    });
