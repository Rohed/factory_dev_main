function get_active_dropdown_arrays(flag) {
var retARR=[];

switch (flag){
    
  case 'editRecipeButton':
    var recipes= getRecipeDropdown();
    retARR.push(['erecipeCODE','DropdownRecipeCodes','RecipeCodes',recipes,'Recipes']);
    retARR.push(['erecipeName','DropdownRecipeNames','RecipeNames',recipes,'Recipes']);
    break;
  case 'editPackageButton':
    var packages=JSONtoARR(base.getData('Packages'));
    
    retARR.push(['epackagingName','DropdownPackagingNames','PackagingNames',packages,'Packages']);
    retARR.push(['epackagingSKU','DropdownPackagingSKU','PackagingSKUS',packages,'Packages']);
    break;
  case 'editBoxButton':
    var boxes=JSONtoARR(base.getData('Boxes'));
    
    retARR.push(['eboxName','DropdownBoxNames','BoxNames',boxes,'Boxes']);
    retARR.push(['eboxSKU','DropdownBoxSKU','BoxSKUS',boxes,'Boxes']);
    break;
  case 'editLabelButton':
    var labels=JSONtoARR(base.getData('Labels'));
    
    retARR.push(['eLabelName','DropdownLabelNames','LabelNames',labels,'Labels']);
    retARR.push(['eLabelSKU','DropdownLabelSKU','LabelSKUS',labels,'Labels']);
    break;
  case 'editColorButton':
    var colors=JSONtoARR(base.getData('Color'));
    
    retARR.push(['eColorName','DropdownColorNames','ColorNames',colors,'Color']);
    retARR.push(['eColorSKU','DropdownColorSKU','ColorSKUS',colors,'Color']);
    break;
  case 'editflavourmixButton':
    var flavours=JSONtoARR(base.getData('FlavourMixes'));
    
    retARR.push(['eflavourmixName','DropdownflavourmixName','flavourmixNames',flavours,'FlavourMixes']);
    retARR.push(['eflavourmixSKU','DropdownflavourmixSKU','flavourmixSKUs',flavours,'FlavourMixes']);
    break;
  default:
    retARR = [];
    
    

}
  return retARR;
}


function get_remaining_data(page,id){
return [base.getData(page+'/'+id),page];


}



function get_labels_helper_dropdown(){

 return JSONtoARR(base.getData('Labels'));
}

function get_colors_helper_dropdown(){

 return JSONtoARR(base.getData('Color'));
}