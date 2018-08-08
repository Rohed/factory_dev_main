function testsave() {
    var sheet = 'Production';
    var obj = {
        Location: 'Location',
        CompletionDate: 'CompletionDate',
        Completed: 'Completed and Labelled',
        batch: (914081).toString()

    };
    saveItemSL(obj, sheet)

}

function saveItemSL(obj, sheet) {
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Edit SL sheet Item',
        batch: obj.batch,
        page: sheet,
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    base.updateData(sheet + '/' + obj.batch, obj);
    if (obj.Completed == 'Completed') {
        obj.CompletionDate = new Date().getTime();
        obj.prodDate = new Date().getTime();
        obj.movedtoNext = 1;
        base.updateData(sheet + '/' + obj.batch, obj);
        LOGDATA.data.push(['Marked Completed:', obj.batch]);
        logItem(LOGDATA);
        var rez = MoveItem(obj.batch, sheet);
        if(sheet!='MixingTeam'&&sheet!='PremixColoring'&&sheet!='FlavourMixMixingTeam'){
        changePriority(sheet,obj.batch);
        }
        return 'Success. ' + rez[0];
    } else if (obj.Completed == 'Completed and Labelled') {
        LOGDATA.data.push(['Marked Completed and Labelled:', obj.batch]);
        logItem(LOGDATA);
        obj.CompletionDate = new Date().getTime();
        obj.prodDate = new Date().getTime();
        obj.movedtoNext = 1;
        base.updateData(sheet + '/' + obj.batch, obj);

        var rez = MoveItem(obj.batch, sheet);

        var inPrint = base.getData('Printing/' + obj.batch);
        if(inPrint){
          if (inPrint.final_status == 'Completed') {} else {
            
            base.updateData('Printing/' + obj.batch, obj);
            
            var rez = MoveItem(obj.batch, 'Printing');
          }
        }


        base.updateData('Labelling/' + obj.batch, obj);

        var rez = MoveItem(obj.batch, 'Labelling');
        return 'Success. ' + rez[0];

    }

    return 'Success';
}


function getMixingItemData(batch) {
    return base.getData('MixingTeam/' + batch);

}

function getFlavourMixMixingItemData(batch) {
    return base.getData('FlavourMixMixingTeam/' + batch);

}
function getFlavourMixMixingItemData(batch) {
    return base.getData('FlavourMixMixingTeam/' + batch);

}
function getItemPage(batch,page) {
    return base.getData(page+'/' + batch);

}
function getProductionItemData(batch) {
    return base.getData('Production/' + batch);

}

function getPrintingItemData(batch) {
    return base.getData('Printing/' + batch);

}

function getLabellingItemData(batch) {
    return base.getData('Labelling/' + batch);

}

function getPackagingItemData(batch) {
    return base.getData('Packaging/' + batch);

}

function runBusy(batch, page) {
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Marked Busy',
        batch: batch,
        page: page,
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    try {

        var order = base.getData('Orders/' + batch);

        var dat = {
            movedtoNext: "Busy",
            starttime: (new Date()).getTime(),
        };
        base.updateData(page + '/' + batch, dat);
        var data = base.getData(page + '/' + batch);
        if (page == 'MixingTeam') {
            var MIXBATCH = base.getData('MixingTeam/' + batch);
            var batches = getBatchesInMIXBATCH(MIXBATCH);
            for (var i = 0; i < batches.length; i++) {
                var dat1 = {
                    starttime: (new Date()).getTime(),
                    movedtoNext: "Busy"

                };
                var dat2 = {
                    mixing_status: "Busy"
                };
                base.updateData('Mixing/' + batches[i].batch, dat1);
                base.updateData('Orders/' + batches[i].batch, dat2);
            }

        }  else {

            if (page == 'Production') {

                data.production_status = "Busy"
                order.production_status = "Busy"

            } else if (page == 'Printing') {
                var d = new Date();
                var year = d.getFullYear();
                var month = d.getMonth();
                var day = d.getDate() + 1;
                data.expDate = Utilities.formatDate(new Date(year + 2, month, day), "GMT", "dd-MM-yyyy");

                data.printing_status = "Busy"
                order.printing_status = "Busy"
            } else if (page == 'Labelling') {


                data.labelling_status = "Busy"
                order.labelling_status = "Busy"

            } else if (page == 'Packaging') {


                data.packaging_status = "Busy"
                order.packaging_status = "Busy"

            } else if(page=='FlavourMixMixingTeam'){
              data.final_status='Busy';
              data.starttime= (new Date()).getTime();
              
            } else if(page=='PremixColoring'){
              data.final_status='Busy';
              data.starttime= (new Date()).getTime();
              
            }
            base.updateData(page + '/' + batch, data);
          if(page!='FlavourMixMixingTeam'&&page!='PremixColoring'){
            base.updateData('Orders/' + batch, order);
          }
        }
        LOGDATA.data.push(['Marked Busy:', batch]);
        logItem(LOGDATA);
        return 'Success';
    } catch (e) {
        return e.message;
    }

}

function overProd(batch, newBottles, sheet) {
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Marked Overprod',
        batch: batch,
        page: sheet,
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    LOGDATA.data.push(['New Bottle Count:', newBottles]);
    if (sheet == 'Production') {
        var data = base.getData('Production/' + batch);
        var order = base.getData('Orders/' + batch);
        var object = {
            batch: data.batch + "OV",
            fill: order.fill,
            productcode: order.productcode,
            productdescription: order.productdescription,
            orderdate: data.orderdate,

            priority: data.priority,
            customer: '',
            brand: '',
            flavour: data.flavour,
            bottles: newBottles - data.bottles,
            stocking: 0,
            btype: data.btype,
            lid: data.lid,
            botSKU: data.botSKU,
            lidSKU: data.lidSKU,
            packaging: '',
            packagingType: {
                sku: '',
                name: '',
            },
            orderID: ''
        };
        object.recipe = data.recipe;
        object.final_status = 'started';
        LOGDATA.data.push(['New Order:', data.batch + "OV"]);
        saveOrder(object);
        fromRunningtoReserved('Lids/' + data.lidSKU, newBottles - data.bottles);
        LOGDATA.data.push(['To Reserved:' + data.lidSKU, newBottles - data.bottles]);
        fromRunningtoReserved('BottleTypes/' + data.botSKU, newBottles - data.bottles);
        LOGDATA.data.push(['To Reserved:' + data.botSKU, newBottles - data.bottles]);
        if(order.Color){
        var premix = getPremixSKU(order,true);
        }else{
        var premix = getPremixSKU(order,false);
        }
        var volume = order.fill * (newBottles - data.bottles) / 1000;

        PtoReserved(premix, volume)
        LOGDATA.data.push(['To Reserved:' + premix, volume]);
        object.final_status = "Busy"
        toProduction(object);
        data.hasoverprod = true;
        data.overprod = newBottles - data.bottles;
        data.overprodbatch = data.batch + "OV";

        logItem(LOGDATA);
        base.updateData('Production/' + batch, data);
    }
}