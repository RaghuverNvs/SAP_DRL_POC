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

            },
    
            onOpenSubmitInv:function(){
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
            onCloseSubmitInv:function() {
                this.byId("submitInv").close();
            },
        });
    });
