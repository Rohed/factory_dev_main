function getPackagingData(packagingType,bottles,boxsku) {
Logger.log(packagingType);
var botperPack;
var ink;
var boxname;
var divTubesForBox;


var divBottlesBy;
if(packagingType===undefined){

 var item={
 botperPack:false,
 ink:0,
 boxname:false,
 divTubesForBox:0,

 divBottlesBy:1,
 
 };
 
 

}else{
if(packagingType.sku){
  var item=base.getData('Packages/'+packagingType.sku);
 }else{
 item=false;
 }
  if(item){
  item.ink=(bottles/item.botperPack)*item.ink;

  if(boxsku){
   item.divTubesForBox=base.getData('Boxes/'+boxsku+'/divTubesForBox');
   }else{
   item.divTubesForBox=0;
   }
   
 }else{
 
 item={
 botperPack:false,
 ink:0,
 boxname:false,
 divTubesForBox:0,


 divBottlesBy:1,
 
 }
 
 
 }
 
 }
  return item;
}

function getPackagingData2(packagingType) {
var botperPack;
var ink;
var boxname;
var divTubesForBox;
var tubelabel;
var botlabel;
var divBottlesBy;

  if (packagingType == 'peel and reveal') {
    tubelabel='Labels peel and reveal';
    boxname= "25product boxes";
    divTubesForBox= 25;
    ink=0;
    botperPack=1;

  } else if (packagingType =='1product pack') {
    tubelabel='Labels 1product pack';
    boxname= "10product boxes";
    divTubesForBox= 10;
    ink=0;   
    botperPack=1;
  } else if (packagingType =='1product Tube') {
    tubelabel='Labels 1product Tube';
    boxname= "10product boxes";
    divTubesForBox= 10;
    ink=0.002;  
    botperPack=1;
  } else if (packagingType =='1product card tube') {
    tubelabel='';
    boxname= "10product boxes";
    divTubesForBox= 10;
    ink=0;
    botperPack=1;
  } else if (packagingType =='3product Tube') {
    tubelabel='Labels 3product Tube';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0.003;
    botperPack=3;
  } else if (packagingType =='3product pack') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox= 15;
    ink=0;
    botperPack=3;
  }  else if (packagingType =='3product card tube') {
    tubelabel='Labels 3product Tube';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0.003;
    botperPack=3;    
  }  else if (packagingType =='4product pack') {
    tubelabel='';
    boxname= "16product boxes";
    divTubesForBox=16;
    ink=0; 
    botperPack=4;
  }  else if (packagingType =='Box 3x10ml EG E Fizz Sparkling Blackcurrant Lemonade 7030 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0;
    botperPack=3;
  }  else if (packagingType =='Box 3x10ml EG E Fizz Sparkling Champers 8020 3mg') {
    tubelabel='';
    boxname= "";
    divTubesForBox=15;
    ink=0; 
    botperPack=3;
  } else if (packagingType =='Box 3x10ml EG E Fizz Sparkling Grape 8020 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG E Fizz Sparkling Grape 8020 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG E Fizz Sparkling Ice Orange 7030 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG E Fizz Sparkling Icy Mango 7030 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Tornado Pro Polar Storm Ice Mint 9010 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Tornado Pro Red Hurricane Cherry Cola 9010 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Tornado Pro Strawberry Twist Strawberry Kiwi 9010 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Tornado Pro Thunderberry Blast Mixed Berry 9010 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Tornado Pro Tropical Storm Mango Passionfruit 9010 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Vice Vapour Brain Freeze Hunter Blue Menthol Walter 7030 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Vice Vapour Dane of Pain Jane Red Menthol Top Hat 7030 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Vice Vapour Doctor Terror Trevor Ice Cool Grape 7030 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Vice Vapour Rampage Savage Mike Apple Slush 7030 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Box 3x10ml EG Vice Vapour Strip Maul Tara Pink Fruit Cap n Cook 7030 3mg') {
    tubelabel='';
    boxname= "15product boxes";
    divTubesForBox=15;
    ink=0; 
    botperPack=3; 
  }else if (packagingType =='Cylinder - 250ml PET Bottle') {
    tubelabel='';
    boxname= "";
    divTubesForBox=2;
    ink=0; 
    botperPack=6; 
  }else if (packagingType =='White Box 10') {
    tubelabel='';
    boxname= "";
    divTubesForBox=15;
    ink=0; 
    botperPack=10; 
  }else if (packagingType =='tbc') {
    tubelabel='';
    boxname= "";
    divTubesForBox=15;
    ink=0; 
    botperPack=1; 
  }else{
     tubelabel='';
    boxname= "";
    divTubesForBox=0;
    ink=0; 
    botperPack=0; 
  }
  
  var obj={
  tubelabel:tubelabel,
  boxname:boxname,
  divTubesForBox:divTubesForBox,
  ink:ink,
  botperPack:botperPack
  };
  
  return obj;
}
function getPackaging(name){

  if (name=='Box - 10ml') {
    var packagingType = '1product pack';
    var packaging = 1;
  } else if (name=='Box - 3 x 10ml') {
    var packagingType = '3product pack';
    var packaging = 3;
  } else if (name=='Box - 3 x 10ml (EG)') {
    var packagingType = '3product pack';
    var packaging = 3;
  } else if (name=='Cylinder - 250ml PET Bottle') {
    var packagingType = 'Cylinder - 250ml PET Bottle';
    var packaging = 6;
  } else if (name=='Box - 4 x 10ml') {
    var packagingType = '4product pack';
    var packaging = 4;
  } else if (name=='Cylinder (Plastic) - Small') {
    var packagingType = '1product Tube';
    var packaging = 1;
  } else if (name=='Cylinder (Plastic) - Large') {
    var packagingType = '3product Tube';
    var packaging = 1;
  }  else if (name=='Cylinder - Small') {
    var packagingType = '1product Tube';
    var packaging = 1;
  } else if (name=='Cylinder - Large') {
    var packagingType = '3product Tube';
    var packaging = 3;
  } else if (name=='Cylinder (Cardboard) - Small') {
    var packagingType = '1product card tube';
    var packaging = 1;
  }else if (name=='Cylinder (Cardboard) - Large') {
    var packagingType = '3product card tube';
    var packaging = 1;
  } else if (name=='Black Box - 25') {
    var packagingType = 'peel and reveal';
    var packaging = 1;
  } else if(name=='White Box - 10') {
    var packagingType = 'White Box 10';
    var packaging = 10;
  }else if(name=='Peel & Reveal') {
    var packagingType = 'peel and reveal';
    var packaging = 1;
  }else if(name=='tbc') {
    var packagingType = 'tbc';
    var packaging = 1;
  }else if(name==''||name==0) {
    var packagingType = '';
    var packaging = '';
  }else{
    var packagingType = name.replace(/\//,'');
    var packaging = 3;

  }
  var packdata={
  packagingType:packagingType,
  packaging:packaging
  }
return packdata;
}
/*
1product Tube/
 1product card tube/
 1product pack/
 3product Tube/
 3product card tube/
 3product pack/
 4product pack/
 Box 3x10ml EG E Fizz Sparkling Blackcurrant Lemonade 7030 3mg/
 Box 3x10ml EG E Fizz Sparkling Champers 8020 3mg/
 Box 3x10ml EG E Fizz Sparkling Grape 8020 3mg /
 Box 3x10ml EG E Fizz Sparkling Ice Orange 7030 3mg/
 Box 3x10ml EG E Fizz Sparkling Icy Mango 7030 3mg/
 Box 3x10ml EG Tornado Pro Polar Storm Ice Mint 9010 3mg/
 Box 3x10ml EG Tornado Pro Red Hurricane Cherry Cola 9010 3mg/
 Box 3x10ml EG Tornado Pro Strawberry Twist Strawberry Kiwi 9010 3mg/
 Box 3x10ml EG Tornado Pro Thunderberry Blast Mixed Berry 9010 3mg/
 Box 3x10ml EG Tornado Pro Tropical Storm Mango Passionfruit 9010 3mg/
 Box 3x10ml EG Vice Vapour Brain Freeze Hunter Blue Menthol Walter 7030 3mg/
 Box 3x10ml EG Vice Vapour Dane of Pain Jane Red Menthol Top Hat 7030 3mg/
 Box 3x10ml EG Vice Vapour Doctor Terror Trevor Ice Cool Grape 7030 3mg/
 Box 3x10ml EG Vice Vapour Rampage Savage Mike Apple Slush 7030 3mg/
 Box 3x10ml EG Vice Vapour Strip Maul Tara Pink Fruit Cap n Cook 7030 3mg/
 White Box 10/
 peel and reveal/
 tbc

*/