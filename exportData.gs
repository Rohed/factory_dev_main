function export(tabs) {
//var tabs=['MixingTeam'];
 var LOGDATA={
    status:true,
    msg:'',
    action:'Export Tabs',
    batch:'',
    page:'Export',
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };

var file=SpreadsheetApp.create('Export Sheet');
var date = formatDateDisplay(new Date());
file.rename(tabs.join(', ')+' - '+date);
var folder=DriveApp.getFolderById(EXPORTS_FOLDER);
for(var j=0;j<tabs.length;j++){
   LOGDATA.data.push(['Exported: ',tabs[j]]);
   if(tabs[j]== 'Orders'){
      var data=getOrdersData();
         if(!data){continue;}
      Logger.log(data);
      var headerRow=['Order Date', 'Batch','OrderID','Product Code','Product Description', 'Priority', 'Customer', 'Brand', 'Recipe', 'Flavour', 'Bottles', 'Stocking Amount (litre)', 'Bottle Type', 'Lid Type', 'Packaging Tube',
      'QTY', 'Flavour Value', 'VG Value', 'AG Value', 'PG Value', 'Nicotine Value', 'Nicotine Salts Value', 'CBD Value', 'MCT Value', 'Backed by Mixing',
      'Backed by Premixed', 'Backed by Unbranded', 'Backed by Branded', 'Backed By Branded Packaged', 'Mixing Status',
      'Production Status', 'Printing Status', 'Labelling Status', 'Packaging Status', 'FINAL STATUS','Partial Production','Partial Packaging'];
    
    
    
    
    
      var values=[];
      values.push(headerRow);
      for(var i=0;i<data.length;i++){
      if(!data[i].recipe){continue;}
      data[i].boxname?data[i].boxname.name||(data[i].boxname={name:"",sku:""}):data[i].boxname={name:"",sku:""},data[i].packagingType?data[i].packagingType.name||(data[i].packagingType={name:"",sku:""}):data[i].packagingType={name:"",sku:""};
      
      values.push([formatDateDisplay(data[i].orderdate),data[i].batch,data[i].orderID,data[i].productcode,data[i].productdescription,data[i].priority,data[i].customer,data[i].brand,data[i].recipe.name,data[i].flavour.name,
      data[i].bottles,data[i].stocking,data[i].btype,data[i].lid,data[i].packagingType.name,data[i].QTY,data[i].flavvalue,data[i].VGval,data[i].AGval,data[i].PGval,data[i].Nico,data[i].Nicosalts,data[i].CBDvalue,data[i].MCTval,
      data[i].mixing,data[i].premixed,data[i].unbranded,data[i].branded,data[i].backtubed,data[i].mixing_status,data[i].production_status,data[i].printing_status,
      data[i].labeling_status,data[i].packaging_status,data[i].final_status,data[i].partialProduction,data[i].partialPackaging]);
      }
     Logger.log(values);
      var sheet=file.insertSheet('Orders');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  }else if(tabs[j]== 'Mixing'){
       
       
          var data=getSheetData('Mixing');
        if(!data){continue;}
     var headerRow=['Completed','Priority','Batch','OrderID',"Brand",'Product Code','Product Description','Recipe','Flavour','Order Date','QTY(Litres)','VG (MG)','AG (MG)',
     'PG (MG)','Nicotine (MG)','Nicotine Salts (MG)','CBD (MG)','MCT (MG)','Flavour (MG)'];
       var values=[];
      values.push(headerRow);
      for(var i=0;i<data.length;i++){
       if(!data[i].recipe){continue;}
       data[i].brand =   data[i].brand ?   data[i].brand : "";
      values.push([data[i].final_status,data.priority,data[i].batch,data[i].orderID,data[i].brand,data[i].productcode,data[i].productdescription,data[i].recipe.name,data[i].flavour.name,formatDateDisplay(data[i].orderdate),
      data[i].QTY,data[i].VGval,data[i].AGval,data[i].PGval,data[i].Nico,data[i].Nicosalts,data[i].CBDvalue,data[i].MCTval,data[i].flavvalue]);
      }
      var sheet=file.insertSheet('Mixing');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      
       
       
       
       
   }else if(tabs[j]== 'MixingTeam'){

     var data=JSONtoARR(base.getData('MixingTeam'));
        if(!data){continue;}
     var headerRow=['Completed','Priority','Date of Production','Batch','Mix Batch','Recipe','Flavour','Order Date','QTY(Litres)','VG (MG)','AG (MG)',
     'PG (MG)','Nicotine (MG)','Nicotine Salts (MG)','CBD (MG)','MCT (MG)','Flavour (MG)','Notes - Mixing Dept','Location','Start Date','Completion Date','VG supplier batch','PG supplier batch','Nicotine supplier batch','Flavour supplier batch'];
       var values=[];
      values.push(headerRow);
      for(var i=0;i<data.length;i++){
      
            var batches=[];
            var orderDates=[];
            var priorities=[];
            var mixARR=[];
            if(data[i].Batches){
               var result = Object.keys(data[i].Batches).map(function(key) {
                    return [Number(key), data[i].Batches[key]];
                  });
                  
               
                  for(var k=0;k<result.length;k++){
                    mixARR.push(result[k][1]);
                    
                  }
                  
            for(var k=0;k<mixARR.length;k++){
            batches.push(mixARR[k].batch);
            orderDates.push(mixARR[k].orderdate);
            priorities.push(mixARR[k].priority);
            }      
      values.push([data[i].Completed,priorities.join(),data[i].prodDate,batches.join(),data[i].MIXNAME,data[i].RECIPE,data[i].FLAVOUR,orderDates.join(),
      data[i].QTYTOTAL,data[i].VGval,data[i].AGval,data[i].PGval,data[i].Nico,data[i].Nicosalts,data[i].CBDvalue,data[i].MCTval,data[i].flavvalue,data[i].Notes,data[i].Location,formatDateDisplay2(data[i].starttime),data[i].CompletionDate,data[i].vgSupplier,data[i].pgSupplier,data[i].nicSupplier,data[i].flavSupplier]);
      }
      }
      var sheet=file.insertSheet('Mixing Team');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      
  }else if(tabs[j]== 'Production'){

   
    var data=getSheetData('Production');
    if(!data){continue;}
        var headerRow=['Mixing Completed','Order Date','Batch','OrderID','Product Code','Product Description','Mix Batch code','Priority','Customer','Brand','Recipe','Flavour','Bottles',
     'Bottle Type','Cap Type','Packaging Tube','Start Date','Completion Date','Production Completed','Location'];
    
     
       var values=[];
      values.push(headerRow);
      for(var i=0;i<data.length;i++){
       if(!data[i].recipe){continue;}
       data[i].boxname?data[i].boxname.name||(data[i].boxname={name:"",sku:""}):data[i].boxname={name:"",sku:""},data[i].packagingType?data[i].packagingType.name||(data[i].packagingType={name:"",sku:""}):data[i].packagingType={name:"",sku:""};
       
      values.push([data[i].mixing_status,formatDateDisplay(data[i].orderdate),data[i].batch,data[i].orderID,data[i].productcode,data[i].productdescription,data[i].mixbatch,data[i].priority,data[i].customer,data[i].brand,data[i].recipe.name,
      data[i].flavour.name,data[i].bottles,data[i].btype,data[i].lid,data[i].packagingType.name,formatDateDisplay2(data[i].starttime),formatDateDisplay2(data[i].CompletionDate),data[i].ProductionCompleted,data[i].Location]);
      }
      var sheet=file.insertSheet('Production');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      
   
 }else if(tabs[j]== 'Printing'){
        
 
       
           var data=getSheetData('Printing');
              if(!data){continue;}
        var headerRow=['Production Status','Order Date','Batch','Bottle Labels QTY','Cylinder Labels QTY','Exp. Date','OrderID','Product Code','Product Description','Priority','Customer','Brand','Recipe','Flavour','Bottles',
     'Bottle Type','Cap Type','Packaging Tube','Label','Outer Box','Start Date','Completion Date','Production Completed','Location'];
    
    
       var values=[];
      values.push(headerRow);
      for(var i=0;i<data.length;i++){
       if(!data[i].recipe){continue;}
      data[i].boxname?data[i].boxname.name||(data[i].boxname={name:"",sku:""}):data[i].boxname={name:"",sku:""},data[i].packagingType?data[i].packagingType.name||(data[i].packagingType={name:"",sku:""}):data[i].packagingType={name:"",sku:""};
      values.push([data[i].ProductionCompleted,formatDateDisplay(data[i].orderdate),data[i].batch,data[i].numLabelsBottles,data[i].numLabelsTubes,data[i].expDate,data[i].orderID,data[i].productcode,data[i].productdescription,data[i].priority,data[i].customer,data[i].brand,data[i].recipe.name,
      data[i].flavour.name,data[i].bottles,data[i].btype,data[i].lid,data[i].packagingType.name,data[i].botlabel,data[i].boxname.name,formatDateDisplay2(data[i].starttime),formatDateDisplay2(data[i].CompletionDate),data[i].ProductionCompleted,data[i].Location]);

   }
      var sheet=file.insertSheet('Printing');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      
    }else if(tabs[j]== 'Labelling'){
        
        

        var data=getSheetData('Labelling');
           if(!data){continue;}
     var headerRow=['Production Status','Order Date','Batch','OrderID','Product Code','ProductDescription','Priority','Customer','Brand','Recipe','Flavour','Bottles',
     'Bottle Type','Cap Type','Packaging Tube','Start Date','Completion Date','Production Completed','Location'];
    
    
       var values=[];
      values.push(headerRow);
      for(var i=0;i<data.length;i++){
       if(!data[i].recipe){continue;}
       data[i].boxname?data[i].boxname.name||(data[i].boxname={name:"",sku:""}):data[i].boxname={name:"",sku:""},data[i].packagingType?data[i].packagingType.name||(data[i].packagingType={name:"",sku:""}):data[i].packagingType={name:"",sku:""};
      values.push([data[i].ProductionCompleted,formatDateDisplay(data[i].orderdate),data[i].batch,data[i].orderID,data[i].productcode,data[i].productdescription,data[i].priority,data[i].customer,data[i].brand,data[i].recipe.name,
      data[i].flavour.name,data[i].bottles,data[i].btype,data[i].lid,data[i].packagingType.name ,formatDateDisplay2(data[i].starttime),formatDateDisplay2(data[i].CompletionDate),data[i].ProductionCompleted,data[i].Location]);
      }
      var sheet=file.insertSheet('Labelling');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      
    }else if(tabs[j]== 'Packaging'){

         var data=getSheetData('Packaging');
            if(!data){continue;}
      var headerRow=['Production Status','Printing Status','Order Date','Batch','OrderID','Product Code','ProductDescription','Packaging Code','Priority','Customer','Brand','Recipe','Flavour','Bottles',
     'Bottle Type','Cap Type','Packaging Tube','Start Date','Completion Date','Packaging Completed','Location'];
    
  
       var values=[];
      values.push(headerRow);
      for(var i=0;i<data.length;i++){
      data[i].boxname?data[i].boxname.name||(data[i].boxname={name:"",sku:""}):data[i].boxname={name:"",sku:""},data[i].packagingType?data[i].packagingType.name||(data[i].packagingType={name:"",sku:""}):data[i].packagingType={name:"",sku:""};
      values.push([data[i].ProductionCompleted,data[i].PrintingCompleted,formatDateDisplay(data[i].orderdate),data[i].batch,data[i].orderID,data[i].productcode,data[i].productdescription,data[i].PRINTCODE,data[i].priority,data[i].customer,data[i].brand,data[i].recipe.name,
      data[i].flavour.name,data[i].bottles,data[i].btype,data[i].lid,data[i].packagingType.name,formatDateDisplay2(data[i].starttime),formatDateDisplay2(data[i].CompletionDate),data[i].ProductionCompleted,data[i].Location]);
      }
      var sheet=file.insertSheet('Packaging');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      
        }else if(tabs[j]== 'Shipping'){
  
        var data=getShippingData();
           if(!data){continue;}
            var headerRow=['Order Date','Batch','Order ID','Product Code','ProductDescription','Priority','Customer','Brand','Recipe','Packaging Code','Flavour','Bottles','Bottle Type','Lid Type',
     'Packaging Tube','Status','Shipping Status','Shipping Code','Date Shipped','Tracking No.','Date Delivered','Location'];

       var values=[];
      values.push(headerRow);
      for(var i=0;i<data.length;i++){
       if(!data[i].recipe){continue;}
       data[i].SHIPPINGCODE = data[i].SHIPPINGCODE ? data[i].SHIPPINGCODE : '';
       data[i].boxname?data[i].boxname.name||(data[i].boxname={name:"",sku:""}):data[i].boxname={name:"",sku:""},data[i].packagingType?data[i].packagingType.name||(data[i].packagingType={name:"",sku:""}):data[i].packagingType={name:"",sku:""};
      values.push([formatDateDisplay(data[i].orderdate),data[i].batch,data[i].orderID,data[i].productcode,data[i].productdescription,data[i].priority,data[i].customer,data[i].brand,data[i].recipe.name,data[i].PRINTCODE,data[i].flavour.name,data[i].bottles,
      data[i].btype,data[i].lid,data[i].packagingType.name,data[i].final_status,data[i].shipping_status ,data[i].SHIPPINGCODE,data[i].dateshipped,data[i].trackingNo,
      data[i].datedelivered,data[i].shippinglocation]);
      }
      var sheet=file.insertSheet('Shipping');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      
      
      
      
      }else if(tabs[j]== 'Locations'){    
        
  
       
      var data=getLocations();
           if(!data){continue;}
       var mixingSheet = data[5];
        var Production = data[4];
        var Printing = data[3];
        var Labelling = data[2];
        var Packaging = data[1];
        var shipping = data[0];

            var headerRow=['Mixing Team','','','','Production','','','','Printing','','','','Labelling','','','','Packaging','','','','Shipping','','',''];
         var secondheader=['Batch','Recipe','Flavour','Location','Batch','Recipe','Flavour','Location','Batch','Recipe','Flavour','Location','Batch','Recipe','Flavour','Location','Batch','Recipe','Flavour','Location','Batch','Recipe','Flavour','Location'];
  
    
        if(mixingSheet){ 
          var ml=mixingSheet.length;
          
           }else{var ml=0}
         
        if(Production){
            var pl=Production.length;
          
           }else{var pl=0}
        if(Printing){
            var p=Printing.length;
          
           }else{var p=0}
        if(Labelling){
            var l=Labelling.length;
          
           }else{var l=0}
        if(Packaging){
        
            var pa=Packaging.length;
          
           }else{var pa=0}
        if(shipping){
            var sl=shipping.length;
          
           }else{var sl=0}
     var Rows=[ ml, pl, p, l, pa, sl];
           var max = Rows.reduce(function(a, b) {
                  return Math.max(a, b);
              });  
                 var values= [];
      for (var i = 0; i < max; i++) {          
        if(mixingSheet[i]){ 
     
           values.push([ mixingSheet[i].MIXNAME , mixingSheet[i].RECIPE , mixingSheet[i].FLAVOUR, mixingSheet[i].Location]);

        }else{values.push(['0','0','0','0']);}
    }     for (var i = 0; i < max; i++) {          
        if(Production[i]){
     
             values.push([ Production[i].batch , Production[i].recipe.name , Production[i].flavour.name, Production[i].Location]);

                }else{values.push([' ',' ',' ',' ']);}
    }     for (var i = 0; i < max; i++) {    
       if(Printing[i]){
   
              values.push([ Printing[i].batch , Printing[i].recipe.name , Printing[i].flavour.name, Printing[i].Location]);

               }else{values.push([' ',' ',' ',' ']);}
  }     for (var i = 0; i < max; i++) {    
        if(Labelling[i]){
      
              values.push([ Labelling[i].batch , Labelling[i].recipe.name , Labelling[i].flavour.name, Labelling[i].Location]);

               }else{values.push([ ' ',' ',' ',' ']);}
  }     for (var i = 0; i < max; i++) {    
        if(Packaging[i]){
  
             values.push([ Packaging[i].batch , Packaging[i].recipe.name , Packaging[i].flavour.name, Packaging[i].Location]);

               }else{values.push([' ',' ',' ',' ']);}
  }     for (var i = 0; i < max; i++) {    
       if(shipping[i]){
      
             values.push([ shipping[i].batch , shipping[i].recipe.name , shipping[i].flavour.name, shipping[i].Location]);

        
               }else{values.push([' ',' ',' ',' ']);}
        }
        
        
    var retArr=[];    
     for(var i=0;i<max;i++){
     retArr.push(values[i].concat(values[i+max].concat(values[i+max+max].concat(values[i+max+max+max].concat(values[i+max+max+max+max].concat(values[i+max+max+max+max+max]))))));
     
     
     }
     
      retArr.unshift(secondheader);   
      retArr.unshift(headerRow);
 
      var sheet=file.insertSheet('Locations');
      sheet.getRange(1, 1, retArr.length, retArr[0].length).setValues(retArr);
      

       
 }else if(tabs[j]== 'Inventory'){    
        
    
      var data=getInventoryData();
            if(!data){continue;}
       var headerRow=['SKU','Description','Order Date','Delivery Date','Paid Date','ETA / Days','Order Quantity','Note'];
      
       var values=[];
       for(var i=0;i<data.length;i++){
       values.push([data[i].sku,data[i].desc,data[i].orderdate,data[i].delivdate,data[i].paiddate,data[i].eta,data[i].quantity,data[i].note]);
       }
      values.unshift(headerRow);
      var sheet=file.insertSheet('Inventory');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
      
     }else if(tabs[j]== 'QTY'){     
        
 
     var data=getQTYFull();
     var headerRow=['SKU','Name','Running','Reserved','Completed','Stock','Category']
     var values=[];
     for(var i=0;i<data.length;i++)
     {
       if(data[i].sku||data[i].name||data[i].Running||data[i].Reserved||data[i].Completed){
         if(data[i].Stock){
         var stock=data[i].Stock;
         }else{
         var stock=0;
         }
         values.push([data[i].sku,data[i].name,data[i].Running,data[i].Reserved,data[i].Completed,stock,data[i].Category]);
       }else{values.push(['-','-','-','-','-','-','-']);}
     
     }
     values.unshift(headerRow);
      var sheet=file.insertSheet('QTY');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  
     }else if(tabs[j]== 'PC/PD'){   
     var baseData=base.getData('References/ProductCodes');
     var keys=Object.keys(baseData);
            var data=JSONtoARR(baseData);

     var headerRow=['Product Code','Product Description','Unbranded SKU','Unbranded Description','Premix SKU','Premix Description','Colored Premix SKU','Colored Premix Description','Linked BB SKU','Brand','Brand SKU',
     'Bottle','Bottle SKU','Fill','Cap','Cap SKU','Packaging','Packaging SKU','Box','Box SKU','NIB','Flavour','Flavour SKU','Recipe','Recipe ID',
     'Bottle Label','Bottle Label SKU','Pre Printed Bottle Label','Pre Printed Bottle Label SKU','Pack Label','Pack Label SKU','Pre Printed Pack Label',
     'Pre Printed Pack Label SKU','Barcode','ECID'];
     var values=[];
     for(var i=0;i<data.length;i++)
     {
        if(data[i].linkedBB){}else{
        data[i].linkedBB='';
        }

     data[i].flavour?data[i].flavour.name||(data[i].flavour={name:"",sku:""}):data[i].flavour={name:"",sku:""},data[i].boxname?data[i].boxname.name||(data[i].boxname={name:"",sku:""}):data[i].boxname={name:"",sku:""},data[i].packagingType?data[i].packagingType.name||(data[i].packagingType={name:"",sku:""}):data[i].packagingType={name:"",sku:""};
     
     
       if(keys[i].length<=30){
         try{
           values.push([data[i].prod,data[i].descr,data[i].unbrandSKU,data[i].unbranddescr,data[i].premixSKU,data[i].premixdescr,data[i].premixSKUColored,data[i].premixdescrColored,data[i].linkedBB,data[i].brand,data[i].brandSKU,data[i].btype,data[i].botSKU,data[i].fill,data[i].lid,data[i].lidSKU,
           data[i].packagingType.name,data[i].packagingType.sku,data[i].boxname.name,data[i].boxname.sku,data[i].NIB,data[i].flavour.name,data[i].flavour.sku,data[i].recipe.name,data[i].recipe.id,
           data[i].botlabel,data[i].botlabelsku,data[i].ppbotlabel,data[i].ppbotlabelsku,data[i].packlabel,data[i].packlabelsku,data[i].pppacklabel,
           data[i].pppacklabelsku,data[i].barcode,data[i].ecid]);
         }catch(e){Logger.log(data[i]);}
       }
     
     }
     values.unshift(headerRow);
      var sheet=file.insertSheet('PC/PD');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  
     }else if(tabs[j]== 'Packages'){     
            var data=JSONtoARR(base.getData('Packages'));

     var headerRow=['SKU','Name','Bottles Per Pack'];
     var keys=['sku','name','botperPack'];
     var values=[];
     for(var i=0;i<data.length;i++)
     {

      
        try{
        var row=[];
        for(var k=0;k<keys.length;k++){
        row.push(data[i][keys[k]]);
        }
        
         values.push([data[i].sku,data[i].name,data[i].botperPack]);
      }catch(e){Logger.log(data[i]);}
     
     
     }
     values.unshift(headerRow);
      var sheet=file.insertSheet('Packages');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  
     }else if(tabs[j]== 'Recipes'){     
            var data=JSONtoARR(base.getData('Recipes'));

     var headerRow=['ID','Name','VG','AG','PG','Nicotine','Nicotine Salts','CBD','MCT','Flavour','VG Ratio','PG Ratio','Strength','Color','Color SKU','Color %'];
     var keys=['id','name','VGrec','AGrec','PGrec','Nicorec','Nicorecsalts','cbdrec','MCTrecipe','Flavrec','vg','pg','strength','Color.name','Color.sku','Color.val'];
     var values=[];
     for(var i=0;i<data.length;i++)
     {

      
        try{
        var row=[];
        for(var k=0;k<keys.length;k++){
        if(keys[k]=='Color.name'||keys[k]=='Color.sku'||keys[k]=='Color.val'){
         if(data[i].Color){
         var key2=keys[k].split('.');
          var item=data[i].Color[key2[1]];
         }else{
         var item='';
         }
        }else{
        var item=data[i][keys[k]];
        }
        if(!item){
        item=0;
        }
        row.push(item);
        }
        
         values.push(row);
      }catch(e){Logger.log(data[i]);}
     
     
     }
     values.unshift(headerRow);
      var sheet=file.insertSheet('Recipes');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  
     }else if(tabs[j]== 'Boxes'){     
            var data=JSONtoARR(base.getData('Boxes'));
 var headerRow=['SKU','Name','Packs Per Box'];
     var keys=['sku','name','divTubesForBox'];
     var values=[];
     for(var i=0;i<data.length;i++)
     {

      
        try{
        var row=[];
        for(var k=0;k<keys.length;k++){
        row.push(data[i][keys[k]]);
        }
        
         values.push(row);
      }catch(e){Logger.log(data[i]);}
     
     
     }
     values.unshift(headerRow);
      var sheet=file.insertSheet('Boxes');
      sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
  
     }else if (tabs[j] == 'Customers') {
            var data = JSONtoARR(base.getData('Customers'));
            var headerRow = ['ID', 'Name', 'Address'];
            var keys = ['sku', 'name', 'address'];
            var values = [];
            for (var i = 0; i < data.length; i++) {


                try {
                    var row = [];
                    for (var k = 0; k < keys.length; k++) {
                        row.push(data[i][keys[k]]);
                    }

                    values.push(row);
                } catch (e) {
                    Logger.log(data[i]);
                }


            }
            values.unshift(headerRow);
            var sheet = file.insertSheet('Customers');
            sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

       } else if (tabs[j] == 'Flavours') {
            var data = JSONtoARR(base.getData('Flavours'));
            var headerRow = ['SKU', 'Name'];
            var keys = ['sku', 'name'];
            var values = [];
            for (var i = 0; i < data.length; i++) {


                try {
                    var row = [];
                    for (var k = 0; k < keys.length; k++) {
                        row.push(data[i][keys[k]]);
                    }

                    values.push(row);
                } catch (e) {
                    Logger.log(data[i]);
                }


            }
            values.unshift(headerRow);
            var sheet = file.insertSheet('Flavours');
            sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

        }else if (tabs[j] == 'BottleTypes') {
            var data = JSONtoARR(base.getData('BottleTypes'));
            var headerRow = ['SKU', 'Name'];
            var keys = ['sku', 'name'];
            var values = [];
            for (var i = 0; i < data.length; i++) {


                try {
                    var row = [];
                    for (var k = 0; k < keys.length; k++) {
                        row.push(data[i][keys[k]]);
                    }

                    values.push(row);
                } catch (e) {
                    Logger.log(data[i]);
                }


            }
            values.unshift(headerRow);
            var sheet = file.insertSheet('Bottles');
            sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

        }else if (tabs[j] == 'Lids') {
            var data = JSONtoARR(base.getData('Lids'));
            var headerRow = ['SKU', 'Name'];
            var keys = ['sku', 'name'];
            var values = [];
            for (var i = 0; i < data.length; i++) {


                try {
                    var row = [];
                    for (var k = 0; k < keys.length; k++) {
                        row.push(data[i][keys[k]]);
                    }

                    values.push(row);
                } catch (e) {
                    Logger.log(data[i]);
                }


            }
            values.unshift(headerRow);
            var sheet = file.insertSheet('Caps');
            sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

        }else if (tabs[j] == 'Brands') {
            var data = JSONtoARR(base.getData('Brands'));
            var headerRow = ['SKU', 'Name'];
            var keys = ['sku', 'name'];
            var values = [];
            for (var i = 0; i < data.length; i++) {


                try {
                    var row = [];
                    for (var k = 0; k < keys.length; k++) {
                        row.push(data[i][keys[k]]);
                    }

                    values.push(row);
                } catch (e) {
                    Logger.log(data[i]);
                }


            }
            values.unshift(headerRow);
            var sheet = file.insertSheet('Brands');
            sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

        }else if (tabs[j] == 'Labels') {
            var data = JSONtoARR(base.getData('Labels'));
            var headerRow = ['SKU', 'Name'];
            var keys = ['sku', 'name'];
            var values = [];
            for (var i = 0; i < data.length; i++) {


                try {
                    var row = [];
                    for (var k = 0; k < keys.length; k++) {
                        row.push(data[i][keys[k]]);
                    }

                    values.push(row);
                } catch (e) {
                    Logger.log(data[i]);
                }


            }
            values.unshift(headerRow);
            var sheet = file.insertSheet('Labels');
            sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

        }else if (tabs[j] == 'Color') {
            var data = JSONtoARR(base.getData('Color'));
            var headerRow = ['SKU', 'Name'];
            var keys = ['sku', 'name'];
            var values = [];
            for (var i = 0; i < data.length; i++) {


                try {
                    var row = [];
                    for (var k = 0; k < keys.length; k++) {
                        row.push(data[i][keys[k]]);
                    }

                    values.push(row);
                } catch (e) {
                    Logger.log(data[i]);
                }


            }
            values.unshift(headerRow);
            var sheet = file.insertSheet('Color');
            sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

        }else if (tabs[j] == 'FlavourMixes') {
            var data = JSONtoARR(base.getData('FlavourMixes'));
            var headerRow = ['SKU', 'Name', 'Flavour Names', 'Flavour SKUS', 'Flavour Values'];
            var keys = ['sku', 'name','flavournames','flavourskus','flavourvalues'];
            var values = [];
            for (var i = 0; i < data.length; i++) {
            var flavoursARR=JSONtoARR(data[i].flavours);

                try {
                    var row = [];
                    for (var k = 0; k < keys.length; k++) {
                    if(keys[k]=='flavournames'){
                      var flavarr=[];
                      for(var m=0;m<flavoursARR.length;m++){
                        flavarr.push(flavoursARR[m].name);
                      }
                      row.push(flavarr.join(','));   
                    }else if(keys[k]=='flavourskus'){
                         var flavarr=[];
                      for(var m=0;m<flavoursARR.length;m++){
                        flavarr.push(flavoursARR[m].sku);
                      }
                      row.push(flavarr.join(','));   
                    }else if(keys[k]=='flavourvalues'){
                         var flavarr=[];
                      for(var m=0;m<flavoursARR.length;m++){
                        flavarr.push(flavoursARR[m].val);
                      }
                      row.push(flavarr.join(','));   
                    }else{
                        row.push(data[i][keys[k]]);
                    }
                  }
                    values.push(row);
                } catch (e) {
                    Logger.log(data[i]);
                }


            }
            values.unshift(headerRow);
            var sheet = file.insertSheet('FlavourMixes');
            sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

        }



    
   
  }
    var startsheet=file.getSheetByName('Sheet1');
    startsheet.getRange(1, 1).setValue(1);
    
  removeEmptyRows(file);
  removeEmptyColumns(file);
  file.deleteSheet(startsheet);
 var Drivefile=DriveApp.getFileById(file.getId());
  folder.addFile(Drivefile);
  Logger.log(file.getUrl());
  LOGDATA.data.push(['File URL:',file.getUrl()])
  logItem(LOGDATA);
  return 'Spreadsheet created with sheets: '+tabs.toString()+' and URL: '+Drivefile.getUrl();
  
 //  }catch(e){return e.message;}
}

function removeEmptyColumns(ss) {

var allsheets = ss.getSheets();
for (var s=0;s<allsheets.length;s++ ){
var sheet=allsheets[s]
var maxColumns = sheet.getMaxColumns(); 
var lastColumn = sheet.getLastColumn();
if (maxColumns-lastColumn != 0&& lastColumn!=1){
      sheet.deleteColumns(lastColumn+1, maxColumns-lastColumn);
      }
  }
}

//Remove All Empty Rows in the Entire Workbook
function removeEmptyRows(ss) {
        
var allsheets = ss.getSheets();
for (var s=0;s<allsheets.length;s++ ){
var sheet=allsheets[s]
var maxRows = sheet.getMaxRows(); 
var lastRow = sheet.getLastRow();
if (maxRows-lastRow != 0 && lastRow!=1){
      sheet.deleteRows(lastRow+1, maxRows-lastRow);
      }
  }
}


function flatten(array) {
  return array.reduce(function(memo, el) {
    var items = Array.isArray(el) ? flatten(el) : [el];
    return memo.concat(items);
  }, []);
}


function getQTYFull(){
var retArr=[];



var misc=base.getData('Misc');

var marr=[];
 if(misc){
    var result = Object.keys(misc).map(function(key) {
      return [Number(key), misc[key]];
    });
    

    for(var i=0;i<result.length;i++){
  result[i][1].Category='Misc';
      marr.push(result[i][1]);
      
    }

}
for(var i=0;i<marr.length;i++){
if(marr[i].name=='VG'){
    retArr.push(marr[i])
  }

}
for(var i=0;i<marr.length;i++){
if(marr[i].name=='AG'){
    retArr.push(marr[i])
  }

}
for(var i=0;i<marr.length;i++){
if(marr[i].name=='PG'){
    retArr.push(marr[i])
  }

}
for(var i=0;i<marr.length;i++){
if(marr[i].name=='MCT'){
    retArr.push(marr[i])
  }

}
for(var i=0;i<marr.length;i++){
if(marr[i].name=='Nicotine'){
    retArr.push(marr[i])
  }

}
for(var i=0;i<marr.length;i++){
if(marr[i].name=='Nicotine Salts'){
    retArr.push(marr[i])
  }

}
for(var i=0;i<marr.length;i++){
if(marr[i].name=='CBD'){
    retArr.push(marr[i])
  }

}
for(var i=0;i<marr.length;i++){
if(marr[i].name!='VG'&&marr[i].name!='PG'&&marr[i].name!='Nicotine'&&marr[i].name!='Nicotine Salts'&&marr[i].name!='CBD'&&marr[i].name!='MCT'&&marr[i].name!='AG'){
    retArr.push(marr[i])
  }

}

retArr.push('-','-','-','-','-');
var packages=base.getData('Labels');



 if(packages){
    var result = Object.keys(packages).map(function(key) {
      return [Number(key), packages[key]];
    });
    
  
    for(var i=0;i<result.length;i++){
    result[i][1].Category='Labels';
      retArr.push(result[i][1]);
      
    }

}


retArr.push('-','-','-','-','-');
var packages=base.getData('Boxes');



 if(packages){
    var result = Object.keys(packages).map(function(key) {
      return [Number(key), packages[key]];
    });
    
  
    for(var i=0;i<result.length;i++){
        result[i][1].Category='Boxes';
      retArr.push(result[i][1]);
      
    }

}


retArr.push('-','-','-','-','-');
var packages=base.getData('Packages');



 if(packages){
    var result = Object.keys(packages).map(function(key) {
      return [Number(key), packages[key]];
    });
    
  
    for(var i=0;i<result.length;i++){
       result[i][1].Category='Packages';
      retArr.push(result[i][1]);
      
    }

}
retArr.push('-','-','-','-','-');
var packages=base.getData('Color');



 if(packages){
    var result = Object.keys(packages).map(function(key) {
      return [Number(key), packages[key]];
    });
    
  
    for(var i=0;i<result.length;i++){
         result[i][1].Category='Colors';
      retArr.push(result[i][1]);
      
    }

}
retArr.push('-','-','-','-','-');
var flavours=base.getData('Flavours');



 if(flavours){
    var result = Object.keys(flavours).map(function(key) {
      return [Number(key), flavours[key]];
    });
    
   
   for(var i=0;i<result.length;i++){
   result[i][1].Category='Flavours';
   if(result[i][1].Running){
     result[i][1].Running=parseFloat(result[i][1].Running).toFixed(2);
     }
       if(result[i][1].Completed){
     result[i][1].Completed=parseFloat(result[i][1].Completed).toFixed(2);
     }
       if(result[i][1].Reserved){
     result[i][1].Reserved=parseFloat(result[i][1].Reserved).toFixed(2);
     }
     retArr.push(result[i][1]);
     
   }
}

retArr.push('-','-','-','-','-');
var bottletypes=base.getData('BottleTypes');

 if(bottletypes){
    var result = Object.keys(bottletypes).map(function(key) {
      return [Number(key), bottletypes[key]];
    });
    
   
    for(var i=0;i<result.length;i++){
       result[i][1].Category='Bottles';
      retArr.push(result[i][1]);
      
    }

}
retArr.push('-','-','-','-','-');
var lids=base.getData('Lids');
 if(lids){
    var result = Object.keys(lids).map(function(key) {
      return [Number(key), lids[key]];
    });
    
   
    for(var i=0;i<result.length;i++){
       result[i][1].Category='Caps';
      retArr.push(result[i][1]);
      
    }}
retArr.push('-','-','-','-','-');
var premixes=base.getData('PremixesTypes');

 if(premixes){
    var result = Object.keys(premixes).map(function(key) {
      return [Number(key), premixes[key]];
    });
    
 
   for(var i=0;i<result.length;i++){
     result[i][1].Category='Premix Stock';
   if(result[i][1].Running){
     result[i][1].Running=parseFloat(result[i][1].Running).toFixed(2);
     }
       if(result[i][1].Completed){
     result[i][1].Completed=parseFloat(result[i][1].Completed).toFixed(2);
     }
       if(result[i][1].Reserved){
     result[i][1].Reserved=parseFloat(result[i][1].Reserved).toFixed(2);
     }
     retArr.push(result[i][1]);
     
   }
}

retArr.push('-','-','-','-','-');
var unbranded=base.getData('UnbrandedTypes'); 
 if(unbranded){
    var result = Object.keys(unbranded).map(function(key) {
      return [Number(key), unbranded[key]];
    });
    

    for(var i=0;i<result.length;i++){
    result[i][1].Category='Unbranded Stock';
      retArr.push(result[i][1]);
      
    }
  }


retArr.push('-','-','-','-','-');
var brands=base.getData('BrandedTypes'); 

 if(brands){
    var result = Object.keys(brands).map(function(key) {
      return [Number(key), brands[key]];
    });
    
 
    for(var i=0;i<result.length;i++){
        result[i][1].Category='Branded Stock';
      retArr.push(result[i][1]);
      
    }
}








return retArr;



}
    function formatDateDisplay2(datems){
    try{
    if(datems&&datems!=""){
    var num = parseInt(datems,10);
    if(num<5000){
     var now=new Date(datems);
    }else{
    var now=new Date(num);
    }
    var now1 = now.toISOString().replace('T',' ').replace('Z','').split('.');
  
    var now2=now1[0].split(' ');
    
    var now3=now2[0].split('-');
    var now4=now3[2]+'-'+now3[1]+'-'+now3[0]+' '+now2[1];
    
    return now4;

    }else{
    return '';
    }
    }catch(e){
    console.log('Unable to format date: ',datems);
    return '';
    }
    }
  
    
      function formatDateDisplay(datems){
     try{
     if(datems&&datems!=""){
      var now=new Date(datems);
      
      
      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);
      
      var today = (day)+"-"+(month)+"-"+now.getFullYear() ;
     
      return today;
      }else{
       return '';
      }
      }catch(e){
      console.log('Unable to format date: ',datems);
      return '';
      }
    }
    function formatDateInput(datems){
    try{
    var now=new Date(datems);
    
    
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
      return today;
      }catch(e){
      console.log('Unable to format date: ',datems);
      var now=new Date();
      
      
      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);
      
      var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
      return today;
      
      }
    }
    
function createFillArr(l){
var arr = [];
for(var i =0;i<l;i++){
arr.push('');
}
return arr;
}
function createCompletedExport(H,name){
  var folder=DriveApp.getFolderById(COMPLETED_ITEMS_FOLDER);
  var create=DriveApp.getFileById(COMPLETED_FILE_ID).makeCopy(name,folder);
  var SS=SpreadsheetApp.openById(create.getId());
  
  var range = [];
  if(H == 14){
    range = [1,14];
  }else{
    range = [14,20];
  }
  
  var d2=new Date().setHours(0,0,0,0)-(60*60*1000*24);
  
  
  var sheets=['Orders','MixingTeam','Production','Printing','Labelling','Packaging','Shipping'];
  var keys=[['orderdate','runtime','machineP','machineL','batch','orderID','productcode','productdescription','priority','customer','brand','recipe.name','flavour.name','bottles',
                'stocking','btype','lid','packagingType.name','QTY','flavvalue','VGval','AGval','PGval','Nico','Nicosalts','CBDvalue','MCTval','mixing','premixed',
                'unbranded','branded','backtubed','mixing_status','production_status','printing_status','labeling_status','packaging_status','final_status','CompletionDate','partialProduction','partialPackaging','TOTAL BOTTLES'],
            ['QTYTOTAL','VGval','AGval','PGval','Nico','Nicosalts','CBDvalue','MCTval','flavvalue','Notes','Location','starttime','CompletionDate','vgSupplier','pgSupplier','nicSupplier','flavSupplier','TOTAL LITRES'],
            ['mixing_status','orderdate','batch','orderID','productcode','productdescription','mixbatch','priority','customer','brand',
             'recipe.name','flavour.name','bottles','btype','lid','packagingType.name','starttime','CompletionDate','Completed','Location','machineP','TOTAL BOTTLES'],
            ['production_status','orderdate','batch','numLabelsBottles','numLabelsTubes','expDate','orderID','productcode','productdescription','priority','customer','brand','recipe.name',
             'flavour.name','bottles','btype','lid','packagingType.name','botlabel','boxname.name','starttime','CompletionDate','Completed','Location','TOTAL BOTTLES'],
            ['production_status','orderdate','batch','orderID','productcode','productdescription','priority','customer','brand','recipe.name','flavour.name','bottles',
             'btype','lid','packagingType.name','starttime','CompletionDate','Completed','Location','machineL','TOTAL BOTTLES'],
            ['production_status','printing_status','orderdate','batch','orderID','productcode','productdescription','PRINTCODE','priority','customer',
             'brand','recipe.name','flavour.name','bottles','btype','lid','packagingType.name','starttime','CompletionDate','Completed','Location','TOTAL BOTTLES'],
            ['orderdate','batch','orderID','productcode','productdescription','priority','PRINTCODE','customer','brand','recipe.name','flavour.name','bottles','btype','lid','packagingType.name','final_status','shipping_status','SHIPPINGCODE',
        'dateshipped','trackingNo','datedelivered', 'Location','TOTAL BOTTLES']];
  
  
  var headers=[['Order Date','Started','Production Machine','Labelling Machine', 'Batch','OrderID','Product Code','Product Description', 'Priority', 'Customer', 'Brand', 'Recipe', 'Flavour', 'Bottles',
              'Stocking Amount (litre)', 'Bottle Type', 'Lid Type', 'Packaging Tube',
             'QTY', 'Flavour Value', 'VG Value', 'AG Value', 'PG Value', 'Nicotine Value', 'Nicotine Salts Value', 'CBD Value', 'MCT Value', 'Backed by Mixing',
             'Backed by Premixed', 'Backed by Unbranded', 'Backed by Branded', 'Backed By Branded Packaged', 'Mixing Status',
             'Production Status', 'Printing Status', 'Labelling Status', 'Packaging Status', 'FINAL STATUS','Completed','Partial Production','Partial Packaging','TOTAL BOTTLES','FILL LEVEL'],
               ['Completed','Priority','Date of Production','Batch','Customers','Order IDs','Mix Batch','Recipe','Flavour','Order Date','QTY(Litres)','VG (MG)','AG (MG)',
                'PG (MG)','Nicotine (MG)','Nicotine Salts (MG)','CBD (MG)','MCT (MG)','Flavour (MG)','Notes - Mixing Dept','Location','Start Date','Completion Date','VG supplier batch',
                'PG supplier batch','Nicotine supplier batch','Flavour supplier batch','TOTAL LITRES','COMPLETED FLAVOUR'],
               ['Mixing Completed','Order Date','Batch','OrderID','Product Code','Product Description','Mix Batch code','Priority','Customer','Brand','Recipe','Flavour','Bottles',
                'Bottle Type','Cap Type','Packaging Tube','Start Date','Completion Date','Production Completed','Location','Machine','TOTAL BOTTLES','FILL LEVEL'],
               ['Production Status','Order Date','Batch','Bottle Labels QTY','Cylinder Labels QTY','Exp. Date','OrderID','Product Code','Product Description','Priority','Customer','Brand','Recipe','Flavour','Bottles',
                'Bottle Type','Cap Type','Packaging Tube','Label','Outer Box','Start Date','Completion Date','Production Completed','Location','TOTAL BOTTLES','FILL LEVEL'],
               ['Production Status','Order Date','Batch','OrderID','Product Code','ProductDescription','Priority','Customer','Brand','Recipe','Flavour','Bottles',
                'Bottle Type','Cap Type','Packaging Tube','Start Date','Completion Date','Production Completed','Location','Machine','TOTAL BOTTLES','FILL LEVEL'],
               ['Production Status','Printing Status','Order Date','Batch','OrderID','Product Code','ProductDescription','Packaging Code','Priority','Customer',
                'Brand','Recipe','Flavour','Bottles','Bottle Type','Cap Type','Packaging Tube','Start Date','Completion Date','Packaging Completed','Location','TOTAL BOTTLES','FILL LEVEL'],
               ['Order Date','Batch','Order ID','Product Code','ProductDescription','Priority','Packaging Code','Customer','Brand','Recipe','Flavour','Bottles','Bottle Type','Lid Type',
               'Packaging Tube','Status','Shipping Status','Shipping Code','Date Shipped','Tracking No.','Date Delivered','Location','TOTAL BOTTLES','FILL LEVEL']];
 
var TOTALS_FINAL = [[],[],[],[],[],[],[]];
for(var s =0;s<sheets.length;s++){
     var params = {
        orderBy: ['final_status'],
        equalTo: "Completed",

    }
    var params={};
    switch (sheets[s]){
      case 'Shipping':
        params = {
          orderBy: ['shipping_status'],
          equalTo: "Shipped",
          
        }
        break;
      case 'Production':
        params = {
          orderBy: ['final_status'],
          equalTo: "Completed",
          
        }
        var machines = base.getData('Machines');
        break;
      case 'Orders':
        params = {
          orderBy: ['final_status'],
          equalTo: "Completed",
          
        }
         var machines = base.getData('Machines');
        break;
      default:
        params = {
          orderBy: ['final_status'],
          equalTo: "Completed",
          
        }
        break;
    }
     var list=searchFor([[sheets[s], params]])[1];
       var data =[];
       for(var i =0;i<list.length;i++){
         
           var t2=new Date(list[i].CompletionDate).getHours()>=range[0];
           var t3=new Date(list[i].CompletionDate).getHours()<range[1];
           
      
         
         var d1=new Date(list[i].CompletionDate).getTime();
           var t1=(d1>d2);

       
         if(t1 && t2 && t3){
         data.push(list[i]);
         }
       }

     var values=[];
    values.push(headers[s]);
    values.push(createFillArr(headers[s].length));

    switch (sheets[s]){
      case 'MixingTeam':
        data = data.sort(sortSTRINGHL('FLAVOUR'));
        break;
      default:
        data = data.filter(function(item){ if(item.fill){return item}}).sort(sortNUMHL('fill'));
        break;
    }
     
     var totals=[0,0,0,0,0,0];
     var sideTotal = 0;
     var separator='';
     for(var i =0;i<data.length;i++){
      var row = [];
         switch (sheets[s]){
           case 'MixingTeam':
             if(i==0){
               separator=data[i].FLAVOUR;
               sideTotal+=data[i].QTYTOTAL ? data[i].QTYTOTAL : 0;
             }else if(separator==data[i].FLAVOUR){
               sideTotal+=data[i].QTYTOTAL ? data[i].QTYTOTAL : 0;
           
             }else{
               TOTALS_FINAL[s].push([sideTotal,separator]);
               values[values.length-1][values[0].length-2]=sideTotal;
               values[values.length-1][values[0].length-1]=separator;
               if(i != data[i].length-1){
               separator=data[i].FLAVOUR;
               data.splice(i, 0, {});
               sideTotal=0
               }
             }
             
              
             var batches=[];
             var orderDates=[];
             var priorities=[];
             var mixARR=[];
             var customers=[];
             var orderIDs=[];
             var result = data[i].Batches? Object.keys(data[i].Batches).map(function(key) {return [Number(key), data[i].Batches[key]]; }) : [];
             
             for(var r=0;r<result.length;r++){
               mixARR.push(result[r][1]);
               
             }
             
             for(var m=0;m<mixARR.length;m++){
               try{
                 batches.push(mixARR[m].batch);
                 orderDates.push(formatDateDisplay(mixARR[m].orderdate));
                 priorities.push(mixARR[m].priority);
                 customers.push(mixARR[m].customer);
                 orderIDs.push(mixARR[m].orderID);
               }catch(e){console.log('failed to push');}
             }
             
             
             data[i].flavvalue=data[i].flavvalue ? data[i].flavvalue: ' ';
             data[i].VGval=data[i].VGval ? data[i].VGval: ' ';
             data[i].AGval=data[i].AGval ? data[i].AGval: ' ';
             data[i].PGval=data[i].PGval ? data[i].PGval: ' ';
             data[i].Nico=data[i].Nico ? data[i].Nico: ' ';
             data[i].Nicosalts=data[i].Nicosalts ? data[i].Nicosalts: ' ';
             data[i].CBDvalue=data[i].CBDvalue ? data[i].CBDvalue: ' ';
             data[i].MCTval=data[i].MCTval ? data[i].MCTval: ' ';
             row.push(data[i].Completed);
             row.push(priorities.join());
             row.push(formatDateDisplay2(data[i].prodDate));
             row.push(batches.join());
             row.push(customers.join());
             row.push(orderIDs.join());
             row.push(data[i].MIXNAME);
             row.push(data[i].RECIPE);
             row.push(data[i].FLAVOUR);
             row.push(orderDates.join());
             for(var k =0;k<keys[s].length;k++){
               var cell= data[i][keys[s][k]]? data[i][keys[s][k]]:'';
               if(keys[s][k]=='starttime'||keys[s][k]=='CompletionDate'){
               row.push(formatDateDisplay2(cell));
               }else if(keys[s][k]=='TOTAL LITRES'){
                 totals[0]+=data[i].QTYTOTAL ? data[i].QTYTOTAL : 0;
                 row.push(cell);
                 row.push(cell);
               }else{
                 if(keys[s][k].indexOf('.')>=0){
                     row.push(getPropByString(data[i], keys[s][k]));
                 }else{
                   row.push(cell);
                 }
               }
             }
             
          
             break;
           case 'Production':
            if(i==0){
               separator=data[i].fill;
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else if(separator==data[i].fill){
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else{
              TOTALS_FINAL[s].push([sideTotal,separator+'ML']);
               values[values.length-1][values[0].length-2]=sideTotal;
               values[values.length-1][values[0].length-1]=separator+'ML';
               if(i != data[i].length-1){
              separator=data[i].fill;
               data.splice(i, 0, {});
               sideTotal=0
              }
              
             }
             
              
              for(var k =0;k<keys[s].length;k++){
               var cell= data[i][keys[s][k]]? data[i][keys[s][k]]:'';
               if(keys[s][k]=='starttime'||keys[s][k]=='CompletionDate'){
               row.push(formatDateDisplay2(cell));
               }else if(keys[s][k]=='orderdate'){
               row.push(formatDateDisplay(cell));
               }else if(keys[s][k]=='TOTAL BOTTLES'){
                 totals[0]+=data[i].bottles ? data[i].bottles : 0;
                  row.push(cell);
                  row.push(cell);
               }else if(keys[s][k]=='machineP'){
               if(cell){
                row.push(machines[cell].name);
                }else{
                 row.push(cell);
                }
               }else{
                if(keys[s][k].indexOf('.')>=0){
                     row.push(getPropByString(data[i], keys[s][k]));
                 }else{
                   row.push(cell);
                 }
               }
             }
             break;
           case 'Printing':
           if(i==0){
               separator=data[i].fill;
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else if(separator==data[i].fill){
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else{
             TOTALS_FINAL[s].push([sideTotal,separator+'ML']);
                values[values.length-1][values[0].length-2]=sideTotal;
               values[values.length-1][values[0].length-1]=separator+'ML';
               if(i != data[i].length-1){
              separator=data[i].fill;
               data.splice(i, 0, {});
               sideTotal=0
             }
             
             }
             
              
              for(var k =0;k<keys[s].length;k++){
               var cell= data[i][keys[s][k]]? data[i][keys[s][k]]:'';
               if(keys[s][k]=='starttime'||keys[s][k]=='CompletionDate'){
               row.push(formatDateDisplay2(cell));
               }else if(keys[s][k]=='orderdate'){
               row.push(formatDateDisplay(cell));
               }else if(keys[s][k]=='TOTAL BOTTLES'){
                 totals[0]+=data[i].bottles ? data[i].bottles : 0;
                  row.push(cell);
                  row.push(cell);
               }else{
                if(keys[s][k].match('.')){
                     row.push(getPropByString(data[i], keys[s][k]));
                 }else{
                   row.push(cell);
                 }
               }
             }
             break;
           case 'Labelling':
           if(i==0){
               separator=data[i].fill;
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else if(separator==data[i].fill){
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else{
             TOTALS_FINAL[s].push([sideTotal,separator+'ML']);
               values[values.length-1][values[0].length-2]=sideTotal;
               values[values.length-1][values[0].length-1]=separator+'ML';
                if(i != data[i].length-1){
               separator=data[i].fill;
               data.splice(i, 0, {});
               sideTotal=0
              }
               
             }
           
             for(var k =0;k<keys[s].length;k++){
               var cell= data[i][keys[s][k]]? data[i][keys[s][k]]:'';
               if(keys[s][k]=='starttime'||keys[s][k]=='CompletionDate'){
               row.push(formatDateDisplay2(cell));
               }else if(keys[s][k]=='orderdate'){
               row.push(formatDateDisplay(cell));
               }else if(keys[s][k]=='TOTAL BOTTLES'){
                 totals[0]+=data[i].bottles ? data[i].bottles : 0;
                  row.push(cell);
                  row.push(cell);
               }else{
               if(keys[s][k].indexOf('.')>=0){
                     row.push(getPropByString(data[i], keys[s][k]));
                 }else{
                   row.push(cell);
                 }
               }
             }
             break;
           case 'Packaging':
           if(i==0){
               separator=data[i].fill;
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else if(separator==data[i].fill){
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else{
             TOTALS_FINAL[s].push([sideTotal,separator+'ML']);
                values[values.length-1][values[0].length-2]=sideTotal;
               values[values.length-1][values[0].length-1]=separator+'ML';
               if(i != data[i].length-1){
                 separator=data[i].fill;
                 data.splice(i, 0, {});
                 sideTotal=0
               }
             }
              
               for(var k =0;k<keys[s].length;k++){
               var cell= data[i][keys[s][k]]? data[i][keys[s][k]]:'';
               if(keys[s][k]=='starttime'||keys[s][k]=='CompletionDate'){
               row.push(formatDateDisplay2(cell));
               }else if(keys[s][k]=='orderdate'){
               row.push(formatDateDisplay(cell));
               }else if(keys[s][k]=='TOTAL BOTTLES'){
                 totals[0]+=data[i].bottles ? data[i].bottles : 0;
                  row.push(cell);
                  row.push(cell);
               }else{
               if(keys[s][k].indexOf('.')>=0){
                     row.push(getPropByString(data[i], keys[s][k]));
                 }else{
                   row.push(cell);
                 }
               }
             }
             break;
             case 'Orders':
             if(i==0){
               separator=data[i].fill;
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else if(separator==data[i].fill){
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else{
             TOTALS_FINAL[s].push([sideTotal,separator+'ML']);
                values[values.length-1][values[0].length-2]=sideTotal;
               values[values.length-1][values[0].length-1]=separator+'ML';
              if(i != data[i].length-1){
                 separator=data[i].fill;
                 data.splice(i, 0, {});
                 sideTotal=0
               }
              
             }
          
              for(var k =0;k<keys[s].length;k++){
               var cell= data[i][keys[s][k]]? data[i][keys[s][k]]:'';
               if(keys[s][k]=='starttime'||keys[s][k]=='CompletionDate'||keys[s][k]=='runtime'){
               row.push(formatDateDisplay2(cell));
               }else if(keys[s][k]=='orderdate'){
               row.push(formatDateDisplay(cell));
               }else if(keys[s][k]=='TOTAL BOTTLES'){
                 totals[0]+=data[i].bottles ? data[i].bottles : 0;
                 totals[1]+=data[i].QTY ? data[i].QTY : 0;
                  row.push(cell);
                  row.push(cell);
               }else if(keys[s][k]=='machineP'){
               if(cell){
                row.push(machines[cell].name);
                }else{
                 row.push(cell);
                }
               }else{
                if(keys[s][k].indexOf('.')>=0){
                     row.push(getPropByString(data[i], keys[s][k]));
                 }else{
                   row.push(cell);
                 }
               }
             }
             break;
             case 'Shipping':
             if(i==0){
               separator=data[i].fill;
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else if(separator==data[i].fill){
               sideTotal+=data[i].bottles ? data[i].bottles : 0;
             }else{
             TOTALS_FINAL[s].push([sideTotal,separator+'ML']);
               values[values.length-1][values[0].length-2]=sideTotal;
               values[values.length-1][values[0].length-1]=separator+'ML';
              if(i != data[i].length-1){
                 separator=data[i].fill;
                 data.splice(i, 0, {});
                 sideTotal=0
               }
              
             }
             
           
               for(var k =0;k<keys[s].length;k++){
               var cell= data[i][keys[s][k]]? data[i][keys[s][k]]:'';
               if(keys[s][k]=='starttime'||keys[s][k]=='CompletionDate'){
               row.push(formatDateDisplay2(cell));
               }else if(keys[s][k]=='orderdate'){
               row.push(formatDateDisplay(cell));
               }else if(keys[s][k]=='TOTAL BOTTLES'){
                 totals[0]+=data[i].bottles ? data[i].bottles : 0;
                  row.push(cell);
                  row.push(cell);
               }else{
               if(keys[s][k].indexOf('.')>=0){
                     row.push(getPropByString(data[i], keys[s][k]));
                 }else{
                   row.push(cell);
                 }
               }
             }
             break;
           default:
             break;
         }
       if(i == data.length-1){
         if(sheets[s]=='MixingTeam'){
         TOTALS_FINAL[s].push([sideTotal,separator]);
         row[row.length-2]=sideTotal;
         row[row.length-1]=separator;
         }else{
         TOTALS_FINAL[s].push([sideTotal,separator+'ML']);
         row[row.length-2]=sideTotal;
         row[row.length-1]=separator+'ML';
         }
       }
     values.push(row);
       }
      switch (sheets[s]){
        case 'Orders':  
          values[1][13]=totals[0];
          values[1][18]=totals[1];
          break;
        case 'MixingTeam':
           values[1][10]=totals[0];
          break;
        case 'Production':
            values[1][12]=totals[0];
          break;
        case 'Printing':
            values[1][14]=totals[0];
          break;
        case 'Labelling':
           values[1][11]=totals[0];
          break;
        case 'Packaging':
           values[1][13]=totals[0];
          break;
        case 'Shipping':
            values[1][11]=totals[0];
          break;
        default:
          values[1][values[1].length-1]=totals[0];
          break;
      }

       SS.getSheets()[s+1].getRange(2, 1, values.length, values[0].length).setValues(values)
    }
    
  var sumArr=[];
  var max = 0;
  for(var i=0;i<TOTALS_FINAL.length;i++){
    if(TOTALS_FINAL[i].length>max){
    max=TOTALS_FINAL[i].length;
    }
  }
  for(var m=0;m<max;m++){
    var row=[];
    for(var i=0;i<TOTALS_FINAL.length;i++){
    var it1=TOTALS_FINAL[i][m] ? (TOTALS_FINAL[i][m][0] ? TOTALS_FINAL[i][m][0] : '' ): '';
     var it2=TOTALS_FINAL[i][m] ? (TOTALS_FINAL[i][m][1] ? TOTALS_FINAL[i][m][1] : '' ): '';
      row.push(it1);
      row.push(it2);
     }
     sumArr.push(row);
  }
  if(max>0){
  SS.getSheets()[0].getRange(4, 1, max, 14).setValues(sumArr);
  }
 return SS;
  
}    


function getPropByString(obj, propString) {
    if (!propString)
        return obj;

    var prop, props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];

        var candidate = obj[prop];
        if (candidate !== undefined) {
            obj = candidate;
        } else {
            break;
        }
    }
    return obj[props[i]] ? obj[props[i]] : '' ;
}