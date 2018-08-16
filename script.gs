function toPremixColoring(data){

  var mixingData = base.getData('PremixColoring');
    var mixARR = [];
    if (mixingData) {
    var result = JSONtoARR(mixingData);
        var row = result.length + 1;
    } else {
        var row = 1;
    }
    var PC=base.getData('References/ProductCodes/'+data.productcode);
      if(PC){
        data.premixSKUColored=PC.premixSKUColored;
        data.premixdescrColored=PC.premixdescrColored;
        data.premixdescr=PC.premixdescr;
        data.premixSKU=PC.premixSKU;
      }

        data.starttime=0;
        data.final_status=0;
        data.CompletionDate='';
        data.Completed=0;
        data.Notes='';
        data.movedtoNext=0;
        data.ColorQTY=data.recipe.Color.val*data.QTY*10;
        data.Location=0;
        data.row=row;
        data.userset=false;
        data.movedtoNext=0;

    base.updateData('PremixColoring/' + data.batch, data);


}


function toPrinting(data) {
    var dat = base.getData('Printing');
    var mixARR = [];
    if (dat) {
        var result = Object.keys(dat).map(function(key) {
            return [Number(key), dat[key]];
        });
        var row = result.length + 1;
    } else {
        var row = 1;
    }
    var dat1 = {
        'numLabelsBottles': data.numLabelsBottles,
        'numLabelsTubes': data.numLabelsTubes,
        'boxname': data.boxname,
        'priority': data.priority,
        'recipe': data.recipe,
        'batch': data.batch,
        'flavour': data.flavour,
        'orderdate': data.orderdate,
        'customer': data.customer,
        'brand': data.brand,
        'bottles': data.bottles,
        'btype': data.btype,
        'lid': data.lid,
        'fill': data.fill,
        'botSKU': data.botSKU,
        'lidSKU': data.lidSKU,
        'packaging': data.packaging,
        'ProductionCompleted': data.toproduction,
        'Completed': 0,
        'starttime': 0,
        'CompletionDate': '',
        'Location': '',
        'row': row,
        'userset': false,
        'movedtoNext': 0,
        'packagingType': data.packagingType,
        'final_status': 0,
        'bsize': parseInt(data.btype.replace(/\D/g, ''), 10),
        'productcode': data.productcode,
        'productdescription': data.productdescription,
        botlabel: data.botlabel,
        botlabelsku: data.botlabelsku,
        packlabel: data.packlabel,
        packlabelsku: data.packlabelsku,
        ppp: data.ppp,
        ppb: data.ppb,
        customerSKU: data.customerSKU,
        brandSKU: data.brandSKU,
    };
    base.updateData('Printing/' + data.batch, dat1);
}

function toLabelling(data) {
    var dat = base.getData('Labelling');
    var mixARR = [];
    if (dat) {
        var result = Object.keys(dat).map(function(key) {
            return [Number(key), dat[key]];
        });
        var row = result.length + 1;
    } else {
        var row = 1;
    }
    var dat1 = {
        botlabel: data.botlabel,
        botlabelsku: data.botlabelsku,
        packlabel: data.packlabel,
        packlabelsku: data.packlabelsku,
        'boxname': data.boxname,
        'priority': data.priority,
        'recipe': data.recipe,
        'batch': data.batch,
        'flavour': data.flavour,
        'orderdate': data.orderdate,
        'customer': data.customer,
        'brand': data.brand,
        'bottles': data.bottles,
        'btype': data.btype,
        'lid': data.lid,
        'fill': data.fill,
        'botSKU': data.botSKU,
        'lidSKU': data.lidSKU,
        'packagingType': data.packagingType,
        'packaging': data.packaging,
        'ProductionCompleted': data.toproduction,
        'PrintingCompleted': data.toprinting,
        'Completed': 0,
        'starttime': 0,
        'CompletionDate': '',
        'Location': '',
        'row': row,
        'userset': false,
        'movedtoNext': 0,
        'final_status': 0,
        'bsize': parseInt(data.btype.replace(/\D/g, ''), 10),
        'machineL': data.machineL,
        'productcode': data.productcode,
        'productdescription': data.productdescription,
        ppp: data.ppp,
        ppb: data.ppb,
        customerSKU: data.customerSKU,
        brandSKU: data.brandSKU,
    };
    base.updateData('Labelling/' + data.batch, dat1);
}

function toProduction(data) {
    var dat = base.getData('Production');
    var mixARR = [];
    if (dat) {
        var result = Object.keys(dat).map(function(key) {
            return [Number(key), dat[key]];
        });
        var row = result.length + 1;
    } else {
        var row = 1;
    }
    var dat1 = {
        botlabel: data.botlabel,
        botlabelsku: data.botlabelsku,
        packlabel: data.packlabel,
        packlabelsku: data.packlabelsku,
        'boxname': data.boxname,
        'priority': data.priority,
        'recipe': data.recipe,
        'batch': data.batch,
        'flavour': data.flavour,
        'orderdate': data.orderdate,
        'customer': data.customer,
        'brand': data.brand,
        'bottles': data.bottles,
        'btype': data.btype,
        'lid': data.lid,
        'fill': data.fill,
        'botSKU': data.botSKU,
        'lidSKU': data.lidSKU,
        'packagingType': data.packagingType,
        'packaging': data.packaging,
        'mixing_status': data.toMixingTeam,
        'Completed': 0,
        'starttime': 0,
        'CompletionDate': '',
        'Location': '',
        'row': row,
        'userset': false,
        'final_status': 0,
        'movedtoNext': 0,
        'bsize': parseInt(data.btype.replace(/\D/g, ''), 10),
        'machineP': data.machineP,
        'productcode': data.productcode,
        'productdescription': data.productdescription,
        customerSKU: data.customerSKU,
        brandSKU: data.brandSKU,
    };
    if (data.final_status) {
        dat1.final_status = data.final_status;
    } else {
        dat1.final_status = 0;
    }
    //    if (data.recipe.name.match('Nicotine')) {
    //        dat1.nic = data.recipe.nic;
    //    } else {
    //        dat1.cbd = data.recipe.cbd;
    //    }
    base.updateData('Production/' + data.batch, dat1);
}

function toPackaging(data) {
    var dat = base.getData('Packaging');
    var mixARR = [];
    if (dat) {
        var result = Object.keys(dat).map(function(key) {
            return [Number(key), dat[key]];
        });
        var row = result.length + 1;
    } else {
        var row = 1;
    }
    var dat1 = {
        botlabel: data.botlabel,
        botlabelsku: data.botlabelsku,
        packlabel: data.packlabel,
        packlabelsku: data.packlabelsku,
        'boxname': data.boxname,
        'priority': data.priority,
        'recipe': data.recipe,
        'batch': data.batch,
        'flavour': data.flavour,
        'orderdate': data.orderdate,
        'customer': data.customer,
        'brand': data.brand,
        'bottles': data.bottles,
        'btype': data.btype,
        'lid': data.lid,
        'fill': data.fill,
        'botSKU': data.botSKU,
        'lidSKU': data.lidSKU,
        'packagingType': data.packagingType,
        'packaging': data.packaging,
        'PrintingCompleted': data.toprinting,
        'ProductionCompleted': data.toproduction,
        'PackagingCompleted': 0,
        'Completed': 0,
        'starttime': 0,
        'CompletionDate': '',
        'Location': '',
        'row': row,
        'userset': false,
        'movedtoNext': 0,
        'final_status': 0,
        'bsize': parseInt(data.btype.replace(/\D/g, ''), 10),
        'productcode': data.productcode,
        'productdescription': data.productdescription,
        customerSKU: data.customerSKU,
        brandSKU: data.brandSKU,
    };
    base.updateData('Packaging/' + data.batch, dat1);
}

function testMixMake() {
    var data = {
        Nico: 105,
        Nicotrecipe: 420,
        PGrecipe: 1616,
        PGval: 404,
        QTY: 4,
        VGrecipe: 1688,
        VGval: 422,
        backtubed: 0,
        batch: "3333S",
        brand: "",
        branded: 0,
        btype: "",
        customer: "",
        final_status: "started",
        flavour: "Apple",
        flavrecipe: 0.8,
        flavvalue: 200,
        labeling_status: 0,
        lid: "",
        mixing: 0,
        mixing_status: 0,
        orderdate: "2017-09-20",
        packaging: "",
        packaging_status: 0,
        premixed: 0,
        printing_status: 0,
        priority: "",
        production_status: 0,
        recipe: {
            name: "VG/PG : 40 / 60 Nicotine : 6MG",
            nic: 6,
            ratio: "4060"
        },
        saved: true,
        stocking: 4,
        unbranded: 0
    };
    createMixOrder(data);
}

function getBatchesInMIXBATCH(mixbatch) {
    var mixARR = [];
    if (mixbatch.Batches) {
        var result = Object.keys(mixbatch.Batches).map(function(key) {
            return [Number(key), mixbatch.Batches[key]];
        });
        for (var i = 0; i < result.length; i++) {
            mixARR.push(result[i][1]);
        }
    }
    return mixARR;
}

function createMixOrder(data) {
    var LOGARR = [];
    try {
        var orig = {
            'recipe': data.recipe,
            'batch': data.batch,
            'flavour': data.flavour,
              'brand': data.brand,
            'orderdate': data.orderdate,
            'QTY': data.QTY,
            'VGval': data.VGval,
            'PGval': data.PGval,
            'flavvalue': data.flavvalue,
            'MCTval': data.MCTval,
            'flavrecipe': data.flavrecipe,
            'VGrecipe': data.VGrecipe,
            'PGrecipe': data.PGrecipe,
            'MCTval': data.MCTval,
            'MCTrecipe': data.MCTrecipe,
            'AGval': data.AGval,
            'AGrecipe': data.AGrecipe,
            'customer': data.customer,
            'orderID': data.orderID,
            'starttime': 0,
            'CompletionDate': '',
            'Completed': 0,
            'Notes': '',
            'movedtoNext': 0,
            'priority': data.priority,
            'Location': 0,
            'productcode': data.productcode,
            'productdescription': data.productdescription
        };
        if (data.haspremix) {
            orig.haspremix = true;
            var dudcode = data.dudpremixCode
            orig.dudpremixCode = dudcode;
            var forpremix = data.forpremix
            orig.forpremix = forpremix;
        } else {
            orig.haspremix = false;
        }
       
            orig.Nico = data.Nico;
            orig.Nicotrecipe = data.Nicotrecipe;
           orig.Nicosalts = data.Nicosalts;
            orig.Nicotrecipesalts = data.Nicotrecipesalts;
       
            orig.CBDvalue = data.CBDvalue;
            orig.CBDrecipe = data.CBDrecipe;
       
        var mixingData = base.getData('MixingTeam');
        var mixARR = [];
        if (mixingData) {
            var result = Object.keys(mixingData).map(function(key) {
                return [Number(key), mixingData[key]];
            });
            for (var i = 0; i < result.length; i++) {
                mixARR.push(result[i][1]);
            }
        }
        var SPLIT = 0;
        var splitMultiples = [];
        if (data.QTY > 25) {
            for (var i = 25; i < data.QTY;) {
                splitMultiples.push(25);
                SPLIT++;
                data.QTY = data.QTY - 25;
            }
            for (var i = 0; i < splitMultiples.length; i++) {
                var newData = {
                    'recipe': data.recipe,
                    'batch': data.batch,
                    'flavour': data.flavour,
                    'orderdate': data.orderdate,
                    'QTY': splitMultiples[i],
                    'VGval': data.VGval,
                    'PGval': data.PGval,
                    'MCTval': data.MCTval,
                    'AGval': data.AGval,
                      'brand': data.brand,
                    'MCTrecipe': data.MCTrecipe,
                    'flavvalue': data.flavvalue,
                    'flavrecipe': data.flavrecipe,
                    'VGrecipe': data.VGrecipe,
                    'PGrecipe': data.PGrecipe,
                    'AGrecipe': data.AGrecipe,
                    'customer': data.customer,
                    'orderID': data.orderID,
                    'starttime': 0,
                    'CompletionDate': '',
                    'Completed': 0,
                    'Notes': '',
                    'movedtoNext': 0,
                    'priority': data.priority,
                    'Location': 0,
                    'productcode': data.productcode,
                    'productdescription': data.productdescription
                };
              
                    newData.Nico = data.Nico;
                    newData.Nicotrecipe = data.Nicotrecipe;
                    newData.Nicosalts = data.Nicosalts;
                    newData.Nicotrecipesalts = data.Nicotrecipesalts;
                    
                    newData.CBDvalue = data.CBDvalue;
                    newData.CBDrecipe = data.CBDrecipe;
             
                LOGARR.push(['Sent to Mixing Team:', newData.QTY]);
                toMixingTeam(newData, true, '');
            }
        }
        orig.split = SPLIT;
        if (data.QTY == 0) {
            return 'Success';
        }
        if (mixARR.length) {
            for (var i = 0; i < mixARR.length; i++) {
                if (data.QTY == 0) {
                    return 'Success';
                }
                var addToOld = {
                    'check': false,
                    'amount': 0
                };
                var createNew = {
                    'check': false,
                    'amount': 0
                };
                var found = false;
                if ((mixARR[i].FLAVOUR == data.flavour.name) && (mixARR[i].RECIPE == data.recipe.name) && (mixARR[i].movedtoNext == 0)) {
                    var combined = mixARR[i].QTYTOTAL + data.QTY;
                    var total = mixARR[i].QTYTOTAL;
                    if (combined <= 25) {
                        addToOld.check = true;
                        addToOld.amount = data.QTY;
                        SPLIT++;
                    } else if (total < 25) {
                        addToOld.check = true;
                        addToOld.amount = 25 - mixARR[i].QTYTOTAL;
                        createNew.check = true;
                        createNew.amount = data.QTY - (25 - mixARR[i].QTYTOTAL);
                        SPLIT += 2;
                    } else {
                        continue;
                    }
                    if (addToOld.check) {
                        data.QTY = addToOld.amount;
                        toMixingTeam(data, false, mixARR[i]);
                        found = true;
                        data.QTY = data.QTY - addToOld.amount;
                        if (createNew.check == false) {
                            break;
                        }
                    }
                    if (createNew.check) {
                        data.QTY = createNew.amount;
                        LOGARR.push(['Sent to Mixing Team:', data.QTY]);
                        toMixingTeam(data, true, '');
                        data.QTY = data.QTY - createNew.amount;
                        break;
                    }
                }
            }
            if (!found) {
                LOGARR.push(['Sent to Mixing Team:', data.QTY]);
                toMixingTeam(data, true, '');
                SPLIT++;
            }
            orig.split = SPLIT;
            LOGARR.push(['Sent to Mixing:', orig.QTY]);
            LOGARR.push(['Mixing Split(s):', SPLIT]);
            toMixing(orig);
        } else {
            SPLIT++;
            orig.split = SPLIT;
            LOGARR.push(['Sent to Mixing Team:', data.QTY]);
            LOGARR.push(['Mixing Split(s):', SPLIT]);
            toMixingTeam(data, true, '');
            toMixing(orig);
        }
        // return true;
    } catch (e) {
        LOGARR.push(['Failed at Mixing Split(s):', e.message]);
        //  return e.message;
    }
    return LOGARR;
}

function toMixingTeam(data, createNew, old) {
    if (createNew) {
        var mixingData = base.getData('MixingTeam');
        var mixARR = [];
        if (mixingData) {
            var result = Object.keys(mixingData).map(function(key) {
                return [Number(key), mixingData[key]];
            });
            var row = result.length + 1;
            if (result[result.length - 1][1].MIXNAME) {
                var mix = result[result.length - 1][1].MIXNAME;
            } else {
                var mix = result[result.length - 2][1].MIXNAME;
            }
            var batchNo = parseInt(mix.substring(6), 10) + 1;
        } else {
            var row = 1;
            var batchNo = 1;
        }
        var mixingData = {
            'recipe': data.recipe,
            'batch': data.batch,
            'flavour': data.flavour,
            'orderdate': data.orderdate,
            'QTY': data.QTY,
            'mix_batch_code': 'GBVCO' + (30000 + batchNo),
            'VGval': data.VGval,
            'PGval': data.PGval,
            'customer': data.customer,
            'orderID': data.orderID,
              'brand': data.brand,
            'MCTval': data.MCTval,
            'MCTrecipe': data.MCTrecipe,
            'AGval': data.AGval,
            'AGrecipe': data.AGrecipe,
            'flavvalue': data.flavvalue,
            'flavrecipe': data.flavrecipe,
            'VGrecipe': data.VGrecipe,
            'PGrecipe': data.PGrecipe,
            'starttime': 0,
            'CompletionDate': '',
            'Completed': 0,
            'Notes': '',
            'priority': data.priority,
            'Location': 0
        };
        if (data.haspremix) {
            mixingData.haspremix = true;
            var dudcode = data.dudpremixCode
            mixingData.dudpremixCode = dudcode;
            var forpremix = data.forpremix
            mixingData.forpremix = forpremix;
        } else {
            mixingData.haspremix = false;
        }
    
            mixingData.Nico = data.Nico;
            mixingData.Nicotrecipe = data.Nicotrecipe;
            mixingData.Nicosalts = data.Nicosalts;
            mixingData.Nicotrecipesalts = data.Nicotrecipesalts;
            
      
            mixingData.CBDvalue = data.CBDvalue;
            mixingData.CBDrecipe = data.CBDrecipe;
        
        var MIXBATCH = {
            orderdate: Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy"),
            QTYTOTAL: data.QTY,
            MIXNAME: mixingData.mix_batch_code,
            FLAVOUR: data.flavour.name,
            RECIPE: data.recipe.name,
            movedtoNext: 0,
            VGval: data.VGval,
            PGval: data.PGval,
            'flavour': data.flavour,
            flavvalue: data.flavvalue,
            recipe: data.recipe,
            'Completed': 0,
            'Location': 0,
            'starttime': 0,
            'Notes': '',
            'row': row,
            'userset': false,
            'CompletionDate': 0,
            'customer': data.customer,
            'orderID': data.orderID,
        };
      
            MIXBATCH.Nico = data.Nico;
            MIXBATCH.nic = data.recipe.nic;
            MIXBATCH.Nicosalts = data.Nicosalts;
            MIXBATCH.nicsalts = data.recipe.nicsalts;
        
            MIXBATCH.CBDvalue = data.CBDvalue;
            MIXBATCH.cbd = data.recipe.cbd;
       
        base.updateData('MixingTeam/' + mixingData.mix_batch_code + '/Batches/' + data.batch, mixingData);
        base.updateData('MixingTeam/' + mixingData.mix_batch_code, MIXBATCH);
    } else {
        var MIXBATCH = base.getData('MixingTeam/' + old.MIXNAME);
        MIXBATCH.QTYTOTAL = MIXBATCH.QTYTOTAL + data.QTY;
        base.updateData('MixingTeam/' + old.MIXNAME, MIXBATCH);
        var mixingData = {
            'recipe': data.recipe,
            'batch': data.batch,
            'flavour': data.flavour,
            'orderdate': data.orderdate,
            'QTY': data.QTY,
            'mix_batch_code': old.mix_batch_code,
            'VGval': data.VGval,
            'PGval': data.PGval,
            'MCTval': data.MCTval,
            'MCTrecipe': data.MCTrecipe,
            'AGval': data.AGval,
            'AGrecipe': data.AGrecipe,
            'customer': data.customer,
            'orderID': data.orderID,
              'brand': data.brand,
            'flavvalue': data.flavvalue,
            'flavrecipe': data.flavrecipe,
            'VGrecipe': data.VGrecipe,
            'PGrecipe': data.PGrecipe,
            'customer': data.customer,
            'orderID': data.orderID,
            'starttime': 0,
            'CompletionDate': '',
            'Completed': 0,
            'Notes': '',
            'priority': data.priority,
            'Location': 0
        };
        if (data.haspremix) {
            mixingData.haspremix = true;
            var dudcode = data.dudpremixCode
            mixingData.dudpremixCode = dudcode;
            var forpremix = data.forpremix
            mixingData.forpremix = forpremix;
        } else {
            mixingData.haspremix = false;
        }
       
            mixingData.Nico = data.Nico;
            mixingData.Nicotrecipe = data.Nicotrecipe;
            mixingData.Nicosalts = data.Nicosalts;
            mixingData.Nicotrecipesalts = data.Nicotrecipesalts;
       
            mixingData.CBDvalue = data.CBDvalue;
            mixingData.CBDrecipe = data.CBDrecipe;
       
        base.updateData('MixingTeam/' + old.MIXNAME + '/Batches/' + data.batch, mixingData);
    }
    
    var iscolored=base.getData('PremixColoring/'+data.batch);
    if(iscolored){
    
    var dat={
    mix_batch_code:MIXBATCH.MIXNAME,
    };
    base.updateData('PremixColoring/'+data.batch,dat);
    }
  var iscolored=base.getData('Production/'+data.batch);
  if(iscolored){
    var dat={
      mix_batch_code:MIXBATCH.MIXNAME,
    };
    base.updateData('Production/'+data.batch,dat);
  }
}

function toMixing(data) {
    var mixingData = base.getData('Mixing');
    var mixARR = [];
    if (mixingData) {
        var result = Object.keys(mixingData).map(function(key) {
            return [Number(key), mixingData[key]];
        });
        var row = result.length + 1;
    } else {
        var row = 1;
    }
    var mixingData = {
        'recipe': data.recipe,
        'batch': data.batch,
        'flavour': data.flavour,
        'orderdate': data.orderdate,
        'QTY': data.QTY,
        'VGval': data.VGval,
        'PGval': data.PGval,
        'MCTval': data.MCTval,
        'MCTrecipe': data.MCTrecipe,
        'AGval': data.AGval,
        'AGrecipe': data.AGrecipe,
        'flavvalue': data.flavvalue,
        'flavrecipe': data.flavrecipe,
        'VGrecipe': data.VGrecipe,
        'PGrecipe': data.PGrecipe,
         'brand': data.brand,
        'customer': data.customer,
        'orderID': data.orderID,
        'starttime': 0,
        'CompletionDate': '',
        'Completed': 0,
        'Notes': '',
        'movedtoNext': 0,
        'priority': data.priority,
        'Location': 0,
        'split': data.split,
        'row': row,
        'userset': false,
        'movedtoNext': 0,
        'productcode': data.productcode,
        'productdescription': data.productdescription,
    };
    if (data.haspremix) {
        mixingData.haspremix = true;
        mixingData.markedPremix = false;
        var dudcode = data.dudpremixCode
        mixingData.dudpremixCode = dudcode;
        var forpremix = data.forpremix;
        mixingData.forpremix = forpremix;
    } else {
        mixingData.haspremix = false;
    }
 
        mixingData.Nico = data.Nico;
        mixingData.Nicotrecipe = data.Nicotrecipe;
        mixingData.nic = data.Nicotrecipe;
        
        mixingData.Nicosalts = data.Nicosalts;
        mixingData.Nicotrecipesalts = data.Nicotrecipesalts;
        mixingData.nicsalts = data.Nicotrecipesalts;
   
        mixingData.CBDvalue = data.CBDvalue;
        mixingData.CBDrecipe = data.CBDrecipe;
        mixingData.cbd = data.CBDrecipe;
 
    if(data.recipe.Color){
     mixingData.Color = data.recipe.Color;
    }
    base.updateData('Mixing/' + data.batch, mixingData);
    var mixing = {
        mixing: data.QTY,
        split: data.split
    }
    base.updateData('Orders/' + data.batch, mixing)
}

function testmove() {
    MoveItem('GBVCO31796', 'MixingTeam')
}

function MoveItem(batch, sheet) {
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Line Item Move',
        batch: batch,
        page: sheet,
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    var data = base.getData(sheet + '/' + batch);
    data.current = sheet;
    var result = [];
    try {
        var data = moveMain(data);
        LOGDATA.data = LOGDATA.data.concat(data);
        LOGDATA.data.push(['SUCCESS:', "Line Item has been moved."]);
        logItem(LOGDATA);
        result.push('Success');
    } catch (e) {
        LOGDATA.status = false;
        result.push('Failed ' + e.message);
        LOGDATA.data.push(['Failed:', 'Failed ' + e.message]);
        logItem(LOGDATA);
    }
    return [result, sheet];
}

function moveMain(item) {
    var LOGARR = [];
    
        var order = base.getData('Orders/' + item.batch);
        var sheet_name = item.current;
        var next_sheet = sheets[sheets.indexOf(sheet_name) + 1];
        if (sheet_name == 'MixingTeam') {
            var batches = getBatchesInMIXBATCH(item);
            for (var i = 0; i < batches.length; i++) {
                fromReservedtoCompleted("Flavours/" + batches[i].flavour.sku, batches[i].flavvalue * batches[i].QTY / 1000);
                LOGARR.push(['Flavour:', batches[i].flavvalue * batches[i].QTY / 1000]);
                fromReservedtoCompleted("Misc/VG", batches[i].VGval * batches[i].QTY);
                LOGARR.push(['VG:', batches[i].VGval * batches[i].QTY]);
                if (isNaN(batches[i].AGval)) {
                    batches[i].AGval = 0;
                }
                fromReservedtoCompleted("Misc/AG", batches[i].AGval * batches[i].QTY);
                LOGARR.push(['AG:', batches[i].AGval * batches[i].QTY]);
                fromReservedtoCompleted("Misc/PG", batches[i].PGval * batches[i].QTY);
                LOGARR.push(['PG:', batches[i].PGval * batches[i].QTY]);
                if (isNaN(batches[i].MCTval)) {
                    batches[i].MCTval = 0;
                }
                fromReservedtoCompleted("Misc/MCT", batches[i].MCTval * batches[i].QTY);
                LOGARR.push(['MCT:', batches[i].MCTval * batches[i].QTY]);
                if (batches[i].Nico) {
                    fromReservedtoCompleted("Misc/Nicotine", batches[i].Nico * batches[i].QTY);
                    LOGARR.push(['Nicotine:', batches[i].Nico * batches[i].QTY]);
                }
                if (batches[i].Nicosalts) {
                    fromReservedtoCompleted("Misc/Nicotine Salts", batches[i].Nicosalts * batches[i].QTY);
                    LOGARR.push(['Nicotine Salts:', batches[i].Nicosalts * batches[i].QTY]);
                }
                if(batches[i].CBDvalue){
                    fromReservedtoCompleted("Misc/CBD", batches[i].CBDvalue * batches[i].QTY);
                    LOGARR.push(['CBD:', batches[i].CBDvalue * batches[i].QTY]);
                }
                var order = base.getData('Orders/' + batches[i].batch);
                var item = base.getData('Mixing/' + batches[i].batch);
                var dat1 = {
                    split: item.split - 1
                };
                LOGARR.push(['Splits Left:', dat1.split]);
                base.updateData('Mixing/' + batches[i].batch, dat1);
                item.split-= 1;
                var suffix = item.batch.substr(-1);
                var for_premixed_stock = suffix == PREMIX_STOCK_SUFFIX ? true : false;
                var premix = getPremixSKU(order,false);
                if (for_premixed_stock) {
                
                  if(item.recipe.Color){
                    PtoComplete(premix, batches[i].QTY);

                  }else{
                    
                    PtoRunning(premix, batches[i].QTY);
                    var dat1 = {
                      mixing_status: 'Completed',
                      final_status: 'Completed',
                      CompletionDate: new Date().getTime()
                    };
                    base.updateData('Orders/' + batches[i].batch, dat1);
                    
                  }
                  var dat3 = {
                    CompletionDate: new Date().getTime(),
                    final_status: 'Completed',
                    movedtoNext: 1
                  };
                  base.updateData('Mixing/' + batches[i].batch, dat3);
                  
                  
                    
                    
                   
                } else {
                  if(item.split==0){
                    if(item.recipe.Color){
                       var tomix = base.getData('Orders/' + batches[i].batch + '/mixing');
                       batches[i].QTY = batches[i].QTY - tomix;
                       if(item.POMARKED){
                      batches[i].QTY-=1;
                      }
                       LOGARR.push(['Premix to Running:', batches[i].QTY]);
                       PtoComplete(premix, batches[i].QTY);
                       if (item.haspremix) {
                         if (!item.markedPremix) {
                           var dmix = base.getData('Orders/' + item.dudpremixCode);
                           dmix.mixing_status = 'Completed';
                           dmix.final_status = 'Completed';
                           dmix.CompletionDate = new Date().getTime();
                           LOGARR.push(['Premix to Running RU:', item.forpremix]);
                           PtoRunning(premix, item.forpremix);
                           base.updateData('Orders/' + item.dudpremixCode, dmix);
                           var dat3 = {
                             markedPremix: true,
                           };
                           base.updateData('Mixing/' + batches[i].batch, dat3);
                         }
                       }

                    }else{
                      var tomix = base.getData('Orders/' + batches[i].batch + '/mixing');
                      
                      batches[i].QTY = batches[i].QTY - tomix;
                      if(item.POMARKED){
                      batches[i].QTY-=1;
                      }
                    
                      LOGARR.push(['Premix to Running:', batches[i].QTY]);
                      PtoRunning(premix, batches[i].QTY);
                        if (item.haspremix) {
                        if (!item.markedPremix) {
                          var dmix = base.getData('Orders/' + item.dudpremixCode);
                          dmix.mixing_status = 'Completed';
                          dmix.final_status = 'Completed';
                          dmix.CompletionDate = new Date().getTime();
                          LOGARR.push(['Premix to Running RU:', item.forpremix]);
                          PtoRunning(premix, item.forpremix);
                          base.updateData('Orders/' + item.dudpremixCode, dmix);
                          var dat3 = {
                            markedPremix: true,
                          };
                          base.updateData('Mixing/' + batches[i].batch, dat3);
                        }
                      }
                 
                    }
                    
                    var dat2 = {
                        final_status: 'Completed',
                        movedtoNext: 1
                    };
                    base.updateData('Mixing/' + batches[i].batch, dat2);
                    if(item.POMARKED){
                        PtoRunning(premix, item.POvolume);
                    }
                  }
                }
                
                updateAllTabs(batches[i].batch);
            }
        } else if (sheet_name == 'Production') {
            fromReservedtoCompleted('Lids/' + item.lidSKU, item.bottles);
            LOGARR.push([item.lidSKU, item.bottles]);
            fromReservedtoCompleted('BottleTypes/' + item.botSKU, item.bottles);
            LOGARR.push([item.botSKU, item.bottles]);
          if(item.recipe.Color){
          var premix = getPremixSKU(order,true);
          }else{
          var premix = getPremixSKU(order,false);
          }
            
            var unbrand = getUnbrandName(order);
            LOGARR.push(['Premix SKU:', premix]);
            LOGARR.push(['Unbranded SKU:', unbrand]);
            var suffix = item.batch.substr(-1);
            var for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX ? true : false;
          if(!for_unbranded_stock){
            suffix = item.batch.substr(-2);
            for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX2 ? true : false;
          }
            var volume = parseInt(item.btype.replace(/\D/g, ''), 10) * item.bottles / 1000;
            if (for_unbranded_stock) {
                var dat1 = {
                    production_status: 'Completed',
                    CompletionDate: new Date().getTime(),
                };
                base.updateData('Orders/' + item.batch, dat1);
                var dat2 = {
                    final_status: 'Completed',
                    CompletionDate: new Date().getTime(),
                };
                base.updateData('Orders/' + item.batch, dat2);
                var tomix = order.mixing;
                if (tomix > 0) {
                    PtoComplete(premix, tomix);
                    LOGARR.push(['Premix to Completed:', tomix]);
                }
                UtoRunning(unbrand, item.bottles);
                LOGARR.push(['Unbranded to Running:', item.bottles]);
            } else {
                var dat1 = {
                    production_status: 'Completed'
                };
                base.updateData('Orders/' + item.batch, dat1);
                var tomix = order.mixing;
                var tominusP = order.premixed;
                var tominusU = order.unbranded;
                volume = volume - tomix - (tominusU / 1000 * order.fill);
                if (tominusP > 0) {
                    PtoComplete(premix, tominusP);
                    LOGARR.push(['Premix to Complete:', tomix]);
                }
                updateAllTabs(item.batch);
            }
            if (item.hasoverprod) {
                var overprodvol = item.overprod * order.fill / 1000;
                LOGARR.push(['Premix to Completed from Overprod:', overprodvol]);
                PtoComplete(premix, overprodvol);
                UtoRunning(unbrand, item.overprod);
                LOGARR.push(['Unbranded to Running from Overprod:', item.overprod]);
                var dat1 = {
                    production_status: 'Completed',
                    final_status: 'Completed',
                    Completed: item.Completed,
                    CompletionDate: new Date().getTime(),
                    movedtoNext: 1
                };
                base.updateData('Orders/' + item.overprodbatch, dat1);
                base.updateData('Production/' + item.overprodbatch, dat1);
            }
            var dat3 = {
                final_status: 'Completed',
                movedtoNext: 1
            };
            base.updateData('Production/' + item.batch, dat3);
            updateAllTabs(item.batch);
        } else if (sheet_name == 'Printing') {
            var volume = parseInt(item.btype.replace(/\D/g, ''), 10) * item.bottles / 1000;
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
            fromReservedtoCompleted("Misc/printing ink", ink);
            LOGARR.push(['Printing ink:', ink]);
            var dat1 = {
                final_status: 'Completed',
                movedtoNext: 1
            };
            base.updateData('Printing/' + item.batch, dat1);
            var dat2 = {
                printing_status: 'Completed',
            };
            base.updateData('Orders/' + item.batch, dat2);
            item.printing_status = 'Completed';
            item.ProductionCompleted = 'Completed';
            toLabelling(item);
            LOGARR.push(['Sent to Labelling', item.bottles]);
            updateAllTabs(item.batch);
        } else if (sheet_name == 'Labelling') {
            var unbrand = getUnbrandName(order);
            LOGARR.push(['Unbranded SKU:', unbrand]);
            var volume = parseInt(item.btype.replace(/\D/g, ''), 10) * item.bottles / 1000;
            var origbots = order.bottles;
            var tomix = order.mixing;
            var tominusP = order.premixed;
            var tominusU = order.unbranded;
            var tominusTUBE = order.backtubed;
            var leftoverbots = order.branded;
            var botQ2 = item.bottles + leftoverbots;
            var label = order.botlabelsku;
            Logger.log("THE LABEL IS " + label);
            var packData = getPackagingData(item.packagingType, item.bottles, order.boxname.sku)
                // var packlabel = packData.packlabel;
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var tubes = botQ2 / tube;
            var box = tubes / packData.divTubesForBox;
            if(tube){
            if (item.packlabelsku) {
                LOGARR.push([item.packlabelsku, tubes]);
                fromReservedtoCompleted('Labels/' + item.packlabelsku, tubes);
            }
            }
            LOGARR.push([label, item.bottles]);
            fromReservedtoCompleted('Labels/' + label, item.bottles);
            var suffix = item.batch.substr(-1);
            var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
            if (for_branded_stock) {
                LOGARR.push(['Unbranded to Completed', tominusU]);
                UtoComplete(unbrand, tominusU);
                if (tube != 0) {
                    toPackaging(item);
                    LOGARR.push(['Sent to Packaging', item.bottles]);
                } else {
                    var brandname = getBrandName(item, false);
                    LOGARR.push(['Branded SKU', item.bottles]);
                    BtoRunning(brandname, item.bottles);
                    LOGARR.push(['Branded to Running', item.bottles]);
                    var dat2 = {
                        final_status: 'Completed',
                        CompletionDate: new Date().getTime(),
                    };
                    base.updateData('Orders/' + item.batch, dat2);
                }
            } else {
                LOGARR.push(['Unbranded to Completed', tominusU]);
                UtoComplete(unbrand, tominusU);
                updateShippingInformation2(item.batch);
            }
            var dat1 = {
                final_status: 'Completed',
                movedtoNext: 1,
                CompletionDate: new Date().getTime(),
            };
            base.updateData('Labelling/' + item.batch, dat1);
            var dat2 = {
                labeling_status: 'Completed',
            };
            base.updateData('Orders/' + item.batch, dat2);
            updateAllTabs(item.batch);
        } else if (sheet_name == 'Packaging') {
            var volume = parseInt(item.btype.substr(0, 2), 10) * item.bottles / 1000;
            var brandname = getBrandName(order, false);
            LOGARR.push(['Branded SKU:', brandname]);
            var packData = getPackagingData(item.packagingType, item.bottles, order.boxname.sku)
                //var packlabel = packData.packlabel;
            var packink = packData.ink;
            var tube = packData.botperPack;
            var boxname = order.boxname.sku;
            var suffix = item.batch.substr(-1);
            var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;
            var tubes = item.bottles / tube;
            if (tube != 0) {
                //WITH PACKAGING
                if (for_branded_stock) {
                    fromReservedtoCompleted('Packages/' + item.packagingType.sku, tubes);
                    LOGARR.push([item.packagingType.sku, tubes]);
                    BtoRunningX(brandname, tubes);
                    LOGARR.push(['Branded to Running:', tubes]);
                } else {
                    var box = tubes / packData.divTubesForBox;
                    if (boxname) {
                        fromReservedtoCompleted('Boxes/' + boxname, box);
                        LOGARR.push([boxname, box]);
                    }
                    var tomix = order.mixing;
                    var tominusP = order.premixed;
                    var tominusU = order.unbranded;
                    var tominusB = order.branded;
                    var tominBPack = order.backtubed;
                    fromReservedtoCompleted('Packages/' + item.packagingType.sku, (item.bottles) / tube);
                    LOGARR.push([item.packagingType.sku, (item.bottles) / tube]);
                    var brandname2 = getBrandName(item, true);
                    if (brandname2 != order.productcode) {
                        BtoCompleteX(brandname2, tominusB);
                        LOGARR.push([brandname2 + 'to Completed:', tominusB]);
                    }
                    BtoCompleteX(brandname, tominBPack);
                    LOGARR.push([brandname + 'to Completed:', tominBPack / tube]);
                }
            } else {
                //NO PACKAGING
                if (for_branded_stock) {
                    BtoRunningX(brandname, item.bottles);
                    LOGARR.push([brandname + 'to Completed:', item.bottles]);
                } else {
                    var box = 0;
                    if (boxname) {
                        fromReservedtoCompleted('Boxes/' + boxname, box);
                        LOGARR.push([boxname, box]);
                    }
                    BtoCompleteX(brandname, tominusB);
                    LOGARR.push([brandname + 'to Completed:', tominusB]);
                }
            }
            var dat1 = {
                final_status: 'Completed',
                movedtoNext: 1,
                CompletionDate: new Date().getTime(),
            };
            base.updateData('Packaging/' + item.batch, dat1);
            var dat2 = {
                packaging_status: 'Completed',
                final_status: 'Completed',
                CompletionDate: new Date().getTime(),
            };
            base.updateData('Orders/' + item.batch, dat2);
            updateAllTabs(item.batch);
            updateShippingInformation2(item.batch);
        } else if (sheet_name == 'FlavourMixMixingTeam') {
            var flavourMix = base.getData('FlavourMixes/' + item.flavourmix.sku);
            item.fullMix = flavourMix;
            var flavours = JSONtoARR(flavourMix.flavours);
            for (var i = 0; i < flavours.length; i++) {
                LOGARR.push(['Flavour:', flavours[i].val * item.stocking / 10]);
                fromReservedToRunning('Flavours/' + flavours[i].sku, flavours[i].val * item.stocking / 10);
            }
            toRunning('Flavours/' + item.flavourmix.sku, item.stocking);
            LOGARR.push(['Mover To Running:' + item.batch + ' ' + item.flavourmix.sku, item.stocking]);
            item.final_status = 'Completed';
            item.movedtoNext = 1;
            item.CompletionDate = new Date().getTime();
            base.updateData('FlavourMixOrders/' + item.batch, item);
            base.updateData('FlavourMixMixingTeam/' + item.batch, item);
        } else if (sheet_name == 'PremixColoring') {
          var suffix = item.batch.substr(-1);
          var for_premixed_stock = suffix == PREMIX_STOCK_SUFFIX ? true : false;
          var premix = getPremixSKU(order,true);
    
          fromReservedtoCompleted("Color/"+item.recipe.Color.sku, item.QTY*10*item.Color.val);
          
          if (for_premixed_stock) {
            
            
            PtoRunning(premix, item.QTY);
            var dat1 = {
              mixing_status: 'Completed',
              final_status: 'Completed',
              CompletionDate: new Date().getTime()
            };
            base.updateData('Orders/' + item.batch, dat1);
            
       
          var dat3 = {
            CompletionDate: new Date().getTime(),
            final_status: 'Completed',
            movedtoNext: 1
          };
          base.updateData('Mixing/' + item.batch, dat3);
          
          base.updateData('PremixColoring/' + item.batch, dat3);
           if(item.checkUncolored){
              var premix2 = getPremixSKU(order,false);
             PtoComplete(premix2, order.premixed);
           } 
            
          } else {
            
         
              var tomix = base.getData('Orders/' + item.batch + '/mixing');
          
              LOGARR.push(['Premix to Completed:', order.coloredpremix]);
              PtoComplete(premix, order.coloredpremix);

                
              
              
            var dat2 = {
              final_status: 'Completed',
              movedtoNext: 1
            };
            base.updateData('Mixing/' + item.batch, dat2);
               base.updateData('PremixColoring/' + item.batch, dat2);
            
          }
          
          updateAllTabs(item.batch);
          
        } else {
            LOGARR.push(["Wrong Sheet", '']);
        }
        return LOGARR;
    
}