sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/ColumnListItem",
    "sap/m/Text"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,ColumnListItem,Text) {
        "use strict";

        return Controller.extend("drlpoc.controller.createProposal", {
            onInit: function () {

            },
            onPressCreate:function(){
                this.pDialog ??= this.loadFragment({
                    name: "drlpoc.fragment.createproposal"     
                },
                );
                this.pDialog.then((oDialog) => { 
                    oDialog.open()
                    this.byId("inpCD").setDateValue(new Date());
                });
            },
            onCloseDialog() {
                this.byId("createProposal").close();
            },
            addRow: function () {
                var tableObj = this.byId("taxTable");
                var tableItems = tableObj.getItems();

                var cntTableItems = tableItems.length;
                
                var newRow = new ColumnListItem({
                    cells: [
                        new Text(),
                      
                    new Text(),
                    new Text(),
					new Text(),
                
                    new Text(),
                    new Text()]
                });
                if (cntTableItems < 10) {
                    tableObj.addItem(newRow);
                }
                else {
                    MessageBox.warning("Cannot add more than 10 rows");
                }
            },
            removeRow: function () {
                var tableObj = this.byId("taxTable");
                var selectedItems = tableObj.getSelectedItems();


                if (selectedItems.length > 0) {
                    selectedItems.forEach(function (selectedItem) {
                        tableObj.removeItem(selectedItem);
                    });
                }
                else {
                    var tableItems = tableObj.getItems();
                    var tableColumns = tableObj.getColumns();

                    var cntTableItems = tableItems.length;
                    tableObj.removeItem(tableItems[cntTableItems - 1]);
                }
                this.updateTaxableTotalAmt();
            },

        });
    });
