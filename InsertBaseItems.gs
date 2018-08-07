function newBasicItem(name, page) {
Logger.log(page);
     var LOGDATA = {
        status: true,
        msg: '',
        action: 'New Item',
   
        page: 'Functions',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
 try{   if (page == 'Flavours') {
    
        var sku = 'FLAV' + getRandom() + name.substr(0, 1).toUpperCase();
      LOGDATA.batch=name;
        var dat1={
        Running:0,
        Completed:0,
        Reserved:0,
        sku:sku,
        name:name,
        type:'base',
        }
        LOGDATA.data.push(['New Flavour',name+' '+sku]);
        base.updateData('Flavours/'+sku,dat1);
    } else if (page == 'Customers') {
           if(!name.sku){
        var sku = 'CUST' + getRandom() + name.name.substr(0, 1).toUpperCase();
        }else{
        var sku=name.sku;
        }  
        var dat1={
        name:name.name,
        address:name.address,
        sku:sku
        }
         LOGDATA.batch=name.name;
         LOGDATA.data.push(['New Customer',name]);
        base.updateData('Customers/'+dat1.sku,dat1);
    } else if (page == 'BottleTypes') {
       // generateForSingleBottle(name);
            var dat1 = {
        sku: 'BOT' + getRandom() + name.replace(/\D/g, ''),
        'name': name,
        Running: 0,
        Reserved: 0,
        Completed: 0,
    };
     LOGDATA.batch=name;
      LOGDATA.data.push(['New Bottle',name]);
      base.updateData('BottleTypes/' + name, dat1);

    } else if (page == 'FlavourMixes') {
     LOGDATA.batch=name.name;
        LOGDATA.data.push(['New Flavour Mix',name.name]);
        generateForSingleFlavourMix(name);
    } else if (page == 'Labels') {
        LOGDATA.data.push(['New Label',name.name]);
         LOGDATA.batch=name.name;
                name.Running=0;
        name.Reserved=0;
        name.Completed=0;
        base.updateData('Labels/'+name.sku,name);
    }else if (page == 'Color') {
        LOGDATA.data.push(['New Color',name.name]); 
        LOGDATA.batch=name.name;
        name.Running=0;
        name.Reserved=0;
        name.Completed=0;
        base.updateData('Color/'+name.sku,name);
    } else if (page == 'Brands') {
        LOGDATA.data.push(['New Brand',name]);
         LOGDATA.batch=name;
        generateForSingleBrand(name);
    } else if (page == 'Lids') {
    LOGDATA.data.push(['New Lid',name]);
     LOGDATA.batch=name;
        generateForSingleLid(name);
    } else if (page == 'Misc') {
        LOGDATA.data.push(['New Misc',name]);
         LOGDATA.batch=name;
        generateForSingleMisc(name);
    } else if (page == 'Packages') {
     LOGDATA.batch=name.name;
            LOGDATA.data.push(['New Package',name.name]);
        generateForSinglePackage(name);
    } else if (page == 'Boxes') {
     LOGDATA.batch=name.name;
            LOGDATA.data.push(['New Box',name.name]);
        generateForSingleBox(name);
    } else if (page == 'Recipes') {
       
       var dbname= generateForSingleRecipe(name);
        LOGDATA.batch=dbname;
         LOGDATA.data.push(['New Recipe',dbname]);
    }else if (page == 'Machines') {
       base.updateData('Machines/'+name.sku,name);
         LOGDATA.data.push(['New Machine',name.name]);
    }else if (page == 'FillLevels') {
       base.updateData('FillLevels/'+name.sku,name);
         LOGDATA.data.push(['New Fill Level',name.name]);
    }

logItem(LOGDATA);
return 'success';
}catch(e){
  LOGDATA.status=false;
  LOGDATA.data.push(['Failed',e.message]);
  logItem(LOGDATA);
return e.message;}
}
function newFlavoursArray(arr){
  var LOGDATA = {
    status: true,
    msg: '',
    action: 'New Flavours',
    batch: 'Flavours',
    page: 'Functions',
    user: Session.getActiveUser().getEmail(),
    data: new Array()
  };
  
  try{
    for(var i=0;i<arr.length;i++){
      
      if(!arr[i].sku){
        var sku = 'FLAV' + getRandom() + arr[i].name.substr(0, 1).toUpperCase();
      }else{
        var sku=arr[i].sku;
      }
      var dat1={
        Running:0,
        Completed:0,
        Reserved:0,
        sku:sku,
        name:arr[i].name,
        type:'base',
      }
      LOGDATA.data.push(['New Flavour',arr[i].name+' '+sku]);
      base.updateData('Flavours/'+sku,dat1);
      LOGDATA.msg+='New Flavour '+arr[i].name+' '+sku;
    }
    
    
    logItem(LOGDATA);
    return LOGDATA.msg;
  }catch(e){
    LOGDATA.status=false;
    LOGDATA.data.push(['Failed',e.message]);
    logItem(LOGDATA);
    return e.message;}
}

function createCustomerOrderForm(obj){
  var LOGDATA = {
    status: true,
    msg: '',
    action: 'New Item',
    batch: obj.name,
    page: 'Functions',
    user: Session.getActiveUser().getEmail(),
    data: new Array()
  };
  try{
    var sku = 'CUST' + getRandom() + obj.name.substr(0, 1).toUpperCase();
    var dat1={
      name:obj.name,
      address:obj.address,
      sku:sku
    }
    LOGDATA.data.push(['New Customer',obj.name]);
    base.updateData('Customers/'+dat1.sku,dat1);
    
    logItem(LOGDATA);

    
    return sku;
  }catch(e){
    LOGDATA.status=false;
    LOGDATA.data.push(['Failed',e.message]);
    logItem(LOGDATA);
    return e.message;}
}


function generateForSingleCustomer(name) {
    var options = {
        name: name
    };
    base.updateData('Customers/' + name, options);



}




function generateForSingleBottle(name) {

    //Unbranded

    var recipes = getRecipeDropdown();
    var flavours = getFlavourDropdown();

    var options = '{';
    for (var i = 0; i < flavours.length; i++) {
        var lev1 = '';
        for (var j = 0; j < recipes.length; j++) {
            var lev2 = '';
        
            var bsize = name.replace(/\D/g, '');
           
          
          if(recipes[j][3]=='nic'){
            var unbranded = "GBVCO TPD " + flavours[i] + " " +recipes[j][1]  + " " + recipes[j][2]+ " " + bsize;
          }else{
            var unbranded = "CBD GBVCO TPD " + flavours[i] + " " + recipes[j][1]  + " " + recipes[j][2] + " " + bsize;
          }
            var item = {
                "sku": 'UNB' + getRandom() + flavours[i].substr(0, 1),
                "name": unbranded,
                "Running": 0,
                "Reserved": 0,
                "Completed": 0,
            };

            lev2 += '"' + unbranded + '":' + JSON.stringify(item) + ',';




            lev1 += lev2;
        }
        options += lev1;
    }

    options += '}';

    var obj = JSON.parse(options);


    base.updateData('UnbrandedTypes', obj);




}

function generateForSingleFlavourMix(obj){
if(!obj.sku){
obj.sku='FLAVCU'+getRandom();
}
  base.updateData('FlavourMixes/'+obj.sku,obj);
Logger.log(obj);
  var dat1={
    Running:0,
    Completed:0,
    Reserved:0,
    sku:obj.sku,
    name:obj.name,
    type:'mix',
  }
  base.updateData('Flavours/'+dat1.sku,dat1);
}

function generateForSingleBrand(name) {
    var dat1 = {
         sku: 'BRAN' + getRandom() + name.substr(0, 1).toUpperCase(),
        name: name,

    };
    base.updateData('Brands/' + dat1.sku, dat1);

 

}


function generateForSingleBrand2(prod,descr) {
 var LOGARR=[];
  
  
  var exists=base.getData('BrandedTypes/'+prod);
  if(!exists){
    var sku=''
    var item = {
      "sku": prod,
      "name": descr,
      "Running": 0,
      "Reserved": 0,
      "Completed": 0,
    };
    
    
    
    base.updateData('BrandedTypes/'+item.sku, item);
    LOGARR.push(['Generated braned type:',item.sku]);
       var link=base.getData('References/ProductCodes/'+prod+'/linkedBB');
    var exists2=base.getData('BrandedTypes/'+link+'BB');
    if(!exists){
      var sku=''
      var item = {
        "sku": prod+'BB',
        "name": 'BB '+descr.replace('3 x 10ml','10ml').replace('4 x 10ml','10ml').replace(/\./g, ""),
        "Running": 0,
        "Reserved": 0,
        "Completed": 0,
      };
      
      
      
      base.updateData('BrandedTypes/'+item.sku, item);
        LOGARR.push(['Generated linked branded type:',item.sku]);
   
    }
    
    
    
  }else{
    
    var link=base.getData('References/ProductCodes/'+prod+'/linkedBB');
    var exists2=base.getData('BrandedTypes/'+link);
    if(!exists){
      var sku=''
      var item = {
        "sku": link+'BB',
        "name": 'BB '+descr.replace('3 x 10ml','10ml').replace('4 x 10ml','10ml').replace(/\./g, ""),
        "Running": 0,
        "Reserved": 0,
        "Completed": 0,
      };
      
      base.updateData('BrandedTypes/'+item.sku, item);
      
      LOGARR.push(['Generated linked branded type:',item.sku]);
    }  
    
  }
  return LOGARR;
}

function generateForSingleBrand3(prod,descr) {
  

 
  var item = {
    "sku": prod,
    "name": descr,
    "Running": 0,
    "Reserved": 0,
    "Completed": 0,
  };
  
  
  
  base.updateData('BrandedTypes/'+item.sku, item);
  var link=base.getData('References/ProductCodes/'+prod+'/linkedBB');
  
  
if(link!=0){
  var item = {
    "sku": prod+'BB',
    "name": 'BB '+descr.replace('3 x 10ml','10ml').replace('4 x 10ml','10ml').replace(/\./g, ""),
    "Running": 0,
    "Reserved": 0,
    "Completed": 0,
  };
  
  
  
  base.updateData('BrandedTypes/'+item.sku, item);
  
  
  }
  
  

  
}
function generateForSingleUnbranded(recipe,flavour,bsize) {

    // unbranded

    var options = '{';

      
            var lev3 = '';

       
                if(recipe.type=='nic'){
                 var unbranded = "GBVCO TPD " + flavour + " " +recipe.ratio  + " " +recipe.nic+" "+bsize;
                }else{
                 var unbranded = "CBD GBVCO TPD " + flavour + " " +recipe.ratio  + " " +recipe.cbd +" "+bsize;
                }
        
                var exists=base.getData('UnbrandedTypes/'+unbranded);
                if(!exists){
                var item = {
                    "sku": 'UNB' + getRandom() + flavour.substr(0, 1).toUpperCase(),
                    "name": unbranded,
                    "Running": 0,
                    "Reserved": 0,
                    "Completed": 0,
                };

                lev3 += '"' + unbranded + '":' + JSON.stringify(item) + ',';
              }
            
           
    
    options += lev3;


    options += '}';

    var obj = JSON.parse(options);

    base.updateData('UnbrandedTypes', obj);




};

function generateForSingleLid(name) {
    var dat1 = {
        sku: 'LID' + getRandom() + name.substr(0, 1),
        'name': name,
        Running: 0,
        Reserved: 0,
        Completed: 0,
    };
    base.updateData('Lids/' + dat1.sku, dat1);


}


function generateForSingleMisc(name) {

    var dat1 = {
        sku: 'MIS' + getRandom() + name.substr(0, 1),
        'name': name,
        Running: 0,
        Reserved: 0,
        Completed: 0,
    };
    base.updateData('Misc/' + name, dat1);


}


function generateForSinglePackage(name) {


        name.Running=0;
         name.Reserved=0;
         name.Completed=0;
 
    base.updateData('Packages/' + name.sku, name);


}
function generateForSingleBox(name) {


        name.Running=0;
         name.Reserved=0;
         name.Completed=0;
 
    base.updateData('Boxes/' + name.sku, name);
}

function generateForSingleRecipe(item) {
  if(item.id){}else{
  var id=getRandom()*getRandom();
  item.id=id;
  }
  base.removeData('Recipes/'+item.id);
  var dat1 = {
  
    id:item.id,
    name: item.name,
    VGrec: item.vgrec,
    PGrec: item.pgrec,
      AGrec: item.agrec,
    MCTrecipe: item.MCTrecipe,
    Nicorec: item.nicorec,
    Nicorecsalts: item.nicorecsalts,
    cbdrec: item.cbdrec,
    Flavrec: item.Flavrec,
    vg: item.vg,
    pg: item.pg,
    strength: item.strength,
  };
  
  if(item.Color){
  
  dat1.Color=item.Color;
  }
  base.updateData('Recipes/' + dat1.id, dat1);
  return dat1.name;   
}


    //Premixes

/*    var flavours = getFlavourDropdown();
    var bottletypes = getBottlesDropdown();
    var lids = getLidDropdown();
    var packagings = getPackagingDropdown();
    var customers = getCustomerDropdown();
    var brands = getBrandDropdown();
*/
 /*   var options = '{';
    for (var i = 0; i < flavours.length; i++) {
    
        var lev1 = '';
        if(name.type=='nic'){
        var premix = "GBVCO TPD Premix " + flavours[i] + " " + name.ratio + " " + name.nic;
        }else{
        var premix = "CBD GBVCO TPD Premix " + flavours[i] + " " + name.ratio + " " + name.cbd;
        }
        
        var item = {
            "sku": 'PRE' + getRandom() + flavours[i].substr(0, 1).toUpperCase(),
            "name": premix,
            "Running": 0,
            "Reserved": 0,
            "Completed": 0,
        };

        lev1 += '"' + premix + '":' + JSON.stringify(item) + ',';


        options += lev1;
    }
    options += '}';
    Logger.log(options);

    var obj = JSON.parse(options);

    base.updateData('PremixesTypes', obj);




    //Unbranded

    var options = '{';
    for (var i = 0; i < flavours.length; i++) {
        var lev1 = '';

        var lev2 = '';
        for (var k = 0; k < bottletypes.length; k++) {
          
            
            var bsize = bottletypes[k].replace(/\D/g, '');
            
               if(name.type=='nic'){
                 var unbranded = "GBVCO TPD " + flavours[i] + " " + name.ratio + " " + name.nic + " " + bsize;
                }else{
                 var unbranded = "CBD GBVCO TPD " + flavours[i] + " " + name.ratio + " " + name.cbd + " " + bsize;
                }
            var item = {
                "sku": 'UNB' + getRandom() + flavours[i].substr(0, 1),
                "name": unbranded,
                "Running": 0,
                "Reserved": 0,
                "Completed": 0,
            };

            lev2 += '"' + unbranded + '":' + JSON.stringify(item) + ',';



        }
        lev1 += lev2;

        options += lev1;
    }

    options += '}';

    var obj = JSON.parse(options);


    base.updateData('UnbrandedTypes', obj);



*/
    //Branded


function generateForSingleUnbrand2(prod,descr){
var exists=base.getData("UnbrandedTypes/"+prod);
if(!exists){
  var item = {
    "sku": prod,
    "name": descr,
    "Running": 0,
    "Reserved": 0,
    "Completed": 0,
  };
  
  
  
  base.updateData('UnbrandedTypes/'+item.sku, item);

}

}

function generateForSinglePremix2(prod,descr){
var exists=base.getData("PremixesTypes/"+prod);
if(!exists){
  var item = {
    "sku": prod,
    "name": descr,
    "Running": 0,
    "Reserved": 0,
    "Completed": 0,
  };
  
  
  
  base.updateData('PremixesTypes/'+item.sku, item);

}
}