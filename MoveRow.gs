function moveUp(sheet,batch){
 var LOGDATA={
    status:true,
    msg:'',
    action:'Move Up',
    batch:batch,
    page:sheet,
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };

if(sheet=='MixingTeam'){


  var data=getSheetData(sheet);

var order=base.getData(sheet+'/'+batch);
  
var current=order.row;
  
var next=current-1;

var nextRow=data[next-1];
var updateNext={
row:current
};
base.updateData(sheet+'/'+nextRow.MIXNAME,updateNext)
var update={
row:next,
userset:true
};
base.updateData(sheet+'/'+batch,update)  





}else{
var data=getSheetData(sheet);

var order=base.getData(sheet+'/'+batch);
 
var current=order.row;
  
var next=current-1;

var nextRow=data[next-1];
var updateNext={
row:current
};
base.updateData(sheet+'/'+nextRow.batch,updateNext)
var update={
row:next,
userset:true
};
base.updateData(sheet+'/'+batch,update)  
}
logItem(LOGDATA);
return sheet;
}


function moveDown(sheet,batch) {
 var LOGDATA={
    status:true,
    msg:'',
    action:'Move Down',
    batch:batch,
    page:sheet,
    user:Session.getActiveUser().getEmail(),
    data:new Array()
  };
if(sheet=='MixingTeam'){


  var data=getSheetData(sheet);

var order=base.getData(sheet+'/'+batch);
  
var current=order.row;
  
var next=current+1;

var nextRow=data[next-1];
var updateNext={
row:current
};
base.updateData(sheet+'/'+nextRow.MIXNAME,updateNext)
var update={
row:next,
userset:true
};
base.updateData(sheet+'/'+batch,update)  





}else{
  var data=getSheetData(sheet);

var order=base.getData(sheet+'/'+batch);
  
var current=order.row;
  
var next=current+1;

var nextRow=data[next-1];
var updateNext={
row:current
};
base.updateData(sheet+'/'+nextRow.batch,updateNext)
var update={
row:next,
userset:true
};
base.updateData(sheet+'/'+batch,update)  
}
logItem(LOGDATA);
return sheet;
}

  
  
