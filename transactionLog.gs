
function testUSAGE(){
var USAGE ={
  Mixing:{
  vg:4,
  pg:5,
  nic:2
  },
  Flavour:{
  sku:'asdadsdsa',
  name:'flava flave',
  qty:4
  },
  Branded:{
    sku:'Branded asdsad',
    name:'Branded flave',
    qty:4
  }

}
var data = {
batch:"asddsa",
orderID:"23123123",

}
convertUsageToArr(data,USAGE)
}
function convertUsageToArr(data,usage){
  var arr = [data.batch,data.orderID];
  var pages=['Packaged Branded','Branded','Unbranded','Premix','Colored Premix',
             'Mixing','Flavour','Color','Bottles','Caps',
             'Packages','Bottle Label','Pack Label','Pre Bottle Label','Pre Pack Label']
  
  var standardItems = ['sku','name','qty'];
  var mixingItems = ['vg','pg','ag','nic','nicsalt','cbd','mct'];
  for(var i=0;i<pages.length;i++){
  var page = pages[i].replace(/ /g,'');
    if(pages[i]!='Mixing'){
      standardItems.map(function (item){
        arr.push(usage[page] ? (usage[page][item] || usage[page][item] == 0 ? usage[page][item] : "") : "");
        
      });
      
    }else{
      mixingItems.map(function (item){
       arr.push(usage[page] ? (usage[page][item] ? usage[page][item] : 0) : 0);
        
      });
    }
    
  }

  return arr;
}


function LogTransaction(usageArr){
  var sheet = SpreadsheetApp.openById(TRANSACTION_SHEET).getSheetByName('Main');
  
  var formattedDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy HH:mm:ss");
  for(var i=0;i<usageArr.length;i++){
  usageArr[i].unshift(formattedDate);
  }

  var lastRow= sheet.getLastRow();

  sheet.insertRowsAfter(sheet.getMaxRows(), usageArr.length);
//  sheet.getRange(lastRow, 1).setBackground('#D9A744').setValue('NEW LOG ' + formattedDate);
  sheet.getRange(lastRow+1, 1, usageArr.length, usageArr[0].length).setValues(usageArr);

}

function LogPOTransaction(usageArr){
  var sheet = SpreadsheetApp.openById(TRANSACTION_SHEET).getSheetByName('Main');
  var data = sheet.getDataRange().getValues();
  for(var i=data.length-1;i>0;i--){
    if(data[i][1]==usageArr[0]){
      for(var j=2;j<usageArr.length;j++){
        if(!isNaN(usageArr[j]) && !isNaN(data[i][j+1]) && data[i][j+1] > 0 && usageArr[j] > 0){
        sheet.getRange(i+1, j+2).setValue(data[i][j+1]-usageArr[j]);
        
        }
      }
      break;
    }
    
  } 
  
}

function LogDARTransaction(batch){
  var sheet = SpreadsheetApp.openById(TRANSACTION_SHEET).getSheetByName('Main');
  var data = sheet.getDataRange().getValues();
  for(var i=data.length-1;i>0;i--){
    if(data[i][1]==batch){
      for(var j=2;j<data[0].length;j++){
        if(!isNaN(data[i][j+1]) && data[i][j+1] > 0){
        sheet.getRange(i+1, j+2).setValue(0);
        
        }
      }
      
      sheet.getRange(i+1, data[0].length-1).setValue("DR");
      sheet.getRange(i+1, data[0].length).setValue(new Date());
      sheet.getRange(i+1, 1, 1, data[0].length).setBackground("#f44141")
      break;
    }
    
  } 
}
function LogRTransaction(batch){
  var sheet = SpreadsheetApp.openById(TRANSACTION_SHEET).getSheetByName('Main');
  var data = sheet.getDataRange().getValues();
  for(var i=data.length-1;i>0;i--){
    if(data[i][1]==batch){
      for(var j=2;j<data[0].length;j++){
        if(!isNaN(data[i][j+1]) && data[i][j+1] > 0){
        sheet.getRange(i+1, j+2).setValue(0);
        
        }
      }
      
       sheet.getRange(i+1, data[0].length-1).setValue("R");
        sheet.getRange(i+1, data[0].length).setValue(new Date());
       sheet.getRange(i+1, 1, 1, data[0].length).setBackground("#f4a142")
      break;
    }
    
  }
}