sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
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
                        "targetDate": "2024-04-01",
                        "duration": "4 hrs",
                        "mecdicalId":3574,
                        "medicalName":"Raghuveer",
                        "actuallyAttendance":5
                    }
                }

                var mainData2 = {
                     "lineItems": [
                        {
                            "itemsName": "Travel Expenditure",
                            "itemsDescription": "Stayed allocated Taj Hotel",
                            "price": "5000",
                            "rate": 0,
                            "total": "5000"
                        },
                        {
                            "itemsName": "Food Expenditure",
                            "itemsDescription": "Food expenses",
                            "price": "3000",
                            "rate": 0,
                            "total": "3000"
                        },
                        {
                            "itemsName": "Other Expenditure",
                            "itemsDescription": "Other expenses",
                            "price": "2000",
                            "rate": 0,
                            "total": "2000"
                        }
                    ],
                }

                var invModel = new sap.ui.model.json.JSONModel(mainData);
                this.getView().setModel(invModel, "invModel")

                var invLineModel = new sap.ui.model.json.JSONModel(mainData2);
                this.getView().setModel(invLineModel, "invLineModel")
            },
            onOpenSubmitInv: function () {
                var inputField = this.getView().byId("inpVOB1333");
      inputField.setEditable(!inputField.getEditable());
               
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
                MessageBox.success("Invoice has been successfully created");
                this.byId("submitInv").close();
                
            },
            handleFileChange: function (oEvent) {
                
                this.selectedFile = oEvent.getParameters().files[0];
                var fileUploaderObj = this.byId("invDoc");
                var fileName = fileUploaderObj.getValue();

                var fileNameTextObj = this.byId("selectedFileText");
                fileNameTextObj.setText(fileName);

                this.getView().byId("_IDGenPDFViewer1").setSource(URL.createObjectURL(this.selectedFile));

                if (!fileName) {
                    MessageBox.warning("No File Selected");
                }
            },
            openPDF: function () {
                this.byId("_IDGenPDFViewer1").downloadPDF();
            },
            handleFileChangeOne: function (oEvent) {
                
                this.selectedFile = oEvent.getParameters().files[0];
                var fileUploaderObj = this.byId("invDoc1");
                var fileName = fileUploaderObj.getValue();

                var fileNameTextObj = this.byId("selectedFileText1");
                fileNameTextObj.setText(fileName);

                this.getView().byId("_IDGenPDFViewer12").setSource(URL.createObjectURL(this.selectedFile));

                if (!fileName) {
                    MessageBox.warning("No File Selected");
                }
            },
            openSupportingPDF: function () {
                this.byId("_IDGenPDFViewer12").downloadPDF();
            },
            
        });
    });
