sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    return Controller.extend("caremp.caremp.controller.EmployeesList", {
        onInit(){
            const that = this;
            const oModel = this.getOwnerComponent().getModel();
            oModel.read("/zthger_emplSet", { 
                success : (odata) => {
                    const jModel = new JSONModel(odata);
                   that.getView().byId("employeesList").setModel(jModel);
                }, 
                error: (oError) => {
                    console.log(oError);
                }})
        },
        onPress(oEvent) {
            const  oItem = oEvent.getSource()
            const  oCtx = oItem.getBindingContext();
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("details", {
                ID : oCtx.getProperty("Id")
            })
        },
        onFilter(oEvent){
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery){
                aFilter.push(new Filter("FirstName", FilterOperator.Contains, sQuery))
            }
            const oList = this.byId("employeesList");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter)
        },
        
    })
})

