function checkStockValues(BATCHES) {
    var failMSG = '';

    Logger.log(BATCHES);

    var results = [];
/*ar BATCHES = [901007, 901014, 901018, 901028, 901033, 901055, 901057, 901069, 901074, 901111, 901120, 901126,
 901145, 901153, 901157, 901174, 901183, 901186, 901188, 901189, 901196, 901206, 901214, 901224, 901227,
 901260, 901261, 901266, 901280, 901283, 901287, 901288, 901296, 901318, 901334, 901342, 901344, 901346, 901354, 901371, 901374, 901409, 901412, 901421, 901426];
   */
//  BATCHES=['322231S'];

//BATCHES=['901517', '901282', '901684', '901685', '901283', '901351', '901284', '901518'];

    var requiredFlavour = 0;
    var requiredVG = 0;
    var requiredPG = 0;
    var requiredNico = 0;
    var requiredNicosalts = 0;
    var requiredCBD = 0;
    var requiredMCT = 0;    
    var requiredAG = 0;   
    var requiredColors = 0;
    var requiredLids = 0;
    var requiredBottles = 0;
    var requiredPremix = 0;
    var requiredUbottles = 0;
    var requiredBbottles = 0;
    var requiredBoxes = 0;
    var requiredTubes = 0;

    var availableFlavour = 0;
    var availableVG = 0;
    var availablePG = 0;
    var availableNico = 0;
    var availableNicosalts = 0;
    var availableCBD = 0;
    var availableMCT = 0;
       var availableAG = 0;
          var availableColors = 0;
    var availableLids = 0;
    var availableBottles = 0;
    var availablePremix = 0;
    var availableUbottles = 0;
    var availableBbottles = 0;
    var availableBoxes = 0;
    var availableTubes = 0;
      var colorsArr = [];
    var flavoursArr = [];
    var LidsArr = [];
    var PremixArr = [];
    var BottlesArr = [];
    var UbottlesArr = [];
    var BbottlesArr = [];
    var BoxesArr = [];
    var PackedArr = [];
    var BoxArr = [];
    var TubesArr = [];
    var LabelsArr = [];
    var InkArr = [];

    var OrigInkArr = [];
    var OrigTubesArr = [];
    var OrigLabelsArr = [];
    var OrigBoxArr = [];
      var OrigColorsArr = [];
    var OrigFlavoursArr = [];
    var OrigPmixArr = [];
    var OrigBottlesArr = [];
    var OrigUbottlesArr = [];
    var OrigBbottlesArr = [];
    var OrigBoxesArr = [];
    var OrigPackedArr = [];
    var OrigLidsArr = [];
    var OrigPackedArr = [];

    var VGCheck = base.getData('Misc/VG');
    var PGCheck = base.getData('Misc/PG');
        var AGCheck = base.getData('Misc/AG');
    var NicotCheck = base.getData('Misc/Nicotine');
    var NicotChecksalts = base.getData('Misc/Nicotine Salts');
    var CBDCheck = base.getData('Misc/CBD');
    var MCTCheck = base.getData('Misc/MCT');
    availableVG = VGCheck.Running;
    availablePG = PGCheck.Running;
        availableAG = AGCheck.Running;
    availableNico = NicotCheck.Running;
     availableNicosalts = NicotChecksalts.Running;
    availableCBD = CBDCheck.Running;
    availableMCT = MCTCheck.Running;
    for (var i = 0; i < BATCHES.length; i++) {
        try {
            var data = base.getData('Orders/' + BATCHES[i]);
            var suffix = data.batch.substr(-1);

            if (suffix == 'S') {
            
              if(data.checkUncolored){
                var premix = getPremixSKU(data,false);
                
                var premixCheck = base.getData("PremixesTypes/" + premix);
                if (!premixCheck) {
                  var premixCheck = {
                    Running: 0
                  };
                }
                var exists1 = OrigPmixArr.getIndex(premix);
                if (exists1 == -1) {
                  
                  OrigPmixArr.push([premix, premixCheck.Running]);
                  exists1 = OrigPmixArr.getIndex(premix);
                }
                
                var pmixOBJ = checkALL(OrigPmixArr[exists1][1], data.QTY);
                OrigPmixArr[exists1][1] = pmixOBJ.running;
                
                var exists2 = PremixArr.getIndex(premix);
                if (exists2 == -1) {
                  
                  PremixArr.push([premix, pmixOBJ.used, 0])
                } else {
                  PremixArr[exists2][1] += pmixOBJ.used;
                }
                if (pmixOBJ.left <= 0) {
                continue;
                }else{ 
                data.QTY=pmixOBJ.left;
                  var flavourCheck = base.getData('Flavours/' + data.flavour.sku);
                  if (!flavourCheck) {
                    var flavourCheck = {
                      Running: 0
                    };
                  }
                  var exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                  if (exists1 == -1) {
                    
                    OrigFlavoursArr.push([data.flavour.sku, flavourCheck.Running]);
                    exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                  }
                  
                  var flavOBJ = checkALL(OrigFlavoursArr[exists1][1],data.flavvalue * data.QTY / 1000);
                  OrigFlavoursArr[exists1][1] = flavOBJ.running;
                  
                  var exists2 = flavoursArr.getIndex(data.flavour.sku);
                  if (exists2 == -1) {
                    
                    flavoursArr.push([data.flavour.sku, flavOBJ.used, flavOBJ.left ,data.flavvalue * data.QTY / 1000])
                  } else {
                    flavoursArr[exists2][1] += flavOBJ.used;
                    flavoursArr[exists2][2] += flavOBJ.left;
                    flavoursArr[exists2][3] += data.flavrecipe;
                  }
                  
                  
                  
                   var colorCheck = base.getData('Colors/' + data.recipe.Color.sku);
                  if (!colorCheck) {
                    var colorCheck = {
                      Running: 0
                    };
                  }
                  var exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                  if (exists1 == -1) {
                    
                    OrigColorsArr.push([data.recipe.Color.sku, colorCheck.Running]);
                    exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                  }
                  
                  var ColorOBJ = checkALL(OrigColorsArr[exists1][1],data.recipe.Color.val * data.QTY *10);
                  OrigColorsArr[exists1][1] = ColorOBJ.running;
                  
                  var exists2 = colorsArr.getIndex(data.recipe.Color.sku);
                  if (exists2 == -1) {
                    
                    colorsArr.push([data.recipe.Color.sku, ColorOBJ.used, ColorOBJ.left ,data.recipe.Color.val * data.QTY*10])
                  } else {
                    colorsArr[exists2][1] += ColorOBJ.used;
                    colorsArr[exists2][2] += ColorOBJ.left;
                     colorsArr[exists2][3] += data.recipe.Color.val * data.QTY *10;
                  }
                  
                  
                  
                  requiredVG += data.VGval * data.QTY;
                  requiredPG += data.PGval * data.QTY;
                  requiredAG += data.AGval * data.QTY;
                  requiredMCT += data.MCTval * data.QTY;
                  if (data.Nico) {
                    requiredNico +=  data.Nico * data.QTY;
                  }
                   if (data.Nicosalts) {
                    requiredNicosalts +=  data.Nicosalts * data.QTY;
                  } 
                  if (data.CBDvalue) {
                    requiredCBD += data.CBDvalue * data.QTY;
                  }
                  
                  
                
                }
              }else{
              
                var flavourCheck = base.getData('Flavours/' + data.flavour.sku);
                if (!flavourCheck) {
                    var flavourCheck = {
                        Running: 0
                    };
                }
                var exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                if (exists1 == -1) {

                    OrigFlavoursArr.push([data.flavour.sku, flavourCheck.Running]);
                    exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                }

                var flavOBJ = checkALL(OrigFlavoursArr[exists1][1], data.flavrecipe);
                OrigFlavoursArr[exists1][1] = flavOBJ.running;

                var exists2 = flavoursArr.getIndex(data.flavour.sku);
                if (exists2 == -1) {

                    flavoursArr.push([data.flavour.sku, flavOBJ.used, flavOBJ.left , data.flavrecipe])
                } else {
                    flavoursArr[exists2][1] += flavOBJ.used;
                    flavoursArr[exists2][2] += flavOBJ.left;
                      flavoursArr[exists2][3] += data.flavrecipe;
                }

                if(data.recipe.Color){
                  var colorCheck = base.getData('Colors/' + data.recipe.Color.sku);
                  if (!colorCheck) {
                    var colorCheck = {
                      Running: 0
                    };
                  }
                  var exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                  if (exists1 == -1) {
                    
                    OrigColorsArr.push([data.recipe.Color.sku, colorCheck.Running]);
                    exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                  }
                  
                  var ColorOBJ = checkALL(OrigColorsArr[exists1][1],data.recipe.Color.val * data.QTY *10);
                  OrigColorsArr[exists1][1] = ColorOBJ.running;
                  
                  var exists2 = colorsArr.getIndex(data.recipe.Color.sku);
                  if (exists2 == -1) {
                    
                    colorsArr.push([data.recipe.Color.sku, ColorOBJ.used, ColorOBJ.left ,data.recipe.Color.val * data.QTY*10])
                  } else {
                    colorsArr[exists2][1] += ColorOBJ.used;
                    colorsArr[exists2][2] += ColorOBJ.left;
                     colorsArr[exists2][3] += data.recipe.Color.val * data.QTY *10;
                  }
                  
                
                }


                requiredVG += data.VGrecipe;
                requiredPG += data.PGrecipe;
                  requiredAG += data.AGrecipe;
                requiredMCT += data.MCTrecipe;
                if (data.Nicotrecipe) {
                    requiredNico += data.Nicotrecipe;
                }
                if (data.Nicotrecipesalts) {
                    requiredNicosalts += data.Nicotrecipesalts;
                } 
                if (data.CBDrecipe) {
                    requiredCBD += data.CBDrecipe;
                }
                
                
        }
            } else if (suffix == 'U') {
             if(data.recipe.Color){
                      var premix = getPremixSKU(data,true);
                      
                      var premixCheck = base.getData("PremixesTypes/" + premix);
                      if (!premixCheck) {
                        var premixCheck = {
                          Running: 0
                        };
                      }
                      var exists1 = OrigPmixArr.getIndex(premix);
                      if (exists1 == -1) {
                        
                        OrigPmixArr.push([premix, premixCheck.Running]);
                        exists1 = OrigPmixArr.getIndex(premix);
                      }
                      
                      var pmixOBJ = checkALL(OrigPmixArr[exists1][1], data.QTY);
                      OrigPmixArr[exists1][1] = pmixOBJ.running;
                      
                      var exists2 = PremixArr.getIndex(premix);
                      if (exists2 == -1) {
                        
                        PremixArr.push([premix, pmixOBJ.used, 0])
                      } else {
                        PremixArr[exists2][1] += pmixOBJ.used;
                      }
                     if (pmixOBJ.left <= 0) {continue;}else{
                       var colorCheck = base.getData('Colors/' + data.recipe.Color.sku);
                       if (!colorCheck) {
                         var colorCheck = {
                           Running: 0
                         };
                       }
                       var exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                       if (exists1 == -1) {
                         
                         OrigColorsArr.push([data.recipe.Color.sku, colorCheck.Running]);
                         exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                       }
                       
                       var ColorOBJ = checkALL(OrigColorsArr[exists1][1],data.recipe.Color.val * data.QTY *10);
                       OrigColorsArr[exists1][1] = ColorOBJ.running;
                       
                       var exists2 = colorsArr.getIndex(data.recipe.Color.sku);
                       if (exists2 == -1) {
                         
                         colorsArr.push([data.recipe.Color.sku, ColorOBJ.used, ColorOBJ.left ,data.recipe.Color.val * data.QTY*10])
                       } else {
                         colorsArr[exists2][1] += ColorOBJ.used;
                         colorsArr[exists2][2] += ColorOBJ.left;
                         colorsArr[exists2][3] += data.recipe.Color.val * data.QTY *10;
                       }
                       
                       
                     
                     }
                    }
                   var premix = getPremixSKU(data,false);

                var premixCheck = base.getData("PremixesTypes/" + premix);
                if (!premixCheck) {
                    var premixCheck = {
                        Running: 0
                    };
                }
                var exists1 = OrigPmixArr.getIndex(premix);
                if (exists1 == -1) {

                    OrigPmixArr.push([premix, premixCheck.Running]);
                    exists1 = OrigPmixArr.getIndex(premix);
                }

                var pmixOBJ = checkALL(OrigPmixArr[exists1][1], data.QTY);
                OrigPmixArr[exists1][1] = pmixOBJ.running;

                var exists2 = PremixArr.getIndex(premix);
                if (exists2 == -1) {

                    PremixArr.push([premix, pmixOBJ.used, 0])
                } else {
                    PremixArr[exists2][1] += pmixOBJ.used;
                }

                if (pmixOBJ.left > 0) {
                    var flavourCheck = base.getData('Flavours/' + data.flavour.sku);
                    if (!flavourCheck) {
                        var flavourCheck = {
                            Running: 0
                        };
                    }
                    var exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                    if (exists1 == -1) {

                        OrigFlavoursArr.push([data.flavour.sku, flavourCheck.Running]);
                        exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                    }

                    var flavOBJ = checkALL(OrigFlavoursArr[exists1][1], data.flavvalue * pmixOBJ.left / 1000);
                    OrigFlavoursArr[exists1][1] = flavOBJ.running;

                    var exists2 = flavoursArr.getIndex(data.flavour.sku);
                    if (exists2 == -1) {

                        flavoursArr.push([data.flavour.sku, flavOBJ.used, flavOBJ.left , data.flavrecipe])
                    } else {
                        flavoursArr[exists2][1] += flavOBJ.used;
                        flavoursArr[exists2][2] += flavOBJ.left;
                        flavoursArr[exists2][3] += data.flavrecipe;
                    }

                    requiredVG += data.VGval * pmixOBJ.left;
                    requiredPG += data.PGval * pmixOBJ.left;
                       requiredAG += data.AGval * pmixOBJ.left;
                     requiredMCT += data.MCTval * pmixOBJ.left;
                      if (data.Nico && !data.CBDvalue) {
                        requiredNico += data.Nico * pmixOBJ.left;
                      }
                      if (data.Nicosalts && !data.CBDvalue) {
                        requiredNicosalts += data.Nicosalts * pmixOBJ.left;
                      }
                      if (data.CBDvalue) {
                        requiredCBD += data.CBDvalue * pmixOBJ.left;
                      }

                }
                var LidCheck = base.getData("Lids/" + data.lidSKU);

                if (!LidCheck) {
                    var LidCheck = {
                        Running: 0
                    };
                }
                var exists3 = OrigLidsArr.getIndex(data.lidSKU);
                if (exists3 == -1) {

                    OrigLidsArr.push([data.lidSKU, LidCheck.Running]);
                    exists3 = OrigLidsArr.getIndex(data.lidSKU);
                }
                var LidOBJ = checkALL(OrigLidsArr[exists3][1], data.bottles);
                OrigLidsArr[exists3][1] = LidOBJ.running;

                var exists2 = LidsArr.getIndex(data.lidSKU);
                if (exists2 == -1) {

                    LidsArr.push([data.lidSKU, LidOBJ.used, LidOBJ.left,data.bottles])

                } else {
                    LidsArr[exists2][1] += parseInt(LidOBJ.used, 10);
                    LidsArr[exists2][2] += parseInt(LidOBJ.left, 10);
                      LidsArr[exists2][3] +=data.bottles;
                }

                var BottleCheck = base.getData("BottleTypes/" + data.botSKU);
                if (!BottleCheck) {
                    var BottleCheck = {
                        Running: 0
                    };
                }

                var exists3 = OrigBottlesArr.getIndex(data.botSKU);
                if (exists3 == -1) {

                    OrigBottlesArr.push([data.botSKU, BottleCheck.Running]);
                    exists3 = OrigBottlesArr.getIndex(data.botSKU);
                }
                var BotOBJ = checkALL(OrigLidsArr[exists3][1], data.bottles);
                OrigBottlesArr[exists3][1] = BotOBJ.running;

                var exists2 = BottlesArr.getIndex(data.botSKU);
                if (exists2 == -1) {

                    BottlesArr.push([data.botSKU, BotOBJ.used, BotOBJ.left, data.bottles])
                } else {
                    BottlesArr[exists2][1] += parseInt(BotOBJ.used, 10);
                    BottlesArr[exists2][2] += parseInt(BotOBJ.left, 10);
                    BottlesArr[exists2][3] +=data.bottles;
                }

            } else if (suffix == 'B') {

                generateForSingleBrand2(data.productcode, data.productdescription);

                var unbranded = getUnbrandName(data);
               // generateForSingleUnbrand2(prod,descr);
                var unbrandedCheck = base.getData("UnbrandedTypes/" + unbranded);
                if (!unbrandedCheck) {
                    var unbrandedCheck = {
                        Running: 0
                    };
                }
                var exists1 = OrigUbottlesArr.getIndex(unbranded);
                if (exists1 == -1) {

                    OrigUbottlesArr.push([unbranded, unbrandedCheck.Running]);
                    exists1 = OrigUbottlesArr.getIndex(unbranded);
                }

                var UBOBJ = checkALL(OrigUbottlesArr[exists1][1], data.bottles);
                OrigUbottlesArr[exists1][1] = UBOBJ.running;

                var exists2 = UbottlesArr.getIndex(premix);
                if (exists2 == -1) {

                    UbottlesArr.push([unbranded, UBOBJ.used, 0])
                } else {
                    UbottlesArr[exists2][1] += UBOBJ.used;
                }

                var packink = 0;
                if (data.packagingType.sku) {

                    var packData = getPackagingData(data.packagingType, data.bottles,data.boxname.sku)

            
                    var packink = packData.ink;
                    var tube = packData.botperPack;

                    var boxname = data.boxname.sku;
                    var tubes = data.bottles / tube;
                    var box = tubes / packData.divTubesForBox;

                    var TubesCheck = base.getData("Packages/" + data.packagingType);
                    var exists3 = OrigTubesArr.getIndex(data.packagingType);
                    if (exists3 == -1) {

                        OrigTubesArr.push([data.packagingType, TubesCheck.Running]);
                        exists3 = OrigTubesArr.getIndex(data.packagingType);
                    }
                    var TubeOBJ = checkALL(OrigTubesArr[exists3][1], tubes);
                    OrigTubesArr[exists3][1] = TubeOBJ.running;

                    var exists2 = TubesArr.getIndex(data.packagingType);
                    if (exists2 == -1) {

                        TubesArr.push([data.packagingType, TubeOBJ.used, TubeOBJ.left, tubes])

                    } else {
                        TubesArr[exists2][1] += TubeOBJ.used;
                        TubesArr[exists2][2] += TubeOBJ.left;
                        TubesArr[exists2][3] += tubes;
                    }

                    if (data.packlabelsku) {
                        var LabelsCheck = base.getData("Labels/" + data.packlabelsku);
                        if (!LabelsCheck) {
                            var LabelsCheck = {
                                Running: 0
                            };
                        }

                        var exists3 = OrigLabelsArr.getIndex(data.packlabelsku);
                        if (exists3 == -1) {

                            OrigLabelsArr.push([data.packlabelsku, LabelsCheck.Running]);
                            exists3 = OrigLabelsArr.getIndex(data.packlabelsku);
                        }
                        var LabelOBJ = checkALL(OrigLabelsArr[exists3][1], tubes);
                        OrigLabelsArr[exists3][1] = LabelOBJ.running;

                        var exists2 = LabelsArr.getIndex(data.packlabelsku);
                        if (exists2 == -1) {

                            LabelsArr.push([data.packlabelsku, LabelOBJ.used, LabelOBJ.left, tubes])

                        } else {
                            LabelsArr[exists2][1] += LabelOBJ.used;
                            LabelsArr[exists2][2] += LabelOBJ.left;
                            LabelsArr[exists2][3] += tubes;
                        }

                    }

                }
              var ink=0;
              if(data.ppb){
                ink += data.bottles * 0.001;
              }
              if(data.ppb){
                ink += packink;
              }
                
                var InkCheck = base.getData("Misc/printing ink");
                var exists3 = OrigInkArr.getIndex('printing ink');
                if (exists3 == -1) {

                    OrigInkArr.push(['printing ink', InkCheck.Running]);
                    exists3 = OrigInkArr.getIndex('printing ink');
                }
                var InkOBJ = checkALL(OrigInkArr[exists3][1], ink);
                OrigInkArr[exists3][1] = InkOBJ.running;

                var exists2 = InkArr.getIndex('printing ink');
                if (exists2 == -1) {

                    InkArr.push(['printing ink', InkOBJ.used, InkOBJ.left, ink])

                } else {
                    InkArr[exists2][1] += InkOBJ.used;
                    InkArr[exists2][2] += InkOBJ.left;
                    InkArr[exists2][2] += ink;
                }

                var label = data.botlabelsku;
                var LabelsCheck = base.getData("Labels/" + label);
                if (!LabelsCheck) {
                    var LabelsCheck = {
                        Running: 0
                    };
                }
                var exists3 = OrigLabelsArr.getIndex(label);
                if (exists3 == -1) {

                    OrigLabelsArr.push([label, LabelsCheck.Running]);
                    exists3 = OrigLabelsArr.getIndex(label);
                }
                var LabelOBJ = checkALL(OrigLabelsArr[exists3][1], data.bottles);
                OrigLabelsArr[exists3][1] = LabelOBJ.running;

                var exists2 = LabelsArr.getIndex(label);
                if (exists2 == -1) {

                    LabelsArr.push([label, LabelOBJ.used, LabelOBJ.left, data.bottles])

                } else {
                    LabelsArr[exists2][1] += LabelOBJ.used;
                    LabelsArr[exists2][2] += LabelOBJ.left;
                    LabelsArr[exists2][3] += data.bottles;
                }

                if (UBOBJ.left > 0) {
                    data.QTY = (UBOBJ.left / 1000) * data.fill;
                    data.bottles = UBOBJ.left;
                    if(data.recipe.Color){
                      var premix = getPremixSKU(data,true);
                      
                      var premixCheck = base.getData("PremixesTypes/" + premix);
                      if (!premixCheck) {
                        var premixCheck = {
                          Running: 0
                        };
                      }
                      var exists1 = OrigPmixArr.getIndex(premix);
                      if (exists1 == -1) {
                        
                        OrigPmixArr.push([premix, premixCheck.Running]);
                        exists1 = OrigPmixArr.getIndex(premix);
                      }
                      
                      var pmixOBJ = checkALL(OrigPmixArr[exists1][1], data.QTY);
                      OrigPmixArr[exists1][1] = pmixOBJ.running;
                      
                      var exists2 = PremixArr.getIndex(premix);
                      if (exists2 == -1) {
                        
                        PremixArr.push([premix, pmixOBJ.used, 0])
                      } else {
                        PremixArr[exists2][1] += pmixOBJ.used;
                      }
                     if (pmixOBJ.left <= 0) {continue;}else{
                       var colorCheck = base.getData('Colors/' + data.recipe.Color.sku);
                       if (!colorCheck) {
                         var colorCheck = {
                           Running: 0
                         };
                       }
                       var exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                       if (exists1 == -1) {
                         
                         OrigColorsArr.push([data.recipe.Color.sku, colorCheck.Running]);
                         exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                       }
                       
                       var ColorOBJ = checkALL(OrigColorsArr[exists1][1],data.recipe.Color.val * data.QTY *10);
                       OrigColorsArr[exists1][1] = ColorOBJ.running;
                       
                       var exists2 = colorsArr.getIndex(data.recipe.Color.sku);
                       if (exists2 == -1) {
                         
                         colorsArr.push([data.recipe.Color.sku, ColorOBJ.used, ColorOBJ.left ,data.recipe.Color.val * data.QTY*10])
                       } else {
                         colorsArr[exists2][1] += ColorOBJ.used;
                         colorsArr[exists2][2] += ColorOBJ.left;
                          colorsArr[exists2][3] += data.recipe.Color.val * data.QTY *10;
                       }
                       
                       
                     
                     }
                    }
                    var premix = getPremixSKU(data,false);

                    var premixCheck = base.getData("PremixesTypes/" + premix);
                    if (!premixCheck) {
                        var premixCheck = {
                            Running: 0
                        };
                    }
                    var exists1 = OrigPmixArr.getIndex(premix);
                    if (exists1 == -1) {

                        OrigPmixArr.push([premix, premixCheck.Running]);
                        exists1 = OrigPmixArr.getIndex(premix);
                    }

                    var pmixOBJ = checkALL(OrigPmixArr[exists1][1], data.QTY);
                    OrigPmixArr[exists1][1] = pmixOBJ.running;

                    var exists2 = PremixArr.getIndex(premix);
                    if (exists2 == -1) {

                        PremixArr.push([premix, pmixOBJ.used, 0])
                    } else {
                        PremixArr[exists2][1] += pmixOBJ.used;
                    }

                    if (pmixOBJ.left > 0) {
                        var flavourCheck = base.getData('Flavours/' + data.flavour.sku);
                        if (!flavourCheck) {
                            var flavourCheck = {
                                Running: 0
                            };
                        }
                        var exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                        if (exists1 == -1) {

                            OrigFlavoursArr.push([data.flavour.sku, flavourCheck.Running]);
                            exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                        }

                        var flavOBJ = checkALL(OrigFlavoursArr[exists1][1], data.flavvalue * pmixOBJ.left / 1000);
                        OrigFlavoursArr[exists1][1] = flavOBJ.running;

                        var exists2 = flavoursArr.getIndex(data.flavour.sku);
                        if (exists2 == -1) {

                            flavoursArr.push([data.flavour.sku, flavOBJ.used, flavOBJ.left , data.flavrecipe])
                        } else {
                            flavoursArr[exists2][1] += flavOBJ.used;
                            flavoursArr[exists2][2] += flavOBJ.left;
                            flavoursArr[exists2][3] += data.flavrecipe;
                        }

                        requiredVG += data.VGval * pmixOBJ.left;
                        requiredPG += data.PGval * pmixOBJ.left;
                        requiredAG += data.AGval * pmixOBJ.left;
                        requiredMCT += data.MCTval * pmixOBJ.left;
                        if (data.Nico) {
                          requiredNico += data.Nico * pmixOBJ.left;
                        } 
                        if (data.Nicosalts) {
                          requiredNicosalts += data.Nicosalts * pmixOBJ.left;
                        }
                        if (data.CBDvalue) {
                          requiredCBD += data.CBDvalue * pmixOBJ.left;
                        }

                    }
                    var LidCheck = base.getData("Lids/" + data.lidSKU);
                    if (!LidCheck) {
                        var LidCheck = {
                            Running: 0
                        };
                    }

                    var exists3 = OrigLidsArr.getIndex(data.lidSKU);
                    if (exists3 == -1) {

                        OrigLidsArr.push([data.lidSKU, LidCheck.Running]);
                        exists3 = OrigLidsArr.getIndex(data.lidSKU);
                    }
                    var LidOBJ = checkALL(OrigLidsArr[exists3][1], data.bottles);
                    OrigLidsArr[exists3][1] = LidOBJ.running;

                    var exists2 = LidsArr.getIndex(data.lidSKU);
                    if (exists2 == -1) {

                        LidsArr.push([data.lidSKU, LidOBJ.used, LidOBJ.left,data.bottles])

                    } else {
                        LidsArr[exists2][1] += LidOBJ.used;
                        LidsArr[exists2][2] += LidOBJ.left;
                         LidsArr[exists2][3] +=data.bottles;
                    }

                    var BottleCheck = base.getData("BottleTypes/" + data.botSKU);
                    if (!BottleCheck) {
                        var BottleCheck = {
                            Running: 0
                        };
                    }
                    var exists3 = OrigBottlesArr.getIndex(data.botSKU);
                    if (exists3 == -1) {

                        OrigBottlesArr.push([data.botSKU, BottleCheck.Running]);
                        exists3 = OrigBottlesArr.getIndex(data.botSKU);
                    }
                    var BotOBJ = checkALL(OrigLidsArr[exists3][1], data.bottles);
                    OrigBottlesArr[exists3][1] = BotOBJ.running;

                    var exists2 = BottlesArr.getIndex(data.botSKU);
                    if (exists2 == -1) {

                        BottlesArr.push([data.botSKU, BotOBJ.used, BotOBJ.left, data.bottles])
                    } else {
                        BottlesArr[exists2][1] += BotOBJ.used;
                        BottlesArr[exists2][2] += BotOBJ.left;
                        BottlesArr[exists2][3] +=data.bottles;
                    }

                }

            } else {
                generateForSingleBrand2(data.productcode, data.productdescription);

                if (data.packagingType.sku) {
                    var unbranded = getUnbrandName(data);
                    var brandname = getBrandName(data, false);

                    var packData = getPackagingData(data.packagingType, data.bottles,data.boxname.sku)

                
                    var packink = packData.ink;
                    var tube = packData.botperPack;
                    var boxname = data.boxname.sku;
                    var tubes = data.bottles / tube;
                    var box = tubes / packData.divTubesForBox;

                    var brandedstockP = base.getData('BrandedTypes/' + brandname);

                    if (boxname) {
                        var BoxCheck = base.getData("Boxes/" + boxname);
                        var exists3 = OrigBoxArr.getIndex(boxname);
                        if (exists3 == -1) {

                            OrigBoxArr.push([boxname, BoxCheck.Running]);

                        }
                        exists3 = OrigBoxArr.getIndex(boxname);
                        var BoxOBJ = checkALL(OrigBoxArr[exists3][1], box);
                        OrigBoxArr[exists3][1] = BoxOBJ.running;

                        var exists2 = BoxArr.getIndex(boxname);
                        if (exists2 == -1) {

                            BoxArr.push([boxname, BoxOBJ.used, BoxOBJ.left, box])

                        } else {
                            BoxArr[exists2][1] += BoxOBJ.used;
                            BoxArr[exists2][2] += BoxOBJ.left;
                             BoxArr[exists2][3] += box;
                        }
                    }

                    var exists1 = OrigPackedArr.getIndex(brandname);
                    if (exists1 == -1) {

                        OrigPackedArr.push([brandname, brandedstockP.Running]);
                        exists1 = OrigPackedArr.getIndex(brandname);
                    }

                    var PBBOBJ = checkALL(OrigPackedArr[exists1][1], tubes);
                    OrigPackedArr[exists1][1] = PBBOBJ.running;

                    var exists2 = PackedArr.getIndex(premix);
                    if (exists2 == -1) {

                        PackedArr.push([brandname, PBBOBJ.used, 0])
                    } else {
                        PackedArr[exists2][1] += PBBOBJ.used;
                    }

                    if (PBBOBJ.left > 0) {
                        data.bottles = PBBOBJ.left * tube;

                        var brandname = getBrandName(data, true);
                      

                        var brandedstockB = base.getData('BrandedTypes/' + brandname);
                      if(!brandedstockB){
                         
                         generateForSingleBrand2(data.prod,data.descr);
                        brandedstockB = base.getData('BrandedTypes/' + brandname);
                         } 
                      
                      var exists1 = OrigBbottlesArr.getIndex(brandname);
                        if (exists1 == -1) {

                            OrigBbottlesArr.push([brandname, brandedstockB.Running]);
                            exists1 = OrigBbottlesArr.getIndex(brandname);
                        }

                        var BBOBJ = checkALL(OrigBbottlesArr[exists1][1], data.bottles);
                        OrigBbottlesArr[exists1][1] = BBOBJ.running;

                        var exists2 = BbottlesArr.getIndex(premix);
                        if (exists2 == -1) {

                            BbottlesArr.push([brandname, BBOBJ.used, 0])
                        } else {
                            BbottlesArr[exists2][1] += BBOBJ.used;
                        }

                        if (BBOBJ.left > 0) {
                            data.bottles = BBOBJ.left;
                            var unbranded = getUnbrandName(data);
                           // generateForSingleUnbranded(data.recipe, data.flavour.sku, data.bsize);
                            var unbrandedCheck = base.getData("UnbrandedTypes/" + unbranded);
                            if (!unbrandedCheck) {
                                var unbrandedCheck = {
                                    Running: 0
                                };
                            }
                            var exists1 = OrigUbottlesArr.getIndex(unbranded);
                            if (exists1 == -1) {

                                OrigUbottlesArr.push([unbranded, unbrandedCheck.Running]);
                                exists1 = OrigUbottlesArr.getIndex(unbranded);
                            }

                            var UBOBJ = checkALL(OrigUbottlesArr[exists1][1], data.bottles);
                            OrigUbottlesArr[exists1][1] = UBOBJ.running;

                            var exists2 = UbottlesArr.getIndex(premix);
                            if (exists2 == -1) {

                                UbottlesArr.push([unbranded, UBOBJ.used, 0])
                            } else {
                                UbottlesArr[exists2][1] += UBOBJ.used;
                            }

                            var packink = 0;
                            if (data.packagingType.sku) {

                                var packData = getPackagingData(data.packagingType, data.bottles,data.boxname.sku)

                           
                                var packink = packData.ink;
                                var tube = packData.botperPack;
                                var boxname = data.boxname.sku;
                                var tubes = data.bottles / tube;
                                var box = tubes / packData.divTubesForBox;

                                var TubesCheck = base.getData("Packages/" + data.packagingType);
                                if (!TubesCheck) {
                                    var TubesCheck = {
                                        Running: 0
                                    };
                                }
                                var exists3 = OrigTubesArr.getIndex(data.packagingType);
                                if (exists3 == -1) {

                                    OrigTubesArr.push([data.packagingType, TubesCheck.Running]);
                                    exists3 = OrigTubesArr.getIndex(data.packagingType);
                                }
                                var TubeOBJ = checkALL(OrigTubesArr[exists3][1], tubes);
                                OrigTubesArr[exists3][1] = TubeOBJ.running;

                                var exists2 = TubesArr.getIndex(data.packagingType);
                                if (exists2 == -1) {

                                    TubesArr.push([data.packagingType, TubeOBJ.used, TubeOBJ.left, tubes])

                                } else {
                                    TubesArr[exists2][1] += TubeOBJ.used;
                                    TubesArr[exists2][2] += TubeOBJ.left;
                                    TubesArr[exists2][3] += tubes;
                                }

                                if (data.packlabelsku) {
                                    var LabelsCheck = base.getData("Labels/" + data.packlabelsku);
                                    if (!LabelsCheck) {
                                        var LabelsCheck = {
                                            Running: 0
                                        };
                                    }

                                    var exists3 = OrigLabelsArr.getIndex(data.packlabelsku);

                                    if (exists3 == -1) {

                                        OrigLabelsArr.push([data.packlabelsku, LabelsCheck.Running]);
                                        exists3 = OrigLabelsArr.getIndex(data.packlabelsku);
                                    }
                                    var LabelOBJ = checkALL(OrigLabelsArr[exists3][1], tubes);
                                    OrigLabelsArr[exists3][1] = LabelOBJ.running;

                                    var exists2 = LabelsArr.getIndex(data.packlabelsku);
                                    if (exists2 == -1) {

                                        LabelsArr.push([data.packlabelsku, LabelOBJ.used, LabelOBJ.left, tubes])

                                    } else {
                                        LabelsArr[exists2][1] += LabelOBJ.used;
                                        LabelsArr[exists2][2] += LabelOBJ.left;
                                        LabelsArr[exists2][3] += tubes;
                                    }

                                }

                            }
                          var ink=0;
                          if(data.ppb){
                            ink += data.bottles * 0.001;
                          }
                          if(data.ppb){
                            ink += packink;
                          }
                          var InkCheck = base.getData("Misc/printing ink");
                            var exists3 = OrigInkArr.getIndex('printing ink');
                            if (exists3 == -1) {

                                OrigInkArr.push(['printing ink', InkCheck.Running]);
                                exists3 = OrigInkArr.getIndex('printing ink');
                            }
                            var InkOBJ = checkALL(OrigInkArr[exists3][1], ink);
                            OrigInkArr[exists3][1] = InkOBJ.running;

                            var exists2 = InkArr.getIndex('printing ink');
                            if (exists2 == -1) {

                                InkArr.push(['printing ink', InkOBJ.used, InkOBJ.left, ink])

                            } else {
                                InkArr[exists2][1] += InkOBJ.used;
                                InkArr[exists2][2] += InkOBJ.left;
                                InkArr[exists2][2] += ink;
                            }

                            var label = data.botlabelsku;
                            var LabelsCheck = base.getData("Labels/" + label);
                            if (!LabelsCheck) {
                                var LabelsCheck = {
                                    Running: 0
                                };
                            }

                            var exists3 = OrigLabelsArr.getIndex(label);
                            if (exists3 == -1) {

                                OrigLabelsArr.push([label, LabelsCheck.Running]);
                                exists3 = OrigLabelsArr.getIndex(label);
                            }
                            var LabelOBJ = checkALL(OrigLabelsArr[exists3][1], data.bottles);
                            OrigLabelsArr[exists3][1] = LabelOBJ.running;

                            var exists2 = LabelsArr.getIndex(label);
                            if (exists2 == -1) {

                                LabelsArr.push([label, LabelOBJ.used, LabelOBJ.left, data.bottles])

                            } else {
                                LabelsArr[exists2][1] += LabelOBJ.used;
                                LabelsArr[exists2][2] += LabelOBJ.left;
                                LabelsArr[exists2][3] += data.bottles;
                            }

                            if (UBOBJ.left > 0) {
                                data.QTY = (UBOBJ.left / 1000) * data.fill;
                                data.bottles = UBOBJ.left;
                              if(data.recipe.Color){
                                var premix = getPremixSKU(data,true);
                                
                                var premixCheck = base.getData("PremixesTypes/" + premix);
                                if (!premixCheck) {
                                  var premixCheck = {
                                    Running: 0
                                  };
                                }
                                var exists1 = OrigPmixArr.getIndex(premix);
                                if (exists1 == -1) {
                                  
                                  OrigPmixArr.push([premix, premixCheck.Running]);
                                  exists1 = OrigPmixArr.getIndex(premix);
                                }
                                
                                var pmixOBJ = checkALL(OrigPmixArr[exists1][1], data.QTY);
                                OrigPmixArr[exists1][1] = pmixOBJ.running;
                                
                                var exists2 = PremixArr.getIndex(premix);
                                if (exists2 == -1) {
                                  
                                  PremixArr.push([premix, pmixOBJ.used, 0])
                                } else {
                                  PremixArr[exists2][1] += pmixOBJ.used;
                                }
                                if (pmixOBJ.left <= 0) {continue;}else{
                       var colorCheck = base.getData('Colors/' + data.recipe.Color.sku);
                       if (!colorCheck) {
                         var colorCheck = {
                           Running: 0
                         };
                       }
                       var exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                       if (exists1 == -1) {
                         
                         OrigColorsArr.push([data.recipe.Color.sku, colorCheck.Running]);
                         exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                       }
                       
                       var ColorOBJ = checkALL(OrigColorsArr[exists1][1],data.recipe.Color.val * data.QTY *10);
                       OrigColorsArr[exists1][1] = ColorOBJ.running;
                       
                       var exists2 = colorsArr.getIndex(data.recipe.Color.sku);
                       if (exists2 == -1) {
                         
                         colorsArr.push([data.recipe.Color.sku, ColorOBJ.used, ColorOBJ.left ,data.recipe.Color.val * data.QTY*10])
                       } else {
                         colorsArr[exists2][1] +=ColorOBJ.used;
                         colorsArr[exists2][2] += ColorOBJ.left;
                        colorsArr[exists2][3] += data.recipe.Color.val * data.QTY *10;
                       }
                       
                       
                     
                     }
                              }
                                   var premix = getPremixSKU(data,false);

                                var premixCheck = base.getData("PremixesTypes/" + premix);
                                if (!premixCheck) {
                                    var premixCheck = {
                                        Running: 0
                                    };
                                }
                                var exists1 = OrigPmixArr.getIndex(premix);
                                if (exists1 == -1) {

                                    OrigPmixArr.push([premix, premixCheck.Running]);
                                    exists1 = OrigPmixArr.getIndex(premix);
                                }

                                var pmixOBJ = checkALL(OrigPmixArr[exists1][1], data.QTY);
                                OrigPmixArr[exists1][1] = pmixOBJ.running;

                                var exists2 = PremixArr.getIndex(premix);
                                if (exists2 == -1) {

                                    PremixArr.push([premix, pmixOBJ.used, 0])
                                } else {
                                    PremixArr[exists2][1] += pmixOBJ.used;
                                }

                                if (pmixOBJ.left > 0) {
                                    var flavourCheck = base.getData('Flavours/' + data.flavour.sku);
                                    if (!flavourCheck) {
                                        var flavourCheck = {
                                            Running: 0
                                        };
                                    }
                                    var exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                                    if (exists1 == -1) {

                                        OrigFlavoursArr.push([data.flavour.sku, flavourCheck.Running]);
                                        exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                                    }

                                    var flavOBJ = checkALL(OrigFlavoursArr[exists1][1], data.flavvalue * pmixOBJ.left / 1000);
                                    OrigFlavoursArr[exists1][1] = flavOBJ.running;

                                    var exists2 = flavoursArr.getIndex(data.flavour.sku);
                                    if (exists2 == -1) {

                                        flavoursArr.push([data.flavour.sku, flavOBJ.used, flavOBJ.left , data.flavrecipe])
                                    } else {
                                        flavoursArr[exists2][1] += flavOBJ.used;
                                        flavoursArr[exists2][2] += flavOBJ.left;
                                        flavoursArr[exists2][3] += data.flavrecipe;
                                    }

                                    requiredVG += data.VGval * pmixOBJ.left;
                                    requiredPG += data.PGval * pmixOBJ.left;
                                      requiredAG += data.AGval * pmixOBJ.left;
                                     requiredMCT += data.MCTval * pmixOBJ.left;
                                  if (data.Nico) {
                                    requiredNico += data.Nico * pmixOBJ.left;
                                  } 
                                  if (data.Nicosalts) {
                                    requiredNicosalts += data.Nicosalts * pmixOBJ.left;
                                  }
                                  if (data.CBDvalue) {
                                    requiredCBD += data.CBDvalue * pmixOBJ.left;
                                  }


                                }
                                var LidCheck = base.getData("Lids/" + data.lidSKU);
                                if (!LidCheck) {
                                    var LidCheck = {
                                        Running: 0
                                    };
                                }
                                var exists3 = OrigLidsArr.getIndex(data.lidSKU);
                                if (exists3 == -1) {

                                    OrigLidsArr.push([data.lidSKU, LidCheck.Running]);
                                    exists3 = OrigLidsArr.getIndex(data.lidSKU);
                                }
                                var LidOBJ = checkALL(OrigLidsArr[exists3][1], data.bottles);
                                OrigLidsArr[exists3][1] = LidOBJ.running;

                                var exists2 = LidsArr.getIndex(data.lidSKU);
                                if (exists2 == -1) {

                                    LidsArr.push([data.lidSKU, LidOBJ.used, LidOBJ.left,data.bottles])

                                } else {
                                    LidsArr[exists2][1] += LidOBJ.used;
                                    LidsArr[exists2][2] += LidOBJ.left;
                                     LidsArr[exists2][3] +=data.bottles;
                                }

                                var BottleCheck = base.getData("BottleTypes/" + data.botSKU);
                                if (!BottleCheck) {
                                    var BottleCheck = {
                                        Running: 0
                                    };
                                }
                                var exists3 = OrigBottlesArr.getIndex(data.botSKU);
                                if (exists3 == -1) {

                                    OrigBottlesArr.push([data.botSKU, BottleCheck.Running]);
                                    exists3 = OrigBottlesArr.getIndex(data.botSKU);
                                }
                                var BotOBJ = checkALL(OrigLidsArr[exists3][1], data.bottles);
                                OrigBottlesArr[exists3][1] = BotOBJ.running;

                                var exists2 = BottlesArr.getIndex(data.botSKU);
                                if (exists2 == -1) {

                                    BottlesArr.push([data.botSKU, BotOBJ.used, BotOBJ.left, data.bottles])
                                } else {
                                    BottlesArr[exists2][1] += BotOBJ.used;
                                    BottlesArr[exists2][2] += BotOBJ.left;
                                    BottlesArr[exists2][3] +=data.bottles;
                                }

                            }

                        }

                    }

                } else {

                        var brandname = getBrandName(data, false);
               
                    var brandedstockB = base.getData('BrandedTypes/' + brandname);
                  
                        if(!brandedstockB){
                         
                         generateForSingleBrand2(data.prod,data.descr);
                        brandedstockB = base.getData('BrandedTypes/' + brandname);
                         } 
                      
                    var exists1 = OrigBbottlesArr.getIndex(brandname);
                    if (exists1 == -1) {

                        OrigBbottlesArr.push([brandname, brandedstockB.Running]);
                        exists1 = OrigBbottlesArr.getIndex(brandname);
                    }

                    var BBOBJ = checkALL(OrigBbottlesArr[exists1][1], data.bottles);
                    OrigBbottlesArr[exists1][1] = BBOBJ.running;

                    var exists2 = BbottlesArr.getIndex(premix);
                    if (exists2 == -1) {

                        BbottlesArr.push([brandname, BBOBJ.used, 0])
                    } else {
                        BbottlesArr[exists2][1] += BBOBJ.used;
                    }

                    if (BBOBJ.left > 0) {
                        data.bottles = BBOBJ.left;
                        var unbranded = getUnbrandName(data);
                      //  generateForSingleUnbranded(data.recipe, data.flavour.sku, data.bsize);
                        var unbrandedCheck = base.getData("UnbrandedTypes/" + unbranded);
                        if (!unbrandedCheck) {
                            unbrandedCheck.Running = 0;
                        }
                        var exists1 = OrigUbottlesArr.getIndex(unbranded);
                        if (exists1 == -1) {

                            OrigUbottlesArr.push([unbranded, unbrandedCheck.Running]);
                            exists1 = OrigUbottlesArr.getIndex(unbranded);
                        }

                        var UBOBJ = checkALL(OrigUbottlesArr[exists1][1], data.bottles);
                        OrigUbottlesArr[exists1][1] = UBOBJ.running;

                        var exists2 = UbottlesArr.getIndex(premix);
                        if (exists2 == -1) {

                            UbottlesArr.push([unbranded, UBOBJ.used, 0]);
                        } else {
                            UbottlesArr[exists2][1] += UBOBJ.used;
                        }

                        if (UBOBJ.left > 0) {
                            data.QTY = (UBOBJ.left / 1000) * data.fill;
                            data.bottles = UBOBJ.left;
                            
                              if(data.recipe.Color){
                                var premix = getPremixSKU(data,true);
                                
                                var premixCheck = base.getData("PremixesTypes/" + premix);
                                if (!premixCheck) {
                                  var premixCheck = {
                                    Running: 0
                                  };
                                }
                                var exists1 = OrigPmixArr.getIndex(premix);
                                if (exists1 == -1) {
                                  
                                  OrigPmixArr.push([premix, premixCheck.Running]);
                                  exists1 = OrigPmixArr.getIndex(premix);
                                }
                                
                                var pmixOBJ = checkALL(OrigPmixArr[exists1][1], data.QTY);
                                OrigPmixArr[exists1][1] = pmixOBJ.running;
                                
                                var exists2 = PremixArr.getIndex(premix);
                                if (exists2 == -1) {
                                  
                                  PremixArr.push([premix, pmixOBJ.used, 0])
                                } else {
                                  PremixArr[exists2][1] += pmixOBJ.used;
                                }
                                if (pmixOBJ.left <= 0) {continue;}else{
                       var colorCheck = base.getData('Colors/' + data.recipe.Color.sku);
                       if (!colorCheck) {
                         var colorCheck = {
                           Running: 0
                         };
                       }
                       var exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                       if (exists1 == -1) {
                         
                         OrigColorsArr.push([data.recipe.Color.sku, colorCheck.Running]);
                         exists1 = OrigColorsArr.getIndex(data.recipe.Color.sku);
                       }
                       
                       var ColorOBJ = checkALL(OrigColorsArr[exists1][1],data.recipe.Color.val * data.QTY *10);
                       OrigColorsArr[exists1][1] = ColorOBJ.running;
                       
                       var exists2 = colorsArr.getIndex(data.recipe.Color.sku);
                       if (exists2 == -1) {
                         
                         colorsArr.push([data.recipe.Color.sku, ColorOBJ.used, ColorOBJ.left ,data.recipe.Color.val * data.QTY*10])
                       } else {
                         colorsArr[exists2][1] += ColorOBJ.used;
                         colorsArr[exists2][2] += ColorOBJ.left;
                           colorsArr[exists2][3] += data.recipe.Color.val * data.QTY *10;
                       }
                       
                       
                     
                     }
                              }
                               var premix = getPremixSKU(data,false);

                            var premixCheck = base.getData("PremixesTypes/" + premix);
                            if (!premixCheck) {
                                var premixCheck = {
                                    Running: 0
                                };
                            }
                            var exists1 = OrigPmixArr.getIndex(premix);
                            if (exists1 == -1) {

                                OrigPmixArr.push([premix, premixCheck.Running]);
                                exists1 = OrigPmixArr.getIndex(premix);
                            }

                            var pmixOBJ = checkALL(OrigPmixArr[exists1][1], data.QTY);
                            OrigPmixArr[exists1][1] = pmixOBJ.running;

                            var exists2 = PremixArr.getIndex(premix);
                            if (exists2 == -1) {

                                PremixArr.push([premix, pmixOBJ.used, 0])
                            } else {
                                PremixArr[exists2][1] += pmixOBJ.used;
                            }

                            if (pmixOBJ.left > 0) {

                                var flavourCheck = base.getData('Flavours/' + data.flavour.sku);
                                if (!flavourCheck) {
                                    var flavourCheck = {
                                        Running: 0
                                    };
                                }
                                var exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                                if (exists1 == -1) {

                                    OrigFlavoursArr.push([data.flavour.sku, flavourCheck.Running]);
                                    exists1 = OrigFlavoursArr.getIndex(data.flavour.sku);
                                }

                                var flavOBJ = checkALL(OrigFlavoursArr[exists1][1], data.flavvalue * pmixOBJ.left / 1000);
                                OrigFlavoursArr[exists1][1] = flavOBJ.running;

                                var exists2 = flavoursArr.getIndex(data.flavour.sku);
                                if (exists2 == -1) {

                                    flavoursArr.push([data.flavour.sku, flavOBJ.used, flavOBJ.left , data.flavrecipe])
                                } else {
                                    flavoursArr[exists2][1] += flavOBJ.used;
                                    flavoursArr[exists2][2] += flavOBJ.left;
                                    flavoursArr[exists2][3] += data.flavrecipe;
                                }

                                requiredVG += data.VGval * pmixOBJ.left;
                                requiredPG += data.PGval * pmixOBJ.left;
                                  requiredAG += data.AGval * pmixOBJ.left;
                                requiredMCT += data.MCTval * pmixOBJ.left;
                                if (data.Nico) {
                                    requiredNico += data.Nico * pmixOBJ.left;
                                  } 
                                  if (data.Nicosalts) {
                                    requiredNicosalts += data.Nicosalts * pmixOBJ.left;
                                  }
                                  if (data.CBDvalue) {
                                    requiredCBD += data.CBDvalue * pmixOBJ.left;
                                  }

                            }
                            var LidCheck = base.getData("Lids/" + data.lidSKU);
                            if (!LidCheck) {
                                var LidCheck = {
                                    Running: 0
                                };
                            }
                            var exists3 = OrigLidsArr.getIndex(data.lidSKU);
                            if (exists3 == -1) {

                                OrigLidsArr.push([data.lidSKU, LidCheck.Running]);
                                exists3 = OrigLidsArr.getIndex(data.lidSKU);
                            }
                            var LidOBJ = checkALL(OrigLidsArr[exists3][1], data.bottles);
                            OrigLidsArr[exists3][1] = LidOBJ.running;

                            var exists2 = LidsArr.getIndex(data.lidSKU);
                            if (exists2 == -1) {

                                LidsArr.push([data.lidSKU, LidOBJ.used, LidOBJ.left,data.bottles])

                            } else {
                                LidsArr[exists2][1] += LidOBJ.used;
                                LidsArr[exists2][2] += LidOBJ.left;
                                 LidsArr[exists2][3] +=data.bottles;
                            }

                            var BottleCheck = base.getData("BottleTypes/" + data.botSKU);
                            if (!BottleCheck) {
                                var BottleCheck = {
                                    Running: 0
                                };
                            }
                            var exists3 = OrigBottlesArr.getIndex(data.botSKU);
                            if (exists3 == -1) {

                                OrigBottlesArr.push([data.botSKU, BottleCheck.Running]);
                                exists3 = OrigBottlesArr.getIndex(data.botSKU);
                            }
                            var BotOBJ = checkALL(OrigLidsArr[exists3][1], data.bottles);
                            OrigBottlesArr[exists3][1] = BotOBJ.running;

                            var exists2 = BottlesArr.getIndex(data.botSKU);
                            if (exists2 == -1) {

                                BottlesArr.push([data.botSKU, BotOBJ.used, BotOBJ.left, data.bottles])
                            } else {
                                BottlesArr[exists2][1] += BotOBJ.used;
                                BottlesArr[exists2][2] += BotOBJ.left;
                                BottlesArr[exists2][3] +=data.bottles;
                            }

                        }

                    }

                }
            }
        } catch (e) {
            failMSG += "Failed for: " + BATCHES[i] + ' Reason: ' + e.toString() + '<br/>';
        }
    }
    var logDATA = [];
    var vgMSG = 'VG: <br>';
    var pgMSG = 'PG: <br>';
      var agMSG = 'AG: <br>';
    var NicoMSG = 'Nicotine: <br>';
    var NicosaltsMSG = 'Nicotine Salts: <br>';
    var CBDMSG = 'CBD: <br>';
     var MCTMSG = 'MCT: <br>';
     var ColorMSG='Colors: <br>';
    var FlavMSG = 'Flavours: <br>';
    var BottleMSG = 'Bottles: <br>';
    var LidMSG = 'Lids: <br>';
    var PremixMSG = 'Premixes: <br>';
    var UbottleMSG = 'Unbranded Bottles: <br>';
    var BbottleMSG = 'Branded Bottles: <br>';
    var PBbottleMSG = 'Packaged Branded Bottles: <br>';
    var BoxMSG = 'Boxes: <br>';
    var LabelMSG = 'Labels: <br>';
    var InkMSG = 'Ink: <br>';
    var tubeMSG = 'Pack Types: <br>';
    /*

     var flavoursArr=[];
     var LidsArr=[];
     var PremixArr=[];
     var BottlesArr=[];
     var UbottlesArr=[];
     var BbottlesArr=[];
     var BoxesArr=[];
     var PackedArr=[];
     var BoxArr=[];
     var TubesArr=[];
     var LabelsArr=[];
     var InkArr=[];

     var OrigInkArr=[];
     var OrigTubesArr=[];
     var OrigLabelsArr=[];
     var OrigBoxArr=[];
     var OrigFlavoursArr=[];
     var OrigPmixArr=[];
     var OrigBottlesArr=[];
     var OrigUbottlesArr=[];
     var OrigBbottlesArr=[];
     var OrigBoxesArr=[];
     var OrigPackedArr=[];
     var OrigLidsArr=[];
     var OrigPackedArr=[];


    */
    var formattedDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");

    logDATA.push(['NEW LOG ' + formattedDate, '', '', '', '']);
    logDATA.push(['', '', '', '', '']);
    vgMSG += "Will Use: " + requiredVG + " - Available: " + availableVG  + " - Required: " + requiredVG +'<br>';
    var missing = parseInt(availableVG, 10) - parseInt(requiredVG, 10);
    if (missing >= 0) {
        missing = 0;
    } else {
        missing = Math.abs(missing);
    }
    logDATA.push(['VG', requiredVG, availableVG, missing, requiredVG]);
    logDATA.push(['', '', '', '', '']);

   agMSG += "Will Use: " + requiredAG + " - Available: " + availableAG + " - Required: " + requiredAG +'<br>';
    var missing = parseInt(availableAG, 10) - parseInt(requiredAG, 10);
    if (missing >= 0) {
        missing = 0;
    } else {
        missing = Math.abs(missing);
    }
    logDATA.push(['AG', requiredAG, availableAG, missing, requiredAG]);
    logDATA.push(['', '', '', '', '']);

    pgMSG += "Will Use: " + requiredPG + " - Available: " + availablePG + " - Required: " + requiredPG +'<br>';
    var missing = parseInt(availablePG, 10) - parseInt(requiredPG, 10);
    if (missing >= 0) {
        missing = 0;
    } else {
        missing = Math.abs(missing);
    }
    logDATA.push(['PG', requiredPG, availablePG, missing, requiredPG]);
    logDATA.push(['', '', '', '', '']);
    NicoMSG += "Will Use: " + requiredNico + " - Available: " + availableNico + " - Required: " + requiredNico + '<br>';
    var missing = parseInt(availableNico, 10) - parseInt(requiredNico, 10);
    if (missing >= 0) {
        missing = 0;
    } else {
        missing = Math.abs(missing);
    }
    logDATA.push(['Nicotine', requiredNico, availableNico, missing, requiredNico]);
    logDATA.push(['', '', '', '', '']);
    
    
    NicosaltsMSG += "Will Use: " + requiredNicosalts + " - Available: " + availableNicosalts + " - Required: " + requiredNicosalts + '<br>';
    var missing = parseInt(availableNicosalts, 10) - parseInt(requiredNicosalts, 10);
    if (missing >= 0) {
        missing = 0;
    } else {
        missing = Math.abs(missing);
    }
    logDATA.push(['Nicotine Salts', requiredNicosalts, availableNicosalts, missing, requiredNicosalts]);
    logDATA.push(['', '', '', '', '']);
    
    
    CBDMSG += "Will Use: " + requiredCBD + " - Available: " + availableCBD + " - Required: " + requiredCBD + '<br>';
    var missing = parseInt(availableCBD, 10) - parseInt(requiredCBD, 10);
    if (missing >= 0) {
        missing = 0;
    } else {
        missing = Math.abs(missing);
    }
    logDATA.push(['CBD', requiredCBD, availableCBD, missing, requiredCBD]);
    logDATA.push(['', '', '', '', '']);
    
    
    MCTMSG += "Will Use: " + requiredMCT + " - Available: " + availableMCT + " - Required: " + requiredMCT + '<br>';
    var missing = parseInt(availableMCT, 10) - parseInt(requiredMCT, 10);
    if (missing >= 0) {
        missing = 0;
    } else {
        missing = Math.abs(missing);
    }
    logDATA.push(['MCT', requiredMCT, availableMCT, missing, requiredMCT]);
    logDATA.push(['', '', '', '', '']);
    
        
    logDATA.push(['Flavours', '', '', '', '']);
    for (var i = 0; i < flavoursArr.length; i++) {
        var running = base.getData('Flavours/' + flavoursArr[i][0]);
        FlavMSG += running.name+' '+ flavoursArr[i][0] + ":  -   Will Use: " + flavoursArr[i][1] + " - Available: " + running.Running + ' -  Missing: ' + flavoursArr[i][2] + " - Required: " + flavoursArr[i][3] +'<br>';
        logDATA.push([running.name+' '+flavoursArr[i][0], flavoursArr[i][1], running.Running, flavoursArr[i][2], flavoursArr[i][3]]);
    }
    logDATA.push(['', '', '', '', '']);
     logDATA.push(['Colors', '', '', '', '']);
    for (var i = 0; i < colorsArr.length; i++) {
        var running = base.getData('Color/' + colorsArr[i][0]);
        ColorMSG += running.name+' '+ colorsArr[i][0] + ":  -   Will Use: " + colorsArr[i][1] + " - Available: " + running.Running + ' -  Missing: ' + colorsArr[i][2] + " - Required: " + colorsArr[i][3] +'<br>';
        logDATA.push([running.name+' '+colorsArr[i][0], colorsArr[i][1], running.Running, colorsArr[i][2], colorsArr[i][3]]);
    }
    logDATA.push(['', '', '', '', '']);
    logDATA.push(['Bottles', '', '', '', '']);
    for (var i = 0; i < BottlesArr.length; i++) {
        var running = base.getData('BottleTypes/' + BottlesArr[i][0] );
        BottleMSG += running.name+' '+BottlesArr[i][0] + ":  -   Will Use: " + BottlesArr[i][1] + " - Available: " + running + ' -  Missing: ' + BottlesArr[i][2] + " - Required: " + BottlesArr[i][3] + '<br>';
        logDATA.push([running.name+' '+BottlesArr[i][0], BottlesArr[i][1], running.Running, BottlesArr[i][2], BottlesArr[i][3]]);
    }
    logDATA.push(['', '', '', '', '']);

    logDATA.push(['Lids', '', '', '', '']);
    for (var i = 0; i < LidsArr.length; i++) {
        var running = base.getData('Lids/' + LidsArr[i][0]);
        LidMSG += running.name+' '+LidsArr[i][0] + ":  -   Will Use: " + LidsArr[i][1] + " - Available: " + running + ' -  Missing: ' + LidsArr[i][2] + " - Required: " + LidsArr[i][3] + '<br>';
        logDATA.push([running.name+' '+LidsArr[i][0], LidsArr[i][1], running.Running, LidsArr[i][2], LidsArr[i][3]]);
    }
    logDATA.push(['', '', '', '', '']);

    logDATA.push(['Premixes', '', '', '', '']);
    for (var i = 0; i < PremixArr.length; i++) {
        var running = base.getData('PremixesTypes/' + PremixArr[i][0] );
        PremixMSG += PremixArr[i][0] + '  ' + running.name + ":  -   Will Use: " + PremixArr[i][1] + " - Available: " + running.Running + ' -  Missing: ' + PremixArr[i][2] + '<br>';
        logDATA.push([PremixArr[i][0] + '  ' + running.name, PremixArr[i][1], running.Running, PremixArr[i][2],'']);
    }
    logDATA.push(['', '', '', '', '']);
    logDATA.push(['Unbranded', '', '', '', '']);
    for (var i = 0; i < UbottlesArr.length; i++) {
        var running = base.getData('UnbrandedTypes/' + UbottlesArr[i][0] );
        UbottleMSG += UbottlesArr[i][0] + '  ' + running.name + ":  -   Will Use: " + UbottlesArr[i][1] + " - Available: " + running.Running + ' -  Missing: ' + UbottlesArr[i][2] + '<br>';
        logDATA.push([UbottlesArr[i][0] + '  ' + running.name, UbottlesArr[i][1], running.Running, UbottlesArr[i][2],'']);
    }
    logDATA.push(['', '', '', '', '']);
    logDATA.push(['Branded', '', '', '', '']);
    for (var i = 0; i < BbottlesArr.length; i++) {
        var running = base.getData('BrandedTypes/' + BbottlesArr[i][0]);
        BbottleMSG += BbottlesArr[i][0] + '  ' + running.name + ":  -   Will Use: " + BbottlesArr[i][1] + " - Available: " + running.Running + ' -  Missing: ' + BbottlesArr[i][2] + '<br>';
        logDATA.push([BbottlesArr[i][0] + '  ' + running.name, BbottlesArr[i][1], running.Running, BbottlesArr[i][2],'']);
    }
    logDATA.push(['', '', '', '', '']);

    for (var i = 0; i < PackedArr.length; i++) {
        var running = base.getData('BrandedTypes/' + PackedArr[i][0]);
        PBbottleMSG += PackedArr[i][0] + '  ' + running.name + ":  -   Will Use: " + PackedArr[i][1] + " - Available: " + running.Running + ' -  Missing: ' + PackedArr[i][2] + '<br>';
        logDATA.push([PackedArr[i][0] + '  ' + running.name, PackedArr[i][1], running.Running, PackedArr[i][2],'']);
    }
    logDATA.push(['', '', '', '', '']);

    logDATA.push(['Pack Types', '', '', '', '']);
    for (var i = 0; i < TubesArr.length; i++) {
        var running = base.getData('Packages/' + TubesArr[i][0] );
        tubeMSG += running.name+' '+TubesArr[i][0] + ":  -   Will Use: " + TubesArr[i][1] + " - Available: " + running + ' -  Missing: ' + TubesArr[i][2] + " - Required: " + TubesArr[i][3] + '<br>';
        logDATA.push([running.name+' '+TubesArr[i][0], TubesArr[i][1], running.Running, TubesArr[i][2], TubesArr[i][3]]);
    }
    logDATA.push(['', '', '', '', '']);
    logDATA.push(['Boxes', '', '', '', '']);
    for (var i = 0; i < BoxArr.length; i++) {
        var running = base.getData('Boxes/' + BoxArr[i][0] );
        BoxMSG += BoxArr[i][0] + ":  -   Will Use: " + BoxArr[i][1] + " - Available: " + running + ' -  Missing: ' + BoxArr[i][2] + " - Required: " + BoxArr[i][3] + '<br>';
        logDATA.push([running.name+' '+BoxArr[i][0], BoxArr[i][1], running.Running, BoxArr[i][2], BoxArr[i][3]]);
    }
    logDATA.push(['', '', '', '', '']);

    logDATA.push(['Labels', '', '', '', '']);
    for (var i = 0; i < LabelsArr.length; i++) {
        var running = base.getData('Labels/' + LabelsArr[i][0]);
        LabelMSG += running.name+' '+LabelsArr[i][0] + ":  -   Will Use: " + LabelsArr[i][1] + " - Available: " + running + ' -  Missing: ' + LabelsArr[i][2] + " - Required: " + LabelsArr[i][3] + '<br>';
        logDATA.push([running.name+' '+LabelsArr[i][0], LabelsArr[i][1], running.Running, LabelsArr[i][2], LabelsArr[i][3]]);
    }
    logDATA.push(['', '', '', '', '']);
    logDATA.push(['Ink', '', '', '', '']);
    for (var i = 0; i < InkArr.length; i++) {
        var running = base.getData('Misc/' + InkArr[i][0] + '/Running');
        InkMSG += InkArr[i][0] + ":  -   Will Use: " + InkArr[i][1] + " - Available: " + running + ' -  Missing: ' + InkArr[i][2] + " - Required: " + InkArr[i][3] + '<br>';
        logDATA.push([InkArr[i][0], InkArr[i][1], running, InkArr[i][2], InkArr[i][3]]);
    }
    logDATA.push(['', '', '', '', '']);

    var msg = vgMSG + "<hr>" + agMSG +"<hr>" + pgMSG + "<hr>" + NicoMSG + "<hr>" + NicosaltsMSG + "<hr>" + ColorMSG + "<hr>" + FlavMSG + "<hr>" + BottleMSG + "<hr>" + LidMSG + "<hr>" + PremixMSG + "<hr>" + UbottleMSG + "<hr>" + BbottleMSG + "<hr>" + PBbottleMSG + "<hr>" + BoxMSG + "<hr>" + LabelMSG + "<hr>" + InkMSG + "<hr>" + tubeMSG + "<hr>" + failMSG;

    var sheet = SpreadsheetApp.openById(logSheet).getSheetByName('Sheet1');

    sheet.insertRowsAfter(sheet.getMaxRows(), logDATA.length);
    sheet.getRange(sheet.getLastRow() + 4, 1, 1, 5).setBackground('#D9A744');
    sheet.getRange(sheet.getLastRow() + 4, 1, logDATA.length, 5).setValues(logDATA);

    /* var file=DocumentApp.openById(logFileID);
     
     var text=file.getBody().getText();
     Logger.log(text);
     var formattedDate = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
     text+='\n \n \n'+formattedDate+'\n \n';
     text+=text1;
     var blob=Utilities.newBlob(text);
     blob.setName("Log File");
     
     DriveApp.getFileById(logFileID).setContent(text);


     msg+='<br><hr>'+file.getUrl();*/

    return msg;

}

function checkVals(data) {

    var suffix = data.batch.substr(-1);
    var for_premixed_stock = suffix == PREMIX_STOCK_SUFFIX ? true : false;
    var for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX ? true : false;
  if(!for_unbranded_stock){
    suffix = data.batch.substr(-2);
    for_unbranded_stock = suffix == UNBRANDED_STOCK_SUFFIX2 ? true : false;
  }
    var for_branded_stock = suffix == BRANDED_STOCK_SUFFIX ? true : false;

    if (for_premixed_stock) {

        var forPremix = checkMix(data);
        return forPremix;

    } else if (for_unbranded_stock) {
        var forUnbranded = CheckPremixed2(data);
        return forUnbranded;
    } else if (for_branded_stock) {
        var forBranded = CheckUnbranded2(data);
        return forBranded;
    } else {
        generateForSingleBrand2(data.productcode, data.productdescription);
        var forCustom = CheckBranded2(data);
        return forCustom;

    } //end custom

}

function checkALL(running, needed) {

    var helper1 = running-needed;

    if (running <= 0) {
        var retobj = {
            running: 0,
            used: 0,
            left:needed
        };

    } else if (helper1 == 0) {
        var retobj = {
            running: 0,
            used: needed,
            left: 0
        };

    } else if (helper1 > 0) {
        var retobj = {
            running: helper1,
            used: needed,
            left: 0
        };

    } else if (helper1 < 0) {
        var help2 = needed - running
        var retobj = {
            running: 0,
            used: running,
            left: help2
        };

    }

    return retobj;

}

Array.prototype.getIndex = function(searchValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][0] == searchValue) {
            return i
            break;
        }

    }
    return -1;

};