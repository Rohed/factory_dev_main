function getFormData() {
    var PD = getProductDescriptions();
    var PC = getProductCodes();
    var recipes = getRecipeDropdown();
    var flavours = getFlavourDropdown();
    var bottletypes = getBottlesDropdown();
    var lids = getLidDropdown();
    var packagings = getPackagingDropdown();
    var customers = getCustomerDropdown();
    var brands = getBrandDropdown();
    var boxes=JSONtoARR(base.getData('Boxes')).filter(function(item){ if(item.name){return item}}).sort(sortSTRINGHL('name'));
    var labels=JSONtoARR(base.getData('Labels')).filter(function(item){ if(item.name){return item}}).sort(sortSTRINGHL('name'));
    var data = {
        'recipes': recipes,
        'flavours': flavours,
        'bottletypes': bottletypes,
        'lids': lids,
        'packagings': packagings,
        'customers': customers,
        'brands': brands,
        'PD': PD,
        'PC': PC,
        'boxes':boxes,
        'labels':labels
    };
    return data;
}

function getSearchBoxKeys(page) {
    var arr = [
        ['word', 'Keyword', 'word'],
        ['Flavours', 'Flavour', 'flavour/name'],
        ['Recipes', 'Recipe', 'recipe/name'],
        ['Brands', 'Brand', 'brand'],
        ['Customers', 'Customer', 'customer'],
        ['BottleTypes', 'Bottle Type', 'botSKU'],
        ['Lids', 'Cap Type', 'lidSKU'],
        ['Packages', '	Pack Type', 'packagingType/name'],
        ['priority', 'Priority', 'priority'],

    ];

    return [arr, page];
}

function getSearchValues(page, DBpage, key, num) {
    var arr;
    if (DBpage == 'word') {
        arr = [page, [], 'word', num];
    } else if (DBpage == 'priority'){
        arr = [page, [], 'priority', num];
    } else if (DBpage == 'final_status') {
        arr = [page, [{
            name: 'Completed'
        }, {
            name: 'Not Run'
        }, {
            name: 'Busy'
        }], 'final_status', num];
    } else {
        var list = JSONtoARR(base.getData(DBpage)).sort(sortSTRINGLH('name'));
        arr = [page, list, key, num];
    }

    return arr;
}




function getFormData2(page) {
    var PD = getProductDescriptions();
    var PC = getProductCodes();
    var recipes = getRecipeDropdown();
    var flavours = getFlavourDropdown();
    var bottletypes = getBottlesDropdown();
    var lids = getLidDropdown();
    var packagings = getPackagingDropdown();
    var customers = getCustomerDropdown();
    var brands = getBrandDropdown();
    var data = {
        'recipes': recipes,
        'flavours': flavours,
        'bottletypes': bottletypes,
        'lids': lids,
        'packagings': packagings,
        'customers': customers,
        'brands': brands,
        'PD': PD,
        'PC': PC,
         'labels':JSONtoARR(base.getData('Labels')).sort(sortSTRINGHL('name')),
    };
    return [data, page];
}

function getProductCodes() {
    var data = base.getData('References/ProductCodes');
    if (data) {
          return JSONtoARR(data).sort(sortFunction);
    } else {
        return [];
    }
}

function getProductDescriptions() {
    var data = base.getData('References/Descriptions');
    if (data) {
    
        return JSONtoARR(data).sort(sortFunction);
    } else {
        return [];
    }
}

function getOrdersData() {

    return JSONtoARR(base.getData('Orders'));
   
}


function getInventoryDescription() {
    var retArr = [];



    var misc = base.getData('Misc');

    var marr = [];
    if (misc) {
        var result = Object.keys(misc).map(function(key) {
            return [Number(key), misc[key]];
        });


        for (var i = 0; i < result.length; i++) {
            marr.push(result[i][1]);

        }

    }
    for (var i = 0; i < marr.length; i++) {
        if (marr[i].name == 'VG') {
            retArr.push(marr[i])
        }

    }
      for (var i = 0; i < marr.length; i++) {
        if (marr[i].name == 'AG') {
            retArr.push(marr[i])
        }

    }
    for (var i = 0; i < marr.length; i++) {
        if (marr[i].name == 'PG') {
            retArr.push(marr[i])
        }

    }
    for (var i = 0; i < marr.length; i++) {
        if (marr[i].name == 'Nicotine') {
            retArr.push(marr[i])
        }

    }
     for (var i = 0; i < marr.length; i++) {
        if (marr[i].name == 'Nicotine Salts') {
            retArr.push(marr[i])
        }

    }
    for (var i = 0; i < marr.length; i++) {
        if (marr[i].name == 'CBD') {
            retArr.push(marr[i])
        }

    }
     for (var i = 0; i < marr.length; i++) {
        if (marr[i].name == 'MCT') {
            retArr.push(marr[i])
        }

    }
    for (var i = 0; i < marr.length; i++) {
        if (marr[i].name != 'VG' && marr[i].name != 'PG'&& marr[i].name != 'Nicotine Salts' && marr[i].name != 'Nicotine' && marr[i].name != 'CBD' && marr[i].name != 'MCT' && marr[i].name != 'AG') {
            retArr.push(marr[i])
        }

    }



    var n = retArr.length;
    for (var i = 0; i < n; i++) {
        retArr[i].page = 'Misc';
    }
    
    var labels = base.getData('Labels');



    if (labels) {
        var result = Object.keys(labels).map(function(key) {
            return [Number(key), labels[key]];
        });


        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }

    }



    var l = retArr.length;
    for (var i = n; i < l; i++) {
        retArr[i].page = 'Labels';
    }


    
    var boxes = base.getData('Boxes');



    if (boxes) {
        var result = Object.keys(boxes).map(function(key) {
            return [Number(key), boxes[key]];
        });


        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }

    }



    var n = retArr.length;
    for (var i = l; i < n; i++) {
        retArr[i].page = 'Boxes';
    }



    var packages = base.getData('Packages');



    if (packages) {
        var result = Object.keys(packages).map(function(key) {
            return [Number(key), packages[key]];
        });


        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }

    }



    var l = retArr.length;
    for (var i = n; i < l; i++) {
        retArr[i].page = 'Packages';
    }




    var flavours = base.getData('Flavours');



    if (flavours) {
        var result = Object.keys(flavours).map(function(key) {
            return [Number(key), flavours[key]];
        });


        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }
    }


    var n = retArr.length;
    for (var i = l; i < n; i++) {
        retArr[i].page = 'Flavours';
    }




    var bottletypes = base.getData('BottleTypes');

    if (bottletypes) {
        var result = Object.keys(bottletypes).map(function(key) {
            return [Number(key), bottletypes[key]];
        });


        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }

    }


    var l = retArr.length;
    for (var i = n; i < l; i++) {
        retArr[i].page = 'BottleTypes';
    }


    var lids = base.getData('Lids');
    if (lids) {
        var result = Object.keys(lids).map(function(key) {
            return [Number(key), lids[key]];
        });


        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }
    }


    var n = retArr.length;
    for (var i = l; i < n; i++) {
        retArr[i].page = 'Lids';
    }




    var premixes = base.getData('PremixesTypes');

    if (premixes) {
        var result = Object.keys(premixes).map(function(key) {
            return [Number(key), premixes[key]];
        });


        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }
    }


    var l = retArr.length;
    for (var i = n; i < l; i++) {
        retArr[i].page = 'PremixesTypes';
    }


    var unbranded = (base.getData('UnbrandedTypes'));

    if (unbranded) {
        var result = Object.keys(unbranded).map(function(key) {
            return [Number(key), unbranded[key]];
        });


        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }
    }


    var n = retArr.length;
    for (var i = l; i < n; i++) {
        retArr[i].page = 'UnbrandedTypes';
    }


    var branded = (base.getData('BrandedTypes'));

    if (branded) {
        var result = Object.keys(branded).map(function(key) {
            return [Number(key), branded[key]];
        });


        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }
    }


    var l = retArr.length;
    for (var i = n; i < l; i++) {
        retArr[i].page = 'BrandedTypes';
    }

    return retArr;

}


function saveItem2(data) {
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Inventory Item',
        batch: data.desc + " " + data.orderdate + " " + data.quantity,
        page: 'Inventory',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    var msg = '';
    try {
    if (data.delivdate) {
        data.delivdate=new Date(data.delivdate).getTime();
      }
      if (data.orderdate) {
        data.orderdate=new Date(data.orderdate).getTime();
      }
      if (data.paiddate) {
        data.paiddate=new Date(data.paiddate).getTime();
      }
        var olddat = null;
          if (data.page == 'Misc') {
           var QTYitem = base.getData(data.page + '/' + data.desc);
        } else {
           
              var QTYitem = base.getData(data.page + '/' + data.sku);
        }
        if(data.oldname){
        olddat=base.getData('Inventory/' + data.oldname.replace(/\//g,'').replace(/\$/g,'').replace(/\./g,'').replace(/\#/g,'').replace(/\:/g,'').replace(/\//g,''));
      
        if (!QTYitem.Stock) {
            QTYitem.Stock = 0;
        }
        }
        if (olddat) {
            if (data.delivdate) {
                LOGDATA.data.push(['Added to Stock:', data.quantity]);
                QTYitem.Stock = QTYitem.Stock - data.quantity;
                QTYitem.Running += data.quantity;
                data.addedtoQTY = 'Added';
                data.row = olddat.row;
                data.name = data.desc + " " + data.orderdate + " " + data.quantity;
                base.removeData('Inventory/' + data.oldname.replace(/\//g,'').replace(/\./g,'').replace(/\$/g,'').replace(/\#/g,'').replace(/\:/g,'').replace(/\//g,''));
                base.updateData('Inventory/' + data.name.replace(/\//g,'').replace(/\./g,'').replace(/\$/g,'').replace(/\#/g,'').replace(/\:/g,'').replace(/\//g,''), data);
                if (data.page == 'Misc') {
                   base.updateData(data.page + '/' + data.desc, QTYitem); 
                } else {
                    base.updateData(data.page + '/' + data.sku, QTYitem);
                }
                logItem(LOGDATA);
                return data.name+" saved and added to QTY Running.";
            }
            LOGDATA.data.push(['Item Edited:', data.quantity]);
            data.row = olddat.row;
            data.name = data.desc + " " + data.orderdate + " " + data.quantity;
            base.removeData('Inventory/' + data.oldname.replace(/\//g,'').replace(/\./g,'').replace(/\$/g,'').replace(/\#/g,'').replace(/\:/g,'').replace(/\//g,''));
            base.updateData('Inventory/' + data.name.replace(/\//g,'').replace(/\./g,'').replace(/\$/g,'').replace(/\#/g,'').replace(/\:/g,'').replace(/\//g,''), data);
            logItem(LOGDATA);
            return "Item Edited.";
        } else {

            var inventory = base.getData('Inventory');

            if (inventory) {
                var result = Object.keys(inventory).map(function(key) {
                    return [Number(key), inventory[key]];
                });
                var Rows = [];
                for (var i = 0; i < result.length; i++) {
                    Rows.push(result[i][1].row);
                }
                var max = Rows.reduce(function(a, b) {
                    return Math.max(a, b);
                });
            } else {
                var max = 0;
            }

            if (data.delivdate) {
                LOGDATA.data.push(['Added to Stock:', data.quantity]);
                QTYitem.Running += data.quantity;
                data.addedtoQTY = 'Added';
                data.name = data.desc + " " + data.orderdate + " " + data.quantity;
                data.row = max + 1;
                base.updateData('Inventory/' + data.name.replace(/\//g,'').replace(/\./g,'').replace(/\$/g,'').replace(/\#/g,'').replace(/\:/g,'').replace(/\//g,''), data);
                if (data.page == 'Misc') {
                   base.updateData(data.page + '/' + data.desc, QTYitem); 
                } else {
                    base.updateData(data.page + '/' + data.sku, QTYitem);
                }
                logItem(LOGDATA);
                return data.name+" saved and added to QTY Running.";
            } else {
                LOGDATA.data.push(['Added to Stock:', data.quantity]);
                  QTYitem.Stock = QTYitem.Stock? QTYitem.Stock : 0;
                QTYitem.Stock = QTYitem.Stock + data.quantity;
                data.name = data.desc + " " + data.orderdate + " " + data.quantity;
                data.row = max + 1;
                base.updateData('Inventory/' + data.name.replace(/\//g,'').replace(/\./g,'').replace(/\$/g,'').replace(/\#/g,'').replace(/\:/g,'').replace(/\//g,''), data);

                if (data.page == 'Misc') {
            base.updateData(data.page + '/' + data.desc, QTYitem);
                } else {
          base.updateData(data.page + '/' + data.sku, QTYitem);
                    
                }
                logItem(LOGDATA);
                return data.name+" saved and added to QTY Stock.";

            }


        }
    } catch (e) {
    LOGDATA.status=false;
      LOGDATA.data.push(['Failed:', e.message]);
      logItem(LOGDATA);
        return e.message;
    }


}


var date_sort_asc = function(date1, date2) {
    // This is a comparison function that will result in dates being sorted in
    // ASCENDING order. As you can see, JavaScript's native comparison operators
    // can be used to compare dates. This was news to me.
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
};


function getOrderData(batch) {
    //batch=901001;
    var olddata = base.getData('Orders/' + batch);

    var data = getFormData();



    return [data, olddata]

}

function getFlavourMixOrderData(batch) {
    //batch=901001;
    Logger.log(batch);
    var olddata = base.getData('FlavourMixOrders/' + batch);
    Logger.log(olddata);
    var data = getFlavourMixes();



    return [data, olddata]

}
function getSheetData(sheet) {

    var data = base.getData(sheet + '/');
    
    if (data) {
        data=JSONtoARR(data);
        try {
          /*  if (sheet == 'Mixing' || sheet == 'MixingTeam' || sheet == 'Production') {
                data = sortByLowest(data);
            } else {
                data.sort(sortFunction);
            }
            */
              if (sheet == 'MixingTeam') {
                data = sortByLowest(data);
            } else {
                data=data.sort(sortNUMHL('priority'));
            }
           
            return data;
        } catch (e) {
            return [];
        }
    } else {
        return [];
    }

}
function delete_PCD(pc,pd){
  var LOGDATA={
    status:true,
    msg:'',
    action:'Delete Item',
    batch:pc,
    page:'PC/PD',
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
  base.removeData('References/ProductCodes/'+pc);
  
  base.removeData('References/Descriptions/'+pd);
  LOGDATA.data.push(['Removed:',pc]);

logItem(LOGDATA);
return 'Successfully removed.';
}
function removeItem(batch, sheet,user) {
  var LOGDATA={
    status:true,
    msg:'',
    action:'Delete Item '+user,
    batch:batch,
    page:sheet,
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
  
    try {
    LOGDATA.data.push(['Removed:',batch]);
        base.removeData(sheet + '/' + batch);
        var rett = "Batch " + batch + " Removed from " + sheet;
        try{
        rearange(sheet);
        }catch(e){
         LOGDATA.data.push(['FAILED to REARANGE '+sheet+':',e.message]);
        }
    } catch (e) {
    LOGDATA.status=false;
        LOGDATA.data.push(['FAILED to REMOVE:',e.message]);
        var rett = e.message;
    }

    logItem(LOGDATA);
      return [rett, sheet];
}

function updateShippingInformation() {
    var orders = getOrdersData();
    for (var i = 0; i < orders.length; i++) {
        var suffix = orders[i].batch.substr(-1);
        if (suffix != 'S' && suffix != 'U' && suffix != 'B') {
            //var data=base.getData('Orders/'+orders[i].batch)

            base.updateData('Shipping/' + orders[i].batch, orders[i])

        }

    }



}

function updateShippingInformation2(batch) {
    var orders = base.getData('Orders/' + batch);
    base.updateData('Shipping/' + batch, orders)


}

function getShippingData() {

    var shipping =JSONtoARR( base.getData('Shipping'));
    if (shipping) {
       
        var shippingArr =shipping.filter(function(item){ if(item.orderdate){return true}else{return false}}).sort(sortDATEHL('orderdate'));
        return shippingArr;

    } else {
        return [];
    }




}

function sortarr(a,b){
if(a.orderdate === undefined){return -1;}
if(b.orderdate === undefined){return -1;}
  var logitem=new Date(a.orderdate);
  if(logitem.getTime()){}else{
    var from=a.orderdate.split("-");
    logitem= new Date(from[2], from[1] - 1, from[0]);
  }
  var logitem2=new Date(b.orderdate);
  if(logitem2.getTime()){}else{
    var from=b.orderdate.split("-");
    logitem2= new Date(from[2], from[1] - 1, from[0]);
  }
  return new Date(logitem).getTime() - new Date(logitem2).getTime()

}
function getSingleShippingData(batch) {
    var data = base.getData('Shipping/' + batch);
    Logger.log(data);
    return data;
}

function updateShippingItem(batch, data) {
 var LOGDATA={
    status:true,
    msg:'',
    action:'Edit Item',
    batch:batch,
    page:'Shipping',
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
  data.dateshipped=new Date(data.dateshipped).getTime();
   data.datedelivered=new Date(data.datedelivered).getTime();
  LOGDATA.data.push(['EDITED SHIPPING ITEM',batch]);
    base.updateData('Shipping/' + batch, data);
logItem(LOGDATA);
}



function getSingleQTYData(id, page) {
    var data = base.getData(page + '/' + id);

    var dat = {
        data: data,
        page: page

    };
    return dat;
}



function updatesingleQTY(id, page, data) {

 var LOGDATA={
    status:true,
    msg:'',
    action:'Edit Item',
    batch:id,
    page:'QTY',
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
 var item=base.getData(page + '/' + id);
    base.updateData(page + '/' + id, data);
  LOGDATA.data.push(['EDITED QTY ITEM',id]);
  
  LOGDATA.data.push(['BEFORE Running:',item.Running]);
  LOGDATA.data.push(['BEFORE Reserved:',item.Reserved]);
  LOGDATA.data.push(['BEFORE Completed:',item.Completed]);
  
  LOGDATA.data.push(['AFTER Running:',data.Running]);
  LOGDATA.data.push(['AFTER Reserved:',data.Reserved]);
  LOGDATA.data.push(['AFTER Completed:',data.Completed]);
logItem(LOGDATA);
    return page;
}


function getLocations() {
    var mixingSheet = base.getData('MixingTeam');
    var Production = base.getData('Production');
    var Printing = base.getData('Printing');
    var Labelling = base.getData('Labelling');
    var Packaging = base.getData('Packaging');
    var shippingArr = getShippingData();
    var locationsData = [
        [],
        [],
        [],
        [],
        [],
        []
    ];


    for (var i = 0; i < shippingArr.length; i++) {
        if (shippingArr[i].Location) {
            locationsData[0].push(shippingArr[i]);
        }
    }



    if (Packaging) {
        var result = Object.keys(Packaging).map(function(key) {
            return [Number(key), Packaging[key]];
        });

        var PackagingArr = [];
        for (var i = 0; i < result.length; i++) {
            PackagingArr.push(result[i][1]);
        }

        for (var i = 0; i < PackagingArr.length; i++) {
            if (PackagingArr[i].Location) {
                locationsData[1].push(PackagingArr[i]);
            }
        }
    }

    if (Labelling) {
        var result = Object.keys(Labelling).map(function(key) {
            return [Number(key), Labelling[key]];
        });

        var LabellingArr = [];
        for (var i = 0; i < result.length; i++) {
            LabellingArr.push(result[i][1]);
        }
        LabellingArr.sort(sortarr);

        for (var i = 0; i < LabellingArr.length; i++) {
            if (LabellingArr[i].Location) {
                locationsData[2].push(LabellingArr[i]);
            }
        }
    }
    if (Printing) {
        var result = Object.keys(Printing).map(function(key) {
            return [Number(key), Printing[key]];
        });

        var PrintingArr = [];
        for (var i = 0; i < result.length; i++) {
            PrintingArr.push(result[i][1]);
        }
        PrintingArr.sort(sortarr);

        for (var i = 0; i < PrintingArr.length; i++) {
            if (PrintingArr[i].Location) {

                locationsData[3].push(PrintingArr[i]);
            }
        }
    }

    if (Production) {
        var result = Object.keys(Production).map(function(key) {
            return [Number(key), Production[key]];
        });

        var ProductionArr = [];
        for (var i = 0; i < result.length; i++) {
            ProductionArr.push(result[i][1]);
        }


        for (var i = 0; i < ProductionArr.length; i++) {
            if (ProductionArr[i].Location) {
                locationsData[4].push(ProductionArr[i]);
            }
        }
    }

    if (mixingSheet) {
        var result = Object.keys(mixingSheet).map(function(key) {
            return [Number(key), mixingSheet[key]];
        });

        var mixingSheetArr = [];
        for (var i = 0; i < result.length; i++) {
            mixingSheetArr.push(result[i][1]);
        }

        for (var i = 0; i < mixingSheetArr.length; i++) {
            if (mixingSheetArr[i].Location) {
                locationsData[5].push(mixingSheetArr[i]);
            }
        }
    }




    return locationsData;

}

function getSearchedArray(page, params) {

if(params.equalTo == 'all'||page=='QTY'||page=='Locations'||page=='Finctions'){

 return [page,JSONtoARR(base.getData(page))];
}
  if(page == 'Shipping'){
    if(params.equalTo == 'Not Run'||params.equalTo == 'Busy'||params.equalTo == 'Completed'){
      return [page,JSONtoARR(base.getData(page))];
    }else{
        if(params.orderBy[0] != 'word'){
      return [page,JSONtoARR(base.getData(page,params))];
      }
    }
    
  }
var neg=false;
var forord=false;
    if (params.orderBy[0] != null) {
        if (params.orderBy[0] == 'word') {
            var data = JSONtoARR(base.getData(page));
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                if (JSON.stringify(data[i]).toLowerCase().match(params.equalTo.toLowerCase())) {
                    arr.push(data[i]);
                }
            }
            return [page, arr];
        } else if(params.orderBy[0] == 'priority'){
          var data = JSONtoARR(base.getData(page));
          var arr = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].priority==params.equalTo) {
              arr.push(data[i]);
            }
          }
          return [page, arr];
          
          
        
        
        } else {
            if (params.orderBy[0] == 'final_status') {
                if (page == 'Orders'||page == 'FlavourMixOrders') {
                    if (params.equalTo == 'Not Run') {
                        params.orderBy[0] = 'final_status';
                        params.equalTo = 0;
                    } else if (params.equalTo == 'Busy') {
                        params.orderBy[0] = 'final_status';
                        params.equalTo = 'started';
                        
                    } else if(params.equalTo=='wentNegative'){
                      params.orderBy[0] = 'wentNegative';
                      params.equalTo = true;
                      neg=true;
                    }
                } else if (page == 'MixingTeam') {
                    if (params.equalTo == 'Busy') {
                        params.orderBy[0] = 'movedtoNext';

                    } else if (params.equalTo == 'Not Run') {
                        params.orderBy[0] = 'movedtoNext';
                        params.equalTo = 0;
                    } else if (params.equalTo == 'Completed') {
                        params.orderBy[0] = 'Completed';
                        params.equalTo = 'Completed';
                    }

                } else {
                    if (params.equalTo == 'Busy') {
                        params.orderBy[0] = 'movedtoNext';
                    } else if (params.equalTo == 'Not Run') {
                        params.equalTo = 0;
                        params.orderBy[0] = 'movedtoNext';
                    } else if (params.equalTo == 'Completed') {
                        params.equalTo = 1;
                        params.orderBy[0] = 'movedtoNext';
                    }
                }
            }


            if (params.orderBy[0] == 'flavour' && page == 'MixingTeam') {
                params.orderBy[0] = 'FLAVOUR';
            }


            if (params.orderBy[0] == 'recipe/name' && page == 'MixingTeam') {
                params.orderBy[0] = 'RECIPE';
            }
            
     
            Logger.log(params);
            var data = JSONtoARR(base.getData(page, params));

            return [page, data];
        }
    } else {

        var data = JSONtoARR(base.getData(page));
        return [page, data];
    }




}

function fixwentNEG(){
var ordersBASE=base.getData('Orders');
var packagingBASE=base.getData('Production');

var orderLIST=JSONtoARR(ordersBASE);
//var packagingLIST=JSONtoARR(packagingBASE);
for(var i=0;i<orderLIST.length;i++){
  if(packagingBASE[orderLIST[i].batch]){
    if(ordersBASE[orderLIST[i].batch].wentNegative) {
      ordersBASE[orderLIST[i].batch].wentNegative=false;
    }
    
  }
  if(ordersBASE[orderLIST[i].batch].runtime==0 || !ordersBASE[orderLIST[i].batch].runtime){
   if(ordersBASE[orderLIST[i].batch].wentNegative) {
      ordersBASE[orderLIST[i].batch].wentNegative=false;
    }
  }

}

base.updateData('Orders',ordersBASE);
}

function TESTSEARCHFOR() {
    var searcharr = [];

    
    var params = {
        orderBy: ['brand'],
        equalTo: "Jesta Silver",

    }
    searcharr.push(['Shipping', params]);

    var params = {
        orderBy: ['final_status'],
        equalTo: "Not Run",

    }
    searcharr.push(['Shipping', params]);


    var data=searchFor(searcharr);
    Logger.log(data);
}

function searchFor(searchARR) {
    var searched = [];
    for (var i = 0; i < searchARR.length; i++) {

        searched.push(getSearchedArray(searchARR[i][0], searchARR[i][1]))

    }
    var rett = searched[0];

    for (var i = 1; i < searched.length; i++) {
        if (searchARR[i][1].orderBy == searchARR[i - 1][1].orderBy) {
            rett[1] = rett[1].concat(searched[i][1]);
        } else {
            rett[1] = rett[1].diff(searched[i][1]);

        }
    }
   if(rett[0]!='FlavourMixOrders'||rett[0]!='FlavourMixMixingTeam'){
   rett[1]=rett[1].sort(sortNUMLH('priority'))
   }
    return rett;
}

Array.prototype.diff = function(arr2) {
    var ret = [];
  
    var l = this.length;

    for (var i = 0; i < l; i += 1) {
        if (arr2.indexOf2(this[i].batch)) {
            ret.push(this[i]);
        }
    }
    return ret;
};

Array.prototype.indexOf2 = function(text) {
    var match = false;
    for (var i = 0; i < this.length; i += 1) {
        if (this[i].batch == text) {
            match = true;
           return match;
        }
    }
    return match;
};

function compare(a, b) {
    if (a[1] < b[1]) {
        return -1;
    }
    if (a[1] > b[1]) {
        return 1;
    }
    // a must be equal to b
    return 0;
}




function searchforWord(page, word) {

    var sheetData = getSheetData(page);
    if (word == '') {
        return getQTY(page);
    }
    var retarr = [];
    for (var i = 0; i < sheetData.length; i++) {
            var match = JSON.stringify(sheetData[i]).toLowerCase().indexOf(word.toLowerCase().trim());
            if (match >=0) {
                retarr.push(sheetData[i]);
            }
   
    }

    return [retarr, page];


}

function searchforWordMixing(page, word) {
    var sheetData = getSheetData(page);
    if (word == '') {
        return getSheetData(page);
    }

    var retarr = [];
    for (var i = 0; i < sheetData.length; i++) {
        var string = JSON.stringify(sheetData[i]);
        string = string.toLowerCase();
        var match = string.indexOf(word.toLowerCase())
        if (match != -1) {
            retarr.push(sheetData[i]);
        }

    }

    return retarr;




}


function deleteAll(arr, page) {

 var LOGDATA={
    status:true,
    msg:'',
    action:'Delete Items',
    batch:'Batch Group',
    page:page,
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
    if (page == 'MixingTeam') {
        for (var i = 0; i < arr.length; i++) {
            LOGDATA.data.push(['Deleted:',arr[i].MIXNAME]);
            base.removeData(page + '/' + arr[i].MIXNAME);

        }


    } else {
        for (var i = 0; i < arr.length; i++) {
        LOGDATA.data.push(['Deleted:',arr[i].batch]);
            base.removeData(page + '/' + arr[i].batch);

        }
    }
    
    logItem(LOGDATA);
    return 'Removed';
}


function changeFactory(mixbatch, factory) {
    var dat = {
        factory: factory,
    };
    base.updateData('MixingTeam/' + mixbatch, dat);

    return 'Success';

}

function testup() {

    updateMachineProduction('901120', 'Manchester - Auto Machine 2', 'Manchester');
}

function updateMachineProduction(batch, machine, factory) {
    var dat = {
        machineP: machine
    };

    base.updateData('Orders/' + batch, dat);
    var exists = base.getData('Production/' + batch)
    if (exists) {
        base.updateData('Production/' + batch, dat);
    }


    var mixes = JSONtoARR(base.getData('MixingTeam'));
    for (var i = 0; i < mixes.length; i++) {
        var batches = JSONtoARR(mixes[i].Batches);
        for (var j = 0; j < batches.length; j++) {
            if (batches[j].batch == batch) {
                changeFactory(mixes[i].MIXNAME, factory);
                break;

            }

        }

    }
    return 'Success';
}


function updateMachineLabelling(batch, machine, factory) {
    var dat = {
        machineL: machine
    }

    base.updateData('Orders/' + batch, dat);
    var exists = base.getData('Labelling/' + batch)
    if (exists) {
        base.updateData('Labelling/' + batch, dat);
    }


    var mixes = JSONtoARR(base.getData('MixingTeam'));
    for (var i = 0; i < mixes.length; i++) {
        var batches = JSONtoARR(mixes[i].Batches);
        for (var j = 0; j < batches.length; j++) {
            if (batches[j].batch == batch) {
                changeFactory(mixes[i].MIXNAME, factory);
                break;

            }

        }

    }
    return 'Success';
}

function save_PCD(obj, old, editold) {
 var LOGDATA={
    status:true,
    msg:'',

    batch:obj.productcode,
    page:'PC/PD',
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
    if (editold) {
        //base.removeData('References/Descriptions/'+old.descr);
        //base.removeData('References/ProductCodes/'+old.prod);
        var descr = obj.productdescription;
        var prod = obj.productcode;
        descr = descr.replace(/&/g, '').replace('&', '').replace('/', '').replace('(', '').replace(')', '').replace('.', '');
        prod = prod.replace(/&/g, '').replace('&', '').replace('/', '').replace('(', '').replace(')', '').replace('.', '');
        obj.prod = prod;
        obj.descr = descr;
        base.updateData('References/Descriptions/' + descr, obj);
        base.updateData('References/ProductCodes/' + prod, obj);
        var descr2 = descr.split(': ');
        var name2 = descr2[1].replace('3 x 10ml', '10ml').replace('4 x 10ml', '10ml').replace(/\./g, "");
        generateForSingleUnbrand2(obj.unbrandSKU, name2);
 
        var name3 = name2.split(' ');
        var premixname = [];
        for (var i = 0; i < name3.length - 1; i++) {
            premixname.push(name3[i]);
        }
        premixname = premixname.join(' ');
        generateForSinglePremix2(obj.premixSKU, premixname);
LOGDATA.action='Edit';
 LOGDATA.data.push(['Edited:',prod])
    } else {

        var descr = obj.productdescription;
        var prod = obj.productcode;
        descr = descr.replace(/&/g, '').replace('&', '').replace('/', '').replace('(', '').replace(')', '').replace(/\./gi, '');
        prod = prod.replace(/&/g, '').replace('&', '').replace('/', '').replace('(', '').replace(')', '').replace(/\./gi, '');
        obj.prod = prod;
        obj.descr = descr;
        base.updateData('References/Descriptions/' + descr, obj);
        base.updateData('References/ProductCodes/' + prod, obj);
        generateForSingleBrand3(prod, descr);
        var descr2 = descr.split(': ');
        var name2 = descr2[1].replace('3 x 10ml', '10ml').replace('4 x 10ml', '10ml').replace(/\./g, "");
        generateForSingleUnbrand2(obj.unbrandSKU, name2);

        var name3 = name2.split(' ');
        var premixname = [];
        for (var i = 0; i < name3.length - 1; i++) {
            premixname.push(name3[i]);
        }
        premixname = premixname.join(' ');
        generateForSinglePremix2(obj.premixSKU, premixname);
LOGDATA.action='New';
 LOGDATA.data.push(['Added New:',prod])
    }
    
    logItem(LOGDATA);
    return 'Success';
}

function getEPCandFormdata(PC) {
//PC='UNIO1005';
Logger.log('PC  '+PC);
    try {
        var formdata = getFormData();

        var EPC = base.getData('References/ProductCodes/' + PC);
        var EPD = EPC.descr;
        var arr = [formdata, EPC, EPD, 'EPC']
        return arr;
    } catch (e) {
        return false;
    }
}

function getEPDandFormdata(PD) {
Logger.log('PD  '+PD);
    try {
        var formdata = getFormData();

        var EPD = base.getData('References/Descriptions/' + PD);
        var EPC = EPD.prod;
        var arr = [formdata, EPC, EPD, 'EPD']
        return arr;
    } catch (e) {
        return false;
    }
}


function getPCSelect(PC) {
    var ret = base.getData('References/ProductCodes/' + PC);
    return ret;
}

function getPDSelect(PD) {
    var ret = base.getData('References/Descriptions/' + PD);
    return ret;
}


function createDatalistPCPD() {
    var PD = getProductDescriptions();
    var PC = getProductCodes();

    return [PC, PD];
}



function getCustomerList() {

    return JSONtoARR(base.getData('Customers'));
}

function getCust(name) {

    return base.getData('Customers/' + name);
}

function getPackCodes() {
    var list = JSONtoARR(base.getData('Shipping'));
    var ret = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].PRINTCODE) {
          if(!list[i].dateshipped){
            ret.push(list[i].PRINTCODE);
            }
        }
    }
    ret = uniq(ret);
Logger.log(ret.length);
    return ret;
}


function getOrderIDs(flag) {
    var list = JSONtoARR(base.getData('Orders'));
    var ret = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].orderID) {
            ret.push([list[i].orderdate,list[i].orderID,list[i].priority,list[i].customer]);
        }
    }
    ret = uniq2(ret);
    switch(flag){
    case 'priority':
    ret=ret.sort(sortgetOrderIDsDATE);
    break;
    case 'xero':
    ret=ret.sort(sortgetOrderIDsDATE);
    break;
    default:
    ret=ret;
    }
    return ret;
}
function uniq2(a) {
    var prims = {
            "boolean": {},
            "number": {},
            "string": {}
        },
        objs = [];

    return a.filter(function(item) {
        var type = typeof item[1];
        if (type in prims)
            return prims[type].hasOwnProperty(item[1]) ? false : (prims[type][item[1]] = true);
        else
            return objs.getIndex2(item[1]) >= 0 ? false : objs.push(item);
    });
}

Array.prototype.getIndex2 = function(searchValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][1] == searchValue) {
            return i
            break;
        }

    }
    return -1;

};
function uniq(a) {
    var prims = {
            "boolean": {},
            "number": {},
            "string": {}
        },
        objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if (type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}


function getFlavourMixes(){
return JSONtoARR(base.getData('FlavourMixes'));

}

function getFormDataSingle(item, type, num) {
    if (type == 'PC') {
        var data = base.getData('References/ProductCodes/' + item);
    } else {
        var data = base.getData('References/Descriptions/' + item);
    }
    data.num = num;
    data.type = type;
    return data;
}


function getLastOrderID() {
    var params = {
        orderBy: ['orderID'],

    }
    var data = base.getData('Orders', params);


    var x = 1;

}

function remove_recipe(key){
base.removeData('Recipes/'+key);
return 'Recipe Removed.';

}

function remove_packaging(key){
base.removeData('Packages/'+key);
return 'Package Removed.';

}
function remove_box(key){
base.removeData('Boxes/'+key);
return 'Box Removed.';

}
function remove_Label(key){
base.removeData('Labels/'+key);
return 'Label Removed.';

}
function remove_item(key,page){
base.removeData(page+'/'+key);
return key+' Removed.';

}
function remove_flavourmix(key){
base.removeData('FlavourMixes/'+key);
base.removeData('Flavours/'+key);
return 'Flavour Mix Removed.';

}
function getLastPriority(){
var last=getOrderIDs('priority');
return last[last.length-1][2];


}
function setPriorityARR(arr){
for(var i=0;i<arr.length;i++){
setPriority(arr[i][0],arr[i][1],arr[i][2],arr[i][3])
}
return 'Success';

}

function setPriority(priority,oldpriority,increase,orderID){
priority=priority.toString();
oldpriority=oldpriority.toString();
orderID=orderID.toString();
//priority='1';
//oldpriority='4'; 
//orderID='SO-00000701';
//increase=true;
  //var params1={
  //
  //orderBy : ['priority'],
  //equalTo: priority
  //
  //};
  var params2={
    
    orderBy : ['orderID'],
    equalTo: orderID,
    
  };
  if(increase){
    var params3={
      
      orderBy : ['priority'],
      startAt: priority
      
    };
  }else{
    
    var params3={
      
      orderBy : ['priority'],
      startAt: oldpriority
      
    };
    
  }
  var sheets=['Orders','Mixing','Production','Printing','Labelling','Packaging','Shipping'];
  for(var s=0;s<sheets.length;s++){
    //var newPriorityBatches=base.getData(sheets[s],params1);
    var allbatches=base.getData(sheets[s]);
    //var mixes=base.getData('Orders',params);
    //var newPriorityList=JSONtoARR(newPriorityBatches);
    var alllist=JSONtoARR(allbatches);
    var oldPriorityList=[];
       var list=[];
    var options='{';
    var options2='{';
    for(var i=0;i<alllist.length;i++){
      if(alllist[i].orderID==orderID){
        oldPriorityList.push(alllist[i]);
        options += '"' + alllist[i].batch + '":' + JSON.stringify(alllist[i]) + ',';
      }
      
      if(increase){
         if(alllist[i].priority>=parseInt(priority,10)||alllist[i].priority==''){
          list.push(alllist[i]);
          options2 += '"' + alllist[i].batch + '":' + JSON.stringify(alllist[i]) + ',';
        }
        }else{
          if(alllist[i].priority>=parseInt(oldpriority,10)||alllist[i].priority==''){
          list.push(alllist[i]);
          options2 += '"' + alllist[i].batch + '":' + JSON.stringify(alllist[i]) + ',';
        }
        
        }
    }
    options +="}";
    options2 +="}";
       
    var rawData=JSON.parse(options);
    var list=JSONtoARR(rawData);
    
      
    var oldPriorityBatches=JSON.parse(options);
    options='';
    options2='';
    for(var i=0;i<oldPriorityList.length;i++){
      
      oldPriorityBatches[oldPriorityList[i].batch].priority=parseInt(priority,10);
    }
    if(oldPriorityList.length>0){

      if(list.length==0){
        rawData=base.getData(sheets[s]);
        list=JSONtoARR(rawData);
      }
      
      for(var i=0;i<list.length;i++){
        if(rawData[list[i].batch]){
          if(!isNaN(rawData[list[i].batch].priority)){
            var pom=parseInt(rawData[list[i].batch].priority,10);
            if(isNaN(pom)){
              pom=0;
            }
            if(increase){
              rawData[list[i].batch].priority=pom+1;
            }else{
              rawData[list[i].batch].priority=pom-1;
            }
          }else{
            rawData[list[i].batch].priority='';
          }
        }
      }
      
      base.updateData(sheets[s],rawData);
      
      base.updateData(sheets[s],oldPriorityBatches);
    }
    
  }
  






}

function changePriority(sheet,batch){
  var item=base.getData(sheet+'/'+batch);
  var itemOrderID=item.orderID;
  var itemPriroity=item.priority;
  var params={
    
    orderBy : ['orderID'],
    equalTo: itemOrderID
    
  };
  var rawData=base.getData(sheet);
  var list=JSONtoARR(rawData);
  var startchange=true;  
  for(var i=0;i<list.length;i++){
    if(list[i].orderID==itemOrderID){
      if(list[i].movedtoNext!=1){
        startchange=false;
        break;
      }
    }
  }
  if(startchange){
    var lastPriority=getLastPriority();
    setPriority(lastPriority,itemPriroity,false,itemOrderID);
  }
}


function checkStatus(SELECTED){

  var batches=[];
  var data=JSONtoARR(base.getData('Orders'));
  for(var i=0;i<data.length;i++){
    
    if(!data[i].recipe){continue;}
    if(SELECTED.indexOf(data[i].orderID)>=0){
      batches.push(data[i].batch);
      
    }
  }
  
    return getBatchInfo(batches,'statuscheck')
 
}