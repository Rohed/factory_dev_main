function trydateformat(){
var dat='22/12/2017';

var f1=dat.replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");
var d1=new Date(f1);
d1=Utilities.formatDate(new Date(f1), "GMT", "dd-MM-yyyy");
var f2=dat.replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");
var d2=new Date(f2);
d2=Utilities.formatDate(new Date(f2), "GMT", "dd-MM-yyyy");
var f3=dat.replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1");
var d3=new Date(f3);
d3=Utilities.formatDate(new Date(f3), "GMT", "dd-MM-yyyy");
}

function getLargestBatch(orders){

   var largestBatch=base.getData('highestBatch'); 
  
  var batches=orders.map(function(obj) { 
    var ret;
    ret= obj.batch;
    return ret;
  });
  batches=batches.sort();
  var largest= parseInt(batches[batches.length-1],10);
  if(largestBatch){
    if(largestBatch>largest){
      return largestBatch;
    }else{
       return largest;
    }
  
  }else{
   return largest;
  }
}

function saveOrder2(data,row) {



    data.partialProduction = 0;
    data.partialPackaging = 0;
    data.saved = true;
    data.unbranded = 0;
    data.branded = 0;
    data.premixed = 0;
    data.mixing = 0;
    data.backtubed = 0;
    data.mixing_status = 0;
    data.production_status = 0;
    data.printing_status = 0;
    data.labeling_status = 0;
    data.packaging_status = 0;
    data.final_status = 0;
    data.row = row;
    data.userset = false;
    var suffix = data.batch.toString().substr(-1);
    var suf2 = data.batch.substr(-2);
    var QTY = calcQTY(data.stocking, data.bottles, data.fill, suffix, data.customer, suf2);
    
    data.orderdate=(new Date()).getTime();
    
    var RECIPE=getRecipe(data.recipe.id);
    
    var flavrecipe =RECIPE.Flavrec;
    var flavvalue = calcFlav(flavrecipe, QTY * 1000);
    flavvalue = flavvalue / 1000;
    
    var VGrecipe = RECIPE.VGrec;
    var VGvalue = calcVG(VGrecipe, QTY * 1000);
    
      
    var AGrecipe = RECIPE.AGrec;
    var AGvalue = calcPG(AGrecipe, QTY * 1000);
    
    var PGrecipe = RECIPE.PGrec;
    var PGvalue = calcPG(PGrecipe, QTY * 1000);
    
    var MCTrecipe = RECIPE.MCTrecipe;
    var MCTval = calcPG(MCTrecipe, QTY * 1000);
    
    var Nicotrecipe = RECIPE.Nicorec;
    var Nicotvalue = calcPG(Nicotrecipe, QTY * 1000);
    data.Nicotrecipe = Nicotvalue;
    data.Nico = Nicotrecipe;
    
    var Nicotrecipesalts = RECIPE.Nicorecsalts;
    var Nicotvaluesalts = calcPG(Nicotrecipesalts, QTY * 1000);
    data.Nicotrecipesalts = Nicotvaluesalts;
    data.Nicosalts = Nicotrecipesalts;
    
    var CBDrecipe = RECIPE.cbdrec;
    var CBDvalue = calcPG(CBDrecipe, QTY * 1000);
    data.CBDrecipe = CBDvalue;
    data.CBDvalue = CBDrecipe;
    
  if(RECIPE.Color){
    var Color = RECIPE.Color;
    var colorvalue=(QTY*10*Color.val);
    data.colorval=colorvalue;
  }
  
    
    var bsize = parseInt(data.btype.replace(/\D/g, ''), 10);
    
    data.flavrecipe = flavvalue;
    data.VGrecipe = VGvalue;
    data.AGrecipe = AGvalue;
    data.PGrecipe = PGvalue;
    data.MCTrecipe=MCTrecipe;
    
    data.QTY = QTY;
    data.flavvalue = flavrecipe;
    data.VGval = VGrecipe;
    data.AGval = AGrecipe;
    data.PGval = PGrecipe;
    data.MCTval=MCTval;
    data.bsize = bsize;

    var rett = JSON.stringify(data);
    return rett;



}

function saveFileCsv(data, name) {
 var LOGDATA={
    status:true,
    msg:'',
    action:'Import CSV',
    batch:name,
    page:'CSV',
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
  

    try {
      var msg = '';
  
 
      var contentType = data.substring(5, data.indexOf(','));
      var fileBlob = Utilities.newBlob(Utilities.base64Decode(data.substr(data.indexOf('base64,') + 7)), contentType, name);
      
      var values = [];
      
      var rows = fileBlob.getDataAsString().replace(/\t/g,'');
         
      values=Utilities.parseCsv(rows);
      
//     SpreadsheetApp.openById('10lo4vLIJONltnwO_n1Va5ixkIE7_Z4Y-7DEZRE5_8xc').getSheets()[0].getRange(1, 1, values.length, values[0].length).clear().setValues(values);
//     return '';
//     var values =SpreadsheetApp.openById('10lo4vLIJONltnwO_n1Va5ixkIE7_Z4Y-7DEZRE5_8xc').getSheets()[0].getDataRange().getValues();
     
      if (values.length < 2) {
        
        msg +="Failed to read file.";
        
        
      } 
  
      var fileBlob='';
      data='';
      var rows='';
//var values = SpreadsheetApp.openById('1xvW_vuMnkI5OvPdeZ0GVZKLIAv95_OxoXfCBm1ER3lY').getSheets()[0].getDataRange().getValues();
        

        var options = '{';
      //  var allPC=base.getData("References/ProductCodes");
    var allPC='';
          var rawOrders=base.getData('Orders');

      var orders=JSONtoARR(rawOrders);
          var largestBatch=getLargestBatch(orders); 
   
      //var orderID=getNewOrderID2(orders);
     var ordersByOrderID=orders.sort(sortOrderIDsHL)
      if(ordersByOrderID.length>=1){
        var LastorderID=ordersByOrderID[0].orderID;
        if(LastorderID){
          var num=(parseInt(LastorderID.substr(4,LastorderID.length),10)+1);
        }else{
          for(var i=ordersByOrderID.length-2;i>0;i--){
            var LastorderID=ordersByOrderID[i].orderID;
            if(LastorderID){
              var cutString=LastorderID.substr(4,LastorderID.length);
              var num=(parseInt(cutString,10)+1);
              if(num>=10100){
                break;
              }
            }
          }
        }
      }else{
        var num= 'INV-00010100';
      }
      if(num<10100){
        num='00010100';
      }else{
        var zeros=8-num.toString().length;
        for(var i=0;i<zeros;i++){
          num='0'+num;
        }
      }
      var orderID= 'INV-'+num;
ordersByOrderID = {};

      var newPRIORITIES=[];
      

        for (var i = 1; i < values.length; i++) {
            try {
           if(!values[i][0]){
            var num=(parseInt(orderID.substr(4,orderID.length),10)+1);
             if(num<10100){
               num='00010100';
             }else{
               var zeros=8-num.toString().length;
               for(var z=0;z<zeros;z++){
                 num='0'+num;
               }
             }
             orderID ='INV-'+num;
           continue;
           }
                Logger.log(values[i]);
                Logger.log('------');
                Logger.log('------');
                Logger.log(values[i][0]);
                                Logger.log(values[i][0]);

                var PC = values[i][0];
                var dataPC = base.getData("References/ProductCodes/"+PC);
                                Logger.log(dataPC);

                if (dataPC) {
                
                   var item = {
                           boxname:dataPC.boxname,

                           fill:dataPC.fill,
                            orderdate: '',
                        //    batch: values[i][0],
                            priority: '',
                            customer: values[i][2],
                              customerSKU: values[i][3],
                            brand: dataPC.brand,
                            brandSKU: dataPC.brandSKU,
                            flavour: dataPC.flavour,
                            recipe: dataPC.recipe,
                            bottles: parseInt(values[i][1],10),
                            stocking: 0,
                            btype: dataPC.btype,
                            lid: dataPC.lid,
                            botSKU: dataPC.botSKU,
                            lidSKU: dataPC.lidSKU,
                            packaging: dataPC.packaging,
                            packagingType: dataPC.packagingType,
                            orderID: orderID,
                            productcode: dataPC.prod,
                            productdescription: dataPC.descr,

                        };
                        if(values[i][5]){
                        values[i][5] = values[i][5].toLowerCase();
                        }
                          if(values[i][6]){
                        values[i][6] = values[i][6].toLowerCase();
                        }
                            if(values[i][5]=='y'){
                            item.ppb=true;
                              item.botlabel = dataPC.ppbotlabel;
                              item.botlabelsku = dataPC.ppbotlabelsku;
                            }else{
                                item.ppb=false;
                              item.botlabel = dataPC.botlabel;
                              item.botlabelsku = dataPC.botlabelsku;
                            }
                            if(values[i][6]=='y'){
                                item.ppp=true;
                              item.packlabel = dataPC.pppacklabel;
                              item.packlabelsku = dataPC.pppacklabelsku;
                            }else{
                                item.ppp=false;
                              item.packlabel = dataPC.packlabel;
                              item.packlabelsku = dataPC.packlabelsku;
                            }
                        } else {
                          LOGDATA.data.push(['Missing PC',PC]);
                        msg += 'Unable to SAVE ' +PC+ ' On line: ' + i + '. Reason: Missing <br>';
                       // msg += 'DATA: ' + item.ratio + '<br>'; 
                        continue;
                    }
                   /* if (item.customer == 'Great British Vape Canada') {
                        if (btype == "100ml Bottle A" || btype == "60ml Bottle A" || btype == "120ml Bottle A") {
                            item.btype = btype.replace(/\D/g, '') + 'ml Bottle A fill';
                        }
                    }
                    */
                    if (item.recipe.name) {
                      if (orders) {
                
                        if(i==1){
                        var ordersL = orders.length;
                        var row = orders.length + 1;
                          var lastbatch=orders[orders.length-1].batch;
                          var inint=parseInt(lastbatch,10);
                          item.batch = (parseInt(orders[orders.length-1].batch,10)+1).toString();
                          var batch = checkBatchExists(rawOrders, item.batch,ordersL, largestBatch);
                          item.batch=batch;
                          orders=true;
                        }else{
                          row++;
                        ordersL++;
                          batch=parseInt(batch,10);
                          batch++;
                          item.batch=(batch).toString()
                          
                        }
                      } else {
                        var ordersL = 1;
                        var row = 1;
                        
                        item.batch='911000';
                      }
                      if(i==values.length-1){
                        base.updateData('',{'highestBatch':parseInt(batch,10)});
                      }  
                        var resp = saveOrder2(item,row);
                        LOGDATA.data.push(['Added Batch',item.batch +'With Order ID: '+orderID ]);
                        options += '"' + item.batch + '":' + resp + ',';
                    } else {
                        //   Logger.log(item);
                      LOGDATA.data.push(['Failed Batch',PC]);
                        msg += 'Unable to SAVE ' + PC + ' On line: ' + i + '<br>';
                      
                    }
                    // msg+=resp+' on Row '+i+'\n';
                 

            } catch (e) {
            LOGDATA.status=false;
            LOGDATA.data.push(['Failed to upload:',PC]);
             LOGDATA.data.push(['Failed: ',e.toString()]); 
                Logger.log(e.toString());
                Logger.log(item);
                //   break;

                //     Logger.log('why');
                //      Logger.log(e.message);
                msg += e.toString() + '<br>';
                msg += 'Unable to Process ' + PC+ ' On line: ' + i + '<br>';
            }
             newPRIORITIES.push([values[i][4],'',true,orderID]);
        }

        options += '}';
        // Logger.log(options);
      try {
        var dat1 = JSON.parse(options);
        base.updateData('Orders', dat1);
      } catch (e) {
        LOGDATA.status=false;
        
        LOGDATA.data.push(['Failed: ',e.toString()]); 
        msg += 'Failed Upload <br>' + options;
      }
      logItem(LOGDATA);
      allPC='';
      
      rawOrders='';
      
      orders='';
      largestBatch='';
      
      orderID='';
      dat1='';
       newPRIORITIES = uniq3(newPRIORITIES);
       setPriorityARR(newPRIORITIES);
      return msg+' '+i;
    } catch (e) {
     LOGDATA.data.push(['Failed: ',e.toString()]); 
      logItem(LOGDATA);
      return msg+' '+i;
    }
}


function uniq3(a) {
    var prims = {
            "boolean": {},
            "number": {},
            "string": {}
        },
        objs = [];

    return a.filter(function(item) {
        var type = typeof item[3];
        if (type in prims)
            return prims[type].hasOwnProperty(item[3]) ? false : (prims[type][item[3]] = true);
        else
            return objs.getIndex2(item[3]) >= 0 ? false : objs.push(item);
    });
}