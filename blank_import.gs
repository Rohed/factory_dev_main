

//IMPORT BLANK PCPD
function importBlankPCPC(id) {
  var premixARR = [];
  var unbrandedARR = [];
  var linkedBBARR = [];
  var sheet = SpreadsheetApp.openById(id).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
  }
  
}

function testIMPORTVlank() {
  
  var id = '1PnIYk0nmUqEnmxNZ1sW2ZtqRi6IADqTbs_8bJKIArPI';
  return importBlankPCPC2(id);
  
}
function importBlankPCPC2(id) {
  
  var sheet = SpreadsheetApp.openById(id).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  //    var dataToSend = "";
  //      data.map(function(item) {
  //        dataToSend += item.join(",") + "\n";
  //      });
  var payload={ 
    'data':JSON.stringify(data),
    
  };
  var params={
    method:"POST",
    "Content-Type":'application/json',
    muteHttpExceptions :true,
    'payload':payload
  }
  base.removeData('importBlankPCPD');
  var url='http://212.69.229.10:4000/'+NODE_PATH+'/importblankpcpdpath';
  var response=UrlFetchApp.fetch(url, params).getContentText();
  Logger.log(response);
  return [false,'importBlankPCPC2'];
  
}

function importBlankPCPC2Ping(id){
  Utilities.sleep(20000);
  try {
    var status=base.getData('importBlankPCPD/status');
    if(!status){
      return [false,'importBlankPCPC2'];
    }
    
    var sheet = SpreadsheetApp.openById(id).getSheets()[0];
    var response =JSON.parse(base.getData('importBlankPCPD/data'));
    
    var LOGDATA = {
      status: true,
      msg: '',
      action: 'Import Blank PC/PD',
      batch: 'Spreadsheet',
      page: 'PC/PD',
      user: Session.getActiveUser().getEmail(),
      data: new Array()
    };
    
    var values=[];
    var resp=[[],[],[],[],'',[],[]];
    var keys=Object.keys(response);
    keys.map(function(item){
      resp[item]=response[item];
    });
    
    for(var i=0;i<resp[6].length;i++){
      if(i>0){
        if(resp[6][i].length!=resp[6][i-1].length){
          resp[6].splice(i,1,['','','','','','','']);
          
        }
      }
      for(var j=0;j<resp[6][i].length;j++){
        if(resp[6][i][j]){
          
          if(resp[6][i][j].match(' GEN')){
            resp[6][i][j] = resp[6][i][j].replace(' GEN','');
            sheet.getRange(i+1,j+3).setBackground('#D9A744');
            //values.push([i+1,j+1]);
          }
        }
      }
    }
    sheet.getRange(2, 3, resp[6].length, resp[6][0].length).setValues(resp[6]);
    Logger.log('here1');
    logItem(LOGDATA);
    base.removeData('importBlankPCPD');
    return  [true,'importBlankPCPC2',[ resp ,"createAutoPUB"]];
  } catch (e) {
    Logger.log(e);
    LOGDATA.status = false;
    LOGDATA.data.push(['FAILED:', e.toString()]);
    LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
    logItem(LOGDATA);
    return 'Failed. \n' + e.message;
  }
}


function updateGeneratedData(items, id) {
  var LOGDATA = {
    status: true,
    msg: '',
    action: 'Generate PUB Items',
    batch: 'Spreadsheet',
    page: 'PC/PD',
    user: Session.getActiveUser().getEmail(),
    data: new Array()
  };
  try{
    var sheet = SpreadsheetApp.openById(id).getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    var payload={ 
      'data':JSON.stringify(data),
      'items':JSON.stringify(items),
      'id':id.toString(),
    };
    
    var params={
      method:"POST",
      "Content-Type":'application/json',
      muteHttpExceptions :true,
      'payload':payload,
    }
    var url='http://212.69.229.10:4000/'+NODE_PATH+'/updategenerateddatapath';
    var response=UrlFetchApp.fetch(url, params).getContentText();
    
    logItem(LOGDATA);
    
    return [false,'updateGeneratedData'];
  } catch (e) {
    LOGDATA.status = false;
    LOGDATA.data.push(['FAILED:', e.toString()]);
    LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
    logItem(LOGDATA);
    return 'Failed. \n' + e.message;
    
  }
}
function updateGeneratedDataPing() {
  Utilities.sleep(20000);
  var LOGDATA = {
    status: true,
    msg: '',
    action: 'Generate Blank PC/PD',
    batch: 'Spreadsheet',
    page: 'PC/PD',
    user: Session.getActiveUser().getEmail(),
    data: new Array()
  };
  
  try {
    var status=base.getData('importBlankPCPD/status');
    if(!status){
      return [false,'updateGeneratedData'];
    }
    var resp =base.getData('importBlankPCPD');
    
    LOGDATA.data=resp.LOGDATA;
    LOGDATA.batch=resp.id;
    
    var sheet = SpreadsheetApp.openById(resp.id).getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    logItem(LOGDATA);
    base.removeData('importBlankPCPD');
  //  var resp2=createRefferenceDB2(resp.id,data)
    return  [true,'updateGeneratedData',resp2];
  } catch (e) {
    Logger.log(e);
    LOGDATA.status = false;
    LOGDATA.data.push(['FAILED:', e.toString()]);
    LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
    logItem(LOGDATA);
    return 'Failed. \n' + e.message;
  }
}

function createRefferenceDB2(id,data) {
  // base.removeData('References');
  var LOGDATA = {
    status: true,
    msg: '',
    action: 'Import PC/PD',
    batch: id,
    page: 'PC/PD',
    user: Session.getActiveUser().getEmail(),
    data: new Array()
  };
  var options1 = '{';
  var options2 = '{';
  var options3 = '{';
  var options4 = '{';
  var bottles = getBottlesDropdown2();
  var Caps = getLidDropdown2();
  var addedPCs = [];
  var addedPDs = [];
  var recipes = base.getData('Recipes');
  for (var i = 1; i < data.length; i++) {
    try {
      var productcode = data[i][0].replace(/&/g, '').replace('&', '').replace('/', '').replace('(', '').replace(')', '').replace('.', '').replace(/\./g, "");
      var productdescription = data[i][1].replace(/&/g, '').replace('(', '').replace(')', '').replace('/', '').replace(/\./g, "").replace(/\//g, "");
      if(!data[i][2]||!data[i][4]){
        continue;
      }
      var unbrandSKU = data[i][2];
      var unbranddescr = data[i][3];
      // generateForSingleUnbrand2(unbrandSKU, unbranddescr);
      var premixSKU = data[i][4];
      var premixdescr = data[i][5];
      //  generateForSinglePremix2(premixSKU, premixdescr);
      var premixSKUColored = data[i][6];
      var premixdescrColored = data[i][7];
      //   generateForSinglePremix2(premixSKUColored, premixdescrColored);
      var linkedBB = data[i][8];
      
      var brand = data[i][9];
      var brandSKU = data[i][10];
      var btype = data[i][11];
      var botSKU = data[i][12];
      
      var fill = data[i][13];
      
      var lid = data[i][14];
      var lidSKU = data[i][15];
      //     var headerRow=['Product Code','Product Description','Unbranded SKU','Unbranded Description','Premix SKU','Premix Description',
      //'Linked BB SKU','Label Code','Brand','Bottle','Bottle SKU','Fill','Cap','Cap SKU','Packaging','Packaging SKU','Box','Box SKU','NIB','Flavour','Recipe','Recipe ID'];
      
      var packagingTypeName = data[i][16];
      var packagingTypeSKU = data[i][17];
      if (packagingTypeSKU) {
        var packagingType = {
          name: packagingTypeName,
          sku: packagingTypeSKU,
        };
      } else {
        var packagingType = {
          name: '',
          sku: '',
        };
      }
      var boxnameName = data[i][18];
      var boxnameSKU = data[i][19];
      
      if (boxnameSKU) {
        var boxname = {
          name: boxnameName,
          sku: boxnameSKU,
        };
      } else {
        var boxname = {
          name: '',
          sku: '',
        };
      }
      var NIB = data[i][20]
      var flavour = {
        name: '',
        sku: '',
      };
      var flavourName = data[i][21];
      var flavourSKU = data[i][22];
      if (flavourSKU) {
        var flavour = {
          name: flavourName,
          sku: flavourSKU,
        };
      } else {
        var flavour = {
          name: '',
          sku: 'NOTFOUND',
        };
      }
      
      
      var recipename = data[i][23];
      var recipeid = data[i][24];
      if (recipeid) {
        var recipe = {
          name: recipename,
          id: recipeid,
        };
      } else {
        var recipe = {
          name: '',
          id: 'NOTFOUND',
        };
      }
      
      
      if (linkedBB != '' && linkedBB != 0) {} else {
        linkedBB = 0;
      }
      var recipe = recipes[recipe.id];
      if (!recipe) {
        LOGDATA.msg += 'Recipe Not found ' + data[i][21] + ' for item ' + productcode + ' \n ';
        continue;
      }
      if (btype == '') {
        for (var j = 0; j < bottles.length; j++) {
          if (bottles[j].sku == botSKU) {
            
            btype = bottles[j].name;
            break;
          }
        }
      }
      if (lid == '') {
        for (var j = 0; j < Caps.length; j++) {
          if (Caps[j].sku == lidSKU) {
            
            lid = Caps[j].name;
            break;
          }
        }
      }
      var obj1 = {
        premixdescr: premixdescr,
        unbranddescr: unbranddescr,
        premixdescrColored: premixdescrColored,
        
        premixSKU: premixSKU,
        premixSKUColored: premixSKUColored,
        unbrandSKU: unbrandSKU,
        NIB: NIB,
        
        boxname: boxname,
        fill: fill,
        btype: btype,
        lid: lid,
        recipe: recipe,
        packagingType: packagingType,
        
        prod: productcode,
        descr: productdescription,
        productcode: productcode,
        productdescription: productdescription,
        brand: brand,
        brandSKU: brandSKU,
        flavour: flavour,
        linkedBB: linkedBB,
        botSKU: botSKU,
        lidSKU: lidSKU,
        botlabel: data[i][25],
        botlabelsku: data[i][26],
        ppbotlabel: data[i][27],
        ppbotlabelsku: data[i][28],
        
        packlabel: data[i][29],
        packlabelsku: data[i][30],
        pppacklabel: data[i][31],
        pppacklabelsku: data[i][32],
        barcode: data[i][33],
        ecid: data[i][34],
      };
      
      //var botlabel,var .botlabelsku,var .ppbotlabel,data[i].ppbotlabelsku,data[i].packlabel,data[i].packlabelsku,data[i].pppacklabel,data[i].pppacklabelsku]);
      var obj2 = {
        premixdescr:premixdescr,
        unbranddescr:unbranddescr,
        premixSKU:premixSKU,
        unbrandSKU:unbrandSKU,
        NIB:NIB,
        
        boxname:boxname,
        fill:fill,
        btype: btype,
        lid: lid,
        recipe: recipe,
        
        
        prod: productcode,
        descr: productdescription,
        productcode: productcode,
        productdescription: productdescription,
        brand: brand,
        brandSKU:brandSKU,
        flavour: flavour,
        
        botSKU:botSKU,
        lidSKU:lidSKU,
        botlabel:data[i][23],
        botlabelsku:data[i][24],
        ppbotlabel:data[i][25],
        ppbotlabelsku:data[i][26],
        
        packlabel:data[i][27],
        packlabelsku:data[i][28],
        pppacklabel:data[i][29],
        pppacklabelsku:data[i][30],
        barcode:data[i][31],
        ecid:data[i][32],
      };
      //var botlabel,var .botlabelsku,var .ppbotlabel,data[i].ppbotlabelsku,data[i].packlabel,data[i].packlabelsku,data[i].pppacklabel,data[i].pppacklabelsku]);
      if(obj1.packagingType.sku){
        obj1.linkedBB=obj1.prod+'BB';
        
        obj2.prod=obj1.linkedBB;
        obj2.descr='BB'+obj1.descr;
        obj2.productcode=obj1.linkedBB;
        obj2.productdescription='BB'+obj1.productdescription;
        
        options1 += '"' + obj2.prod + '":' + JSON.stringify(obj2) + ',';
        options2 += '"' +  obj2.descr + '":' + JSON.stringify(obj2) + ',';
      }
      
      options1 += '"' + productcode + '":' + JSON.stringify(obj1) + ',';
      options2 += '"' + productdescription + '":' + JSON.stringify(obj1) + ',';
      addedPCs.push(productcode);
      addedPDs.push(productdescription);
    } catch (e) {
      Logger.log(i);
    }
  }
  options1 += '}';
  options2 += '}';
  var ob1 = JSON.parse(options1);
  var ob2 = JSON.parse(options2);
  options3 += '}';
  options4 += '}';
  var ob3 = JSON.parse(options3);
  var ob4 = JSON.parse(options4);
  if (ob1) {
    
    for (var k = 0; k < addedPCs.length; k++) {
      LOGDATA.data.push(['Added:', addedPCs[k]]);
      
    }
  }
  if (ob3) {
    
    for (var k = 0; k < addedPDs.length; k++) {
      LOGDATA.data.push(['Added:', addedPDs[k]]);
      
    }
  }
  var msg = LOGDATA.msg;
  logItem(LOGDATA);
  //      base.updateData('References/ProductCodes', ob3);
  
  //     base.updateData('References/Descriptions', ob4);
  
  base.updateData('References/ProductCodes', ob1);
  
  base.updateData('References/Descriptions', ob2);
  
  return msg + ' \n Updated.';
}
