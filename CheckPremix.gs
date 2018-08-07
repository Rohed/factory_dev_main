function CheckPremixed(data) {
try{
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
      LOGARR.push(['Sent to Production:', data.bottles]);
      data.used.push(['Lids/', data.lidSKU,data.bottles]);
      var neg = fromRunningtoReserved('Lids/' + data.lidSKU, data.bottles);
      LOGARR.push([data.lidSKU, data.bottles]);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return LOGARR;
      }
      data.used.push(['BottleTypes/', data.botSKU,data.bottles]);
      var neg = fromRunningtoReserved('BottleTypes/' + data.botSKU, data.bottles);
      LOGARR.push([data.botSKU, data.bottles]);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return LOGARR;
      }
    }
  if(data.Color){
    data.used.push(['Color/', data.Color.sku, data.QTY*10*data.Color.val]);
    LOGARR.push(['Color:',data.QTY*10*data.Color.val]);
    var neg = fromRunningtoReserved('Color/' + data.Color.sku, data.QTY*10*data.Color.val);
    if (neg<0) {
      LOGARR = LOGARR.concat(returnData(data,neg))
      return LOGARR;
    }
    toPremixColoring(data);
  }
  

    var premixstock = base.getData("PremixesTypes/" + premix + "/Running");
    var pom1 = base.getData('PremixesTypes/' + premix + '/Reserved');
      if(pom1===undefined||pom1<0){pom1=0;}
    if(premixstock===undefined||premixstock<0){premixstock=0;}
    var helper = premixstock - data.QTY;
    if (helper == 0) {
        var dat1 = {
            "Running": 0

        }
        var dat2 = {
            'Reserved': pom1 + data.QTY
        }
        base.updateData('PremixesTypes/' + premix, dat1);
        base.updateData('PremixesTypes/' + premix, dat2);

        var dat3 = {
            premixed: premixstock

        }
        LOGARR.push(['Premix:', premixstock]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }
        if(order.premixed){
        dat3.premixed=dat3.premixed+order.premixed;
        }
        base.updateData('Orders/' + data.batch, dat3)

        data.tomixing = 0;



    } else if (helper > 0) {
        var dat1 = {
            "Running": helper

        }
        var dat2 = {
            'Reserved': pom1 + data.QTY
        }
        base.updateData('PremixesTypes/' + premix, dat1);
        base.updateData('PremixesTypes/' + premix, dat2);

        var dat3 = {
            premixed: data.QTY

        }
        LOGARR.push(['Premix:', data.QTY]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }
           if(order.premixed){
        dat3.premixed=dat3.premixed+order.premixed;
        }
        base.updateData('Orders/' + data.batch, dat3)
        data.tomixing = 0;



    } else if (helper < 0) {
        var dat1 = {
            "Running": 0

        }
        var dat2 = {
            'Reserved': pom1 + premixstock
        }
        base.updateData('PremixesTypes/' + premix, dat1);
        base.updateData('PremixesTypes/' + premix, dat2);

        var dat3 = {
            premixed: premixstock

        }
        data.used.push(['PremixesTypes/', premix, premixstock]);
        LOGARR.push(['Premix:', premixstock]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }
        if(order.premixed){
          dat3.premixed=dat3.premixed+order.premixed;
        }
        base.updateData('Orders/' + data.batch, dat3)




        var newmixvol = data.QTY - premixstock;
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
      data.used.push(['Flavours/', data.flavour.sku, data.flavvalue * data.QTY / 1000]);
      LOGARR.push(['Flavour:', data.flavvalue * data.QTY / 1000]);
      var neg = fromRunningtoReserved('Flavours/' + data.flavour.sku, data.flavvalue * data.QTY / 1000);
      
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return LOGARR;
      }
      

      
      
      data.used.push(['Misc/VG', '', data.VGval * data.QTY]);
      LOGARR.push(['VG:', data.VGval * data.QTY]);
      var neg = fromRunningtoReserved("Misc/VG", data.VGval * data.QTY);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return LOGARR;
      }
      
      
      data.used.push(['Misc/PG', '', data.PGval * data.QTY]);
      LOGARR.push(['PG:', data.PGval * data.QTY]);
      var neg = fromRunningtoReserved("Misc/PG", data.PGval * data.QTY);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return LOGARR;
      }
      
      if(isNaN(data.AGval)){
        data.AGval=0;
      }
      data.used.push(['Misc/AG', '', data.AGval * data.QTY]);
      LOGARR.push(['AG:', data.AGval * data.QTY]);
      var neg = fromRunningtoReserved("Misc/AG", data.AGval * data.QTY);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return LOGARR;
      }
      
      
      if(isNaN(data.MCTval)){
        data.MCTval=0;
      }
      data.used.push(['Misc/MCT', '', data.MCTval * data.QTY]);
      LOGARR.push(['MCT:', data.MCTval * data.QTY]);
      var neg = fromRunningtoReserved("Misc/MCT", data.MCTval * data.QTY);
      if (neg<0) {
        LOGARR = LOGARR.concat(returnData(data,neg))
        return LOGARR;
      }
      
      if (data.Nico) {
        data.used.push(['Misc/Nicotine', '', data.Nico * data.QTY]);
        LOGARR.push(['Nicotine:', data.Nico * data.QTY]);
        var neg = fromRunningtoReserved("Misc/Nicotine", data.Nico * data.QTY);
        if (neg<0) {
          LOGARR = LOGARR.concat(returnData(data,neg))
          return LOGARR;
        }
        
      } 
      
      if (data.Nicosalts) {
        data.used.push(['Misc/Nicotine Salts', '', data.Nicosalts * data.QTY]);
        LOGARR.push(['Nicotine Salts:', data.Nicosalts * data.QTY]);
        var neg = fromRunningtoReserved("Misc/Nicotine Salts", data.Nicosalts * data.QTY);
        if (neg<0) {
          LOGARR = LOGARR.concat(returnData(data,neg))
          return LOGARR;
        }
        
      } 
      if (data.CBDvalue) {
        data.used.push(['Misc/CBD', '', data.CBDvalue * data.QTY]);
        LOGARR.push(['CBD:', data.CBDvalue * data.QTY]);
        var neg = fromRunningtoReserved("Misc/CBD", data.CBDvalue * data.QTY);
        if (neg<0) {
          LOGARR = LOGARR.concat(returnData(data,neg))
          return LOGARR;
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





    return LOGARR;
      }catch(e){
Logger.log('premix');
returnData(data,0)
return e.message;
}
}
function checkColoredPremix(data){
    if(! data.used){
    data.used=new Array();
    }
    var LOGARR = [];


    var premix = getPremixSKU(data,true);




    var premixstock = base.getData("PremixesTypes/" + premix + "/Running");
    var pom1 = base.getData('PremixesTypes/' + premix + '/Reserved');
      if(pom1===undefined||pom1<0){pom1=0;}
    if(premixstock===undefined||premixstock<0){premixstock=0;}
    var helper = premixstock - data.QTY;
    if (helper == 0) {
        var dat1 = {
            "Running": 0

        }
        var dat2 = {
            'Reserved': pom1 + data.QTY
        }
        base.updateData('PremixesTypes/' + premix, dat1);
        base.updateData('PremixesTypes/' + premix, dat2);

        var dat3 = {
            premixed: premixstock,
            coloredpremix:premixstock,
        }
        LOGARR.push(['Premix:', premixstock]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }
        base.updateData('Orders/' + data.batch, dat3)

        data.tomixing = 0;



    } else if (helper > 0) {
        var dat1 = {
            "Running": helper

        }
        var dat2 = {
            'Reserved': pom1 + data.QTY
        }
        base.updateData('PremixesTypes/' + premix, dat1);
        base.updateData('PremixesTypes/' + premix, dat2);

        var dat3 = {
            premixed: data.QTY,
   
            coloredpremix:data.QTY,
        }
        LOGARR.push(['Premix:', data.QTY]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }
        base.updateData('Orders/' + data.batch, dat3)
        data.tomixing = 0;



    } else if (helper < 0) {
        var dat1 = {
            "Running": 0

        }
        var dat2 = {
            'Reserved': pom1 + premixstock
        }
        base.updateData('PremixesTypes/' + premix, dat1);
        base.updateData('PremixesTypes/' + premix, dat2);

        var dat3 = {
            premixed: premixstock,
            coloredpremix:premixstock,
        }
        data.used.push(['PremixesTypes/', premix, premixstock]);
        LOGARR.push(['Premix:', premixstock]);
        if (dat3.premixed === undefined) {
            dat3.premixed = 0;
        }

        base.updateData('Orders/' + data.batch, dat3)




        var newmixvol = data.QTY - premixstock;
        data.QTY = newmixvol;


        LOGARR = LOGARR.concat(CheckPremixed(data));

  }


    return LOGARR;





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
    var sheets2 = ['Production', 'Printing', 'Labelling', 'Packaging', 'Shipping'];

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