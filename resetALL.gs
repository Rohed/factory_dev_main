function getSheetData2(sheet){
var data = base.getData(sheet + '/');
    if (data) {
        var result = Object.keys(data).map(function(key) {
            return [Number(key), data[key]];
        });

        var retArr = [];
        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }

        return retArr;
     
    } else {
        return [];
    }


}
function absoluteeveryting(){
var sheets=['PremixesTypes','UnbrandedTypes','BrandedTypes','BottleTypes','Lids','Packages','Flavours','Boxes','Labels']
for(var i=0;i<sheets.length;i++){
var raw=base.getData(sheets[i]);
var list=JSONtoARR(raw);
  for(var j=0;j<list.length;j++){
  
    if(list[j].Running<0){
    raw[list[j].sku].Running=Math.abs(list[j].Running)
    }
    if(list[j].Reserved<0){
    raw[list[j].sku].Reserved=Math.abs(list[j].Reserved)
    }
    if(list[j].Completed<0){
    raw[list[j].sku].Completed=Math.abs(list[j].Completed)
    }
  }
  base.updateData(sheets[i],raw);
}
}
function you_spin_me_right_round_baby_right_round() {
var premixes=getSheetData2('PremixesTypes');
var unbranded=getSheetData2('UnbrandedTypes');
var branded=getSheetData2('BrandedTypes');

var misc=getSheetData2('Misc');
var BottleTypes=getSheetData2('BottleTypes');
var Lids=getSheetData2('Lids');
var Packages=getSheetData2('Packages');
var Flavours=getSheetData2('Flavours');


for(var i=0;i<premixes.length;i++){
try{
if(premixes[i].Running!=0||premixes[i].Reserved!=0||premixes[i].Completed!=0){
  if(!premixes[i].Reserved){
  premixes[i].Reserved=0;
  }
  if(!premixes[i].Completed){
  premixes[i].Completed=0;
  }
var dat1={
Running:Math.abs(premixes[i].Reserved)+Math.abs(premixes[i].Completed),
Reserved:0,
Completed:0

};
var dat1={
Running:0,
Reserved:0,
Completed:0

};

base.updateData('PremixesTypes/'+premixes[i].sku,dat1);
}
}catch(e){Logger.log(premixes[i].name);}
}
  

  for(var i=0;i<unbranded.length;i++){
if(unbranded[i].Running!=0||unbranded[i].Reserved!=0||unbranded[i].Completed!=0){

  if(!unbranded[i].Reserved){
  unbranded[i].Reserved=0;
  }
  if(!unbranded[i].Completed){
  unbranded[i].Completed=0;
  }
var dat1={
Running:Math.abs(unbranded[i].Reserved)+Math.abs(unbranded[i].Completed),
Reserved:0,
Completed:0

};
var dat1={
Running:0,
Reserved:0,
Completed:0

};

base.updateData('UnbrandedTypes/'+unbranded[i].sku,dat1);
}

}


for(var i=0;i<branded.length;i++){
if(branded[i].Running!=0||branded[i].Reserved!=0||branded[i].Completed!=0){

  if(!branded[i].Reserved){
  branded[i].Reserved=0;
  }
  if(!branded[i].Completed){
  branded[i].Completed=0;
  }
var dat1={
Running:Math.abs(branded[i].Reserved)+Math.abs(branded[i].Completed),
Reserved:0,
Completed:0

};

var dat1={
Running:0,
Reserved:0,
Completed:0

};
base.updateData('BrandedTypes/'+branded[i].sku,dat1);
}

}

for(var i=0;i<misc.length;i++){
if(misc[i].Running!=0||misc[i].Reserved!=0||misc[i].Completed!=0){


  if(!misc[i].Reserved){
  misc[i].Reserved=0;
  }
  if(!misc[i].Completed){
  misc[i].Completed=0;
  }
var dat1={
Running:Math.abs(misc[i].Reserved)+Math.abs(misc[i].Completed),
Reserved:0,
Completed:0

};
var dat1={
Running:0,
Reserved:0,
Completed:0

};
//base.updateData('ALTQTY/Misc/'+misc[i].name,misc[i]);
base.updateData('Misc/'+misc[i].name,dat1);
}

}
for(var i=0;i<BottleTypes.length;i++){
if(BottleTypes[i].Running!=0||BottleTypes[i].Reserved!=0||BottleTypes[i].Completed!=0){
  if(!BottleTypes[i].Reserved){
  BottleTypes[i].Reserved=0;
  }
  if(!BottleTypes[i].Completed){
  BottleTypes[i].Completed=0;
  }
var dat1={
Running:Math.abs(BottleTypes[i].Reserved)+Math.abs(BottleTypes[i].Completed),
Reserved:0,
Completed:0

};
var dat1={
Running:0,
Reserved:0,
Completed:0

};
//base.updateData('ALTQTY/BottleTypes/'+BottleTypes[i].name,BottleTypes[i]);
base.updateData('BottleTypes/'+BottleTypes[i].name,dat1);
}

}
for(var i=0;i<Lids.length;i++){
if(Lids[i].Running!=0||Lids[i].Reserved!=0||Lids[i].Completed!=0){
  if(!Lids[i].Reserved){
  Lids[i].Reserved=0;
  }
  if(!Lids[i].Completed){
  Lids[i].Completed=0;
  }
var dat1={
Running:Math.abs(Lids[i].Reserved)+Math.abs(Lids[i].Completed),
Reserved:0,
Completed:0

};
var dat1={
Running:0,
Reserved:0,
Completed:0

};
//base.updateData('ALTQTY/Lids/'+Lids[i].name,Lids[i]);
base.updateData('Lids/'+Lids[i].name,dat1);
}

}
for(var i=0;i<Packages.length;i++){
if(Packages[i].Running!=0||Packages[i].Reserved!=0||Packages[i].Completed!=0){
  if(!Packages[i].Reserved){
  Packages[i].Reserved=0;
  }
  if(!Packages[i].Completed){
  Packages[i].Completed=0;
  }
var dat1={
Running:Math.abs(Packages[i].Reserved)+Math.abs(Packages[i].Completed),
Reserved:0,
Completed:0

};
var dat1={
Running:0,
Reserved:0,
Completed:0

};
//base.updateData('ALTQTY/Packages/'+Packages[i].name,Packages[i]);
base.updateData('Packages/'+Packages[i].name,dat1);
}

}

for(var i=0;i<Flavours.length;i++){
if(Flavours[i].Running!=0||Flavours[i].Reserved!=0||Flavours[i].Completed!=0){
  if(!Flavours[i].Reserved){
  Flavours[i].Reserved=0;
  }
  if(!Flavours[i].Completed){
  Flavours[i].Completed=0;
  }
var dat1={
Running:Math.abs(Flavours[i].Reserved)+Math.abs(Flavours[i].Completed),
Reserved:0,
Completed:0

};
var dat1={
Running:0,
Reserved:0,
Completed:0

};
//base.updateData('ALTQTY/Flavours/'+Flavours[i].name,Flavours[i]);
base.updateData('Flavours/'+Flavours[i].name,dat1);
}

}

//base.removeData('Orders');


base.removeData('Mixing');
for(var i=0;i<sheets.length;i++){

base.removeData(sheets[i])

}



}

function restoreQTY(){
//var data=getSheetData('ALTQTY');
var data=base.getData('ALTQTY');
base.updateDate()


}
function buildALTQTY() {
var premixes=getSheetData('PremixesTypes');
var unbranded=getSheetData('UnbrandedTypes');
var branded=getSheetData('BrandedTypes');

var misc=getSheetData('Misc');
var BottleTypes=getSheetData('BottleTypes');
var Lids=getSheetData('Lids');
var Packages=getSheetData('Packages');
var Flavours=getSheetData('Flavours');



 

for(var i=0;i<misc.length;i++){
if(misc[i].Running!=0||misc[i].Reserved!=0||misc[i].Completed!=0){

base.updateData('ALTQTY/Misc/'+misc[i].name,misc[i]);
}

}
for(var i=0;i<BottleTypes.length;i++){
if(BottleTypes[i].Running!=0||BottleTypes[i].Reserved!=0||BottleTypes[i].Completed!=0){
var dat1={
Running:0,
Reserved:0,
Completed:0

};
base.updateData('ALTQTY/BottleTypes/'+BottleTypes[i].name,BottleTypes[i]);
}

}
for(var i=0;i<Lids.length;i++){
if(Lids[i].Running!=0||Lids[i].Reserved!=0||Lids[i].Completed!=0){
var dat1={
Running:0,
Reserved:0,
Completed:0

};
base.updateData('ALTQTY/Lids/'+Lids[i].name,Lids[i]);
}

}
for(var i=0;i<Packages.length;i++){
if(Packages[i].Running!=0||Packages[i].Reserved!=0||Packages[i].Completed!=0){
var dat1={
Running:0,
Reserved:0,
Completed:0

};
base.updateData('ALTQTY/Packages/'+Packages[i].name,Packages[i]);
}

}

for(var i=0;i<Flavours.length;i++){
if(Flavours[i].Running!=0||Flavours[i].Reserved!=0||Flavours[i].Completed!=0){
var dat1={
Running:0,
Reserved:0,
Completed:0

};
base.updateData('ALTQTY/Flavours/'+Flavours[i].name,Flavours[i]);
}

}


}
function testfail(){
var row=['BottleTypes','BrandedTypes','Brands','Customers',
'Flavours','Lids','Misc','Orders','Packages','PremixesTypes',
'Recipes','References','UnbrandedTypes','Mixing','MixingTeam',
'Production','Printing','Labelling','Packaging','Shipping','Log'];

var save='{';
  for(var i=0;i<row.length;i++){
    try{
    
    var dat=base.getData(row[i]);
    save += '"' + row[i] + '":' + JSON.stringify(dat) + ',';
    }catch(e){Logger.log("Failed for "+row[i]);}
  }
save+="}";

var upload=JSON.parse(save);

  
}
function savePoint(){

 var LOGDATA={
    status:true,
    msg:'',
    action:'Save',
    batch:'ALL DATA',
    page:'ALL SHEETS',
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
//  databaseURL: "https://master-6a0e4.firebaseio.com/",
var row=['BottleTypes','BrandedTypes','Brands','Customers',
'Flavours','Lids','Misc','Orders','Packages','PremixesTypes',
'Recipes','References','UnbrandedTypes','Mixing','MixingTeam',
'Production','Printing','Labelling','Packaging','Shipping','Log'];

var save='{';
var save2='{';
  for(var i=0;i<row.length;i++){
    try{

    var dat1=base.getData(row[i]);
    if(dat1){
       if(i%2==0){ 
    save += '"' + row[i] + '":' + JSON.stringify(dat1) + ',';
        }else{
    save2 += '"' + row[i] + '":' + JSON.stringify(dat1) + ',';
      }
    }

    }catch(e){Logger.log("Failed for "+row[i]);}
  }
save+="}";
save2+="}";
var upload=JSON.parse(save);
var upload2=JSON.parse(save2);

base.removeData('SAVED');
base.updateData('SAVED',upload);
base.updateData('SAVED',upload2);

logItem(LOGDATA);
return 'Saved.';
}

function restorePoint(){
 var LOGDATA={
    status:true,
    msg:'',
    action:'Restore',
    batch:'ALL DATA',
    page:'ALL SHEETS',
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
  logItem(LOGDATA);
var row=['BottleTypes','BrandedTypes','Brands','Customers',
'Flavours','Lids','Misc','Orders','Packages','PremixesTypes',
'Recipes','References','UnbrandedTypes','Mixing','MixingTeam',
'Production','Printing','Labelling','Packaging','Shipping','Log'];

var save='{';
var save2='{';
  for(var i=0;i<row.length;i++){
    try{

    var dat1=base.getData('SAVED/'+row[i]);
    if(dat1){
       if(i%2==0){ 
    save += '"' + row[i] + '":' + JSON.stringify(dat1) + ',';
        }else{
    save2 += '"' + row[i] + '":' + JSON.stringify(dat1) + ',';
      }
    }

    }catch(e){Logger.log("Failed for "+row[i]);}
  }
save+="}";
save2+="}";
var upload=JSON.parse(save);
var upload2=JSON.parse(save2);

  try{
base.setData('',upload);
base.updateData('',upload2);
base.removeData('SAVED');
base.updateData('SAVED',upload);
base.updateData('SAVED',upload2);
  }catch(e){
    try{
    base.setData('',upload);
    base.updateData('',upload2);
    base.removeData('SAVED');
    base.updateData('SAVED',upload);
    base.updateData('SAVED',upload2);
    
    }catch(e){
      base.updateData('SAVED',upload);
      base.updateData('SAVED',upload2);
      
    }
  }
}
