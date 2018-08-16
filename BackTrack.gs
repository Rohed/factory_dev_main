function testPartial(){
filter('913933', 5, 'Production')

}

function filter(batch, newBottles, sheet) {
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Partial Order',
        batch: batch,
        page: sheet,
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    LOGDATA.data.push(['New Bottles:', newBottles]);
    var item = base.getData(sheet+'/' + batch);
    if (sheet == 'Production') {
        LOGDATA.data = LOGDATA.data.concat(fromProduction(batch, newBottles));
    } else {
        LOGDATA.data = LOGDATA.data.concat(fromPackaging(batch, newBottles));
    }
   LOGDATA.data = LOGDATA.data.concat(updateOrder(batch, newBottles, sheet,item));
    logItem(LOGDATA);
}

function fromProduction(batch, bottles) {
    var USAGE = {};
    
    var LOGARR = [];
    var suffix = batch.substr(-1);
    var for_premixed_stock = suffix == PREMIX_STOCK_SUFFIX ? true : false;
    var for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX ? true : false;
          if(!for_unbranded_stock){
            suffix = batch.substr(-2);
            for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX2 ? true : false;
            }
    var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
  var order = base.getData('Orders/' + batch);
  var prodData = base.getData('Production/' + batch);
  var mixingData = base.getData('Mixing/' + batch);
  var ORIGBOTTLES = prodData.bottles;
  var removeFromProduction = ORIGBOTTLES - bottles;
  var tomix = order.mixing;
  var tominusP = order.premixed;
  var premix = getPremixSKU(order,false);
  var premixColored = getPremixSKU(order,true);
  var forColored = order.recipe.Color ? true : false;
  var volume = bottles* order.fill/ 1000;
  LOGARR.push(['Volume: ' , volume]);
  LOGARR.push(['tominusP: ' , tominusP]);
  LOGARR.push(['tomix: ' , tomix]);
   var amount = 0;
    var helper = 0;
  if(tominusP>0){
    if(tominusP>volume){
      
      amount = volume;
         helper=volume;
      volume=0;
    
    }else{
      amount = tominusP;
      volume=volume - tominusP;
      helper=0;
    }
    if(forColored){
     LOGARR.push(['COLORED: ' , "YES "+ premixColored]);
      USAGE.ColoredPremix={
        sku:premixColored,
        qty:amount
      }
      fromReservedToRunning('PremixesTypes/' + premixColored, amount);
    }else{
      USAGE.Premix={
        sku:premix,
        qty:amount
      }
      LOGARR.push(['COLORED: ' , "NO " + premix]);
      fromReservedToRunning('PremixesTypes/' + premix, amount);
    }
    LOGARR.push(['amount: ' , amount]);
    LOGARR.push(['premixed: ' , helper]);
    var dat1 ={
      premixed:helper,
    }
    base.updateData('Orders/' + batch,dat1);
    
  }
  if(tomix>0 && volume>0){
   LOGARR.push(['Volume: ' , volume]);
    if(mixingData.movedtoNext != 1){
      var datMix = {
        POvolume:volume,
        POMARKED:true,
      }
        var mixingData = base.updateData('Mixing/' + batch,datMix);
    }else{
      amount =volume;
      if(forColored){
       LOGARR.push(['COLORED: ' , "YES " + premix]);
       
        PtoRunning(premixColored, amount);
      }else{
       LOGARR.push(['COLORED: ' , "NO " + premix]);
        PtoRunning(premix, amount);
      }
    }
    
     var dat1 ={
      mixing:tomix-volume,
    }
     LOGARR.push(['mixing: ' , tomix-volume]);
    base.updateData('Orders/' + batch,dat1);
  }
  LOGARR.push(['Removed bottles:', removeFromProduction]);
    USAGE.Caps={
        sku:prodData.lidSKU,
        qty:removeFromProduction
      }
  removeFromReserved('Lids/' + prodData.lidSKU, removeFromProduction);
  LOGARR.push(['To Running: ' + prodData.lidSKU, removeFromProduction]);
     USAGE.Bottles={
        sku:prodData.botSKU,
        qty:removeFromProduction
      }
    removeFromReserved('BottleTypes/' + prodData.botSKU, removeFromProduction);
    LOGARR.push(['To Running: ' + prodData.botSKU, removeFromProduction]);
    //CHECK PRINTING
    var printData = base.getData('Printing/' + batch);
    if (printData) {
        if (printData.movedtoNext == 0) {
            var label = order.botlabelsku;
       
            var packData = getPackagingData(printData.packagingType, removeFromProduction, order.boxname.sku)
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var tubes = removeFromProduction / tube;
            var box = tubes / packData.divTubesForBox;
            
            printData.numLabelsBottles = printData.numLabelsBottles - removeFromProduction;
            printData.numLabelsTubes = printData.numLabelsTubes - (removeFromProduction/tube);
            printData.bottles = printData.bottles - removeFromProduction;
            
            LOGARR.push(['New in Printing: ', printData.bottles]);
            base.updateData('Printing/' + batch, printData);
            
            if (!isFinite(box)) {
                box = 0;
            }
            if (tube) {
              USAGE.Packages={
                sku:printData.packagingType.sku,
                qty:tubes
              }
                removeFromReserved('Packages/' + printData.packagingType.sku, tubes);
                LOGARR.push(['To Running: ' + printData.packagingType.sku, tubes]);
                if (printData.packlabelsku) {
                 if(order.ppp){
                    USAGE.PrePackLabel = {
                      sku:printData.packlabelsku,
                      qty:tubes
                    };
                  }else{
                    USAGE.PackLabel = {
                      sku:printData.packlabelsku,
                      qty:tubes
                    };
                    
                  }
                    removeFromReserved('Labels/' + printData.packlabelsku, tubes);
                    LOGARR.push(['To Running: ' + printData.packlabelsku, tubes]);
                }
            }
            var ink = 0;
            if (!order.ppb) {
                ink += removeFromProduction * 0.001;
            }
            if (!order.ppp) {
                ink += packink;
            }
          USAGE.ink={
            
            qty:ink
          }
            removeFromReserved("Misc/printing ink", ink);
            LOGARR.push(['To Running: Ink', ink]);
              USAGE.BottleLabel={
                    sku:label,
                    qty:removeFromProduction
                  }
            removeFromReserved('Labels/' + label, removeFromProduction);
            LOGARR.push(['To Running: ' + label, removeFromProduction]);
        }
    }
    //CHECK LABELLING
    var labelingData = base.getData('Labelling/' + batch);
    if (labelingData) {
        if (printData.movedtoNext != 0 || !printData) {
            if (labelingData.movedtoNext == 0) {
                var label = order.botlabelsku;
                labelingData.bottles = labelingData.bottles - removeFromProduction;
                base.updateData('Labelling/' + batch, labelingData);
                LOGARR.push(['New in Labelling: ', labelingData.bottles]);
                var packData = getPackagingData(labelingData.packagingType, removeFromProduction, order.boxname.sku)
                var packink = packData.ink;
                var tube = packData.botperPack;
                var boxname = order.boxname.sku;
                var tubes = removeFromProduction / tube;
                var box = tubes / packData.divTubesForBox;
                if (!isFinite(box)) {
                    box = 0;
                }
                if (tube) {
                  USAGE.Packages={
                    sku:labelingData.packagingType.sku,
                    qty:tubes
                  }
                    removeFromReserved('Packages/' + labelingData.packagingType.sku, tubes);
                    LOGARR.push(['To Running: ' + labelingData.packagingType.sku, tubes]);
                    if (labelingData.packlabelsku) {
                      if(order.ppp){
                        USAGE.PrePackLabel = {
                          sku:labelingData.packlabelsku,
                          qty:tubes
                        };
                      }else{
                        USAGE.PackLabel = {
                          sku:labelingData.packlabelsku,
                          qty:tubes
                        };
                        
                      }
                        removeFromReserved('Labels/' + labelingData.packlabelsku, tubes);
                        LOGARR.push(['To Running: ' + labelingData.packlabelsku, tubes]);
                    }
                }
                    USAGE.BottleLabel={
                    sku:label,
                    qty:removeFromProduction
                  }
                removeFromReserved('Labels/' + label, removeFromProduction);
                LOGARR.push(['To Running: ' + label, removeFromProduction]);
            }
        }
    }
    //CHECK PACKAGING
    var packagingData = base.getData('Packaging/' + batch);
    if (packagingData) {
        if (packagingData.movedtoNext == 0) {
            var origbottles = packagingData.bottles;
            packagingData.bottles = origbottles - removeFromProduction;
            LOGARR.push(['New in Packaging: ', packagingData.bottles]);
            base.updateData('Packaging/' + batch, packagingData);
            var packData = getPackagingData(packagingData.packagingType, removeFromProduction, order.boxname.sku)
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var tubes = removeFromProduction / tube;
            var box = tubes / packData.divTubesForBox;
            if (!isFinite(box)) {
                box = 0;
            }
            if (!for_branded_stock) {
                if (order.packagingType) {
                    USAGE.Packages={
                      sku:order.packagingType.sku,
                      qty:tubes
                    }
                    LOGARR.push(['To Running: ' + order.packagingType.sku, tubes]);
                    removeFromReserved('Packages/' + order.packagingType.sku, tubes);
                }
                if (boxname) {
                 USAGE.Boxes={
                      sku:boxname,
                      qty:box
                    }
                    LOGARR.push(['To Running: ' + boxname, box]);
                    removeFromReserved('Boxes/' + boxname, box);
                }
            } else {
                if (tube) {
                   USAGE.Packages={
                      sku:order.packagingType.sku,
                      qty:tubes
                    }
                    LOGARR.push(['To Running: ' + packagingData.packagingType.sku, tubes]);
                    removeFromReserved('Packages/' + packagingData.packagingType.sku, tubes);
                }
            }
            /*else {
                            var tomix = order.mixing;
                            var tominusP = order.premixed;
                            var tominusU = order.unbranded;
                            var tominusB = order.branded;
                            var tominbot = (tomix + tominusP) * 1000 / order.fill;
                            var tominBPack = order.backtubed;
                            tominusU = tominusU + tominbot;
                            packagingData.bottles = packagingData.bottles - tominusU - order.partialProduction - order.partialPackaging;
                            var bot2;
                            if (tube){
                                bot2 = packagingData.bottles - (tominBPack * tube);
                                packagingData.bottles = (packagingData.bottles - tominusB) / tube;
                                fromReservedToRunning('Packages/' + order.packagingType, packagingData.bottles);
                        }
                        }*/
        }
    }
    prodData.bottles = prodData.bottles - removeFromProduction;
    LOGARR.push(['New in Production: ', prodData.bottles]);
    base.updateData('Production/' + batch, prodData);
    var usageArr =  convertUsageToArr(order,USAGE);
    LogPOTransaction(usageArr);
    return LOGARR;
}

function fromPackaging(batch, bottles) {
var USAGE ={};
    var LOGARR = [];
    var suffix = batch.substr(-1);
    var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
    var order = base.getData('Orders/' + batch);
    var packagingData = base.getData('Packaging/' + batch);
    var ORIGBOTTLES = packagingData.bottles;
    var removeFromProduction = ORIGBOTTLES - bottles;
    var packagingData = base.getData('Packaging/' + batch);
    if (packagingData) {
        if (packagingData.movedtoNext == 0) {
            var origbottles = packagingData.bottles;
            packagingData.bottles = origbottles - removeFromProduction;
            LOGARR.push(['New in Packaging: ', packagingData.bottles]);
            base.updateData('Packaging/' + batch, packagingData);
            var packData = getPackagingData(packagingData.packagingType.sku, removeFromProduction, order.boxname.sku)
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var tubes = removeFromProduction / tube;
            var box = tubes / packData.divTubesForBox;
            if (!isFinite(box)) {
                box = 0;
            }
            if (!for_branded_stock) {
                if (order.packagingType.sku) {
                   USAGE.Packages={
                      sku:order.packagingType.sku,
                      qty:tubes
                    }
                    LOGARR.push(['To Running: ' + order.packagingType.sku, tubes]);
                    removeFromReserved('Packages/' + order.packagingType.sku, tubes);
                }
                if (boxname) {
                   USAGE.Boxes={
                      sku:boxname,
                      qty:box
                    }
                    LOGARR.push(['To Running: ' + boxname, box]);
                    removeFromReserved('Boxes/' + boxname, box);
                }
            } else {
                if (tube != 0) {
                 USAGE.Packages={
                      sku:order.packagingType.sku,
                      qty:tubes
                    }
                    LOGARR.push(['To Running: ' + packagingData.packagingType.sku, tubes]);
                    removeFromReserved('Packages/' + packagingData.packagingType.sku, tubes);
                }
            }
            /*else {
                            var tomix = order.mixing;
                            var tominusP = order.premixed;
                            var tominusU = order.unbranded;
                            var tominusB = order.branded;
                            var tominbot = (tomix + tominusP) * 1000 / order.fill;
                            var tominBPack = order.backtubed;
                            tominusU = tominusU + tominbot;
                            packagingData.bottles = packagingData.bottles - tominusU - order.partialProduction - order.partialPackaging;
                            var bot2;
                            if (tube){
                                bot2 = packagingData.bottles - (tominBPack * tube);
                                packagingData.bottles = (packagingData.bottles - tominusB) / tube;
                                fromReservedToRunning('Packages/' + order.packagingType, packagingData.bottles);
                        }
                        }*/
        }
    }
        var usageArr =  convertUsageToArr(order,USAGE);
    LogPOTransaction(usageArr);
    return LOGARR;
}

function updateOrder(batch, bottles, sheet,originalItem) {
        var LOGARR = [];
        var order = base.getData('Orders/' + batch);
      
        if (sheet == 'Production') {
            var dat1 = {
                partialProduction: bottles,
                removedProduction: originalItem.bottles - bottles
            };
            LOGARR.push(['Partial Production:', bottles]);
            LOGARR.push(['Removed:', originalItem.bottles - bottles]);
        } else {
            var dat1 = {
                partialPackaging: bottles,
                removedPackaging: originalItem.bottles - bottles
            };
            LOGARR.push(['Partial Packaging:', bottles]);
            LOGARR.push(['Removed:', originalItem.bottles - bottles]);
        }
        base.updateData('Orders/' + batch, dat1);
        var item = base.getData(sheet+'/' + batch);
        var leftover = item.bottles;
        //NEWORDER
        var object = {
            fill: order.fill,
            productcode: order.productcode,
            productdescription: order.productdescription,
            batch: batch + 'PO',
            orderID: order.orderID,
            orderdate: parseInt(order.orderdate, 10),
            priority: order.priority,
            customer: order.customer,
            customerSKU: order.customerSKU,
            recipe: order.recipe,
            brand: order.brand,
            brandSKU: order.brandSKU,
            flavour: order.flavour,
            'bottles': leftover,
            stocking: order.stocking,
            btype: order.btype,
            lid: order.lid,
            botSKU: order.botSKU,
            lidSKU: order.lidSKU,
            packagingType: order.packagingType,
            boxname: order.boxname,
            ppp: order.ppp,
            ppb: order.ppb,
        };
        var exists = base.getData('Orders/' + object.batch);
        if (exists) {
            object.batch += 'PK';
                    var exists = base.getData('Orders/' + object.batch);
          if (exists) {
            object.batch += 'PO';
          }
        }
        LOGARR.push(['New Order Batch:', object.batch]);
        saveOrder(object);
        return LOGARR;
    }
    //REVERSE DELETION
function TESTREVERSEINFO() {
    getBatchInfo(['901963']);
}



function getBatchInfo(batches,key) {
    var shippingData=base.getData('Shipping');
    var suffixes=['PO','PK','OV'];
   
    var sheets = ['Orders', 'Mixing', 'Production', 'Printing', 'Labelling', 'Packaging'];
    //  var sheetStatus=['final_status','mixing_status','printing_status','labelling_status','packaging_status'];
    var orders=base.getData('Orders');
    var topush=[];
    for (var j = 0; j < batches.length; j++) {
      for(var s=0;s<suffixes.length;s++){
        if(batches.indexOf(batches[j]+suffixes[s])==-1){
          var exists=orders[batches[j]+suffixes[s]];
          if(exists){
          topush.push(batches[j]+suffixes[s])
          }
        }
      }
    }
    
    batches=batches.concat(topush);
    var rett = [];
    for (var i = 0; i < sheets.length; i++) {
        var raw = base.getData(sheets[i]);
        // var list=JSONtoARR(raw);
        for (var j = 0; j < batches.length; j++) {
          var suf2 = batches[j].substr(-2);
          if (suf2 == 'RU'){
            continue;
          }
       
    
            var existsinRett = rett.getIndex(batches[j]);
            if (existsinRett == -1) {
                existsinRett = rett.length;
                if(key=='deleteandreverse'|| key=='reverse'){
                rett.push([batches[j]]);
                }else if(key=='statuscheck'){
                if( shippingData[batches[j]]){
                rett.push([batches[j],orders[batches[j]].orderID,orders[batches[j]].runtime,orders[batches[j]].customer,
                shippingData[batches[j]].dateshipped,shippingData[batches[j]].SHIPPINGCODE]);
                }else{
                  rett.push([batches[j],orders[batches[j]].orderID,orders[batches[j]].runtime,orders[batches[j]].customer,
                '','']);
                }
                }
            }
            var existsinRaw = raw[batches[j]];
            if (existsinRaw) {
                if (existsinRaw.final_status == 0 || existsinRaw.final_status == null) {
                    existsinRaw.final_status = 'Not Run';
                }
                if (existsinRaw.movedtoNext == 'Busy') {
                    existsinRaw.final_status = 'Busy';
                }
                rett[existsinRett].push([existsinRaw.final_status, existsinRaw.movedtoNext]);
            } else {
                rett[existsinRett].push(['N/A', false]);
            }
        } //END OF BATCHES
    } //END OF SHEETS
    return [rett, key];
}
function testDELANREV(){
deleteAndReverse( getBatchInfo(['913768'])[0],'reverse') 

}
function deleteAndReverse(data, key) {
       var sheets = ['Packaging', 'Labelling', 'Printing', 'Production', 'MixingTeam', 'Orders'];
    //  var sheetStatus=['final_status','mixing_status','printing_status','labelling_status','packaging_status'];
    var orders = base.getData('Orders');
    for (var i = 0; i < sheets.length; i++) {
        var raw = base.getData(sheets[i]);
        for (var j = 0; j < data.length; j++) {
            var item = data[j];
            var itemRaw = orders[data[j][0]];
            if (sheets[i] == 'MixingTeam') {
                var sheetItem = JSONtoARR(raw);
            } else {
                var sheetItem = raw[data[j][0]];
            }
            reverseLineItemMove(item, itemRaw, sheetItem,sheets[i],key);
        }
    }
    
   var removed=[]; 
   for (var j = 0; j < data.length; j++) {
   removed.push(data[j][0]);
   }
   if(key=='delete'){
   return 'Removed: '+removed.join(', ');
   }else{
    return 'Reversed: '+removed.join(', ');

   }
}

function reverseLineItemMove(sheetItem, order, item,sheet,key) {
Logger.log(item);
Logger.log(order);
Logger.log(sheetItem);
 //   var suffix = sheetItem[0].replace(/[^a-zA-Z]+/g, '');


        if (sheet == 'Packaging' && sheetItem[6][0] == 'Not Run') {
            var brandname = getBrandName(order, false);
            var packData = getPackagingData(item.packagingType, item.bottles, order.boxname.sku)
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var suffix = item.batch.substr(-1);
            var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
            var tubes = item.bottles / tube;
            var tomix = order.mixing;
            var tominusP = order.premixed;
            var tominusU = order.unbranded;
            var tominusB = order.branded;
            var tominBPack = order.backtubed;
            if (tube != 0) {
                //WITH PACKAGING
                if (for_branded_stock) {
                    fromReservedToRunning('Packages/' + item.packagingType.sku, tubes - tominBPack);
                } else {
                    var box = tubes / packData.divTubesForBox;
                    if (boxname) {
                        fromReservedToRunning('Boxes/' + boxname, box);
                    }
          
                    fromReservedToRunning('Packages/' + item.packagingType.sku,tubes - tominBPack);
                    var brandname2 = getBrandName(item, true);
                    if (brandname2 != order.productcode) {
                        fromReservedToRunning('BrandedTypes/' + brandname2, tominusB);
                    }
                    fromReservedToRunning('BrandedTypes/' + brandname, tominBPack);
                }
            } else {
                //NO PACKAGING
                if (for_branded_stock) {} else {
                    var box = 0;
                    if (boxname) {
                        fromReservedToRunning('Boxes/' + boxname, box);
                    }
                    fromReservedToRunning('BrandedTypes/' + brandname, tominusB);
                }
            }
            
        } else if (sheet == 'Packaging' && sheetItem[6][0] == 'Completed') {
            var brandname = getBrandName(order, false);
            var packData = getPackagingData(item.packagingType, item.bottles, order.boxname.sku)
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var suffix = item.batch.substr(-1);
            var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
            var tubes = item.bottles / tube;
            var tominusB = order.branded;
            var tominBPack = order.backtubed;
            if (tube != 0) {
                //WITH PACKAGING
                if (for_branded_stock) {
                    fromCompletedToRunning('Packages/' + item.packagingType.sku, tubes - tominBPack);
                    removeFromRunning('BrandedTypes/' + brandname, tubes);
                } else {
                    var box = tubes / packData.divTubesForBox;
                    if (boxname) {
                        fromCompletedToRunning('Boxes/' + boxname, box);
                    }
                    var tomix = order.mixing;
                    var tominusP = order.premixed;
                    var tominusU = order.unbranded;
                    var tominusB = order.branded;
                    var tominBPack = order.backtubed;
                    fromCompletedToRunning('Packages/' + item.packagingType.sku, tubes - tominBPack);
                    var brandname2 = getBrandName(item, true);
                    if (brandname2 != order.productcode) {
                        fromCompletedToRunning('BrandedTypes/' + brandname2, tominusB);
                    }
                    fromCompletedToRunning('BrandedTypes/' + brandname, tominBPack);
                }
            } else {
                //NO PACKAGING
                if (for_branded_stock) {
                    removeFromRunning('BrandedTypes/' + brandname, item.bottles);
                } else {
                    var box = 0;
                    if (boxname) {
                        fromCompletedToRunning('Boxes/' + boxname, box);
                    }
                    fromCompletedToRunning('BrandedTypes/' + brandname, tominusB);
                }
            }
            //  base.removeData('Packaging/'+item[0]);
            ////END FOR PACKAGING
        } else if (sheet == 'Labelling' && sheetItem[5][0] == 'Not Run') {
            var unbrand = getUnbrandName(order);
            var volume = parseInt(item.btype.replace(/\D/g, ''), 10) * item.bottles / 1000;
            var origbots = order.bottles;
            var tomix = order.mixing;
            var tominusP = order.premixed;
            var tominusU = order.unbranded;
            var tominBPack = order.backtubed;
            var leftoverbots = order.branded;
            var botQ2 = item.bottles + leftoverbots;
            var label = order.botlabelsku;
            var packData = getPackagingData(item.packagingType, item.bottles, order.boxname.sku)
                // var packlabel = packData.packlabel;
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var tubes = botQ2 / tube;
            var box = tubes / packData.divTubesForBox;
            if(tube){
              if (item.packlabelsku) {
                
                fromReservedToRunning('Labels/' + item.packlabelsku,  tubes );
              }
            }
            fromReservedToRunning('Labels/' + label, item.bottles );
            var suffix = item.batch.substr(-1);
            var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
            if (for_branded_stock) {
                fromReservedToRunning('UnbrandedTypes/' + unbrand, tominusU);
                if (tube != 0) {} else {
                    var brandname = getBrandName(item, false);
                }
            } else {
                fromReservedToRunning('UnbrandedTypes/' + unbrand, tominusU);
            }
            //REMOVEPACKAGING DATA
            if (tube != 0) {
                var brandname = getBrandName(order, false);
                var packink = packData.ink;
                var tube = packData.botperPack;
                var boxname = order.boxname.sku;
                var suffix = item.batch.substr(-1);
                var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
                var tubes = item.bottles / tube;
                //WITH PACKAGING
                if (for_branded_stock) {
                    fromReservedToRunning('Packages/' + item.packagingType.sku, tubes);
                }
            }
        } else if (sheet == 'Labelling' && sheetItem[5][0] == 'Completed') {
            var unbrand = getUnbrandName(order);
            var volume = parseInt(item.btype.replace(/\D/g, ''), 10) * item.bottles / 1000;
            var origbots = order.bottles;
            var tomix = order.mixing;
            var tominusP = order.premixed;
            var tominusU = order.unbranded;
            var tominBPack = order.backtubed;
            var leftoverbots = order.branded;
            var botQ2 = item.bottles + leftoverbots;
            var label = order.botlabelsku;
            var packData = getPackagingData(item.packagingType, item.bottles, order.boxname.sku)
                // var packlabel = packData.packlabel;
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var tubes = botQ2 / tube;
            var box = tubes / packData.divTubesForBox;
            if(tube){
              if (item.packlabelsku) {
                fromCompletedToRunning('Labels/' + item.packlabelsku, tubes);
              }
            }
            fromCompletedToRunning('Labels/' + label, item.bottles);
            var suffix = item.batch.substr(-1);
            var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
            if (for_branded_stock) {
                fromCompletedToRunning('UnbrandedTypes/' + unbrand, tominusU);
                if (tube != 0) {} else {
                    var brandname = getBrandName(item, false);
                    removeFromRunning('BrandedTypes/' + brandname, item.bottles);
                }
            } else {
                fromCompletedToRunning('UnbrandedTypes/' + unbrand, tominusU);
            }
            //END FOR LABELLING
        } else if (sheet == 'Printing' && sheetItem[4][0] == 'Not Run') {
            var packData = getPackagingData(item.packagingType, item.bottles + order.branded, order.boxname.sku)
                //   var packlabel = packData.packlabel;
            var packink = packData.ink;
            var tube = packData.botperPack;
            var tubes = item.bottles / tube;
            var ink = 0;
            if (!item.ppb) {
                ink = item.bottles * 0.001;
            }
            if (!item.ppp) {
                ink += packink;
            }
            fromReservedToRunning("Misc/printing ink", ink);
            // toLabelling(item);
            //REMOVE LABELLING ITEMS
            var unbrand = getUnbrandName(order);
            var volume = parseInt(item.btype.replace(/\D/g, ''), 10) * item.bottles / 1000;
            var origbots = order.bottles;
            var tomix = order.mixing;
            var tominusP = order.premixed;
            var tominusU = order.unbranded;
            var tominBPack = order.backtubed;
            var leftoverbots = order.branded;
            var botQ2 = item.bottles + leftoverbots;
            var label = order.botlabelsku;
            var packData = getPackagingData(item.packagingType, item.bottles, order.boxname.sku)
                // var packlabel = packData.packlabel;
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var tubes = botQ2 / tube;
            var box = tubes / packData.divTubesForBox;
                if(tube){
            if (item.packlabelsku) {
      
                fromReservedToRunning('Labels/' + item.packlabelsku, tubes);
            }
            }
            fromReservedToRunning('Labels/' + label, item.bottles);
            var suffix = item.batch.substr(-1);
            var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
            if (for_branded_stock) {
                fromReservedToRunning('UnbrandedTypes/' + unbrand, tominusU);
                if (tube != 0) {} else {
                    var brandname = getBrandName(item, false);
                }
            } else {
                fromReservedToRunning('UnbrandedTypes/' + unbrand, tominusU);
            }
            //REMOVEPACKAGING DATA
            if (tube != 0) {
                if (for_branded_stock) {
                    var brandname = getBrandName(order, false);
                    var packink = packData.ink;
                    var tube = packData.botperPack;
                    var boxname = order.boxname.sku;
                    var suffix = item.batch.substr(-1);
                    var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
                    var tubes = item.bottles / tube;
                    //WITH PACKAGING
                    fromReservedToRunning('Packages/' + item.packagingType.sku, tubes - tominBPack);
                }
            }
        } else if (sheet == 'Printing' && sheetItem[4][0] == 'Completed') {
            var packData = getPackagingData(item.packagingType, item.bottles + order.branded, order.boxname.sku)
                //   var packlabel = packData.packlabel;
            var packink = packData.ink;
            var tube = packData.botperPack;
            var tubes = item.bottles / tube;
            var ink = 0;
            if (!item.ppb) {
                ink = item.bottles * 0.001;
            }
            if (!item.ppp) {
                ink += packink;
            }
            fromCompletedToRunning("Misc/printing ink", ink);
            //END OF PRINTING
        } else if (sheet == 'Production' && sheetItem[3][0] == 'Not Run') {
            fromReservedToRunning('Lids/' + item.lidSKU, item.bottles);
            fromReservedToRunning('BottleTypes/' + item.botSKU, item.bottles);
            var premix = getPremixSKU(order);
            var unbrand = getUnbrandName(order);
            var suffix = item.batch.substr(-1);
            var for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX ? true : false;
            if(!for_unbranded_stock){
            suffix = item.batch.substr(-2);
            for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX2 ? true : false;
            }
            var volume = parseInt(item.btype.replace(/\D/g, ''), 10) * item.bottles / 1000;
            if (for_unbranded_stock) {
                var tomix = order.mixing;
                if (tomix > 0) {
                    fromReservedToRunning('PremixesTypes/' + premix, tomix);
                }
                // UtoRunning(unbrand, item.bottles);
            } else {
                var tomix = order.mixing;
                var tominusP = order.premixed;
                var tominusU = order.unbranded;
                volume = volume - tomix - (tominusU / 1000 * order.fill);
                if (tominusP > 0) {
                    fromReservedToRunning('PremixesTypes/' + premix, tominusP);
                }
            }
            if (item.hasoverprod) {
                var overprodvol = item.overprod * order.fill / 1000;
                fromReservedToRunning('PremixesTypes/' + premix, overprodvol);
                //  UtoRunning(unbrand, item.overprod);
            }
        } else if (sheet == 'Production' && sheetItem[3][0] == 'Completed') {
            fromCompletedToRunning('Lids/' + item.lidSKU, item.bottles);
            fromCompletedToRunning('BottleTypes/' + item.botSKU, item.bottles);
            var premix = getPremixSKU(order);
            var unbrand = getUnbrandName(order);
            var suffix = item.batch.substr(-1);
            var for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX ? true : false;
                  if(!for_unbranded_stock){
            suffix = item.batch.substr(-2);
            for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX2 ? true : false;
            }
            var volume = parseInt(item.btype.replace(/\D/g, ''), 10) * item.bottles / 1000;
            if (for_unbranded_stock) {
                var tomix = order.mixing;
                if (tomix > 0) {
                    fromCompletedToRunning('PremixesTypes/' + premix, tomix);
                }
                removeFromRunning('UnbrandedTypes/' + unbrand, item.bottles);
            } else {
                var tomix = order.mixing;
                var tominusP = order.premixed;
                var tominusU = order.unbranded;
                volume = volume - tomix - (tominusU / 1000 * order.fill);
                if (tominusP > 0) {
                    fromCompletedToRunning('PremixesTypes/' + premix, tominusP);
                }
            }
            if (item.hasoverprod) {
                var overprodvol = item.overprod * order.fill / 1000;
                fromCompletedToRunning('PremixesTypes/' + premix, overprodvol);
                removeFromRunning('UnbrandedTypes/' + unbrand, item.overprod);
            }
        } else if (sheet == 'MixingTeam' && sheetItem[2][0] != 'N/A') {
            var MixingGroups = [];
            for (var m = 0; m < item.length; m++) {
            if(item[m].Batches){
                var Batches = Object.keys(item[m].Batches);
             }else{
              var Batches =[];
             }
                if (Batches.indexOf(sheetItem[0]) != -1) {
                    MixingGroups.push([item[m].Batches[sheetItem[0]], item[m].movedtoNext, item[m]])
                }
            }
            for (var m = 0; m < MixingGroups.length; m++) {
                var batchitem = MixingGroups[m][0];
                var status = MixingGroups[m][1];
                var mixbatch = MixingGroups[m][2];
                if (status == 0) {
                    fromReservedToRunning("Flavours/" + batchitem.flavour.sku, batchitem.flavvalue * batchitem.QTY / 1000);
                    fromReservedToRunning("Misc/VG", batchitem.VGval * batchitem.QTY);
                    if (isNaN(batchitem.AGval)) {
                        batchitem.AGval = 0;
                    }
                    fromReservedToRunning("Misc/AG", batchitem.AGval * batchitem.QTY);
                    fromReservedToRunning("Misc/PG", batchitem.PGval * batchitem.QTY);
                    if (isNaN(batchitem.MCTval)) {
                        batchitem.MCTval = 0;
                    }
                    fromReservedToRunning("Misc/MCT", batchitem.MCTval * batchitem.QTY);
                    if (batchitem.Nico) {
                        fromReservedToRunning("Misc/Nicotine", batchitem.Nico * batchitem.QTY);
                    } 
                    if (batchitem.Nicosalts) {
                        fromReservedToRunning("Misc/Nicotine Salts", batchitem.Nicosalts * batchitem.QTY);
                    }
                   if (batchitem.CBDvalue) {
                        fromReservedToRunning("Misc/CBD", batchitem.CBDvalue * batchitem.QTY);
                    }
                    var order = base.getData('Orders/' + batchitem.batch);
                    var item = base.getData('Mixing/' + batchitem.batch);
                    var suffix = item.batch.substr(-1);
                    var for_premixed_stock = suffix == PREMIX_STOCK_SUFFIX ? true : false;
                    var premix = getPremixSKU(order,false);
                    if (for_premixed_stock) {
                      if(item.Color){
                        fromReservedToRunning('PremixesTypes/' + premix, batchitem.QTY);
                      }
                    } else {
                        if (item.haspremix) {
                         base.removeData('Orders/' + item.dudpremixCode);
                            if (!item.markedPremix) {}
                        }
                    }
                } else if (status == 1) {
                    fromCompletedToRunning("Flavours/" + batchitem.flavour.sku, batchitem.flavvalue * batchitem.QTY / 1000);
                    fromCompletedToRunning("Misc/VG", batchitem.VGval * batchitem.QTY);
                    if (isNaN(batchitem.AGval)) {
                        batchitem.AGval = 0;
                    }
                    fromCompletedToRunning("Misc/AG", batchitem.AGval * batchitem.QTY);
                    fromCompletedToRunning("Misc/PG", batchitem.PGval * batchitem.QTY);
                    if (isNaN(batchitem.MCTval)) {
                        batchitem.MCTval = 0;
                    }
                    fromCompletedToRunning("Misc/MCT", batchitem.MCTval * batchitem.QTY);
                    if (batchitem.Nico) {
                      fromCompletedToRunning("Misc/Nicotine", batchitem.Nico * batchitem.QTY);
                    } if (batchitem.Nicosalts) {
                      fromCompletedToRunning("Misc/Nicotine Salts", batchitem.Nicosalts * batchitem.QTY);
                    } 
                    if (batchitem.CBDvalue) {
                      fromCompletedToRunning("Misc/CBD", batchitem.CBDvalue * batchitem.QTY);
                    }
                    var order = base.getData('Orders/' + batchitem.batch);
                    var item = base.getData('Mixing/' + batchitem.batch);
                    var suffix = item.batch.substr(-1);
                    var for_premixed_stock = suffix == PREMIX_STOCK_SUFFIX ? true : false;
                    var premix = getPremixSKU(order,false);
                    if (for_premixed_stock) {
                        if(item.Color){
                         fromCompletedToRunning('PremixesTypes/' + premix, batchitem.QTY);
                        }else{
                         removeFromRunning('PremixesTypes/' + premix, batchitem.QTY);
                        }
                    } else {
                     if(item.Color){
                       var tomix = order.mixing;
                       batchitem.QTY = batchitem.QTY;
                       fromCompletedToRunning('PremixesTypes/' + premix, batchitem.QTY);
                       if (item.haspremix) {
                         base.removeData('Orders/' + item.dudpremixCode);
                         if (item.markedPremix) {
                           removeFromRunning('PremixesTypes/' + premix, item.forpremix);
                           var dat3 = {
                             markedPremix: false,
                           };
                           base.updateData('Mixing/' +batchitem.batch, dat3);
                         }
                       }
                     }else{
                        var tomix = order.mixing;
                        batchitem.QTY = batchitem.QTY;
                        removeFromRunning('PremixesTypes/' + premix, batchitem.QTY);
                        if (item.haspremix) {
                          base.removeData('Orders/' + item.dudpremixCode);
                            if (item.markedPremix) {
                                removeFromRunning('PremixesTypes/' + premix, item.forpremix);
                              var dat3 = {
                                markedPremix: false,
                              };
                              base.updateData('Mixing/' +batchitem.batch, dat3);
                            }
                        }
                      }  
                    }
                }
                mixbatch.QTYTOTAL = mixbatch.QTYTOTAL - batchitem.QTY;
                if (mixbatch.QTYTOTAL == 0) {
                    base.removeData('MixingTeam/' + mixbatch.MIXNAME);
                } else {
                    delete mixbatch.Batches[batchitem.batch];
                    base.updateData('MixingTeam/' + mixbatch.MIXNAME, mixbatch);
                }
            }
        } else if (sheet == 'Orders') {
            var inPremixColoring=base.getData('PremixColoring/'+sheetItem[0]);
            if(inPremixColoring){
            var premix = getPremixSKU(order,true);
              if(inPremixColoring.final_status == 1){
               fromCompletedToRunning("Color/"+item.Color.sku, item.QTY*10*item.Color.val);
                if (for_premixed_stock) {
                  removeFromRunning('PremixesTypes/'+premix, item.QTY);
                } else {
                  fromCompletedToRunning('PremixesTypes/'+premix, order.coloredpremix);
                }
               
               
              }else{
               fromReservedToRunning("Color/"+item.Color.sku, item.QTY*10*item.Color.val);
                if (for_premixed_stock) {
                 
                } else {
                 fromReservedToRunning('PremixesTypes/'+premix, order.coloredpremix);
                }     
              
              }
                base.removeData('PremixColoring/' + sheetItem[0]);
            }
            
            
          base.removeData('Mixing/' + sheetItem[0]);
          base.removeData('Production/' + sheetItem[0]);
          base.removeData('Printing/' + sheetItem[0]);
          base.removeData('Labelling/' + sheetItem[0]);
          base.removeData('Packaging/' + sheetItem[0]);
          base.removeData('Shipping/' + sheetItem[0]);
          if(key=='delete'){
            LogDARTransaction(sheetItem[0]);
            base.removeData('Orders/' + sheetItem[0]);
          
          }else{
            var data= {
              final_status:0,
              runtime: 0,
              started: 0,
            }
            data.removedProduction = 0
            data.partialProduction = 0;
            data.partialPackaging = 0;
            data.removedPackaging = 0
            data.saved = true;
            data.unbranded = 0;
            data.branded = 0;
            data.premixed = 0;
            data.recipe.Coloredpremix = 0;
            data.mixing = 0;
            data.backtubed = 0;
            data.mixing_status = 0;
            data.production_status = 0;
            data.printing_status = 0;
            data.labeling_status = 0;
            data.packaging_status = 0;
              data.wentNegative=false;
               LogRTransaction(sheetItem[0]);
              base.updateData('Orders/' + sheetItem[0],data);
          }
        }
   
}