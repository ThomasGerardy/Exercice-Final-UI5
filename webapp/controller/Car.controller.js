sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/m/upload/Uploader"
], (Controller, JSONModel, Uploader) => {
    "use strict"
    return Controller.extend("caremp.caremp.controller.Car",{
        onInit(){
            // let Id
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("results").attachPatternMatched(this.onObjectMatched, this);
        },
        onObjectMatched(oEvent) {
            this.getView().bindElement({
                path:'/' + oEvent.getParameter('arguments').ID
            })
            this.Id = oEvent.getParameter("arguments").ID;
            const oViewModel = new JSONModel({id : this.Id});
            this.getView().setModel(oViewModel, 'view')
            if(this.Id !== undefined)
                this.onReadEmpl()
        },
        onReadEmpl() {
			const that = this;
            const oModel = this.getOwnerComponent().getModel();
            oModel.read("/zthger_carSet('" + this.Id + "')", { 
                success : (odata) => {
                    const jModel = new JSONModel(odata);
                    that.getView().byId("form").setModel(jModel);
                }, 
                error: (oError) => {
                    console.log(oError);
                }})
        },
        onSave(){
            const oModel = this.getOwnerComponent().getModel();
            const objId = this.Id;
            const oEntry = {
                Carrid : objId,
                Brand : this.byId("brand").getValue(),
                Power : this.byId("power").getValue(),
                Price : this.byId("price").getValue(),
                CarPlate : this.byId("carPlate").getValue(),
                EmplId : this.byId("emplId").getValue()
            };
             
            oModel.update("/zthger_carSet('"+ objId + "')", 
                            oEntry, 
                            null, 
                            () =>  console.log("Update successful"),
                            () =>  console.log("Update failed"));
            oModel.refresh()
            this._goToEmpPage();

        },
        onCancel(oEvent){
            const  oItem = oEvent.getSource()
            const  oCtx = oItem.getBindingContext();
            this._goToEmpPage()
        },
        onDelete(){

            const oModel = this.getOwnerComponent().getModel();
            const objId = this.Id;
            oModel.remove("/zthger_carSet('"+ objId + "')", null, () => {
                alert("delted")
            }, () => alert("not deleted"))
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("overview")
        },
        _goToEmpPage(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("details",{
                ID : this.byId("emplId").getValue()
            })
        }
    })
})