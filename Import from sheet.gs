function myFunction() {
    var data = getQTY('UnbrandedTypes');
    var pages = [];
    var i, j, temparray, chunk = 500;
    for (i = 0, j = data[0].length; i < j; i += chunk) {
        temparray = data[0].slice(i, i + chunk);
        // do whatever
        pages.push(temparray);
    }
    return pages;
}

function deleteSheet() {
    base.removeData('Orders');
}

function importBottles() {
    var id = '1-WoYSiAUpnEJipjDktr2JyoydsjOZqSkN3TT-YWfD1M';
    var data = SpreadsheetApp.openById(id).getSheetByName('Sheet1').getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {



    }


}

function getFromSheetRecipes() {
    var id = '1WBYmW-OrQj5G9LTj2J9VINUM-T_6gx0QzqPbolXJ7p4';
    var data = SpreadsheetApp.openById(id).getSheetByName('Sheet1').getDataRange().getValues();
    for (var i = 13; i < data.length; i++) {
        var disp = data[i][0].split(' ');
        var name = {
            vgint: parseInt(disp[2], 10),
            pgint: parseInt(disp[4], 10),
            nicint: parseInt(disp[7].replace('MG', '').replace(':', ''), 10),
            nicorec: parseInt(data[i][3], 10),
            Flavrec: parseInt(data[i][4], 10),
            vgrec: parseInt(data[i][1], 10),
            pgrec: parseInt(data[i][2], 10),
            type: 'nic'
        };
        // generateForSingleRecipe(name);
    }
}

function Import_new_FBC() {
    base.removeData('Brands');
    var id = '1SN1WWN9Xc8-sLIGUErzGk2Bu3FHKc3qmL67HLOLqsiM';
    var ss = SpreadsheetApp.openById(id);
    var data = ss.getSheetByName('Sheet1').getDataRange().getDisplayValues();
    var options1 = '{';
    for (var i = 1; i < data.length; i++) {
        //Get Flavour
        // var flavourandrecipe=data[i][0];
        //  flavourandrecipe=flavourandrecipe.split(' - ');
        var flavour = data[i][1].replace(/&/g, '').replace('&', '').replace('/', '').replace('(', '').replace(')', '').replace(/\./g, '');
        /*
           var brand = data[i][2];
                var t2 = brand.split(' - ');
                   if (t2.length > 1) {
                       brand = t2[0];
                   }*/
        var sku = 'BRA' + getRandom() + flavour.substr(0, 1);
        var dat1 = {
            sku: sku,
            name: flavour,
            /*   Running:0,
                Reserved:0,
                Completed:0,
                Stock:0*/


        };
        options1 += '"' + flavour + '":' + JSON.stringify(dat1) + ',';
    }
    options1 += '}';
    var upload = JSON.parse(options1);
    base.updateData('Brands', upload)
}

function QTYInport(id) {
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import QTY',
        batch: 'Spreadsheet',
        page: 'QTY',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    LOGDATA.data.push('Sheet ID:', id);
    var faileditems = '';
    var newitems = '';
    // id='1sWqguyu1TsaGgxKAo6zzDYCwQg-FkGIA_57P7J8L7WA';
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = id;
    var sheets = [['Flavour Concentrates','Flavours','FLAV','float'],['Packages','Packages','PAC','int'],['Boxes','Boxes','BOX','int'],['Labels','Labels','LAB','int'],['Colors','Color','COL','float']];
    for(var s=0;s<sheets.length;s++){
    try {
        var flavours = ss.getSheetByName(sheets[s][0]);

        if (flavours) {
            flavours = flavours.getDataRange().getValues();
            var origflavours = base.getData(sheets[s][1]);
            var origFlavoursString = JSON.stringify(origflavours);
            var options = '{';
            for (var i = 1; i < flavours.length; i++) {
                var replace = false;
                if (flavours[i][4] == 'Replace') {
                    replace = true;
                }
                try {
                    var flav = flavours[i][1];
                    if (!flavours[i][3]) {
                        flavours[i][3] = sheets[s][2] + getRandom() + flav.substr(0, 1);
                    }
                    if (!flav) {
                        try {
                            flav = origflavours[flavours[i][3]].name;
                        } catch (e) {
                            faileditems += sheets[s][0]+' SKU is not in the database: ' + flavours[i][3] + '<br/>'
                        }
                    }

                    var foundSKU = origflavours[flavours[i][3]];
                    if (foundSKU) {
                      if(sheets[s][3]=='float'){
                        var dat1 = {
                            Running: parseFloat(flavours[i][2]) + parseFloat(origflavours[flavours[i][3]].Running),
                            Reserved: parseFloat(origflavours[flavours[i][3]].Reserved),
                            Completed: parseFloat(origflavours[flavours[i][3]].Completed),
                            name: flav,
                            sku: flavours[i][3],
                        };
                        }else{
                        var dat1 = {
                            Running: parseInt(flavours[i][2],10) + parseInt(origflavours[flavours[i][3]].Running,10),
                            Reserved: parseInt(origflavours[flavours[i][3]].Reserved,10),
                            Completed: parseInt(origflavours[flavours[i][3]].Completed,10),
                            name: flav,
                            sku: flavours[i][3],
                        };
                        }
                        if (replace) {
                         if(sheets[s][3]=='float'){
                            var dat1 = {
                                Running: parseFloat(flavours[i][2]),
                                Reserved: parseFloat(origflavours[flavours[i][3]].Reserved),
                                Completed: parseFloat(origflavours[flavours[i][3]].Completed),
                                name: flav,
                                sku: flavours[i][3],
                            };
                          }else{
                           var dat1 = {
                                Running: parseInt(flavours[i][2],10),
                                Reserved: parseInt(origflavours[flavours[i][3]].Reserved,10),
                                Completed: parseInt(origflavours[flavours[i][3]].Completed,10),
                                name: flav,
                                sku: flavours[i][3],
                            };
                          
                          
                          }
                        }
                    } else if (flav) {
                    if(sheets[s][3]=='float'){
                        var dat1 = {
                            Running: parseFloat(flavours[i][2]),
                            sku: flavours[i][3],
                            Reserved: 0,
                            Completed: 0,
                            name: flav,
                        };
                      }else{
                      
                       var dat1 = {
                            Running: parseInt(flavours[i][2],10),
                            sku: flavours[i][3],
                            Reserved: 0,
                            Completed: 0,
                            name: flav,
                        };
                      
                      }
                        newitems += 'Updated SKU for: ' + flav + ' to ' + flavours[i][3] + '<br>';
                    } else {
                        var sku = flavours[i][3];
                        
                       if(sheets[s][3]=='float'){ 
                        var dat1 = {
                            Running: parseFloat(flavours[i][2]),
                            Completed: 0,
                            Reserved: 0,
                            sku: sku,
                            name: flav
                        };
                        }else{
                        
                        var dat1 = {
                            Running: parseInt(flavours[i][2],10),
                            Completed: 0,
                            Reserved: 0,
                            sku: sku,
                            name: flav
                        };
                        
                        
                        }

                        base.updateData(sheets[s][1]+'/' + dat1.sku, dat1);
                        // generateForSingleFlavour(flav);
                        newitems += 'Added New '+sheets[s][1]+': ' + flav + '<br>';
                    }
                    options += '"' + dat1.sku + '":' + JSON.stringify(dat1) + ',';
                } catch (e) {
                    faileditems += 'Couldnt proccess ' + flav + '  ' + e.toString() + '<br/>';
                }
            }
            options += '}';
            var upload = JSON.parse(options);
            base.updateData(sheets[s][1], upload)
            LOGDATA.data.push(['Imported:', sheets[s][1]]);
        }
    } catch (e) {
        LOGDATA.data.push(['Failed To Import:', sheets[s][1]]);
        faileditems += 'Couldnt Upload Flavours.   ' + e.toString() + '<br/>';
    }
    }
    //Bottles/Lids
    try {
        var botlid = ss.getSheetByName('Bottles and caps');
        if (botlid) {
            botlid = botlid.getDataRange().getValues();
            var origbottles = base.getData('BottleTypes');
            var origcaps = base.getData('Lids');
            var origcapsString = JSON.stringify(origcaps);
            var origbottlesString = JSON.stringify(origbottles);
            for (var i = 1; i < botlid.length; i++) {
                var replace = false;
                if (botlid[i][4] == 'Replace') {
                    replace = true;
                }
                if (botlid[i][0] == 'Bottles' || botlid[i][0] == 'Nib') {
                    try {


                        var name = botlid[i][1];
                        if (!name) {
                            name = origbottles[botlid[i][3]].name;
                        }
                        if (!name) {
                            try {
                                name = origbottles[botlid[i][3]].name;
                            } catch (e) {
                                faileditems += 'Bottle SKU is not in the database: ' + botlid[i][3] + '<br/>'
                            }
                        }

                        if (botlid[i][3] == '') {
                            botlid[i][3] = 'BOT' + getRandom() + name.substr(0, 1);
                        }
                        var foundSKU = origbottles[botlid[i][3]];
                        if (foundSKU > 0) {
                            var dat1 = {
                                Running:  parseInt(botlid[i][2],10) +  parseInt(origbottles[botlid[i][3]].Running,10),
                                'sku': botlid[i][3],
                                Reserved:  parseInt(origbottles[botlid[i][3]].Reserved,10),
                                Completed:  parseInt(origbottles[botlid[i][3]].Completed,10),
                                'name': origbottles[botlid[i][3]].name,
                            };

                            if (replace) {

                                var dat1 = {
                                    Running:  parseInt(botlid[i][2],10),
                                    'sku': botlid[i][3],
                                    Reserved:  parseInt(origbottles[botlid[i][3]].Reserved,10),
                                    Completed:  parseInt(origbottles[botlid[i][3]].Completed,10),
                                    'name': origbottles[botlid[i][3]].name,
                                };

                            }
                        } else if (name) {
                            var dat1 = {
                                Running:  parseInt(botlid[i][2],10),
                                'sku': botlid[i][3],
                                Reserved: 0,
                                Completed: 0,
                                'name': name,
                            };

                            newitems += 'Updated SKU for: ' + name + ' to ' + botlid[i][3] + '<br>';
                        } else {
                            var sku = botlid[i][3];
                            var dat1 = {
                                Running:  parseInt(botlid[i][2],10),
                                Completed: 0,
                                Reserved: 0,
                                sku: sku,
                                name: flav
                            };
                            base.updateData('BottleTypes/' + dat1.sku, dat1);
                            //generateForSingleBottle(name);
                            newitems += 'Added New Bottle: ' + name + '<br>';
                        }
                        base.updateData('BottleTypes/' + name, dat1);
                    } catch (e) {
                        faileditems += 'Couldnt proccess ' + name + '  ' + e.toString() + '<br/>';
                    }
                } else if (botlid[i][0] == 'Cap') {
                    try {


                        var name = botlid[i][1];
                        if (!name) {
                            name = origcaps[botlid[i][3]].name;
                        }
                        if (botlid[i][3] == '') {
                            botlid[i][3] = 'CAP' + getRandom() + name.substr(0, 1);
                        }
                        var foundSKU = origcaps[botlid[i][3]];
                        if (foundSKU > 0) {
                            var dat1 = {
                                Running: parseInt(botlid[i][2],10) + parseInt(origcaps[botlid[i][3]].Running,10),
                                'sku': botlid[i][3],
                                Reserved: parseInt(origcaps[botlid[i][3]].Reserved,10),
                                Completed: parseInt(origcaps[botlid[i][3]].Completed,10),
                                name: origcaps[botlid[i][3]].name,
                            };

                            if (replace) {

                                var dat1 = {
                                    Running: parseInt(botlid[i][2],10),
                                    sku: botlid[i][3],
                                    Reserved: parseInt(origcaps[botlid[i][3]].Reserved,10),
                                    Completed: parseInt(origcaps[botlid[i][3]].Completed,10),
                                    name: origcaps[botlid[i][3]].name,
                                };

                            }
                        } else if (name) {
                            var dat1 = {
                                Running: parseInt(botlid[i][2],10),
                                sku: botlid[i][3],
                                Reserved: 0,
                                Completed: 0,
                                name: name,
                            };

                            newitems += 'Updated SKU for: ' + name + ' to ' + botlid[i][3] + '<br>';
                        } else {
                            var sku = botlid[i][3];
                            var dat1 = {
                                Running: parseInt(botlid[i][2],10),
                                Completed: 0,
                                Reserved: 0,
                                sku: sku,
                                name: name
                            };
                            newitems += 'Added New Cap: ' + name + '<br>';
                        }
                        base.updateData('Lids/' + dat1.sku, dat1)
                    } catch (e) {
                        faileditems += 'Couldnt proccess ' + name + '  ' + e.toString() + '<br/>';
                    }
                }
            }
        }
        LOGDATA.data.push(['Imported:', 'Bottles and Caps']);
    } catch (e) {
        LOGDATA.data.push(['Failed to Import:', 'Bottles and Caps']);
        faileditems += 'Couldnt Upload Bottles/Lids. ' + e.toString() + ' <br/>';
    }
    //PREMIX
    try {
        var premix = ss.getSheetByName('Premix');
        if (premix) {
            premix = premix.getDataRange().getValues();
            var origpremix = base.getData('PremixesTypes');
            var origpremixString = JSON.stringify(origpremix);
            var options = '{';
            for (var i = 1; i < premix.length; i++) {
                var replace = false;
                if (premix[i][4] == 'Replace') {
                    replace = true;
                }
                try {
                    if (origpremix[premix[i][3]]) {
                        var sku = premix[i][3];
                        var dat1 = {
                            Running: parseFloat(premix[i][2]) + parseFloat(origpremix[premix[i][3]].Running),
                            'sku': sku,
                            Reserved: parseFloat(origpremix[premix[i][3]].Reserved),
                            Completed: parseFloat(origpremix[premix[i][3]].Completed),
                            'name': origpremix[premix[i][3]].name,
                        };
                        if (replace) {

                            var dat1 = {
                                Running: parseFloat(premix[i][2]),
                                'sku': sku,
                                Reserved: parseFloat(origpremix[premix[i][3]].Reserved),
                                Completed: parseFloat(origpremix[premix[i][3]].Completed),
                                'name': origpremix[premix[i][3]].name,
                            };

                        }

                        options += '"' + dat1.sku + '":' + JSON.stringify(dat1) + ',';
                    }else{
                      var sku = premix[i][3];
                      var dat1 = {
                        Running: 0,
                        'sku': sku,
                        Reserved: 0,
                        Completed: 0,
                        'name': premix[i][1],
                      };
                       options += '"' + dat1.sku + '":' + JSON.stringify(dat1) + ',';
                    }
                } catch (e) {
                    faileditems += 'Couldnt proccess ' + name + '  ' + e.toString() + '<br/>';
                }
            }
            options += '}';
            var upload = JSON.parse(options);
            base.updateData('PremixesTypes', upload)
        }
        LOGDATA.data.push(['Imported:', 'Premixes']);
    } catch (e) {
        LOGDATA.data.push(['Failed to Import:', 'Premixes']);

        faileditems += 'Couldnt Upload Premixes.' + e.toString() + ' <br/>';
    }
    //UNBRANDED
    try {
        var unbranded = ss.getSheetByName('Unbranded');
        if (unbranded) {
            unbranded = unbranded.getDataRange().getValues();
            var origunbranded = base.getData('UnbrandedTypes');
            var origunbrandedString = JSON.stringify(origunbranded);
            var options = '{';
            for (var i = 1; i < unbranded.length; i++) {

                var replace = false;
                if (unbranded[i][4] == 'Replace') {
                    replace = true;
                }
                try {

                    if (origunbranded[unbranded[i][3]]) {
                        var sku = unbranded[i][3];
                        var dat1 = {
                            Running: parseInt(unbranded[i][2],10) + parseInt(origunbranded[unbranded[i][3]].Running,10),
                            'sku': sku,
                            Reserved: parseInt(origunbranded[unbranded[i][3]].Reserved,10),
                            Completed: parseInt(origunbranded[unbranded[i][3]].Completed,10),
                            'name': origunbranded[unbranded[i][3]].name,
                        };
                        if (replace) {

                            var dat1 = {
                                Running: parseInt(unbranded[i][2],10),
                                'sku': sku,
                                Reserved: parseInt(origunbranded[unbranded[i][3]].Reserved,10),
                                Completed: parseInt(origunbranded[unbranded[i][3]].Completed,10),
                                'name': origunbranded[unbranded[i][3]].name,
                            };

                        }
                       
                    }else{
                      var sku = unbranded[i][3];
                      var dat1 = {
                        Running: 0,
                        'sku': sku,
                        Reserved: 0,
                        Completed: 0,
                        'name': unbranded[i][1],
                      };
                      
                    }
                     var stringified = JSON.stringify(dat1);
                    options += '"' + dat1.sku + '":' + stringified + ',';
                } catch (e) {
                    faileditems += 'Couldnt proccess ' + unbranded[i][3] + '  ' + e.toString() + '<br/>';
                }
            }
            options += '}';
            var upload = JSON.parse(options);
            //     var opt=JSON.parse(upload);

            base.updateData('UnbrandedTypes', upload)
        }
        LOGDATA.data.push(['Imported:', 'Unbranded']);
    } catch (e) {
        LOGDATA.data.push(['Failed to Import:', 'Unbranded']);

        faileditems += 'Couldnt Upload Unbranded.' + e.toString() + ' <br/>';
    }
    //Branded
    var options = '{';
    try {

        var branded = ss.getSheetByName('Branded');
        if (branded) {
            branded = branded.getDataRange().getValues();
            var origbranded = base.getData('BrandedTypes');
            var origbrandedString = JSON.stringify(origbranded);
            var options = '{';
            for (var i = 1; i < branded.length; i++) {
                var replace = false;
                if (branded[i][4] == 'Replace') {
                    replace = true;
                }
                try {
                    if (origbranded[branded[i][3]]) {
                        var sku = branded[i][3];
                        var dat1 = {
                            Running: parseInt(branded[i][2],10) + parseInt(origbranded[branded[i][3]].Running,10),
                            'sku': sku,
                            Reserved: parseInt(origbranded[branded[i][3]].Reserved,10),
                            Completed: parseInt(origbranded[branded[i][3]].Completed,10),
                            'name': origbranded[branded[i][3]].name,
                        };
                        if (replace) {
                           var sku = origbranded[i][3];
                            var dat1 = {
                                Running: parseInt(branded[i][2],10),
                                'sku': sku,
                                Reserved: parseInt(origbranded[branded[i][3]].Reserved,10),
                                Completed: parseInt(origbranded[branded[i][3]].Completed,10),
                                'name': origbranded[branded[i][3]].name,
                            };

                        }
                    }else{
                      var sku = origbranded[i][3];
                      var dat1 = {
                        Running: 0,
                        'sku': sku,
                        Reserved: 0,
                        Completed: 0,
                        'name': origbranded[i][1],
                      };
                      
                    }

                    options += '"' + sku + '":' + JSON.stringify(dat1) + ',';

                } catch (e) {
                    faileditems += 'Couldnt proccess ' + name + '  ' + e.toString() + '<br/>';
                }
            }
            options += '}';
            var upload = JSON.parse(options);
            base.updateData('BrandedTypes', upload)
        }
        LOGDATA.data.push(['Imported:', 'Branded']);
    } catch (e) {
        LOGDATA.data.push(['Failed to Import:', 'Branded']);

        faileditems += 'Couldnt Upload Branded.' + e.toString() + ' <br/>';
    }

    var text = newitems + '<br/>' + faileditems;
    LOGDATA.msg = text;
    logItem(LOGDATA);
    return text;
}

function delsht() {
    base.removeData('BrandedTypes')
}




function createRefferenceDBORIG(id) {
    //base.removeData('References');
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import PC/PD',
        batch: 'Spreadsheet',
        page: 'PC/PD',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    id = '1oyXq7lKi3A-wp5qFK6-qXNxQZRkPMLc01r-Gol5iCes';
    var ss = SpreadsheetApp.openById(id);
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options1 = '{';
    var options2 = '{';
    var options3 = '{';
    var options4 = '{';
    var bottles = JSONtoARR(base.getData('BottleTypes'));
    var Caps = JSONtoARR(base.getData('Lids'));
    /*
                 var headerRow=['Product Code','Product Description','Unbranded SKU','Unbranded Description','Premix SKU','Premix Description','Linked BB SKU','Label Code','Brand','Bottle','Fill','Cap','Packaging','Box','NIB','Flavour','Recipe'];
   
         values.push([data[i].prod,data[i].descr,data[i].unbrandSKU,data[i].unbranddescr,data[i].premixSKU,data[i].premixdescr,data[i].linkedBB,data[i].LabelCode,data[i].brand,data[i].btype,data[i].fill,data[i].lid,data[i].packagingType,data[i].boxname,data[i].NIB,data[i].flavour,data[i].recipe.name]);
  
     
     }
            
            
            */

    var recipes = base.getData('Recipes');
    for (var i = 1; i < data.length; i++) {
        try {
            var productcode = data[i][0].replace(/&/g, '').replace('&', '').replace('/', '').replace('(', '').replace(')', '').replace('.', '').replace(/\./g, "");
            var productdescription = data[i][1].replace(/&/g, '').replace('(', '').replace(')', '').replace('/', '').replace(/\./g, "").replace(/\//g, "");
            if (data[i][19] == 'Y') {
                base.removeData('References/ProductCodes/' + productcode);

                base.removeData('References/Descriptions/' + productdescription);
                LOGDATA.data.push(['Removed:', productcode]);
            }

            var unbrandSKU = data[i][2];
            var unbranddescr = data[i][3];

            var premixSKU = data[i][4];
            var premixdescr = data[i][5];

            var premixSKUColored = data[i][6];
            var premixdescrColored = data[i][7];

            var linkedBB = data[i][8];
            var LabelCode = data[i][9];
            var brand = data[i][11];
            var btype = data[i][12];
            var botSKU = data[i][13];

            var fill = data[i][14];

            var lid = data[i][15];
            var lidSKU = data[i][16];

            var packagingType = data[i][17];


            var boxname = data[i][18];
            var NIB = data[i][19]
            var flavour = data[i][20];
            var flavourSKU = data[i][21]


            var recipename = data[i][22];
            if (linkedBB != '' && linkedBB != 0) {} else {
                linkedBB = 0;
            }
            var recipe = recipes[recipename.replace(/\./g, "").replace(/\//g, "")];
            if (!recipe) {
                LOGDATA.msg += 'Recipe Not found ' + data[i][16] + ' for item ' + productcode + ' \n ';
                continue;
            }
            if (btype = '') {
                for (var j = 0; j < bottles.length; j++) {
                    if (bottles[j].sku == botSKU) {

                        btype = bottles[j].name;
                        break;
                    }
                }
            }
            if (lid = '') {
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
                LabelCode: LabelCode,
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
                flavour: flavour,

                linkedBB: linkedBB,
                botSKU: botSKU,
                lidSKU: lidSKU,
            };


            // generateForSingleBrand2(productcode,productdescription);
            options1 += '"' + productcode + '":' + JSON.stringify(obj1) + ',';
            options2 += '"' + productdescription + '":' + JSON.stringify(obj1) + ',';



        } catch (e) {
            Logger.log(i);
        }
    }
    options1 += '}';
    options2 += '}';
    var ob1 = JSON.parse(options1);
    var ob2 = JSON.parse(options2);
    //   options3 += '}';
    //   options4 += '}';
    //  var ob3 = JSON.parse(options3);
    //  var ob4 = JSON.parse(options4);
    if (Object.keys(obj1)) {
        var keys1 = Object.keys(obj1);
        for (var k = 0; k < keys1.length; k++) {
            LOGDATA.data.push(['Added:', keys1[k]]);

        }
    }
    /*    if(Object.keys(ob3)){ 
       var keys1=Object.keys(ob3);
       for(var k=0;k< keys1.length;k++){
         LOGDATA.data.push(['Added:',keys1[k]]);
         
       }
       }*/
    var msg = LOGDATA.msg;
    logItem(LOGDATA);
    //      base.updateData('References/ProductCodes', ob3);

    //     base.updateData('References/Descriptions', ob4);

    base.updateData('References/ProductCodes', ob1);

    base.updateData('References/Descriptions', ob2);

    return msg + ' \n Updated.';
}

function createRefferenceDB(id) {
    // base.removeData('References');
    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import PC/PD',
        batch: 'Spreadsheet',
        page: 'PC/PD',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1pcHJxFnwUVD8Wvgw6c_VvUsy2dKefx-FhJS_WNI_5iY';
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getId();
    var data = ss.getSheets()[0].getDataRange().getValues();
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
            if (data[i][35] == 'Y') {
                base.removeData('References/ProductCodes/' + productcode);

                base.removeData('References/Descriptions/' + productdescription);
                LOGDATA.data.push(['Removed:', productcode]);
            }

            var unbrandSKU = data[i][2];
            var unbranddescr = data[i][3];
            generateForSingleUnbrand2(unbrandSKU, unbranddescr);
            var premixSKU = data[i][4];
            var premixdescr = data[i][5];
            generateForSinglePremix2(premixSKU, premixdescr);
            var premixSKUColored = data[i][6];
            var premixdescrColored = data[i][7];
            generateForSinglePremix2(premixSKUColored, premixdescrColored);
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

function updatebotlid() {
    var bottles = JSONtoARR(base.getData('BottleTypes'));
    var Caps = JSONtoARR(base.getData('Lids'));
    var pc = JSONtoARR(base.getData('References/ProductCodes'));
    var pd = JSONtoARR(base.getData('References/Descriptions'));
    for (var j = 0; j < pc.length; j++) {
        for (var i = 0; i < Caps.length; i++) {

            if (Caps[i].name == pc[j].lid) {
                pc[j].lidSKU = Caps[i].sku;
                break;
            }
        }
    }
    for (var j = 0; j < pc.length; j++) {
        for (var i = 0; i < bottles.length; i++) {

            if (bottles[i].name == pc[j].btype) {
                pc[j].botSKU = bottles[i].sku;
                break;
            }
        }
    }
    for (var j = 0; j < pd.length; j++) {
        for (var i = 0; i < bottles.length; i++) {

            if (bottles[i].name == pd[j].btype) {
                pd[j].botSKU = bottles[i].sku;
                break;
            }
        }
    }

    for (var j = 0; j < pd.length; j++) {
        for (var i = 0; i < Caps.length; i++) {

            if (Caps[i].name == pd[j].lid) {
                pd[j].lidSKU = Caps[i].sku;
                break;
            }
        }
    }

    var options1 = '{';
    var options2 = '{';
    for (var i = 0; i < pc.length; i++) {
        options1 += '"' + pc[i].prod + '":' + JSON.stringify(pc[i]) + ',';

    }
    for (var i = 0; i < pd.length; i++) {
        options1 += '"' + pc[i].descr + '":' + JSON.stringify(pd[i]) + ',';

    }


    options1 += '}';
    options2 += '}';
    var ob1 = JSON.parse(options1);
    var ob2 = JSON.parse(options2);

    // base.removeData('References');

    base.updateData('References/ProductCodes', ob1);

    base.updateData('References/Descriptions', ob2);

}

function importRecipesFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Recipes',
        batch: 'Spreadsheet',
        page: 'Recipes',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var id = data[i][0];



        var name = data[i][1];
        if (id == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][16] == 'Y') {
            base.removeData('Recipes/' + id);

            base.removeData('Recipes/' + id);
            LOGDATA.data.push(['Removed:', id]);
            continue;
        }
        var VGrec = data[i][2];
        var AGrec = data[i][3];
        var PGrec = data[i][4];
        var Nicorec = data[i][5];
        var Nicorecsalts = data[i][6];
        var cbdrec = data[i][7];
        var MCTrecipe = data[i][8];
        var Flavrec = data[i][9];
        var vg = data[i][10];
        var pg = data[i][11];
        var strength = data[i][12];

        var ColorName = data[i][13];
        var ColorSKU = data[i][14];
        var ColorVal = data[i][15];
        if (VGrec == '') {
            VGrec = 0;
        }
        if (PGrec == '') {
            PGrec = 0;
        }
        if (Nicorec == '') {
            Nicorec = 0;
        }
        if (cbdrec == '') {
            cbdrec = 0;
        }
        if (Flavrec == '') {
            Flavrec = 0;
        }
        if (MCTrecipe == '') {
            MCTrecipe = 0;
        }
        if (AGrec == '') {
            AGrec = 0;
        }
        var recipe = {
            id: id,
            name: name,
            VGrec: VGrec,
            AGrec: AGrec,
            PGrec: PGrec,
            Nicorec: Nicorec,
            Nicorecsalts: Nicorecsalts,
            cbdrec: cbdrec,
            MCTrecipe: MCTrecipe,
            Flavrec: Flavrec,
            vg: vg,
            pg: pg,
            strength: strength,
            Color: {
                name: '',
                sku: '',
                val: '',

            },
        }
        if (ColorName && ColorName && ColorName) {
            recipe.Color.name = ColorName;
            recipe.Color.sku = ColorSKU;
            recipe.Color.val = ColorVal;
        } else {
            delete recipe.Color;
        }
        options += '"' + recipe.id + '":' + JSON.stringify(recipe) + ',';


        LOGDATA.data.push(['Added:', id + ' - ' + name]);
        LOGDATA.msg += 'Added ' + id + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('Recipes', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function importBoxesFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Boxes',
        batch: 'Spreadsheet',
        page: 'Boxes',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','divTubesForBox'];
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][3] == 'Y') {
            base.removeData('Boxes/' + sku);

            base.removeData('Boxes/' + sku);
            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }

        var divTubesForBox = data[i][2];

        var box = {
            sku: sku,
            name: name,
            divTubesForBox: divTubesForBox,
            Running: 0,
            Reserved: 0,
            Completed: 0,
        };

        options += '"' + box.sku + '":' + JSON.stringify(box) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('Boxes', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function cliearItems(){
var id='136dlENcEjsAoDTt9TK_gv2e5Yj9WWPssBGOfh5n-T-0';
  var ss = SpreadsheetApp.openById(id);
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
    if(data[i][0]){
    base.removeData('Recipes/'+data[i][0])
    }
    }
}
function importPackagesFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Packages',
        batch: 'Spreadsheet',
        page: 'Packages',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','botperPack',
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][3] == 'Y') {
            base.removeData('Packages/' + sku);

            base.removeData('Packages/' + sku);
            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }
        var botperPack = data[i][2];


        var pack = {
            sku: sku,
            name: name,
            botperPack: botperPack,


            Running: 0,
            Reserved: 0,
            Completed: 0,
        }

        options += '"' + pack.sku + '":' + JSON.stringify(pack) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    var msg='';
    try {
        var upload = JSON.parse(options);
        base.updateData('Packages', upload);
        msg=LOGDATA.msg;
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
           msg=LOGDATA.msg;
        logItem(LOGDATA);
    }


    return msg;
}

function importFlavoursFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Flavours',
        batch: 'Spreadsheet',
        page: 'Flavours',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','botperPack'
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][2] == 'Y') {
            base.removeData('Flavours/' + sku);

            base.removeData('Flavours/' + sku);
            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }

        var flav = {
            sku: sku,
            name: name,
            Running: 0,
            Reserved: 0,
            Completed: 0,

        }

        options += '"' + flav.sku + '":' + JSON.stringify(flav) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('Flavours', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + ' - ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function importBottlesFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Bottles',
        batch: 'Spreadsheet',
        page: 'Bottles',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','botperPack'
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][2] == 'Y') {
            base.removeData('BottleTypes/' + sku);


            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }

        var bottle = {
            sku: sku,
            name: name,
            Running: 0,
            Reserved: 0,
            Completed: 0,

        }

        options += '"' + bottle.sku + '":' + JSON.stringify(bottle) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('BottleTypes', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function importLidsFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Caps',
        batch: 'Spreadsheet',
        page: 'Caps',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','botperPack'
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][2] == 'Y') {
            base.removeData('Lids/' + sku);

            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }

        var lid = {
            sku: sku,
            name: name,
            Running: 0,
            Reserved: 0,
            Completed: 0,

        }

        options += '"' + lid.sku + '":' + JSON.stringify(lid) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('Lids', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function importLabelsFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Labels',
        batch: 'Spreadsheet',
        page: 'Labels',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','botperPack'
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][2] == 'Y') {
            base.removeData('Labels/' + sku);

            base.removeData('Labels/' + sku);
            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }

        var label = {
            sku: sku,
            name: name,
            Running: 0,
            Reserved: 0,
            Completed: 0,

        }

        options += '"' + label.sku + '":' + JSON.stringify(label) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('Labels', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function importColorsFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Colors',
        batch: 'Spreadsheet',
        page: 'Colors',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','botperPack'
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][2] == 'Y') {
            base.removeData('Color/' + sku);

            base.removeData('Color/' + sku);
            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }

        var color = {
            sku: sku,
            name: name,
            Running: 0,
            Reserved: 0,
            Completed: 0,

        }

        options += '"' + color.sku + '":' + JSON.stringify(color) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('Color', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function importBrandsFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Brands',
        batch: 'Spreadsheet',
        page: 'Brands',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','botperPack'
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][2] == 'Y') {
            base.removeData('Brands/' + sku);


            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }

        var brand = {
            sku: sku,
            name: name,


        }

        options += '"' + brand.sku + '":' + JSON.stringify(brand) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('Brands', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function importCustomersFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Customers',
        batch: 'Spreadsheet',
        page: 'Customers',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','botperPack'
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][3] == 'Y') {
            base.removeData('Customers/' + sku);

            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }
        var address = data[i][2];


        var cust = {
            sku: sku,
            name: name,
            address: address,


        }

        options += '"' + cust.sku + '":' + JSON.stringify(cust) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('Customers', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function importFlavourMixFromSheet(id) {

    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Import Flavour Mixes',
        batch: 'Spreadsheet',
        page: 'Flavour Mixes',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    //id = '1n83FCqn4cSH5GQWDJ4BpuSuU7lOzURrXi-a807M4Wck';
    //  var keys=['sku','name','botperPack'
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch = ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    var options = "{";
    for (var i = 1; i < data.length; i++) {
        var sku = data[i][0];


        var name = data[i][1];
        if (sku == '') {
            LOGDATA.data.push(['Failed - NO ID:', name]);
            LOGDATA.msg += 'Failed - NO ID: ' + name + '\n';
            continue;
        }
        if (data[i][5] == 'Y') {
            base.removeData('FlavourMixes/' + name);

            base.removeData('FlavourMixes/' + name);
            LOGDATA.data.push(['Removed:', sku]);
            continue;
        }
        var flavourNames = data[i][2].split(',');
        var flavourSKUs = data[i][3].split(',');
        var flavourVals = data[i][4].split(',');
        var options2 = "{";
        for (var j = 0; j < flavourNames.length; j++) {
            var item = {
                sku: flavourSKUs[j],
                name: flavourNames[j],
                val: flavourVals[j],
            }

            options2 += '"' + item.sku + '":' + JSON.stringify(item) + ',';
        }
        options2 += '}';

        var flavours = JSON.parse(options2);

        var flavmix = {
            sku: sku,
            name: name,
            flavours: flavours,


        }

        options += '"' + flavmix.sku + '":' + JSON.stringify(flavmix) + ',';


        LOGDATA.data.push(['Added:', sku + ' - ' + name]);
        LOGDATA.msg += 'Added ' + sku + '- ' + name + ' \n ';
    }

    options += '}';
    try {
        var upload = JSON.parse(options);
        base.updateData('Customers', upload);
        logItem(LOGDATA);

    } catch (e) {
        LOGDATA.status = false;
        LOGDATA.data.push(['FAILED:', e.toString()]);
        LOGDATA.msg = 'Failed ' + e.toString + '- ' + LOGDATA.msg + ' \n ';
        logItem(LOGDATA);
    }


    return LOGDATA.msg;
}

function importPCPD() {
    //  base.removeData('References');
    var secret2 = '2Ue42tEo5yfjkZn6Fd6NB4eNygOEGJPXjcjxGy2d';
    var config2 = {
        apiKey: "AIzaSyAbjFGr0HjZDmM3ybZLzy_u8yyjv2ePe8Q",
        authDomain: "gbvco-vape-factory-solution.firebaseapp.com",
        databaseURL: "https://gbvco-vape-factory-solution.firebaseio.com/",
        projectId: "gbvco-vape-factory-solution",
        storageBucket: "gbvco-vape-factory-solution.appspot.com",
        messagingSenderId: "164416568407"
    };
    var base2 = FirebaseApp.getDatabaseByUrl(config2.databaseURL, secret2);

    var data = base2.getData('References');

    base.updateData('References', data);



}




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


function testimport(){
var id='1xoIVLw0h90EsevJJlwMc68vAjm6TRcrXYbWIYN5qYnA';
importInventoryData(id)
}

function importInventoryData(id){
  
  var LOGDATA={
    status:true,
    msg:'',
    action:'Import Inventory',
    batch:'Spreadsheet',
    page:'Inventory',
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
  
  try{

    var pages=['Misc','Flavours','Labels','Boxes','Packages','Flavours','BottleTypes','Lids','PremixesTypes','UnbrandedTypes','BrandedTypes'];
    var ss = SpreadsheetApp.openById(id);
    LOGDATA.batch=ss.getName();
    var data = ss.getSheets()[0].getDataRange().getValues();
    
    for(var i=1;i<data.length;i++){
     var obj = {
           
            sku:data[i][0],
            desc: data[i][1],
            orderdate: data[i][2],
            delivdate: data[i][3],
            paiddate:data[i][4],
            eta: data[i][5],
            quantity: data[i][6],
            note: data[i][7],
           
            
        };
        for(var p=0;p<pages.length;p++){
          if(pages[p]=='Misc'){
            var exists2=base.getData(pages[p]+'/'+obj.desc.replace(/\//g,'').replace(/\-/g,'').replace(/\$/g,'').replace(/\./g,'').replace(/\#/g,'').replace(/\:/g,''));
            if(!exists2){
              var exists=base.getData(pages[p]+'/'+obj.sku);
            }else{
              var exists=exists2;
            }
          }else{
            var exists=base.getData(pages[p]+'/'+obj.sku);
          }
        if(exists){
        obj.page=pages[p];
        if(!obj.desc){
          obj.desc=exists.name;
        }
        break;
        }
        }
    LOGDATA.msg+=saveItem2(obj)+'\n';
    }
     logItem(LOGDATA);
    return LOGDATA.msg;
  }catch(e){
    LOGDATA.status=false;
    LOGDATA.data.push(['FAILED:',e.toString()]);
    LOGDATA.msg='Failed '+e.toString+'- '+  LOGDATA.msg+' \n ';
    
    logItem(LOGDATA);
      return LOGDATA.msg;
  }
}
function uniq4(a) {
    var prims = {
            "boolean": {},
            "number": {},
            "string": {}
        },
        objs = [];

    return a.filter(function(item) {
        var type = typeof item[0];
        if (type in prims)
            return prims[type].hasOwnProperty(item[0]) ? false : (prims[type][item[0]] = true);
        else
            return objs.getIndex2(item[0]) >= 0 ? false : objs.push(item);
    });
}
Array.prototype.diff2 = function(arr2) {
    var ret = [];

    var l = this.length;

    for (var i = 0; i < l; i += 1) {
        if (arr2.getIndex(this[i][0])) {
            ret.push(this[i]);
        }
    }
    return ret;
};

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function(e) {
        return b.getIndex(e[0]) > -1;
    });
}


 function updatebotlid(){
   var bottles=JSONtoARR(base.getData('BottleTypes'));
   var Caps=JSONtoARR(base.getData('Lids'));
   var pc=JSONtoARR(base.getData('References/ProductCodes'));
   var pd=JSONtoARR(base.getData('References/Descriptions'));
     for(var j=0;j<pc.length;j++){   
   for(var i=0;i<Caps.length;i++){

       if(Caps[i].name==pc[j].lid){
         pc[j].lidSKU=Caps[i].sku;
         break;
       }
     }
   }
     for(var j=0;j<pc.length;j++){ 
    for(var i=0;i<bottles.length;i++){

       if(bottles[i].name==pc[j].btype){
         pc[j].botSKU=bottles[i].sku;
          break;
       }
     }
   }
  for(var j=0;j<pd.length;j++){ 
  for(var i=0;i<bottles.length;i++){

     if(bottles[i].name==pd[j].btype){
     pd[j].botSKU=bottles[i].sku;
      break;
     }
   }
 }
 
  for(var j=0;j<pd.length;j++){ 
  for(var i=0;i<Caps.length;i++){

     if(Caps[i].name==pd[j].lid){
     pd[j].lidSKU=Caps[i].sku;
      break;
     }
   }
 }
 
   var options1='{'; 
   var options2='{'; 
   for(var i=0;i<pc.length;i++){
     options1 += '"' + pc[i].prod + '":' + JSON.stringify(pc[i]) + ',';
     
   }
   for(var i=0;i<pd.length;i++){
     options1 += '"' + pc[i].descr + '":' + JSON.stringify(pd[i]) + ',';
     
   }
   
   
   options1 += '}';
   options2 += '}';
   var ob1 = JSON.parse(options1);
   var ob2 = JSON.parse(options2);
   
// base.removeData('References');
 
   base.updateData('References/ProductCodes', ob1);
   
   base.updateData('References/Descriptions', ob2);
   
 }
