function CheckPremixed(data) {

    var USAGE ={};
    var suffix = data.batch.substr(-1);
    var for_premixed_stock = suffix == PREMIX_STOCK_SUFFIX ? true : false;
    var LOGARR = [];
    if(! data.used){
    data.used=new Array();
    }
    var order= base.getData('Orders/' + data.batch);
    var premix = getPremixSKU(data,false);
    
    if(!for_premixed_stock){
      toProduction(data);
      USAGE.Caps = {
        sku:data.lidSKU,
        name:data.lid,
        qty:  data.bottles,
      };
      LOGARR.push(['Sent to Production:', data.bottles]);
      data.used.push(['Lids/', data.lidSKU,data.bottles]);
      var neg = fromRunningtoReserved('Lids/' + data.lidSKU, data.bottles);
      LOGARR.push([data.lidSKU, data.bottles]);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return {LogData:LOGARR,USAGE:USAGE};
      }
      
      USAGE.Bottles = {
        sku:data.botSKU,
        name:data.btype,
        qty:  data.bottles,
      };
      data.used.push(['BottleTypes/', data.botSKU,data.bottles]);
      var neg = fromRunningtoReserved('BottleTypes/' + data.botSKU, data.bottles);
      LOGARR.push([data.botSKU, data.bottles]);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return {LogData:LOGARR,USAGE:USAGE};
      }
    }
  if(data.recipe.Color){
    USAGE.Color = {
      sku:data.recipe.Color.sku,
      name:data.recipe.Color.name,
      qty: data.QTY*10*data.recipe.Color.val,
    };
    data.used.push(['Color/', data.recipe.Color.sku, data.QTY*10*data.recipe.Color.val]);
    LOGARR.push(['Color:',data.QTY*10*data.recipe.Color.val]);
    var neg = fromRunningtoReserved('Color/' + data.recipe.Color.sku, data.QTY*10*data.recipe.Color.val);
    if (neg<0) {
      LOGARR = LOGARR.concat(returnData(data,neg))
      return {LogData:LOGARR,USAGE:USAGE};
    }
    toPremixColoring(data);
  }
  

    var premixstock = base.getData("PremixesTypes/" + premix);
    var pom1 = premixstock.Reserved;
   
    if(premixstock.Running===undefined||premixstock.Running<0){premixstock.Running=0;}
    var helper = premixstock.Running - data.QTY;
    if (helper == 0) {
      var dat3 = {
        premixed: premixstock.Running
        
      }
      premixstock.Running = 0;
      premixstock.Reserved = pom1 + data.QTY;
      
      USAGE.Premix = {
        sku:premix,
        name:premixstock.name,
        qty:  data.QTY,
      };
    
        LOGARR.push(['Premix:', dat3.premixed]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }
        if(order.premixed){
        dat3.premixed=dat3.premixed+order.premixed;
        }
        base.updateData('Orders/' + data.batch, dat3)
        base.updateData('PremixesTypes/' + premix, premixstock);
        data.tomixing = 0;



    } else if (helper > 0) {
    
      var dat3 = {
        premixed: data.QTY
        
      }
      premixstock.Running = helper;
      premixstock.Reserved = pom1 + data.QTY;
      USAGE.Premix = {
        sku:premix,
        name:premixstock.name,
        qty:  data.QTY,
      };

      
      LOGARR.push(['Premix:', data.QTY]);
      if (dat3.premixed === undefined) {
        dat3.premixed = 0;
      }
      if(order.premixed){
        dat3.premixed=dat3.premixed+order.premixed;
      }
      base.updateData('PremixesTypes/' + premix, premixstock);
      base.updateData('Orders/' + data.batch, dat3);
      data.tomixing = 0;



    } else if (helper < 0) {
      var dat3 = {
        premixed:   premixstock.Running
        
      }
      premixstock.Reserved = pom1 +  premixstock.Running;
      premixstock.Running = 0;
      USAGE.Premix = {
        sku:premix,
        name:premixstock.name,
        qty:  dat3.premixed,
      };
      data.used.push(['PremixesTypes/', premix, dat3.premixed]);
      LOGARR.push(['Premix:', dat3.premixed]);
      if (dat3.premixed === undefined) {
        dat3.premixed = 0;
      }
      if(order.premixed){
        dat3.premixed=dat3.premixed+order.premixed;
      }
 
      
      

        var newmixvol = data.QTY - dat3.premixed;
      base.updateData('PremixesTypes/' + premix, premixstock);
      base.updateData('Orders/' + data.batch, dat3)
      
        data.QTY = newmixvol;
        data.tomixing = 'Sent';
        if (data.Nico||data.Nicosalts) {
            var rounded = Math.ceil(data.QTY / 5) * 5;

        } else {
            var rounded = Math.ceil(data.QTY);

        }
      var order = base.getData('Orders/'+data.batch);
      if(data.QTY==0 && order.premixed==0 && order.unbranded==0 && order.branded==0 && order.backtubed==0){
      returnData(data,0) 
      
      }

        var forpremix = rounded - data.QTY;

        
      
      if (forpremix > 0) {
        data.QTY = rounded;
        data.haspremix = true;
        data.dudpremixCode = data.batch + "RU";
        data.forpremix = forpremix;
        LOGARR.push(['Rounded with:', forpremix]);
      } else {
        
        data.haspremix = false;
      }

        USAGE.Flavour={
          sku:data.flavour.sku,
          name:data.flavour.name,
          qty: data.flavvalue * data.QTY / 1000,
        };
      data.used.push(['Flavours/', data.flavour.sku, data.flavvalue * data.QTY / 1000]);
      LOGARR.push(['Flavour:', data.flavvalue * data.QTY / 1000]);
      var neg = fromRunningtoReserved('Flavours/' + data.flavour.sku, data.flavvalue * data.QTY / 1000);
      
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return {LogData:LOGARR,USAGE:USAGE};
      }
      

      USAGE.Mixing={
        vg:data.VGval * data.QTY,
      };
      
      data.used.push(['Misc/VG', '', data.VGval * data.QTY]);
      LOGARR.push(['VG:', data.VGval * data.QTY]);
      var neg = fromRunningtoReserved("Misc/VG", data.VGval * data.QTY);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return {LogData:LOGARR,USAGE:USAGE};
      }
      USAGE.Mixing.pg = data.PGval * data.QTY;
      
      data.used.push(['Misc/PG', '', data.PGval * data.QTY]);
      LOGARR.push(['PG:', data.PGval * data.QTY]);
      var neg = fromRunningtoReserved("Misc/PG", data.PGval * data.QTY);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return {LogData:LOGARR,USAGE:USAGE};
      }
      
      if(isNaN(data.AGval)){
        data.AGval=0;
      }
      
       USAGE.Mixing.ag = data.AGval * data.QTY;
      data.used.push(['Misc/AG', '', data.AGval * data.QTY]);
      LOGARR.push(['AG:', data.AGval * data.QTY]);
      var neg = fromRunningtoReserved("Misc/AG", data.AGval * data.QTY);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return {LogData:LOGARR,USAGE:USAGE};
      }
      
      
      if(isNaN(data.MCTval)){
        data.MCTval=0;
      }
       USAGE.Mixing.mct = data.MCTval * data.QTY;
      data.used.push(['Misc/MCT', '', data.MCTval * data.QTY]);
      LOGARR.push(['MCT:', data.MCTval * data.QTY]);
      var neg = fromRunningtoReserved("Misc/MCT", data.MCTval * data.QTY);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return {LogData:LOGARR,USAGE:USAGE};
      }
      
      if (data.Nico) {
        USAGE.Mixing.nic = data.Nico * data.QTY;
        data.used.push(['Misc/Nicotine', '', data.Nico * data.QTY]);
        LOGARR.push(['Nicotine:', data.Nico * data.QTY]);
        var neg = fromRunningtoReserved("Misc/Nicotine", data.Nico * data.QTY);
        if (neg<0) {
          LOGARR = LOGARR.concat(returnData(data,neg))
          return {LogData:LOGARR,USAGE:USAGE};
        }
        
      } 
      
      if (data.Nicosalts) {
       USAGE.Mixing.nicsalt = data.Nicosalts * data.QTY;
        data.used.push(['Misc/Nicotine Salts', '', data.Nicosalts * data.QTY]);
        LOGARR.push(['Nicotine Salts:', data.Nicosalts * data.QTY]);
        var neg = fromRunningtoReserved("Misc/Nicotine Salts", data.Nicosalts * data.QTY);
        if (neg<0) {
          LOGARR = LOGARR.concat(returnData(data,neg))
              return {LogData:LOGARR,USAGE:USAGE};
        }
        
      } 
      if (data.CBDvalue) {
        USAGE.Mixing.cbd = data.CBDvalue * data.QTY;
        data.used.push(['Misc/CBD', '', data.CBDvalue * data.QTY]);
        LOGARR.push(['CBD:', data.CBDvalue * data.QTY]);
        var neg = fromRunningtoReserved("Misc/CBD", data.CBDvalue * data.QTY);
        if (neg<0) {
          LOGARR = LOGARR.concat(returnData(data,neg))
             return {LogData:LOGARR,USAGE:USAGE};
        }
        
        
      }
      
      
        LOGARR = LOGARR.concat(createMixOrder(data));
   

        //DUD Premix ORDER
        if (forpremix > 0) {
            var object = {
                batch: data.batch + "RU",

                orderdate: data.orderdate,
                productcode: data.productcode,
                productdescription: data.productdescription,
                priority: data.priority,
                customer: '',
                brand: '',
                flavour: data.flavour,
                bottles: 0,
                stocking: forpremix,
                btype: '',
                lid: '',
                 botSKU: '',
                lidSKU: '',
                packaging: '',
                packagingType: {
                name:'',
                sku:'',
                },
                orderID: '',
                fill: data.fill,
            };
            object.recipe = data.recipe;
            object.final_status = 'started';
            saveOrder(object);

        }
    }


    return {LogData:LOGARR,USAGE:USAGE};

}
function checkColoredPremix(data){
    var USAGE ={};
    if(! data.used){
    data.used=new Array();
    }
    var LOGARR = [];


    var premix = getPremixSKU(data,true);




    var premixstock = base.getData("PremixesTypes/" + premix);
    var pom1 = premixstock.Reserved;
      if(pom1===undefined||pom1<0){pom1=0;}
   
      var helper = premixstock.Running - data.QTY;
      if (helper == 0) {
        
        var dat3 = {
          premixed: premixstock.Running,
          coloredpremix:premixstock.Running,
        }
        USAGE.ColoredPremix = {
          sku:premix,
          name:premixstock.name,
          qty:  data.QTY,
        };

        premixstock.Running = 0;
        premixstock.Reserved = pom1 + data.QTY;
        
        base.updateData('PremixesTypes/' + premix, premixstock);


        LOGARR.push(['Premix:', dat3.Running]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }
        base.updateData('Orders/' + data.batch, dat3)

        data.tomixing = 0;



    } else if (helper > 0) {
      var dat3 = {
        premixed: data.QTY,
        coloredpremix:data.QTY,
      }
       USAGE.ColoredPremix = {
          sku:premix,
          name:premixstock.name,
          qty:  data.QTY,
        };
        premixstock.Running = helper;
        premixstock.Reserved = pom1 + data.QTY;
        
        base.updateData('PremixesTypes/' + premix, premixstock);


        LOGARR.push(['Premix:', data.QTY]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }
        base.updateData('Orders/' + data.batch, dat3)
        data.tomixing = 0;



    } else if (helper < 0) {
      var dat3 = {
        premixed:   premixstock.Running
        
      }
      premixstock.Reserved = pom1 +  premixstock.Running;
      premixstock.Running = 0;
      USAGE.Premix = {
        sku:premix,
        name:premixstock.name,
        qty:  dat3.premixed,
      };
      

        base.updateData('PremixesTypes/' + premix, premixstock);

        data.used.push(['PremixesTypes/', premix, dat3.premixed]);
        LOGARR.push(['Premix:', dat3.premixed]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }

        




        var newmixvol = data.QTY - dat3.premixed;
      base.updateData('Orders/' + data.batch, dat3)
        data.QTY = newmixvol;

      var PMIXRUN = CheckPremixed(data);
      
      LOGARR=LOGARR.concat(PMIXRUN.LogData);
      USAGE=jsonConcat(USAGE,PMIXRUN.USAGE);
  }


     return {LogData:LOGARR,USAGE:USAGE};





}
function returnData(data,neg) {
    var LOGARR = [];
    for (var i = 0; i < data.used.length; i++) {
    try{
        fromReservedToRunning(data.used[i][0] + data.used[i][1], data.used[i][2]);
        LOGARR.push(['To Running: ' + data.used[i][0] + data.used[i][1], data.used[i][2]]);
      }catch(e){
      
        LOGARR.push(['To Running Failed: ' + data.used[i][0] + data.used[i][1], data.used[i][2]]);
      }
    }
      var dat = {
        wentNegative: true,
        unbranded : 0,
        branded : 0,
        premixed : 0,
        coloredpremix : 0,
        mixing : 0,
        backtubed : 0,
      }

    base.updateData('Orders/' + data.batch, dat);
    var sheets2 = ['PremixColoring','Production', 'Printing', 'Labelling', 'Packaging', 'Shipping'];

    for (var i = 0; i < sheets2.length; i++) {
        try{
        base.removeData(sheets2[i] + '/' + data.batch);
        }catch(e){
          
          LOGARR.push(['Removing From Tab Failed: ', sheets2[i] + '/' + data.batch]);
        }
    }
    try{
    var name = base.getData(data.used[data.used.length-1][0] + data.used[data.used.length-1][1]+'/name');
    }catch(e){
    var name ='none';
    }
    LOGARR.push(['WENT NEGATIVE', Math.abs(neg)+ ' - '+ data.used[data.used.length-1][0] + data.used[data.used.length-1][1]+' - '+name ])

    return LOGARR;
}

function returnData2(data,neg) {
    var LOGARR = [];
    for (var i = 0; i < data.length; i++) {
        fromReservedToRunning(data[i][0] + data[i][1], data[i][2]);
        LOGARR.push(['To Running: ' + data[i][0] + data[i][1], data[i][2]]);
    }
       var name = base.getData(data.used[data.used.length-1][0] + data.used[data.used.length-1][1]+'/name');

    LOGARR.push(['WENT NEGATIVE', Math.abs(neg)+' - '+ data.used[data.used.length-1][0] + data.used[data.used.length-1][1]+' - '+name])

    return LOGARR;
}