function generatePremixBrandUnbrand(){
  var PC=base.getData('References/ProductCodes');
  var PCList=JSONtoARR(PC);
  var sheets=['PremixesTypes','UnbrandedTypes','BrandedTypes'];
  var toCreatePremix=[];
  var toCreateUnbranded=[];
  var toCreateBranded=[];
  for(var j=0;j<sheets.length;j++){
    var raw=base.getData(sheets[j]);
    for(var i=0;i<PCList.length;i++){
      if(sheets[j]=='PremixesTypes'){
        if(!raw[PCList[i].premixSKU]){
          toCreatePremix.push([PCList[i].premixSKU,PCList[i].premixdescr])
        }
        if(PCList[i].premixSKUColored){
          if(!raw[PCList[i].premixSKUColored]){
            toCreatePremix.push([PCList[i].premixSKUColored,PCList[i].premixdescrColored])
          }
        }
      }else if(sheets[j]=='UnbrandedTypes'){
        if(!raw[PCList[i].unbrandSKU]){
          toCreateUnbranded.push([PCList[i].unbrandSKU,PCList[i].unbranddescr])
        }
      }else if(sheets[j]=='BrandedTypes'){
        if(!raw[PCList[i].prod]){
          toCreateBranded.push([PCList[i].prod,PCList[i].descr])
        }
        
      }
    }
  }
  var msg='Premixes Generated: <br>';
  for(var i=0;i<toCreatePremix.length;i++){
  
  generateForSinglePremix2(toCreatePremix[i][0],toCreatePremix[i][1]);
  msg+=toCreatePremix[i][0]+' - '+toCreatePremix[i][1]+'<br>';
  }
  msg+='Unbranded Generated: <br>';
  for(var i=0;i<toCreateUnbranded.length;i++){
  generateForSingleUnbrand2(toCreateUnbranded[i][0],toCreateUnbranded[i][1]);
  msg+=toCreateUnbranded[i][0]+' - '+toCreateUnbranded[i][1]+'<br>';
  }
    msg+='Branded Generated: <br>';
 for(var i=0;i<toCreateBranded.length;i++){

 generateForSingleBrand2(toCreateBranded[i][0],toCreateBranded[i][1]);
 msg+=toCreateBranded[i][0]+' - '+toCreateBranded[i][1]+'<br>';
  }
  return [msg,'generatePUB'];
}


function generateQTYPremixes() {
var recipes=getRecipeDropdown();
var flavours=getFlavourDropdown();
var bottletypes=getBottlesDropdown();
var lids=getLidDropdown();
var packagings=getPackagingDropdown();
var customers=getCustomerDropdown();
var brands=getBrandDropdown();
for(var i=0;i<flavours.length;i++){
 for(var j=0;j<recipes.length;j++){
  var premix="GBVCO TPD Premix "+flavours[i]+" "+recipes[j][1]+" "+recipes[j][2];
  var options={
    name:premix,
    Running:0,
    Reserved:0,
    Completed:0,
  };
   base.updateData('QTY/'+premix,options);
  }
}



  
}
function generateMulti(){
generateQTYFlavoursJSON();
 generateQTYBottlesJSON();
generateQTYLidsJSON();
generateQTYPackagingJSON();
generateQTYMiscJSON();
}

function generateQTYFlavours() {
var flavours=getFlavourDropdown();
for(var i=0;i<flavours.length;i++){
  var options={
    name:flavours[i],
    Running:0,
    Reserved:0,
    Completed:0
  };
   base.updateData('QTY/'+flavours[i],options);

}
}

function generateQTYBottles() {
var bottletypes=getBottlesDropdown();
for(var i=0;i<bottletypes.length;i++){
  var options={
    name:bottletypes[i],
    Running:0,
    Reserved:0,
    Completed:0
  };
   base.updateData('QTY/'+bottletypes[i],options);

}
}

function generateQTYLids() {
var lids=getLidDropdown();
for(var i=0;i<lids.length;i++){
  var options={
   name:lids[i],
    Running:0,
    Reserved:0,
    Completed:0
  };
   base.updateData('QTY/'+lids[i],options);

}
}


function generateQTYPackaging() {
var packagings=getPackagingDropdown();

for(var i=0;i<packagings.length;i++){
  var options={
   name:packagings[i],
    Running:0,
    Reserved:0,
    Completed:0
  };
   base.updateData('QTY/'+packagings[i],options);

}
}

function generateQTYMisc() {
var arr=['VG','PG','Nicotine','CBD','Labels 30ml bottle',
'Labels 10ml bottle',
'Labels 3product Tube',
'Labels 1product Tube',
'printing ink',
'10product boxes',
'15product boxes'

];

for(var i=0;i<arr.length;i++){
  var options={
  name:arr[i],
    Running:0,
    Reserved:0,
    Completed:0
  };
   base.updateData('QTY/'+arr[i],options);

}

}

function generateQTYUnbranded(){

var recipes=getRecipeDropdown();
var flavours=getFlavourDropdown();
var bottletypes=getBottlesDropdown();
var lids=getLidDropdown();
var packagings=getPackagingDropdown();
var customers=getCustomerDropdown();
var brands=getBrandDropdown();
  var options='{'
for(var i=0;i<flavours.length;i++){
  var lev1=''
for(var j=0;j<recipes.length;j++){
for(var k=0;k<bottletypes.length;k++){
var bsize=bottletypes[k].replace(/\D/g, '');
  if(recipes[j][3]=='nic'){
            var unbranded = "GBVCO TPD " + flavours[i] + " " +recipes[j][1]  + " " + recipes[j][2]+ " " + bsize;
          }else{
            var unbranded = "CBD GBVCO TPD " + flavours[i] + " " + recipes[j][1]  + " " + recipes[j][2] + " " + bsize;
          }  
//var unbranded="GBVCO TPD "+flavours[i]+" "+recipes[j][1]+" "+recipes[j][2]+" "+bsize;
  var options={
    name:unbranded,
    Running:0,
    Reserved:0,
    Completed:0
  };
   base.updateData('UnbrandedTypes/'+unbranded,options);

}
}
}




}


function generateQTYBranded(){

var recipes=getRecipeDropdown();
var flavours=getFlavourDropdown();
var bottletypes=getBottlesDropdown();
var lids=getLidDropdown();
var packagings=getPackagingDropdown();
var customers=getCustomerDropdown();
var brands=getBrandDropdown();
var arr=[0,1,3];

for(var k=0;k<brands.length;k++){

for(var i=0;i<flavours.length;i++){
for(var j=0;j<recipes.length;j++){
for(var m=0;m<arr.length;m++){
if(arr[m]==0){var addon='';}else{var addon=' '+arr[m]+'packed Tube';}

var brandname=brands[k]+" "+flavours[i]+" "+recipes[j][2]+" "+recipes[j][1] + addon;

  var options={
    name:brandname,
    Running:0,
    Reserved:0,
    Completed:0
  };
   base.updateData('QTY/'+brandname,options);

}
}
}
}



}




function getQTY(page){
var retArr=[];


var params={

//orderBy:'flavour'
orderBy : ['name'],

};
var data=JSONtoARR(base.getData(page))
for(var i=0;i<data.length;i++){
 if(!data[i].name){ data[i].name="none"}
}
data=data.sort(sortSTRINGHL('name'));
//data=data.sort(superSort1('name'));

return [data,page];



}

function func(prop,val){
  var jsonStr='{"'+prop+'":'+val+'}';
  return Json.parse(jsonStr);
}



function deleteFROMTABLE(){
base.removeData('UnbrandedTypes');
}





function generateQTYUnbrandedJSON(){
base.removeData('UnbrandedTypes');
var recipes=getRecipeDropdown();
var flavours=getFlavourDropdown();
var bottletypes=getBottlesDropdown();
var lids=getLidDropdown();
var packagings=getPackagingDropdown();
var customers=getCustomerDropdown();
var brands=getBrandDropdown();
var options='{';
for(var i=0;i<flavours.length;i++){
var lev1='';
for(var j=0;j<recipes.length;j++){
var lev2='';
for(var k=0;k<bottletypes.length;k++){
var bsize=bottletypes[k].replace(/\D/g, '');
  if(recipes[j][3]=='nic'){
            var unbranded = "GBVCO TPD " + flavours[i] + " " +recipes[j][1]  + " " + recipes[j][2]+ " " + bsize;
          }else{
            var unbranded = "CBD GBVCO TPD " + flavours[i] + " " + recipes[j][1]  + " " + recipes[j][2] + " " + bsize;
          }  
    var item={
    "sku":'UNB'+getRandom()+flavours[i].substr(0,1),
    "name":unbranded,
    "Running":0,
    "Reserved":0,
    "Completed":0,
  };
 
  lev2+='"'+unbranded+'":'+JSON.stringify(item)+',';
 
    

}
lev1+=lev2;
}
options+=lev1;
}

options+='}';

var obj=JSON.parse(options);


  base.updateData('UnbrandedTypes',obj);
 


}



function generateQTYBrandedJSON(){

var recipes=getRecipeDropdown();
var flavours=getFlavourDropdown();
var bottletypes=getBottlesDropdown();
var lids=getLidDropdown();
var packagings=getPackagingDropdown();
var customers=getCustomerDropdown();
var brands=getBrandDropdown();
var arr=[0];
var options='{';
for(var k=0;k<20;k++){
var lev1='';
for(var i=0;i<flavours.length;i++){
var lev2='';
for(var j=0;j<recipes.length;j++){
var lev3='';
for(var m=0;m<arr.length;m++){
  var lev4='';
for(var n=0;n<bottletypes.length;n++){
var bsize=bottletypes[n].replace(/\D/g, '');

if(arr[m]==0){var addon='';}else{var addon=' '+arr[m]+'packed Tube';}
var brandname=brands[k]+" "+flavours[i]+" "+recipes[j][1]+" "+recipes[j][2]+ " " + bsize + addon;

    var item={
    "sku":'BRA'+getRandom()+brands[k].substr(0,1).toUpperCase(),
    "name":brandname,
    "Running":0,
    "Reserved":0,
    "Completed":0,
  };
  lev4+='"'+brandname+'":'+JSON.stringify(item)+',';
       }
  lev3+=lev4;
 
      }
      lev2+=lev3;
    }
    lev1+=lev2;
  }
  options+=lev1;
}

options+='}';

var obj=JSON.parse(options);

  base.updateData('BrandedTypes',obj);
 


}

function generateQTYBrandedJSON2(){
  var PC=getProductCodes();
 base.removeData("BrandedTypes");
  var options1='{';
  var broken=[];
 var brandedData=base.getData('BrandedTypes');

  for(var i=0;i<PC.length;i++){
    if(PC[i].prod.length<=30){
    var item1={
      "sku":PC[i].prod,
      "name":PC[i].descr,
      "Running":0,
      "Reserved":0,
      "Completed":0,
    };
    options1+='"'+PC[i].prod+'":'+JSON.stringify(item1)+',';
    }
  }
 options1+='}';
  var upload=JSON.parse(options1);
  
  base.updateData('BrandedTypes',upload);

}
function generateQTYPremixJSON2(){
  var PC=getProductCodes();
 base.removeData("PremixesTypes");
  var options1='{';
  var broken=[];
 var brandedData=base.getData('PremixesTypes');

  for(var i=0;i<PC.length;i++){

var name=PC[i].premixdescr;
   if(PC[i].prod.length<=30){
    var item1={
      "sku":PC[i].premixSKU,
      "name":name,
      "Running":0,
      "Reserved":0,
      "Completed":0,
    };
    options1+='"'+PC[i].premixSKU+'":'+JSON.stringify(item1)+',';
    }
  }
 options1+='}';
  var upload=JSON.parse(options1);
  
  base.updateData('PremixesTypes',upload);

}
function generateQTYUnbrandedJSON2(){
  var PC=getProductCodes();
 base.removeData("UnbrandedTypes");
  var options1='{';
  var broken=[];
 var brandedData=base.getData('UnbrandedTypes');

  for(var i=0;i<PC.length;i++){
var name=PC[i].unbranddescr;
   if(PC[i].prod.length<=30){
    var item1={
      "sku":PC[i].unbrandSKU,
      "name":name,
      "Running":0,
      "Reserved":0,
      "Completed":0,
    };
    options1+='"'+PC[i].unbrandSKU+'":'+JSON.stringify(item1)+',';
  }
  }
 options1+='}';
  var upload=JSON.parse(options1);
  
  base.updateData('UnbrandedTypes',upload);

}
function getMisingCode(){
var PD=getProductCodes();
var Branded=getSheetData2('BrandedTypes');




var missing=[];

  for(var i=0;i<PD.length;i++){
    var prod=PD[i].prod;
    var found=false;
   
      if(Branded[prod]){
        found=true;
        break;
      } 
    
    
    if(!found){
      missing.push(prod);
    }
    
  }
Logger.log(missing);
}
function deletepage(){
base.removeData("BrandedTypes");
}


function generateQTYPremixJSONFull() {
  base.removeData('PremixesTypes');
var recipes=getRecipeDropdown();
var flavours=getFlavourDropdown();
var bottletypes=getBottlesDropdown();
var lids=getLidDropdown();
var packagings=getPackagingDropdown();
var customers=getCustomerDropdown();
var brands=getBrandDropdown();

var options='{';
//for(var i=80;i<120;i++){
for(var i=0;i<flavours.length;i++){
var lev1='';
 for(var j=0;j<recipes.length;j++){
  if(recipes[j][3]=='nic'){
        var premix = "GBVCO TPD Premix " + flavours[i] + " " + recipes[j][1] + " " + recipes[j][2];
      }else{
        var premix = "CBD GBVCO TPD Premix " + flavours[i] + " " + recipes[j][1] + " " + recipes[j][2];
      } 
   // var exists=base.getData('PremixesTypes/'+premix);
   // if(!exists){
    var item={
       "sku":'PRE'+getRandom()+flavours[i].substr(0,1).toUpperCase(),
    "name":premix,
    "Running":0,
    "Reserved":0,
    "Completed":0,
  };
 
  lev1+='"'+premix+'":'+JSON.stringify(item)+',';
  // }
  }
  options+=lev1;
}
options+='}';
Logger.log(options);

var obj=JSON.parse(options);

  base.updateData('PremixesTypes',obj);
  
}


function generateQTYFlavoursJSON() {
var flavours=getFlavourDropdown();
var options='{';
for(var i=0;i<flavours.length;i++){
  
      var item={
     "sku":'FLAV'+getRandom()+flavours[i].substr(0,1).toUpperCase(),
    "name":flavours[i],
    "Running":0,
    "Reserved":0,
    "Completed":0,
  };
  
options+='"'+flavours[i]+'":'+JSON.stringify(item)+',';
}
options+='}';
options=JSON.parse(options);
 base.updateData('Flavours',options);
}


function generateQTYBottlesJSON() {
var bottletypes=getBottlesDropdown();
var options='{';

for(var i=0;i<bottletypes.length;i++){
  var item={
    "sku":'BOT'+getRandom()+bottletypes[i].substr(0,1).toUpperCase(),

    "name":bottletypes[i],
    "Running":0,
    "Reserved":0,
    "Completed":0,
  };
options+='"'+bottletypes[i]+'":'+JSON.stringify(item)+',';
}
options+='}';
options=JSON.parse(options);
 base.updateData('BottleTypes',options);
}

function generateQTYLidsJSON() {
var lids=getLidDropdown();
var options='{';

for(var i=0;i<lids.length;i++){
      var item={
          "sku":'LID'+getRandom()+lids[i].substr(0,1).toUpperCase(),

    "name":lids[i],
    "Running":0,
    "Reserved":0,
    "Completed":0,
  };
options+='"'+lids[i]+'":'+JSON.stringify(item)+',';
}

options+='}';
options=JSON.parse(options);
 base.updateData('Lids',options);
}


function generateQTYPackagingJSON() {
var packagings=getPackagingDropdown();
var options='{';
for(var i=0;i<packagings.length;i++){
      var item={
      "sku":'PAC'+getRandom()+packagings[i].substr(0,1).toUpperCase(),
    "name":packagings[i],
    "Running":0,
    "Reserved":0,
    "Completed":0,
  };
options+='"'+packagings[i]+'":'+JSON.stringify(item)+',';

}
options+='}';
options=JSON.parse(options);
 base.updateData('Packages',options);


}



function generateQTYMiscJSON() {
var arr=['VG','PG','Nicotine','CBD','Labels 30ml bottle',
'Labels 10ml bottle',
'Labels 3product Tube',
'Labels 1product Tube',
'printing ink',
'10product boxes',
'15product boxes'

];


var options='{';
for(var i=0;i<arr.length;i++){
      var item={
     "sku":'MIS'+getRandom()+arr[i].substr(0,1).toUpperCase(),
    "name":arr[i],
    "Running":0,
    "Reserved":0,
    "Completed":0,
  };

options+='"'+arr[i]+'":'+JSON.stringify(item)+',';
}
options+='}';
Logger.log(options);
options=JSON.parse(options);
 base.updateData('Misc',options);


}

function generateMultiJSON(){

var Flavours=base.getData('Flavours');
var Misc=base.getData('Misc');
var Packages=base.getData('Packages');
var Lids=base.getData('Lids');
var BottleTypes=base.getData('BottleTypes');
var PremixesTypes=base.getData('PremixesTypes');
var BrandedTypes=base.getData('BrandedTypes');
var UnbrandedTypes=base.getData('UnbrandedTypes');

base.updateData('QTY',Flavours);
base.updateData('QTY',Misc);
base.updateData('QTY',Packages);
base.updateData('QTY',Lids);
base.updateData('QTY',BottleTypes);
base.updateData('QTY',PremixesTypes);
base.updateData('QTY',BrandedTypes);
base.updateData('QTY',UnbrandedTypes);

}


