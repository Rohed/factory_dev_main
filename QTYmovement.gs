function fromRunningtoReserved(item, value){

var orig1=base.getData(item);

orig1.Running= orig1.Running-value;
orig1.Reserved= orig1.Reserved+value;

base.updateData(item,orig1);

if(orig1.Running>=0){
return 1;
}else{
return orig1.Running;
}
}



function fromReservedtoCompleted(item, value){

var orig1=base.getData(item);

orig1.Reserved= orig1.Reserved-value;
orig1.Completed= orig1.Completed+value;

base.updateData(item,orig1);

}


function toRunning(page,value){
  
  
  var orig =base.getData(page);
  orig.Running= orig.Running+value;
  
  base.updateData(page,orig);
  
}

//Premix move
function PtoRunning(batch,value){


        var orig =base.getData('PremixesTypes/'+batch);
        orig.Running+=value;
        base.updateData('PremixesTypes/'+batch,orig);
     
}


function PtoReserved(batch,value){

        var orig =base.getData('PremixesTypes/'+batch);
        orig.Running-=value;
        orig.Reserved+=value;
   
        base.updateData('PremixesTypes/'+batch,orig);

}


function PtoComplete(batch,value){

               var orig =base.getData('PremixesTypes/'+batch);
        orig.Reserved-=value;
        orig.Completed+=value;
   
        base.updateData('PremixesTypes/'+batch,orig);


}


//Unbranded Move
function UtoRunning(batch,value){
        var orig =base.getData('UnbrandedTypes/'+batch);
        orig.Running+=value;
        base.updateData('UnbrandedTypes/'+batch,orig);
     
}



function UtoReserved(batch,value){
         var orig =base.getData('UnbrandedTypes/'+batch);
        orig.Running-=value;
        orig.Reserved+=value;
        base.updateData('UnbrandedTypes/'+batch,orig);
     

}


function UtoComplete(batch,value){
      var orig =base.getData('UnbrandedTypes/'+batch);
        orig.Reserved-=value;
        orig.Completed+=value;
        base.updateData('UnbrandedTypes/'+batch,orig);
     
}


function BtoRunning(batch,value){
        var orig =base.getData('BrandedTypes/'+batch);
        if(orig){
        orig.Running+=value;
        }else{
         orig.Running=value;
        }
        base.updateData('BrandedTypes/'+batch,orig);
     
}

function BtoReserved(batch,value){
  var orig =base.getData('BrandedTypes/'+batch);
  
  orig.Running-=value;
  
  orig.Reserved+=value;
  
  base.updateData('BrandedTypes/'+batch,orig);
}


function BtoComplete(batch,value){
    var orig =base.getData('BrandedTypes/'+batch);
  
  orig.Reserved-=value;
  
  orig.Completed+=value;
  
  base.updateData('BrandedTypes/'+batch,orig);
}




function BtoRunningX(batch,value){

        var orig =base.getData('BrandedTypes/'+batch);
        if(orig){
        orig.Running+=value;
        }else{
         orig.Running=value;
        }
        base.updateData('BrandedTypes/'+batch,orig);
     
}



function BtoCompleteX(batch,value){

     var orig =base.getData('BrandedTypes/'+batch);
  
  orig.Reserved-=value;
  
  orig.Completed+=value;
  
  base.updateData('BrandedTypes/'+batch,orig);
}





function fromReservedToRunning(batch,value){

var orig1=base.getData(batch);
orig1.Running+=value;
orig1.Reserved-=value;

base.updateData(batch,orig1);


}


function fromCompletedToRunning(batch,value){

var orig1=base.getData(batch);
orig1.Running+=value;
orig1.Completed-=value;

base.updateData(batch,orig1);


}
function removeFromRunning(batch,value){

var orig1=base.getData(batch);

orig1.Running-=value;
base.updateData(batch,orig1);

}

function removeFromReserved(batch,value){

var orig1=base.getData(batch);

orig1.Reserved-=value;
base.updateData(batch,orig1);

}