function saveOrder(data,edit) {
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'New Order',
        batch: data.batch,
        page: 'Orders',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };

    //Logger.log(data);
    //base.updateData('RAWDATA/'+data.batch,data);
    //data=base.getData('RAWDATA/'+7114);
    try {
 
        if (data.batch == '') {
            LOGDATA.status = false;
            LOGDATA.data.push(['FAILED:', 'NO BATCH NUMBER']);

            logItem(LOGDATA);
            return 'NO BATCH NUMBER'
        }else{
           if(!edit){
            var exists=base.getData("Orders/"+data.batch);
        if(exists){return 'BATCH '+data.batch+' is already in the system.';}
        }
        }
        var orders = getOrdersData();
        if (orders) {

            var row = orders.length + 1;
        } else {
            var row = 1;
        }
        var prod = base.getData('References/ProductCodes/' + data.productcode);
        data.fill = prod.fill;
        data.boxname = prod.boxname;
      if(data.ppb){
        data.botlabel = prod.ppbotlabel;
        data.botlabelsku = prod.ppbotlabelsku;
      }else{
        data.botlabel = prod.botlabel;
        data.botlabelsku = prod.botlabelsku;
      }
      if(data.ppp){
        data.packlabel = prod.pppacklabel;
        data.packlabelsku = prod.pppacklabelsku;
      }else{
        data.packlabel = prod.packlabel;
        data.packlabelsku = prod.packlabelsku;
      }
        data.NIB = prod.NIB;
        data.removedProduction = 0
        data.partialProduction = 0;
        data.partialPackaging = 0;
        data.removedPackaging = 0
        data.saved = true;
        data.unbranded = 0;
        data.branded = 0;
        data.premixed = 0;
        data.coloredpremix = 0;
        data.mixing = 0;
        data.backtubed = 0;
        data.mixing_status = 0;
        data.production_status = 0;
        data.printing_status = 0;
        data.labeling_status = 0;
        data.packaging_status = 0;
        if (data.final_status) {} else {
            data.final_status = 0;
        }
        data.row = row;
        data.userset = false;
        data.orderdate=(new Date(data.orderdate)).getTime();
        var suffix = data.batch.substr(-1);
        var suf2 = data.batch.substr(-2);
        if (suf2 == 'RU') {} else {
            if (suffix == 'U') {
                if (data.bype == '' || data.lid == '') {
                    LOGDATA.status = false;
                    LOGDATA.data.push(['FAILED:', 'Unbranded order has no bottles or caps selected.']);

                    logItem(LOGDATA);
                    return 'Unbranded order has no bottles or caps selected.'
                }

            } else if (suffix == 'B') {
                if (data.bype == '' || data.lid == '') {
                    LOGDATA.status = false;
                    LOGDATA.data.push(['FAILED:', 'Branded order has no bottles or caps selected.']);

                    logItem(LOGDATA);
                    return 'Branded order has no bottles or caps selected.'
                }

            } else if (suffix != 'S') {

                if (data.bype == '' || data.lid == '') {
                    LOGDATA.status = false;
                    LOGDATA.data.push(['FAILED:', 'Custom order has no bottles or caps selected.']);

                    logItem(LOGDATA);
                    return 'Custom order has no bottles or caps selected.'
                }
            }


        }
        if (!data.stocking) {
            data.stocking = 0;
        }
        var QTY = calcQTY(data.stocking, data.bottles, data.fill, suffix, data.customer, suf2);
        // QTY=Math.ceil(QTY);
    // var RecipeFVP=getRecipeFVP(data.recipe);
      
      var RECIPE=getRecipe(data.recipe.id);
      
      var flavrecipe =RECIPE.Flavrec;
      var flavvalue = calcFlav(flavrecipe, QTY * 1000);
      flavvalue = flavvalue / 1000;
      
      var VGrecipe = RECIPE.VGrec;
      var VGvalue = calcVG(VGrecipe, QTY * 1000);
      
      var PGrecipe = RECIPE.PGrec;
      var PGvalue = calcPG(PGrecipe, QTY * 1000);
      
      var MCTrecipe = RECIPE.MCTrecipe;
      var MCTval = calcPG(MCTrecipe, QTY * 1000);
      
      var AGrecipe = RECIPE.AGrec;
      var AGvalue = calcPG(AGrecipe, QTY * 1000);
      
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
      
      
      
      var bsize = parseInt(data.btype.replace(/\D/g, ''), 10);
      
      data.flavrecipe = flavvalue;
      data.VGrecipe = VGvalue;
      data.PGrecipe = PGvalue;
      data.AGrecipe = AGvalue;
      data.MCTrecipe = MCTval;
      
      
      
      data.QTY = QTY;
      data.flavvalue = flavrecipe;
      data.VGval = VGrecipe;
      data.PGval = PGrecipe;
      data.MCTval = MCTrecipe;
      data.AGval = AGrecipe;
      
      if(RECIPE.Color){
        var Color = RECIPE.Color;
        var colorvalue=(QTY*10*Color.val);
        data.Color=Color;
        data.colorval=colorvalue;
      }
      
               
               
        data.bsize = bsize;
       base.updateData('Orders/' + data.batch, data);
 

        Logger.log("Order with batch number " + data.batch + " has been entered into the table.");

        LOGDATA.data.push(['SUCCESS:', "Order with batch number " + data.batch + " has been entered into the table."]);

        logItem(LOGDATA);

        return "Order with batch number " + data.batch + " has been entered into the table.";
    } catch (e) {

        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.message]);

        logItem(LOGDATA);
        Logger.log(e.message);
        return e.message;

    }

}

function bulkrun(arr,page) {
//  arr = ['912126'];
//  page = 'Orders';
    Logger.log(arr);
    var l = arr.length;
    if(page=='Orders'){
    var ref = 5000;
    }else{
    var ref = 2000;
    }
    var time = l * ref;
    var msg = '';
    if (time > 300000) {
        return "Runtime would exceed. Please select fewer batches.";
    } else {
      if(page=='Orders'){
        for (var i = 0; i < arr.length; i++) {
        
            var resp = runItem(arr[i],true);
          
          if(resp[0]=='BREAK'){
            var dat1 = {
              final_status: 0,
              runtime: 0,
              started: 0,
              wentNegative:true,
            };
              msg += arr[i] + " - "+resp[1]+" \n";
            base.updateData('Orders/' + arr[i], dat1);
            
            }
              msg += arr[i] + " - " + resp + "\n";
        }
        }else{
        
          var resp = runflavourmixItem(arr[i],true);
          
          if(resp[0]=='BREAK'){
            var dat1 = {
              final_status: 0,
              runtime: 0,
              started: 0,
              wentNegative:true,
            };
             msg += arr[i] + " - "+resp[1]+" \n";
            base.updateData('FlavourMixOrders/' + arr[i], dat1);
            
          }
          msg += arr[i] + " - " + resp + "\n";
          
        }
    }


    return msg;

}


function testrun() {
    runItem('912821',false);

}


function runItem(batch,frombulk) {
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Run',
        batch: batch,
        page: 'Orders',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    LOGDATA.type = 'Order';
    var missingmsg='';
    var data = base.getData('Orders/' + batch);
   //data = JSON.parse(JSON.stringify(data).replace(/\#N\/A/,"0"));
    data.wentNegative=false;
    base.updateData('Orders/' + batch,data);
    if (data.botSKU != "") {
        var bottleexist = base.getData('BottleTypes/' + data.botSKU);
        if(!bottleexist){
        missingmsg+='Missing Bottle: '+data.botSKU+'\n';
        }
    } else {
       var bottleexist = 1
    }
    if (data.flavour.sku != "") {
      var flavourexists = base.getData('Flavours/' + data.flavour.sku);
      if(!flavourexists){
        missingmsg+='Missing Flavour: '+data.flavour.sku+'\n';
      }
    } else {
      var  flavourexists = 1
    }
    if (data.brand != "") {
        var brandexists = base.getData('Brands/' + data.brandSKU);
      if(!brandexists){
        missingmsg+='Missing Brand: '+data.brand+'\n';
      }
    } else {
       var brandexists = 1
    }
    if (data.customer != "") {
        var customerexists = base.getData('Customers/' + data.customerSKU);
      if(!customerexists){
        missingmsg+='Missing Customer: '+data.customer+'\n';
      }
    } else {
      var  customerexists = 1
    }
    if (data.lidSKU != "") {
        var lidexists = base.getData('Lids/' + data.lidSKU);
      if(!lidexists){
        missingmsg+='Missing Cap: '+data.lidSKU+'\n';
      }
    } else {
      var  lidexists = 1
    }
 
  if (data.botlabelsku != "") {
    var labelexists = base.getData('Labels/' + data.botlabelsku);
    if(!labelexists){
      missingmsg+='Missing Label: '+data.botlabelsku+'\n';
    }
  } else {
   var labelexists = 1
  }
  var packagingTypeexists = 1;
  if (data.packagingType) {
    if(data.packagingType.sku !=''){
      packagingTypeexists=null;
      if(data.packagingType.sku != undefined){
        packagingTypeexists = base.getData('Packages/' + data.packagingType.sku);
        if(!packagingTypeexists){
          missingmsg+='Missing Package: '+data.botlabelsku+'\n';
        }else if(!packagingTypeexists.botperPack){
          missingmsg+='Missing Package Bottles Per Pack: '+data.packagingType.sku+'\n';
          packagingTypeexists=false;
        }else{
          var div = data.bottles/packagingTypeexists.botperPack;
          if(parseInt(div,10)!=div){
            missingmsg+='WARNING! Running '+data.bottles+' Bottles with a package that uses '+packagingTypeexists.botperPack+' Bottles per Package. \n Order quantities must be in raw bottles format. Ex: 1 of 3x10ml = 3 raw 10ml bottles ';
            packagingTypeexists=false;
          }
          
        }
        
      }else{
        missingmsg+='Missing Package SKU: '+data.batch+'\n';
      }
    }else{
      packagingTypeexists = 1
    }
  } else {
    packagingTypeexists = 1
  }
    if (bottleexist && flavourexists && brandexists && customerexists && lidexists && labelexists && packagingTypeexists ) {

      
      LOGDATA.data = assignMixture2(data);
     
      if(LOGDATA.data[LOGDATA.data.length-1][0]=='WENT NEGATIVE'){
       
        if(frombulk){
       
                  var msg =  'MISSING: '+LOGDATA.data[LOGDATA.data.length-1][1];
           logItem(LOGDATA);
          return ['BREAK',msg];

          
        }else{
          
          var dat1 = {
            final_status: 0,
            runtime: 0,
            started: 0,
            wentNegative:true,
          };
          
          base.updateData('Orders/' +batch, dat1);
          var msg =  'MISSING: '+LOGDATA.data[LOGDATA.data.length-1][1];
          logItem(LOGDATA);
          return msg;
        }
        
      }else{
        
         logItem(LOGDATA);
        return 'Success';
      }
    } else {
        LOGDATA.status = false;
        LOGDATA.msg += 'Can not run Order. Contains parts that are not indexed in the database. \n'+missingmsg;
        LOGDATA.data.push(['FAILED:', 'Can not run Order. Contains parts that are not indexed in the database \n'+missingmsg]);
        logItem(LOGDATA);
        return 'Can not run Order. Contains parts that are not indexed in the database. \n'+missingmsg;
    }
}

function assignMixture2(data) {
    try {
        var LOGARR = new Array();
        var runtime = new Date().getTime();
        var dat1 = {
            final_status: 'started',
            runtime: runtime,
        };

        base.updateData('Orders/' + data.batch, dat1);
        var suffix = data.batch.substr(-1);
        var for_premixed_stock = suffix == PREMIX_STOCK_SUFFIX ? true : false;
        var for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX ? true : false;
      if(!for_unbranded_stock){
        suffix = data.batch.substr(-2);
        for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX2 ? true : false;
      }
        var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;

        if (for_premixed_stock) {
        
        
        if(data.checkUncolored){
          LOGARR = LOGARR.concat(CheckPremixed(data));
        }else{
          if(data.Color){
            LOGARR.push(['Color - '+data.Color.sku,data.colorval]);
            fromRunningtoReserved("Color/"+data.Color.sku, data.colorval);
            
            toPremixColoring(data);
          }
          LOGARR.push(['Order Type:', 'Premix Stock']);
          
          LOGARR = LOGARR.concat(createMixOrder(data));
          
          
          fromRunningtoReserved('Flavours/' + data.flavour.sku, data.flavrecipe);
          
          LOGARR.push(['Flavour ' + data.flavour.sku, data.flavrecipe]);
          
          fromRunningtoReserved("Misc/VG", data.VGrecipe);
          LOGARR.push(['VG:', data.VGrecipe]);
          fromRunningtoReserved("Misc/PG", data.PGrecipe);
          LOGARR.push(['PG:', data.PGrecipe]);
          
          
          fromRunningtoReserved("Misc/MCT", data.MCTrecipe);
          LOGARR.push(['MCT:', data.MCTrecipe]);
          
          fromRunningtoReserved("Misc/AG", data.AGrecipe);
          LOGARR.push(['AG:', data.AGrecipe]);
          if(data.Nicotrecipe){
            LOGARR.push(['Nicotine:', data.Nicotrecipe]);
            fromRunningtoReserved("Misc/Nicotine", data.Nicotrecipe);
          }
          
          if(data.Nicotrecipesalts){
            LOGARR.push(['Nicotine Salts:', data.Nicotrecipesalts]);
            fromRunningtoReserved("Misc/Nicotine Salts", data.Nicotrecipesalts);
          }
          if(data.CBDrecipe){
            LOGARR.push(['CBD:', data.CBDrecipe]);
            fromRunningtoReserved("Misc/CBD", data.CBDrecipe);
          }
       
         
         }



        } else if (for_unbranded_stock) {
            LOGARR.push(['Order Type:', 'Unbranded Stock']);

            //Check premix
            //If premix == curent, move to production
            //if premix < current, move premix to preduction, createMixOrder(required-premixed)
            //If premix > current, moce premix-required to production, substract required from premix
            //checkpremix(current_row,recipe,flavour,order_date,required,original_required,order_batch,priority,bottles,order_bottle_type,order_cap_type,packaging,customer,order_brand,last_unbranded_bottlestock_row,last_branded_bottlestock_row,flavvalue,vg,pg,nicot);


            LOGARR = LOGARR.concat(CheckPremixed(data));

        } else if (for_branded_stock) {
            LOGARR.push(['Order Type:', 'Branded Stock']);

            Logger.log("Checking Branded")

            //checkunbranded(current_row,recipe,flavour,order_date,required,original_required,order_batch,priority,bottles,order_bottle_type,order_cap_type,packaging,customer,order_brand,last_unbranded_bottlestock_row,last_branded_bottlestock_row,flavvalue,vg,pg,nicot);
            LOGARR = LOGARR.concat(generateForSingleBrand2(data.productcode, data.productdescription));
            LOGARR = LOGARR.concat(CheckUnbranded(data));

        } //end for branded stock
        else {
            LOGARR.push(['Order Type:', 'Customer Order']);


            LOGARR = LOGARR.concat(generateForSingleBrand2(data.productcode, data.productdescription));
            LOGARR = LOGARR.concat(CheckBranded(data));
            updateShippingInformation2(data.batch);

        } //end custom
        updateAllTabs(data.batch);
        //return 'success';
        return LOGARR;
    } catch (e) {
        LOGARR.push(['Failed:', e.message]);

        return LOGARR

    }
}

function testNEWOrder() {
    var data = {

        batch: "1004",
        bottles: 200,
        brand: "13 Thieves",
        btype: "100ml bottle A",
        customer: "Andy Wales",
        flavour: "Apple",
        lid: "100ml Gorilla cap",
        orderdate: "2017-09-21",
        packaging: 1,
        packagingType: "1product pack",
        priority: "",
        recipe: {
            cbd: '',
            name: "VG/PG : 40 / 60 Nicotine : 0MG",
            nic: 0,
            ratio: 4060
        },
        stocking: NaN

    };
    saveOrder(data);




}
/*

function saveOrder2(data){
Logger.log(data);
try{
data.saved=true;
data.unbranded=0;
data.branded=0;
data.premixed=0;
data.mixing=0;
data.backtubed=0;
data.mixing_status=0;
data.production_status=0;
data.printing_status=0;
data.labeling_status=0;
data.packaging_status=0;
data.final_status=0;
   var suffix=data.batch.substr(-1);

var QTY=calcQTY(data.stocking,data.bottles,data.btype,suffix);
  var flavrecipe=getRecipeFlav(data.recipe);
  var flavvalue= calcFlav(flavrecipe,QTY*1000);
  flavvalue=flavvalue/1000;
  
  var VGrecipe=getRecipeVG(data.recipe);
  var VGvalue= calcVG(VGrecipe,QTY*1000);
  
  var PGrecipe=getRecipePG(data.recipe);
  var PGvalue= calcPG(PGrecipe,QTY*1000);
  
  var Nicotrecipe=getRecipeNic(data.recipe);
  var Nicotvalue= calcPG(Nicotrecipe,QTY*1000);
  var bsize=parseInt(data.btype.substr(0,2),10);
  
  data.flavrecipe=flavvalue;
    data.VGrecipe=VGvalue;
    data.PGrecipe=PGvalue;
    data.Nicotrecipe=Nicotvalue;
  
  data.QTY=QTY;
  data.flavvalue=flavrecipe;
  data.VGval=VGrecipe;
  data.PGval=PGrecipe;
  data.Nico=Nicotrecipe;
  data.bsize=bsize;
base.updateData('Orders/'+data.batch,data);
var data=base.getData('Orders/'+data.batch);
 assignMixture2(data);
Logger.log("Order with batch number "+data.batch+" has been entered into the table.");
return "Order with batch number "+data.batch+" has been entered into the table.";
}catch(e){
Logger.log(e.message);
return e.message;

}

}
*/
function updateAllTabs(batch) {

    var data = base.getData('Orders/' + batch);
    var opt = {
        'unbranded': data.unbranded,
        'branded': data.branded,
        'backtubed': data.backtubed,
        'premixed': data.premixed,
        'coloredpremix': data.coloredpremix, 
        'mixing': data.mixing,
        'mixing_status': data.mixing_status,
        'production_status': data.productions_status,
        'printing_status': data.printing_status,
        'labeling_status': data.labeling_status,
        'packaging_status': data.packaging_status,
        'orderID': data.orderID
    }
    var mix = base.getData('Mixing/' + batch);
    var prod = base.getData('Production/' + batch);
    var print = base.getData('Printing/' + batch);
    var packag = base.getData('Packaging/' + batch);
    var lab = base.getData('Labelling/' + batch);
    if (mix) {
        base.updateData('Mixing/' + batch, opt);
    }
    if (prod) {
        base.updateData('Production/' + batch, opt);
    }
    if (print) {
        base.updateData('Printing/' + batch, opt);
    }
    if (lab) {
        base.updateData('Labelling/' + batch, opt);
    }
    if (packag) {
        base.updateData('Packaging/' + batch, opt);
    }

}

function checkBatchExists(orders,batch,num,largest){
if(parseInt(batch,10)<=largest){
batch=(largest+1).toString();
}
  for(var i=0;i<num;i++){
    if(orders[batch]){
      batch=(parseInt(batch,10)+1).toString();
      
    }else{
      return batch;
    }
  }
return (parseInt(batch,10)+1).toString();
}

function checkBatchExistsFlavourMixer(orders,batch,num){

  for(var i=0;i<num;i++){
    if(orders[batch]){
      batch=(parseInt(batch,10)+1).toString();
      
    }else{
      return batch;
    }
  }
return (parseInt(batch,10)+1).toString();
}


function getNewOrderID(){
  
        var params={
        orderBy:['orderID']
      }
  var ordersByOrderID=JSONtoARR(base.getData('Orders',params));
  ordersByOrderID=ordersByOrderID.sort(sortOrderIDsHL)
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
return 'INV-'+num;
}

function getNewOrderID2(ordersByOrderID){

  ordersByOrderID=ordersByOrderID.sort(sortOrderIDsHL)
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
return 'INV-'+num;
}
function TESTORDERARR(){
var arr=[{productcode:'VGO1016BB', productdescription:'BB VGO: Double Menthol 6mg 5050 10ml', flavour:'Double Menthol', orderID:'SO-00010100', stocking:0, lid:'R&C - 10 PET Bottle CAP - Black', btype:'R&C - 10 PET Bottle', batch:'', recipe:{cbd:'', name:'VG/PG : 50 / 50 Nicotine : 6MG', nic:6, type:'nic', ratio:'5050'}, bottles:700, packaging:'', orderdate:'2017-12-29', priority:'', brand:'VGO', customer:'Blue Horse'},
{productcode:'13THIE1003', productdescription:'13 Thieves: Ice Grape 3mg 7030 4 x 10ml', flavour:'Ice Grape', orderID:'SO-00010100', stocking:0, lid:'R&C - 10 PET Bottle CAP - Black', btype:'R&C - 10 PET Bottle', batch:'', recipe:{cbd:'', name:'VG/PG : 70 / 30 Nicotine : 3MG', nic:3, type:'nic', ratio:'7030'}, bottles:500, packaging:4, orderdate:'2017-12-29', priority:'', brand:'13 Thieves', customer:'Blue Horse'}];
saveOrderArray(arr);
}
function saveOrderArray(arr) {
Logger.log(arr);
    var msg = '';
    try {
    var largestBatch=base.getData('highestBatch');
       var prods = base.getData('References/ProductCodes');
       var rawOrders=base.getData('Orders');
   
      var orders=JSONtoARR(base.getData('Orders'));
var returnbatches='';
var customerSKU;
var createdCustomer=false;
      for (var i = 0; i < arr.length; i++, ordersL++) {
      
            var data = arr[i];
      if(data.createCustomer){
      if(!createdCustomer){
        customerSKU=createCustomerOrderForm(data.cust);
        createdCustomer=true;
        }
      }
      if(createdCustomer){
      data.customerSKU=customerSKU;
      }
            if (orders) {
                var ordersL = orders.length;
                var row = orders.length + 1;
                if(i==0){
                  data.batch = (parseInt(orders[orders.length-1].batch,10)+1).toString();
                  var batch = checkBatchExists(rawOrders, data.batch,ordersL ,largestBatch);
                  data.batch=batch;
                }else{
                  batch=parseInt(batch,10);
                  batch++;
                  data.batch=(batch).toString()
                  
               }
            } else {
                var ordersL = 1;
                var row = 1;
               
               data.batch='911000';
            }
     if(i==arr.length-1){
     base.updateData('',{'highestBatch':parseInt(data.batch,10)});
     }     
                
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'New Order',
        batch: data.batch,
        page: 'Orders',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
               var prod = base.getData('References/ProductCodes/' + data.productcode);
        data.fill = prod.fill;
        data.boxname = prod.boxname;
       if(data.ppb){
        data.botlabel = prod.ppbotlabel;
        data.botlabelsku = prod.ppbotlabelsku;
      }else{
        data.botlabel = prod.botlabel;
        data.botlabelsku = prod.botlabelsku;
      }
      if(data.ppp){
        data.packlabel = prod.pppacklabel;
        data.packlabelsku = prod.pppacklabelsku;
      }else{
        data.packlabel = prod.packlabel;
        data.packlabelsku = prod.packlabelsku;
      }
        data.NIB = prod.NIB;
        data.removedProduction = 0
        data.partialProduction = 0;
        data.partialPackaging = 0;
        data.removedPackaging = 0
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
        if (data.final_status) {} else {
            data.final_status = 0;
        }
        data.row = row;
        data.userset = false;
        data.orderdate=(new Date(data.orderdate)).getTime();
        var suffix = data.batch.substr(-1);
        var suf2 = data.batch.substr(-2);
        if (suf2 == 'RU') {} else {
            if (suffix == 'U') {
                if (data.bype == '' || data.lid == '') {
                    LOGDATA.status = false;
                    LOGDATA.data.push(['FAILED:', 'Unbranded order has no bottles or caps selected.']);

                    logItem(LOGDATA);
                    return 'Unbranded order has no bottles or caps selected.'
                }

            } else if (suffix == 'B') {
                if (data.bype == '' || data.lid == '') {
                    LOGDATA.status = false;
                    LOGDATA.data.push(['FAILED:', 'Branded order has no bottles or caps selected.']);

                    logItem(LOGDATA);
                    return 'Branded order has no bottles or caps selected.'
                }

            } else if (suffix != 'S') {

                if (data.bype == '' || data.lid == '') {
                    LOGDATA.status = false;
                    LOGDATA.data.push(['FAILED:', 'Custom order has no bottles or caps selected.']);

                    logItem(LOGDATA);
                    return 'Custom order has no bottles or caps selected.'
                }
            }


        }
        if (!data.stocking) {
            data.stocking = 0;
        }
        var QTY = calcQTY(data.stocking, data.bottles, data.fill, suffix, data.customer, suf2);
        // QTY=Math.ceil(QTY);
    var RECIPE=getRecipe(data.recipe.id);
    
    var flavrecipe =RECIPE.Flavrec;
    var flavvalue = calcFlav(flavrecipe, QTY * 1000);
    flavvalue = flavvalue / 1000;

    var VGrecipe = RECIPE.VGrec;
    var VGvalue = calcVG(VGrecipe, QTY * 1000);

    var PGrecipe = RECIPE.PGrec;
    var PGvalue = calcPG(PGrecipe, QTY * 1000);
    
      var MCTrecipe = RECIPE.MCTrecipe;
    var MCTval = calcPG(MCTrecipe, QTY * 1000);
  
    var AGrecipe = RECIPE.AGrec;
    var AGvalue = calcPG(AGrecipe, QTY * 1000);
    
        
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
    


        var bsize = parseInt(data.btype.replace(/\D/g, ''), 10);

        data.flavrecipe = flavvalue;
        data.VGrecipe = VGvalue;
        data.PGrecipe = PGvalue;
        data.AGrecipe = AGvalue;
        data.MCTrecipe=MCTval;

        data.QTY = QTY;
        data.flavvalue = flavrecipe;
        data.VGval = VGrecipe;
        data.PGval = PGrecipe;
        data.AGval =AGrecipe;
        data.MCTval=MCTrecipe;
        data.bsize = bsize;
       base.updateData('Orders/' + batch, data);
     

        Logger.log("Order with batch number " +batch + " has been entered into the table.");

        LOGDATA.data.push(['SUCCESS:', "Order with batch number " + batch + " has been entered into the table."]);

        logItem(LOGDATA);
       returnbatches+='  '+data.batch+'  ';
       // return "Order with batch number " + data.batch + " has been entered into the table.";
        
        }
        return "Orders with batch numbers " + returnbatches +" have been entered into the table.";
    } catch (e) {
        Logger.log( e.message);
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.message]);

        logItem(LOGDATA);
        Logger.log(e.message);
        return e.message;

    }


}


//FLAVOUR MIXES
function TESTSAVEFM(){
var data={
batch:3,
}
saveflavourmixOrder(data,false);
}
function saveflavourmixOrder(data,edit){
  var LOGDATA = {
    status: true,
    msg: '',
    action: 'New Flavour Mix Order',
    batch: data.batch,
    page: 'Flvaour Mix Orders',
    user: Session.getActiveUser().getEmail(),
    data: new Array()
  };
  try {  
  data.orderdate=new Date(data.orderdate).getTime();
  if(!data.movedtoNext){
    data.movedtoNext=0;
  }
  if(!data.final_status){
    data.final_status=0;
  }

    var rawMixes=base.getData('FlavourMixOrders');
    var mixes = JSONtoARR(rawMixes);
    
    if (data.batch == '') {
      LOGDATA.status = false;
      LOGDATA.data.push(['FAILED:', 'NO BATCH NUMBER']);
      
      logItem(LOGDATA);
      return 'NO BATCH NUMBER'
    }else{
      if(!edit){
        var exists=base.getData("FlavourMixOrders/"+data.batch);
        if(exists){
          data.batch= checkBatchExistsFlavourMixer(rawMixes,data.batch,mixes.length)
          return 'BATCH '+data.batch+' is already in the system.';}
      }
    }
    
    if (mixes) {
      
      var row = mixes.length + 1;
    } else {
      var row = 1;
    }
    
    data.row=row;
    
    base.updateData('FlavourMixOrders/'+data.batch,data);
    
    LOGDATA.data.push(['SUCCESS:', "Order with batch number " + data.batch + " has been entered into the table."]);

    return "Flavour Mix Order with batch number " + data.batch +" has been entered into the table.";
  }catch(e){
    
    LOGDATA.status = false;
    LOGDATA.data.push(['FAILED:', e.message]);
    
    logItem(LOGDATA);
    Logger.log(e.message);
    return e.message;
    
  }
}


function testRUNFLAVOURMIX(){

var resp=runflavourmixItem('1',false);
}

function runflavourmixItem(batch,frombulk){
 var LOGDATA = {
        status: true,
        msg: '',
        action: 'Run',
        batch: batch,
        page: 'Flavour Mix Orders',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    LOGDATA.type = 'Flavour Mix Orders';
    var missingmsg='';
    var data = base.getData('FlavourMixOrders/' + batch);
    data.wentNegative=false;
    data.final_status='started';
    data.started=(new Date()).getTime();
    
    base.updateData('FlavourMixOrders/' + batch,data);
    var used=new Array();
    var flavourMix=base.getData('FlavourMixes/'+data.flavourmix.sku);
    data.fullMix=flavourMix;
    var flavours = JSONtoARR(flavourMix.flavours);
    for(var i=0;i<flavours.length;i++){
     used.push(['Flavours/', flavours[i].sku,flavours[i].val* data.stocking / 10]);
      LOGDATA.data.push(['Flavour:', flavours[i].val* data.stocking / 10]);
      var neg = fromRunningtoReserved('Flavours/' + flavours[i].sku, flavours[i].val * data.stocking / 10);
      
      if (neg<0) {
        LOGDATA.data = LOGDATA.data.concat(returnData2(used,neg))
        logItem(LOGDATA);
        if(frombulk){ 
          return ['BREAK','MISSING: '+LOGDATA.data[LOGDATA.data.length-1][1]];
        }else{
          data.wentNegative=true;
          data.started=0;
          data.final_status=0;
          base.updateData('FlavourMixOrders/' + batch,data);
         return 'MISSING: '+LOGDATA.data[LOGDATA.data.length-1][1] ;
        }
      }
      
    }
    LOGDATA.data.push(['Sent to Mixing Team:', data.stocking]);
    data.final_status=0;
    base.updateData('FlavourMixMixingTeam/'+data.batch,data);

    return "Success"; 
 

}