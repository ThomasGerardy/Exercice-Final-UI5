sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], (Controller, JSONModel) => {
    return Controller.extend("caremp.caremp.controller.CreateCar", {
        onInit() {

        },
        onSave(){
            const oModel = this.getOwnerComponent().getModel();
            const objId = this.Id;
            
            const oEntry = {
                Carrid : this.byId("carrid").getValue(),
                Brand : this.byId("brand").getValue(),
                Power : this.byId("power").getValue(),
                Price : this.byId("price").getValue(),
                CarPlate : this.byId("carPlate").getValue(),
                EmplId : this.byId("emplId").getValue()
            };

            oModel.create("/zthger_carSet", 
                            oEntry, 
                            null, 
                            () =>  console.log("Create successful"),
                            () =>  console.log("Create failed"));
            this._goToCarPage()
            
        },
        onCancel(){
            this._goToCarPage()
        },
        _goToCarPage(){
            const that = this
            const oRouter = this.getOwnerComponent().getRouter();
            this.getOwnerComponent().getModel().refresh()
            console.log(this.byId("emplId").getValue())
            if( (this.byId("emplId").getValue()) !== ""){
                oRouter.navTo("details", {
                    ID : this.byId("emplId").getValue()
                })
            }
            else oRouter.navTo("overview")
        }
    })
})