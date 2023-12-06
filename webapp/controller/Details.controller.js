sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict"
    return Controller.extend("caremp.caremp.controller.Details",{
        onInit() {
			const that = this;
            const oModel = this.getOwnerComponent().getModel();
            oModel.read("/zthger_carSet", { 
                success : (odata) => {
                    const jModel = new JSONModel(odata);
                   that.getView().byId("carList").setModel(jModel);
                }, 
                error: (oError) => {
                    console.log(oError);
                }})
			
			let Id
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("details").attachPatternMatched(this.onObjectMatched, this);
			
		},

		onObjectMatched(oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").ID
			});
            this.Id = oEvent.getParameter("arguments").ID;
			const oViewModel = new JSONModel({id : this.Id});
			this.getView().setModel(oViewModel, "view");
			if(this.Id !== undefined){
				this.onReadEmpl(this.Id);
			}
        },
		onReadEmpl() {
			const that = this;
            const oModel = this.getOwnerComponent().getModel();
            oModel.read("/zthger_emplSet('" + this.Id + "')", { 
                success : (odata) => {
                    const jModel = new JSONModel(odata);
                   that.getView().byId("_IDGenTitle1").setModel(jModel);
                }, 
                error: (oError) => {
                    console.log(oError);
                }})
        },
		onPressCar(oEvent){
			const  oItem = oEvent.getSource()
            const  oCtx = oItem.getBindingContext();
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("results", {
                ID : oCtx.getProperty("Carrid")
            })
		},
		onFilter(oEvent){
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Brand", FilterOperator.Contains, sQuery))
			}
			const oList = this.byId("carList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter)
		},
		onCreate(){

			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("newcar")
		}

    })
})