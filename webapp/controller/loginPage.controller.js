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

        return Controller.extend("drlpoc.controller.loginPage", {
            onInit: function () {

            },
    
            onLogin:function(){
                //   alert("Hello");
                var routerObj = this.getOwnerComponent().getRouter();
                // console.log(routerObj);
                 routerObj.navTo("Screen2");

            }
        });
    });
