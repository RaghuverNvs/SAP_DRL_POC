sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/m/ComboBox",
    "sap/m/Input",
    "sap/ui/core/ListItem",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,ColumnListItem,Text,JSONModel,ComboBox,Input,ListItem,MessageBox) {
        "use strict";

        return Controller.extend("drlpoc.controller.createProposal", {
            onInit: function () {

                var mainData ={
                    "events": [
                      {
                        "nameOfEvent": "Cardiology Meet",
                        "budgetAllc": 100000,
                        "eDetails": "Hyd Cardiology Meet",
                        "propBudget": 10000,
                        "date": "2024-01-11",
                        "tot_attendees": 5
                      },
                      {
                        "nameOfEvent": "Neurology Meet",
                        "budgetAllc": 1076000,
                        "eDetails": "South Neurology Meet",
                        "propBudget": 54000,
                        "date": "2024-01-11",
                        "tot_attendees": 3
                      },
                      {
                        "nameOfEvent": "Orthopedic Meet",
                        "budgetAllc": 109800,
                        "eDetails": "West Orthopedic Meet",
                        "propBudget": 50000,
                        "date": "2024-01-11",
                        "tot_attendees": 4
                      }
                    ]
                  }

                  var eventModel = new sap.ui.model.json.JSONModel(mainData);
                  this.getView().setModel(eventModel, "eventModel")



                // Fragments data
                var oData = {
                    "SelectedProduct": "2 Hrs",
					"ProductCollection": [
                        {
                            "cuurencyId": "2 Hrs",
                            "Name": "2 Hrs"
                        },
                        {
                            "cuurencyId": "4 Hrs",
                            "Name": "4 Hrs"
                        },
                        {
                            "cuurencyId": "6 Hrs",
                            "Name": "6 Hrs"
                        },
                        {
                            "cuurencyId": "8 Hrs",
                            "Name": "8 Hrs"
                        },
                        {
                            "cuurencyId": "More 8 Hrs",
                            "Name": "More 8 Hrs"
                        }
                    ],
                    companies: [
                        { name: "Hotel Expenditures"},
                        { name: "Travel Expenditures"},
                        { name: "Food Expenditures"},
						{ name: "Other Expenditures"}
                    ]
                }
					
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            },
            onPressCreate:function(){
                if (this.pDialog) {
                    this.pDialog.then((oDialog) => {
                        oDialog.close();
                        oDialog.destroy();
                    });
                }
                this.pDialog = this.loadFragment({
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
            onCreateDialog: function(){
                this.onSuccessMessageBoxPress()
                this.byId("createProposal").close();
            },
            addRow: function () {
                var tableObj = this.byId("taxTable");
                var tableItems = tableObj.getItems();

                var cntTableItems = tableItems.length;
                
                var newRow = new ColumnListItem({
                    cells: [
					new ComboBox({items: {
                            path: "/companies",
                             template: new ListItem({
                                 text: "{name}"
                            })}}),
                    new Input(),
                    new Input(),
					new Input(),
                
                    new Input(),
                    new Input()]
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
            updateTaxableTotalAmt() {
                var tableObj = this.getView().byId("taxTable");
                var tableItems = tableObj.getItems();
                var sum = 0;
                var oFormat = NumberFormat.getFloatInstance({
                    "groupingEnabled": true,
                    "groupingSeparator": ',',
                    "groupingBaseSize": 3,
                    "groupingSize": 2,
                    "decimals": 2,
                    "decimalSeparator": ".",
                });
                tableItems.forEach(tableItem => {
                    var taxableAmtInputObj = tableItem.getCells()[3];
                    var taxableAmtInpVal = taxableAmtInputObj.getValue();
                    var taxableAmtInpFrmtVal = this.formatCurrentValue(taxableAmtInpVal);
                    if (taxableAmtInpFrmtVal) {
                        taxableAmtInpFrmtVal = oFormat.parse(taxableAmtInpFrmtVal)
                        sum = sum + parseInt(taxableAmtInpFrmtVal);
                    }
                });
                var totalTaxAmt = oFormat.format(sum);
                this.byId("totalInvioceAmt").setValue(totalTaxAmt);
            },
            onSuccessMessageBoxPress: function () {
                MessageBox.success("Proposal has been successfully created");
            },
            onClickPOTableRow : function(){
                var routerObj = this.getOwnerComponent().getRouter();
                routerObj.navTo("Screen3" 
                // {
                //   po_no: sModelPath
                // }
                );
            },
            onDashboardPress:function(){
                var routerObj = this.getOwnerComponent().getRouter();
                routerObj.navTo("Screen4"); 
            }
        });
    });
