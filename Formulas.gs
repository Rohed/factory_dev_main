function calcQTY(stocking,numBottles,fill,suffix,cust,suf2){
if(suffix=='S'||suf2=='RU'){
return stocking;

}else{
 

return fill*numBottles/1000;
}

}
function calcNic(nico,QTY){

return nico*QTY/1000;


}
function calcVG(vg,QTY){

return vg*QTY/1000;


}
function calcPG(pg,QTY){
if(!pg){
pg=0;
}
return pg*QTY/1000;


}

function calcFlav(flv,QTY){

return flv*QTY/1000;


}

function getRecipeFVP(recipe){

var vg=recipe.ratio.toString().substr(0,2);
var pg=recipe.ratio.toString().substr(2,4);
if(vg==10){vg='100';pg='00';}
if(recipe.name.match('Nicotine')){
var rec=base.getData('Recipes/'+'VGPG : '+vg+'  '+pg+' Nicotine : '+recipe.nic+'MG');
}else{
var rec=base.getData('Recipes/'+'CBD VGPG : '+vg+'  '+pg+' CBD : '+recipe.cbd+'MG');
}
if(rec){

return [rec.Flavrec,rec.VGrec,rec.PGrec];

}else {Logger.log('Undefined for: '+recipe);}




}
function getRecipeFlav(recipe){

recipe.ratio=recipe.ratio.toString();
var vg=recipe.ratio.toString().substr(0,2);
var pg=recipe.ratio.toString().substr(2,4);
if(vg==10){vg=100;pg='00';}
if(recipe.type=='nic'){
var rec=base.getData('Recipes/'+'VGPG : '+vg+'  '+pg+' Nicotine : '+recipe.nic+'MG');
}else{
var rec=base.getData('Recipes/'+'CBD VGPG : '+vg+'  '+pg+' CBD : '+recipe.cbd+'MG');
}
if(rec){

return rec.Flavrec;

}else {Logger.log('Undefined for: '+recipe);}

}



function getRecipeVG(recipe){

recipe.ratio=recipe.ratio.toString();
var vg=recipe.ratio.toString().substr(0,2);
var pg=recipe.ratio.toString().substr(2,4);
if(vg==10){vg=100;pg='00';}
if(recipe.type=='nic'){
var rec=base.getData('Recipes/'+'VGPG : '+vg+'  '+pg+' Nicotine : '+recipe.nic+'MG');
}else{
var rec=base.getData('Recipes/'+'CBD VGPG : '+vg+'  '+pg+' CBD : '+recipe.cbd+'MG');
}
if(rec){

return rec.VGrec;

}else {Logger.log('Undefined for: '+'VGPG : '+vg+'  '+pg+' Nicotine : '+recipe.nic+'MG');}


}

function getRecipePG(recipe){
recipe.ratio=recipe.ratio.toString();
var vg=recipe.ratio.toString().substr(0,2);
var pg=recipe.ratio.toString().substr(2,4);
if(vg==10){vg=100;pg='00';}
if(recipe.type=='nic'){
var rec=base.getData('Recipes/'+'VGPG : '+vg+'  '+pg+' Nicotine : '+recipe.nic+'MG');
}else{
var rec=base.getData('Recipes/'+'CBD VGPG : '+vg+'  '+pg+' CBD : '+recipe.cbd+'MG');
}
if(rec){

return rec.PGrec;
  }else {Logger.log('Undefined for: '+'VGPG : '+vg+'  '+pg+' Nicotine : '+recipe.nic+'MG');}


}

function getRecipeNic(recipe){

recipe.ratio=recipe.ratio.toString();
var vg=recipe.ratio.toString().substr(0,2);
var pg=recipe.ratio.toString().substr(2,4);
if(vg==10||vg=='10'){vg=100;pg='00';}

var rec=base.getData('Recipes/'+'VGPG : '+vg+'  '+pg+' Nicotine : '+recipe.nic+'MG');

if(rec){

return rec.Nicorec;

  }else {Logger.log('Undefined for: '+'VGPG : '+vg+'  '+pg+' Nicotine : '+recipe.nic+'MG');}
  
  
  

}
function getRecipeCBD(recipe){

recipe.ratio=recipe.ratio.toString();
var vg=recipe.ratio.toString().substr(0,2);
var pg=recipe.ratio.toString().substr(2,4);
if(vg==10){vg=100;pg='00';}
var rec=base.getData('Recipes/'+'CBD VGPG : '+vg+'  '+pg+' CBD : '+recipe.cbd+'MG');
if(rec){

return rec.cbdrec;


  }else {Logger.log('Undefined for: '+'CBD VGPG : '+vg+'  '+pg+' CBD : '+recipe.cbd+'MG');}
}


function getRecipe(recipeID){

var item=base.getData('Recipes/'+recipeID);
return item;
}