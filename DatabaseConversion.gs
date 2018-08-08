function deleteItems(){
var id = '1yv7HQDGvNuLwDUgfMHOMuqLJdUoN7s_nz-09LvrF7V0';
var sheets = SpreadsheetApp.openById(id).getSheets();
var batchRow = [3,3,3,3,4,2];
for(var i =4;i<5;i++){
var name = sheets[i].getName();
 
var data = sheets[i].getDataRange().getValues();
  for(var d=0;d<data.length;d++){
    base.removeData(name+'/'+data[d][batchRow[i]]);
  }

}


}

function markCompleted(){
  var id ='1OLtOk3nwrrnCGaFQEMES85FkeSCliDcwfd8oZlzxZkI';
  var sheets = SpreadsheetApp.openById(id).getSheets()[0];
  var data = sheets.getDataRange().getValues();
  var date = new Date().getTime();
  var params = {
    CompletionDate:date,
    movedtoNext:1,
    final_status:"Completed",
    prodDate :date
  }
  for(var d=1;d<data.length;d++){
    base.updateData('Production/'+data[d][0],params);
  }
}

function deleteItems2(){
var id = '1NOs0mGpwkoFjMTUEnHjdbVI0_iE7kX2-zdfzJLLcLt4';
  var SS = SpreadsheetApp.openById(id).getSheets();

  var data = SS[0].getDataRange().getValues();
  
    var payload={ 
      'items':JSON.stringify(data),
      
    };

     var params={
      method:"POST",
      "Content-Type":'application/json',
      muteHttpExceptions :true,
      'payload':payload,
    }
    var url='http://212.69.229.10:4000/'+NODE_PATH+'/deletedata';
    var response=UrlFetchApp.fetch(url, params).getContentText();
    
  
    Logger.log(response);

}
function testpmix(){
var list = JSONtoARR(base.getData('Flavours'));
list.map(function(item){
if(isNaN(item.Running)){
Logger.log("item - " + item.sku);
}
});

}     
function runALL(){
generateRecipeCodes();
createNewPackages();
createNewBoxes();
createNewLabels();

}


function UPDATEALL(){
updateAllRecipes();
updateAllPackages();
updateAllBoxes();

}

 function generateRecipeCodes(){
     var recipes = JSONtoARR( base.getData('Recipes'));
            
     var options='{';
     for(var i=0;i<recipes.length;i++){
       var vg=recipes[i].ratio.toString().substr(0,2);
       var pg=recipes[i].ratio.toString().substr(2,4);
       if(vg==10){vg='100';pg='00';}
       var strength='';
       if(recipes[i].name.match('Nicotine')){
       strength=recipes[i].nic;
       }else{
         strength=recipes[i].cbd;
       }
     var item={
     name:recipes[i].name,
     Flavrec:recipes[i].Flavrec,
     PGrec:recipes[i].PGrec,
     VGrec:recipes[i].VGrec,
     cbdrec:parseInt(recipes[i].cbdrec,10),
     Nicorec:parseInt(recipes[i].Nicorec,10),
     MCTrecipe:0,
     vg:vg,
     pg:pg,
     strength:strength,
     };
    if(isNaN(item.Nicorec)){
      item.Nicorec=0;
    }
    if(isNaN(item.cbdrec)){
      item.cbdrec=0;
    }
    item.id=getRandom()*getRandom();
    
     options += '"' + item.id + '":' + JSON.stringify(item) + ',';
  }
options+='}';
var upload=JSON.parse(options);
Logger.log(upload);
base.removeData('Recipes');
base.updateData('Recipes',upload);
}

function createNewPackages(){
var packages=JSONtoARR(base.getData('Packages'));

var options='{';
for(var i=0;i<packages.length;i++){
  var refDATA=getPackagingData2(packages[i].name);
  packages[i].tubelabel=refDATA.tubelabel;
  packages[i].ink=refDATA.ink;
  packages[i].botperPack=refDATA.botperPack;
  
  
  var sku=packages[i].sku;
  options += '"' + sku + '":' + JSON.stringify(packages[i]) + ',';
}

options+='}';
var upload=JSON.parse(options);
base.removeData('Packages');
base.updateData('Packages',upload);


}


function createNewBoxes(){
var data=JSONtoARR(base.getData('Misc'));

var options='{';
for(var i=0;i<data.length;i++){
 var sku=data[i].sku; 
options += '"' + sku + '":' + JSON.stringify(data[i]) + ',';
}
options+='}';
var upload=JSON.parse(options);
base.updateData('Boxes',upload);



}
function createNewLabels(){
var data=JSONtoARR(base.getData('Misc'));

var options='{';
for(var i=0;i<data.length;i++){
 var sku=data[i].sku; 
options += '"' + sku + '":' + JSON.stringify(data[i]) + ',';
}
options+='}';
var upload=JSON.parse(options);
base.updateData('Labels',upload);



}





function transfer(){
var data=base.getData('Recipes');
base.removeData('Recipes');
base.updateData('Recipes',data);

}


function updateAllRecipes(){
  var sheets=['Orders','Mixing','MixingTeam','Production','Printing','Labelling','Packaging','Shipping','References/ProductCodes','References/Descriptions'];

  var recipes=JSONtoARR(base.getData('Recipes'));
  for(var i=0;i<sheets.length;i++){
    var options='{';
    var data=base.getData(sheets[i]);
    var list=JSONtoARR(data);
    for(var j=0;j<list.length;j++){
      if(list[j].recipe){
        for(var k=0;k<recipes.length;k++){
          if(recipes[k].name==list[j].recipe.name){
            list[j].recipe.id=recipes[k].id;
            break;
          }
          
          
        }
        if(sheets[i]=='References/ProductCodes'){
          options += '"' + list[j].prod + '":' + JSON.stringify(list[j]) + ',';
        }else if(sheets[i]=='References/Descriptions'){
          options += '"' + list[j].descr + '":' + JSON.stringify(list[j]) + ',';
        }else if(sheets[i]=='MixingTeam'){
          options += '"' + list[j].MIXNAME + '":' + JSON.stringify(list[j]) + ',';
        }else{
          options += '"' + list[j].batch + '":' + JSON.stringify(list[j]) + ',';
        }
      }
    }
    
    options+='}';  
    
    var upload =JSON.parse(options);
    base.updateData(sheets[i],upload);
    
    
  }
  
  
  
  
  
}
/*
function updateRecipesMixingTeam(){
var list=JSONtoARR(base.getData('MixingTeam'));
  var recipes=JSONtoARR(base.getData('Recipes'));
var options='{';
for(var i=0;i<list.length;i++){
  var batches=JSONtoARR(list[i].batches);
  var l2='';
  for(var j=0;j<batches.length;j++){
    for(var k=0;k<recipes.length;k++){
      if(recipes[k].name==batches[j].recipe.name){
        batches[j].recipe.id=recipes[k].id;
        break;
      }
    }
   l2 += '"' + batches[j].batch + '":' + JSON.stringify(batches[j]) + ',';
  }

 options += '"' + list[i].MIXNAME + '":' + l2 + ',';
}
options+='}';


    var upload =JSON.parse(options);
    base.updateData('MixingTeam',upload);
    
    

}
*/
function updateORDERDATE(){
var list=base.getData('Mixing')


}


function updateAllPackages(){

var sheets=['Orders','Mixing','Production','Printing','Labelling','Packaging','Shipping']

var packages=JSONtoARR(base.getData('Packages'));
for(var i=0;i<sheets.length;i++){
var options='{';
var data=base.getData(sheets[i]);
var list=JSONtoARR(data);
  for(var j=0;j<list.length;j++){
    if(list[j].packagingType){
      for(var k=0;k<packages.length;k++){
        if(packages[k].name==list[j].packagingType){
          list[j].packagingType={
            name:'',
            sku:'',
            
          };
          list[j].packagingType.name=packages[k].name;
           list[j].packagingType.sku=packages[k].sku;
          break;
        }
        
        
      }

    }else{
    list[j].packagingType={
    name:'',
    sku:'',
    
    };


    }
    
    if(sheets[i]=='References/ProductCodes'){
      options += '"' + list[j].prod + '":' + JSON.stringify(list[j]) + ',';
    }else if(sheets[i]=='References/Descriptions'){
      options += '"' + list[j].descr + '":' + JSON.stringify(list[j]) + ',';
    }else{
      options += '"' + list[j].batch + '":' + JSON.stringify(list[j]) + ',';
    }

    
  }
  
options+='}';  



var upload =JSON.parse(options);
base.updateData(sheets[i],upload);
  upload={};
  
  }




try{

var sheets=['References/ProductCodes','References/Descriptions'];


var packages=JSONtoARR(base.getData('Packages'));
for(var i=0;i<sheets.length;i++){
var options='{';
var data=base.getData(sheets[i]);
var list=JSONtoARR(data);
  for(var j=0;j<list.length;j++){
    if(list[j].packagingType){
      for(var k=0;k<packages.length;k++){
        if(packages[k].name==list[j].packagingType){
          list[j].packagingType={
            name:'',
            sku:'',
            
          };
          list[j].packagingType.name=packages[k].name;
           list[j].packagingType.sku=packages[k].sku;
          break;
        }
        
        
      }

    }else{
    list[j].packagingType={
    name:'',
    sku:'',
    
    };


    }
    
    if(sheets[i]=='References/ProductCodes'){
      options += '"' + list[j].prod + '":' + JSON.stringify(list[j]) + ',';
    }else if(sheets[i]=='References/Descriptions'){
      options += '"' + list[j].descr + '":' + JSON.stringify(list[j]) + ',';
    }else{
      options += '"' + list[j].batch + '":' + JSON.stringify(list[j]) + ',';
    }

    
  }
  
options+='}';  



var upload =JSON.parse(options);
base.updateData(sheets[i],upload);

  upload={};
  
  }






}catch(e){Logger.log('failed at: '+sheets[i]);}

}

function updateAllTubeLabels(){
try{

var sheets=['Packages'];

var packages=JSONtoARR(base.getData('Labels'));
for(var i=0;i<sheets.length;i++){
var options='{';
var data=base.getData(sheets[i]);
var list=JSONtoARR(data);
  for(var j=0;j<list.length;j++){
    if(list[j].tubelabel){
      for(var k=0;k<packages.length;k++){
        if(packages[k].name==list[j].tubelabel){
           var obj={
        name:packages[k].name,
        sku: packages[k].sku,
        }
          list[j].tubelabel=obj;

          break;
        }
        
        
      }

    }else{
    list[j].tubelabel={
    name:'',
    sku:'',
    
    };


    }
    
    if(sheets[i]=='References/ProductCodes'){
      options += '"' + list[j].prod + '":' + JSON.stringify(list[j]) + ',';
    }else if(sheets[i]=='References/Descriptions'){
      options += '"' + list[j].descr + '":' + JSON.stringify(list[j]) + ',';
    }else{
      options += '"' + list[j].sku + '":' + JSON.stringify(list[j]) + ',';
    }

    
  }
  
options+='}';  



var upload =JSON.parse(options);
base.updateData(sheets[i],upload);
    upload={};
  
  }
}catch(e){
Logger.log(e.message);
}

}



function clearextra(){
var PC=base.getData('References/ProductCodes')
var list=JSONtoARR(PC);
var keys=Object.keys(PC);
for(var i=0;i<keys.length;i++){
if(keys[i].length>30){
base.removeData('References/ProductCodes/'+keys[i]);
}
}

}
function updateAllBoxes(){



var sheets=['Orders','Mixing','Production','Printing','Labelling','Packaging','Shipping','References/ProductCodes','References/Descriptions'];

var boxes=JSONtoARR(base.getData('Boxes'));
for(var i=0;i<sheets.length;i++){
try{
var options='{';
var data=base.getData(sheets[i]);
var list=JSONtoARR(data);
  for(var j=0;j<list.length;j++){
    if(list[j].boxname!=''){
      for(var k=0;k<boxes.length;k++){

        if(boxes[k].name==list[j].boxname){
        var obj={
        name:boxes[k].name,
        sku: boxes[k].sku,
        }
          list[j].boxname=obj;
          break;
        }
        
        
      }

    }else{
    list[j].boxname={
    name:'',
    sku:'',
    
    };


    }
    
    if(sheets[i]=='References/ProductCodes'){
      options += '"' + list[j].prod + '":' + JSON.stringify(list[j]) + ',';
    }else if(sheets[i]=='References/Descriptions'){
      options += '"' + list[j].descr + '":' + JSON.stringify(list[j]) + ',';
    }else{
      options += '"' + list[j].batch + '":' + JSON.stringify(list[j]) + ',';
    }

    
  }
  
options+='}';  



var upload =JSON.parse(options);
base.updateData(sheets[i],upload);
  upload={};
 }catch(e){
Logger.log(e.toString());
}
 
  
  }

}



function updateBTYPE(){
var sheets=['References/ProductCodes','References/Descriptions'];

var bottles = JSONtoARR(base.getData('BottleTypes'));
var lids = JSONtoARR(base.getData('Lids'));
for(var i=0;i<sheets.length;i++){

var options='{';
var data=base.getData(sheets[i]);
var list=JSONtoARR(data);
  for(var j=0;j<list.length;j++){
  
      for(var k=0;k<bottles.length;k++){

        if(bottles[k].sku==list[j].botSKU){
  
          list[j].btype=bottles[k].name;
          break;
        }
        
        
      }

   for(var k=0;k<lids.length;k++){

        if(lids[k].sku==list[j].lidSKU){
  
          list[j].lid=lids[k].name;
          break;
        }
        
        
      }
   
    
    if(sheets[i]=='References/ProductCodes'){
      options += '"' + list[j].prod + '":' + JSON.stringify(list[j]) + ',';
    }else if(sheets[i]=='References/Descriptions'){
      options += '"' + list[j].descr + '":' + JSON.stringify(list[j]) + ',';
    }else{
      options += '"' + list[j].batch + '":' + JSON.stringify(list[j]) + ',';
    }

   }  

  
options+='}';  



var upload =JSON.parse(options);
base.updateData(sheets[i],upload);
  upload={};
 
  
  }


}


///////////////////FLAVOURUPDATE


function createFLAVOURDB(){
var data=JSONtoARR(base.getData('Flavours'));

var options='{';
for(var i=0;i<data.length;i++){
    data[i].type='base';
 var sku=data[i].sku; 
options += '"' + sku + '":' + JSON.stringify(data[i]) + ',';
}
options+='}';
var upload=JSON.parse(options);
base.removeData('Flavours');
base.updateData('Flavours',upload);






}

function updateFlavourDB(){

var sheets=['Orders','Mixing','MixingTeam','Production','Printing','Labelling','Packaging','Shipping','References/ProductCodes','References/Descriptions'];

var flavours=JSONtoARR(base.getData('Flavours'));
for(var i=0;i<sheets.length;i++){
try{
var options='{';
var data=base.getData(sheets[i]);
var list=JSONtoARR(data);
  for(var j=0;j<list.length;j++){
    if(list[j].flavour!=''){
      for(var k=0;k<flavours.length;k++){

        if(flavours[k].name==list[j].flavour){
        var obj={
        name:flavours[k].name,
        sku: flavours[k].sku,
        }
          list[j].flavour=obj;
          break;
        }
        
        
      }

    }else{
    list[j].flavour={
    name:'',
    sku:'',
    
    };


    }
    
    if(sheets[i]=='References/ProductCodes'){
      options += '"' + list[j].prod + '":' + JSON.stringify(list[j]) + ',';
    }else if(sheets[i]=='References/Descriptions'){
      options += '"' + list[j].descr + '":' + JSON.stringify(list[j]) + ',';
    }else if(sheets[i]=='MixingTeam'){
      options += '"' + list[j].MIXNAME + '":' + JSON.stringify(list[j]) + ',';
    }else{
      options += '"' + list[j].batch + '":' + JSON.stringify(list[j]) + ',';
    }

    
  }
  
options+='}';  



var upload =JSON.parse(options);
base.updateData(sheets[i],upload);
  upload={};
 }catch(e){
Logger.log(e.toString());
}
 
  
  }


}

function updateLabels(){
  var sheets=['Orders','Mixing','Production','Printing','Labelling','Packaging','Shipping','References/ProductCodes','References/Descriptions'];
  
  var packages=base.getData('Packages');
  var labels=base.getData('Labels');
  var labelList=JSONtoARR(labels);
  var PC=base.getData('References/ProductCodes');
  for(var i=0;i<sheets.length;i++){
    try{
      var options='{';
      var data=base.getData(sheets[i]);
      var list=JSONtoARR(data);
      for(var j=0;j<list.length;j++){
       if(PC[list[j].productcode]){
        if(PC[list[j].productcode].LabelCode){
          list[j].botlabel=PC[list[j].productcode].LabelCode;
          
          for(var k=0;k<labelList.length;k++){
            if(list[j].botlabel==labelList[k].name){
              list[j].botlabelsku=labelList[k].sku;
            }
          }
          
        }else{
          list[j].botlabel='';
          list[j].botlabelsku='';
        }
        
        }else{
          list[j].botlabel='';
          list[j].botlabelsku='';
        }
        if(list[j].packagingType){
        if(list[j].packagingType.sku){
          if(packages[list[j].packagingType.sku]){
            if(packages[list[j].packagingType.sku].tubelabel){
              list[j].packlabel=packages[list[j].packagingType.sku].tubelabel.name;
            }
          }
          if(packages[list[j].packagingType.sku]){
            if(packages[list[j].packagingType.sku].tubelabel){
              list[j].packlabelsku=packages[list[j].packagingType.sku].tubelabel.sku;
            }  
          }
        }else{
          
          list[j].packlabel='';
          list[j].packlabelsku='';  
        }
        }else{
          
          list[j].packlabel='';
          list[j].packlabelsku='';  
        }
        
        if(sheets[i]=='References/ProductCodes'){
          list[j].ppbotlabel='';
          list[j].ppbotlabelsku='';  
          list[j].pppacklabel='';
          list[j].pppacklabelsku='';  
          options += '"' + list[j].prod + '":' + JSON.stringify(list[j]) + ',';
        }else if(sheets[i]=='References/Descriptions'){
          list[j].ppbotlabel='';
          list[j].ppbotlabelsku='';  
          list[j].pppacklabel='';
          list[j].pppacklabelsku='';  
          options += '"' + list[j].descr + '":' + JSON.stringify(list[j]) + ',';
        }else{
          list[j].ppp=false;
          list[j].ppb=false;  
          
          options += '"' + list[j].batch + '":' + JSON.stringify(list[j]) + ',';
        }
        
        
      }
      
      options+='}';  
      
      
      
      var upload =JSON.parse(options);
      base.updateData(sheets[i],upload);
      upload={};
    }catch(e){
      Logger.log(sheets[i]+'  -  '+e.toString());
    }
    
    
  }
  
  
  
  
  
  
  
}


///AG UPDATE

function uprdateAGINRECIPES(){
var rawRecipe=base.getData('Recipes');
var list=JSONtoARR(rawRecipe);
     for(var j=0;j<list.length;j++){
     rawRecipe[list[j].id].AGrec=0;
     
     }
 base.updateData('Recipes',rawRecipe);
 
 var ag={
 Running:0,
 Reserved:0,
 Completed:0,
 sku:'MIS2332A',
 name:'AG',
 };
 base.updateData('Misc/AG',ag);
}



function updatebrandskus(){
  
  
  var brands=base.getData('Brands');
  var list=JSONtoARR(brands);
  
  for(var i =0;i<list.length;i++){
    if(!list[i].sku){
    list[i].sku="BRA"+getRandom()+list[i].name.substr(0,1);
    brands[list[i].name].sku= list[i].sku;
    }
  }
base.updateData('Brands',brands);
}

function createBottleLidBrandCustomerDB(){
var sheets=['BottleTypes','Lids','Brands','Customers']
 for(var j =0;j<sheets.length;j++){
var data=JSONtoARR(base.getData(sheets[j]));

var options='{';
for(var i=0;i<data.length;i++){
 var sku=data[i].sku; 
 if(sku){
options += '"' + sku + '":' + JSON.stringify(data[i]) + ',';
}
}
options+='}';
var upload=JSON.parse(options);
base.removeData(sheets[j]);
base.updateData(sheets[j],upload);
}


}
function updateBTYPEBRANDLID(){

var sheets=['Orders','Mixing','Production','Printing','Labelling','Packaging','Shipping','References/ProductCodes','References/Descriptions'];
var bottles = JSONtoARR(base.getData('BottleTypes'));
var lids = JSONtoARR(base.getData('Lids'));
var brands = JSONtoARR(base.getData('Brands'));
var customers = JSONtoARR(base.getData('Customers'));
for(var i=0;i<sheets.length;i++){

var options='{';
var data=base.getData(sheets[i]);
var list=JSONtoARR(data);
  for(var j=0;j<list.length;j++){
  
      for(var k=0;k<bottles.length;k++){

        if(bottles[k].name==list[j].btype){
  
          list[j].botSKU=bottles[k].sku;
          break;
        }
        
        
      }

   for(var k=0;k<lids.length;k++){

        if(lids[k].name==list[j].lid){
  
          list[j].lidSKU=lids[k].sku;
          break;
        }
        
        
      }
      for(var k=0;k<brands.length;k++){

        if(brands[k].name==list[j].brand){
  
          list[j].brandSKU=brands[k].sku;
          break;
        }
        
        
      }
    
         for(var k=0;k<customers.length;k++){

        if(customers[k].name==list[j].customer){
  
          list[j].customerSKU=customers[k].sku;
          break;
        }
        
        
      }
      
    if(sheets[i]=='References/ProductCodes'){
      options += '"' + list[j].prod + '":' + JSON.stringify(list[j]) + ',';
    }else if(sheets[i]=='References/Descriptions'){
      options += '"' + list[j].descr + '":' + JSON.stringify(list[j]) + ',';
    }else{
      options += '"' + list[j].batch + '":' + JSON.stringify(list[j]) + ',';
    }

   }  

  
options+='}';  



var upload =JSON.parse(options);
base.updateData(sheets[i],upload);
  upload={};
 
  
  }


}

//XERO PRINTER

function convertOrderDatesToMS(){
  var today=(new Date()).getTime();
  //var sheets=['Orders','Mixing','Production','Printing','Labelling','Packaging','Shipping'];
  var sheets=['Inventory'];
  for(var s=0;s<sheets.length;s++){
    var raw=base.getData(sheets[s]);
    var list=JSONtoARR(raw);
    for(var i=0;i<list.length;i++){
      if(list[i].orderdate){
        var orderdate=new Date(list[i].orderdate);
        if(orderdate.getTime()){}else{
      
          var from=list[i].orderdate.replace(/\//g,'-').split("-");
          orderdate= new Date(from[2], from[1]-1 , from[0]);
      
          
        }
        
        if(orderdate.getTime()){
          if(orderdate.getTime()>today){
            orderdate= formatDateDisplay(orderdate);
            var from=orderdate.replace(/\//g,'-').split("-");
            orderdate= new Date(from[2], from[0]-1 , from[1]);
          }
          raw[list[i].batch].orderdate=orderdate.getTime();
        }
      }else{
     
        raw[list[i].batch].orderdate=today;
      }
     if(sheets[s]=='Shipping'){
        if(list[i].dateshipped){
        if(list[i].dateshipped.length>12){
         raw[list[i].batch].dateshipped=Utilities.formatDate(new Date(list[i].dateshipped.replace(' ','T')+'Z'), "GMT", "dd-MM-yyyy' 'HH:mm:ss");
        }else{
        var dateshipped=new Date(list[i].dateshipped);
        if(dateshipped.getTime()){}else{
      
          var from=list[i].dateshipped.replace(/\//g,'-').split("-");
          dateshipped= new Date(from[2], from[1]-1 , from[0]);
      
          
        }
        
        if(dateshipped.getTime()){
          if(dateshipped.getTime()>today){
            dateshipped= formatDateDisplay(dateshipped);
            var from=dateshipped.replace(/\//g,'-').split("-");
            dateshipped=new Date(from[2], from[0]-1 , from[1]);
          }
          raw[list[i].batch].dateshipped=Utilities.formatDate(dateshipped, "GMT", "dd-MM-yyyy' 'HH:mm:ss");
        }
        
        }
      }else{
     
        raw[list[i].batch].dateshipped='';
      }
          if(list[i].datedelivered){
        if(list[i].datedelivered.length>12){
         raw[list[i].batch].datedelivered=Utilities.formatDate(new Date(list[i].datedelivered.replace(' ','T')+'Z'), "GMT", "dd-MM-yyyy' 'HH:mm:ss");
        }else{
        var datedelivered=new Date(list[i].datedelivered);
        if(datedelivered.getTime()){}else{
      
          var from=list[i].datedelivered.replace(/\//g,'-').split("-");
          datedelivered= new Date(from[2], from[1]-1 , from[0]);
      
          
        }
        
        if(datedelivered.getTime()){
          if(datedelivered.getTime()>today){
            datedelivered= formatDateDisplay(datedelivered);
            var from=datedelivered.replace(/\//g,'-').split("-");
            datedelivered=new Date(from[2], from[0]-1 , from[1]);
          }
          raw[list[i].batch].datedelivered=Utilities.formatDate(datedelivered, "GMT", "dd-MM-yyyy' 'HH:mm:ss");
        }
        
        }
      }else{
     
        raw[list[i].batch].datedelivered='';
      }
     }
    }
    
  
  base.updateData(sheets[s],raw)
  }
}
function testDATES(){
Logger.log(new Date())
}
function convertOrderDatesToMS2(){
  var today=(new Date()).getTime();
  //var sheets=['Orders','Mixing','Production','Printing','Labelling','Packaging','Shipping'];
  var sheets=['Inventory'];
  var dates=['orderdate','delivdate','paiddate'];
  
  for(var s=0;s<sheets.length;s++){
    var raw=base.getData(sheets[s]);
    var list=JSONtoARR(raw);
    for(var i=0;i<list.length;i++){
    for(var d=0;d<dates.length;d++){
      if(list[i][dates[d]]){
      var orig=list[i].name;
        var orderdate=new Date(list[i][dates[d]]);
        if(orderdate.getTime()){}else{
      
          var from=list[i][dates[d]].replace(/\//g,'-').split("-");
          orderdate= new Date(from[2], from[1]-1 , from[0]);
      
          
        }
        
        if(orderdate.getTime()){
          if(orderdate.getTime()>today){
            orderdate= formatDateDisplay(orderdate);
            var from=orderdate.replace(/\//g,'-').split("-");
            orderdate= new Date(from[2], from[0]-1 , from[1]);
          }
         // raw[list[i].name][dates[d]]=orderdate.getTime();
         base.removeData(sheets[s]+'/'+orig.replace('+',' '));
         list[i][dates[d]]=orderdate.getTime();
         list[i].name=list[i].desc+' '+list[i].orderdate+' '+list[i].quantity
         base.updateData(sheets[s]+'/'+list[i].name,list[i]);
        }
      }else{
        base.removeData(sheets[s]+'/'+orig.replace('+',' '));
       list[i][dates[d]]=today;
        list[i].name=list[i].desc+' '+list[i].orderdate+' '+list[i].quantity
        base.updateData(sheets[s]+'/'+list[i].name,list[i]);
       // raw[list[i].name][dates[d]]=today;
      }

    }
    }
  
  //base.updateData(sheets[s],raw);
  }
}


function updatedate(){
var batches=['902044PO',
'902064PO',
'902058PO',
'902043PO',
'902061PO',
'902050PO',
'902049PO',
'902055POPK',
'902028POPO',
'902063POPK'];
var orders=base.getData('Orders');
  var sheets=['Orders','Mixing','Production','Printing','Labelling','Packaging','Shipping'];
for(var i=0;i<sheets.length;i++){
  for(var j=0;j<batches.length;j++){
  var regular=batches[j].match(/\d+/g);
  var order=orders[regular];
  var date={
  orderdate:order.orderdate,
  
  }
  var exists=base.getData(sheets[i]+'/'+batches[j]);
  if(exists){
  base.updateData(sheets[i]+'/'+batches[j],date);
  }

}
}

}


function clearUNB(){
  var str=['UNB1231B','UNB1312','UNB2312BB','UNB123B33','UNBB123B33','UNZ123B33','UZB123B33','UNB18831B123','UNB10031B231UNB1231B']
  var reg='UNB[0-9]w{1}/;'
  var raw=base.getData('UnbrandedTypes');
  var list = JSONtoARR(raw);
  for(var i=0;i<list.length;i++){
    if(list[i].sku){
      if(list[i].sku.match(/^UNB\d{1,}[a-zA-Z]{1}$/i)){
        delete raw[list[i].name];
      }
    }
  }
  
  base.removeData('UnbrandedTypes');
  base.updateData('UnbrandedTypes',raw);
  
}


function correctCompleted(){
var shippingOrders=JSONtoARR(base.getData('Shipping'));
var orders=base.getData('Orders');
for(var i=0;i<shippingOrders.length;i++){
if(shippingOrders[i].dateshipped){
if(orders[shippingOrders[i].batch].final_status!='Completed'){
orders[shippingOrders[i].batch].final_status='Completed';
}
}

}
base.updateData('Orders',orders);
  

}


//NICOTINE SALTS

function insertNicotineSalts(){
var data={
sku:'MIS1323N',
name:'Nicotine Salts',
Running:0,
Reserved:0,
Completed:0,
};

base.updateData('Misc/Nicotine Salts',data);
}

function swapDates(){
var items=[901163,
901200,
901439,
901469,
901480,
901688,
901695,
901696,
901698,
901703,
901709,
901929,
901934,
901944,
901945,
901946,
901947,
901960,
901962,
901964,
901980,
901983,
901986,
901988,
901990,
901993,
901994,
901997,
901998,
902000,
902002,
902003,
902005,
902006,
902010,
902012,
902013,
902014,
902015,
902018,
902019,
902020,
902021,
902022,
902023,
902024,
902025,
902026,
902029,
902031,
902032,
902033,
902051,
902066,
902070,
902075,
902079,
902084,
902086,
902087,
902089,
902096,
902097,
902098,
902101,
902103,
902104,
902105,
902106,
902107,
902112,
902113,
902114,
902115,
902120,
902123,
902124,
902125,
902127,
902128,
902129,
902130,
902131,
902132,
902134,
902136,
902138,
902142,
902143,
902145,
902146,
902153,
902154,
902156,
902157,
902215,
902230,
902231,
902232,
902233,
902234,
902235,
902236,
902237,
902238,
902239,
902240,
902241,
902242,
902243,
902244,
902245,
902246,
902247,
902248,
902249,
902250,
902251,
902252,
902253,
902254,
902255,
902256,
902257,
902258,
902259,
'901971PO',
'901990PO',
'902004PO',
'902007PO',
'902011PO'];
var orders=base.getData('Orders');
var shipping=base.getData('Shipping');
for(var i=0;i<items.length;i++){
if(orders[items[i].toString()]){
  if(shipping[items[i].toString()]){
  var date={
  orderdate:orders[items[i].toString()].orderdate,
  }
  base.updateData('Shipping/'+items[i].toString(),date);
  
  }


}



}


}


function clearLabels(){
var labels=base.getData('Labels');
var keys=Object.keys(labels);

keys.map(function(item,index){
if(!labels[keys[index]].name){
  base.removeData('Labels/'+keys[index]);
}
})

}


function orderdateFix2(){
  var raw= base.getData('Orders');
  if(raw){
    var keys = Object.keys(raw);
    var sheets=['Orders','Mixing','Production','Printing','Labelling','Packaging','Shipping'];
    for(var i=0;i<sheets.length;i++){
      var data= base.getData(sheets[i]);
      
      keys.map(function(item){
        if(item.toLowerCase().match('ru')){
          var batch = item.replace(/[^\d+]/g,'');
          if(data[item] && raw[item] && raw[batch]){
            data[item].orderdate = raw[batch].orderdate;
          }
        }
      });
      
      
      base.updateData(sheets[i],data);
      
    }
  }
  
}


//SCHEDULER CODE

//MACHINES
function generateMachines(){
 var fillList=['10','15','20','25',
'30',
'50',
'60',
'80',
'100',
'120'];
  var machineList=[
                   'Halifax - Auto 10ml Machine 1',
                   'Halifax - Auto 10ml Machine 2',
                   'Halifax - Auto 10ml Machine 3',
                   'Halifax - Semi-auto Machine 1',
                   'Halifax - Semi-auto Machine 2',
                   'Halifax - 0mg Machine 1'];
                   
    var options="{";
    for(var i=0;i<machineList.length;i++){
        var item={
        sku:'MACH'+getRandom(),
        name:machineList[i],
        status:true,
        fillLevels:fillList.join(','),
        }
    
       options += '"' + item.sku + '":' + JSON.stringify(item) + ',';
    }
                   
  options+='}';  
  var upload =JSON.parse(options);
base.updateData("Machines",upload);
}
function generateFILLLevels(){
var fillList=['10','15','20','25',
'30',
'50',
'60',
'80',
'100',
'120'];

                 
    var options="{";
    for(var i=0;i<fillList.length;i++){
        var item={
        sku:fillList[i],
        name:fillList[i],
        time:1,
        }
    
       options += '"' + item.sku + '":' + JSON.stringify(item) + ',';
    }
                   
  options+='}';  
  var upload =JSON.parse(options);
base.updateData("FillLevels",upload);

}


function replaceMachineNameWithSKU(){
var machines=JSONtoARR(base.getData('Machines'));
var sheets=['Orders','Production'];
for(var i=0;i<sheets.length;i++){
  var data=base.getData(sheets[i]);
  var list=JSONtoARR(data);
  for(var l=0;l<list.length;l++){
    for(var j=0;j<machines.length;j++){
      if(list[l].machineP==machines[j].name){
        data[list[l].batch].machineP=machines.sku;
        }
    }
  }
  
  base.updateData(sheets[i],data);
}



}


function checkpacknotes(){
var packaging = base.getData('Packaging');
var shipping = base.getData('Shipping');
var plist = JSONtoARR(packaging);
var slist = JSONtoARR(shipping);

var arr=[];
for(var i=0;i<plist.length;i++){
  if(shipping[plist[i].batch]){
   if(shipping[plist[i].batch].PRINTCODE != plist[i].PRINTCODE){
     if(shipping[plist[i].batch].PRINTCODE){
     var dat = {
     PRINTCODE:shipping[plist[i].batch].PRINTCODE
     }
     base.updateData('Packaging/'+plist[i].batch,dat);
     }else if(plist[i].PRINTCODE){
     var dat = {
     PRINTCODE:plist[i].PRINTCODE
     }
     base.updateData('Shipping/'+plist[i].batch,dat);
     }
     //arr.push(plist[i].batch +' - '+plist[i].PRINTCODE+' -- '+plist[i].batch +' - '+shipping[plist[i].batch].PRINTCODE+'\n');
    }
  }
}

Logger.log(arr);
}

function updateInvKeys(){
var inv=base.getData('Inventory');
var invlist=JSONtoARR(inv);
var keys=Object.keys(inv);
var options ='{';
for(var i=0;i<keys.length;i++){
var thenum = keys[i].replace( /^\D+/g, '').replace(/ /g,'');
inv[keys[i]].key=thenum;
 options += '"' + thenum+ '":' + JSON.stringify(inv[keys[i]]) + ',';

}


  
options+='}';  
      var upload =JSON.parse(options);
base.removeData('Inventory');
base.updateData('Inventory',upload);
}

function updateFillLevels(){
  var PC = base.getData('References/ProductCodes');
  var sheets=['Orders','Production','Printing','Labelling','Packaging','Shipping'];
  for(var s =0;s<sheets.length;s++){
    var data= base.getData(sheets[s]);
    var list = JSONtoARR(data);
    for(var i=0;i<list.length;i++){
      if(list[i].batch){
        if(list[i].productcode){
          var item = PC[list[i].productcode];
          if(item){
            if(item.fill){
              data[list[i].batch].fill=item.fill;
            }
          }
          
        }
      }
    }
    base.updateData(sheets[s],data);
  }
}

function listundefined(){
var data = base.getData('Orders');
var keys = Object.keys(data);
for(var i=0;i<keys.length;i++){
 if(!data[keys[i]].orderID){
   Logger.log(keys[i]);
 }
}


}