function createTriggers() {
  ScriptApp.newTrigger("exportCompletedItems")
  .timeBased()
  .atHour(14)
  .everyDays(1) 
  .create();
  
  ScriptApp.newTrigger("exportCompletedItems")
  .timeBased()
  .atHour(20)
  .everyDays(1) 
  .create();
}


function exportCompletedItems(){
var today = new Date();
var day = today.getDay();
if(day>0 && day<6){
var formattedDate = Utilities.formatDate(new Date(), "GMT","dd-MM-yyyy");
var subject = 'Completed items for today';
if(today.getHours() <= 15){
subject+=' 2PM report ';
}else{
subject+=' 8PM report ';
}

var name = subject+' '+formattedDate;
var file = createCompletedExport(today.getHours(),name);
COMPLETED_ITEMS_MAIL.map(function(item){
try{
file.addEditor(item);
}catch(e){
Logger.log(e);
}
MailApp.sendEmail({
    to: item,
    subject: name,
    htmlBody: "<a href='"+file.getUrl()+"'>"+name+"</a> ",
  });
});
} 
}

function testsendEmail(){
var mail ='backoffice2@gbvco.co.uk';
MailApp.sendEmail({
    to: mail,
    subject: "Test EMail2",
    htmlBody: "<a href='#'>NAME</a> ",
  });
}