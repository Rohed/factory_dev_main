function saveItem(data) {


    var LOGDATA = {
        status: true,
        msg: '',
        action: 'Inventory Item',
        batch: data.desc + " " + data.orderdate + " " + data.quantity,
        page: 'Inventory',
        user: Session.getActiveUser().getEmail(),
        data: new Array()
    };
    var msg = '';
    try {
    if (data.delivdate) {
        data.delivdate=new Date(data.delivdate).getTime();
      }
      if (data.orderdate) {
        data.orderdate=new Date(data.orderdate).getTime();
      }
      if (data.paiddate) {
        data.paiddate=new Date(data.paiddate).getTime();
      }
   
          if (data.page == 'Misc') {
           var QTYitem = base.getData(data.page + '/' + data.desc);
        } else {
           
              var QTYitem = base.getData(data.page + '/' + data.sku);
        }
      if (!QTYitem.Stock) {
        QTYitem.Stock = 0;
      }
        if(data.key != 'undefined'){
         var olddat=base.getData('Inventory/' + data.key);
           if (data.delivdate&& (olddat.quantity!=data.quantity)) {
                LOGDATA.data.push(['Added to Stock:', data.quantity]);
                QTYitem.Stock = QTYitem.Stock - data.quantity;
                QTYitem.Running += data.quantity;
               QTYitem.Stock = QTYitem.Stock + olddat.quantity;
               QTYitem.Running -= olddat.quantity;
                data.addedtoQTY = 'Added';
                data.row = olddat.row;
                data.name = data.desc + " " + data.orderdate + " " + data.quantity;
                base.removeData('Inventory/' + data.key);
                base.updateData('Inventory/' + data.key, data);
                if (data.page == 'Misc') {
                   base.updateData(data.page + '/' + data.desc, QTYitem); 
                } else {
                    base.updateData(data.page + '/' + data.sku, QTYitem);
                }
                logItem(LOGDATA);
                return data.name+" saved and added to QTY Running.";
            }else if(olddat.delivdate!=data.delivdate){
                LOGDATA.data.push(['Added to Stock:', data.quantity]);
                QTYitem.Stock = QTYitem.Stock - data.quantity;
                QTYitem.Running += data.quantity;
                data.addedtoQTY = 'Added';
                data.row = olddat.row;
                data.name = data.desc + " " + data.orderdate + " " + data.quantity;
                base.removeData('Inventory/' + data.key);
                base.updateData('Inventory/' + data.key, data);
                if (data.page == 'Misc') {
                   base.updateData(data.page + '/' + data.desc, QTYitem); 
                } else {
                    base.updateData(data.page + '/' + data.sku, QTYitem);
                }
                logItem(LOGDATA);
                return data.name+" saved and added to QTY Running.";
            }
            LOGDATA.data.push(['Item Edited:', data.quantity]);
            data.row = olddat.row;
            data.name = data.desc + " " + data.orderdate + " " + data.quantity;
            base.removeData('Inventory/' + data.key);
            base.updateData('Inventory/' + data.key, data);
            logItem(LOGDATA);
            return "Item Edited.";
    
        }else{
            data.key = new Date().getTime().toString();
            var inventory = base.getData('Inventory');

            if (inventory) {
                var result = Object.keys(inventory).map(function(key) {
                    return [Number(key), inventory[key]];
                });
                var Rows = [];
                for (var i = 0; i < result.length; i++) {
                    Rows.push(result[i][1].row);
                }
                var max = Rows.reduce(function(a, b) {
                    return Math.max(a, b);
                });
            } else {
                var max = 0;
            }

            if (data.delivdate) {
                LOGDATA.data.push(['Added to Stock:', data.quantity]);
                QTYitem.Running += data.quantity;
                data.addedtoQTY = 'Added';
                data.name = data.desc + " " + data.orderdate + " " + data.quantity;
                data.row = max + 1;
                base.updateData('Inventory/' + data.key, data);
                if (data.page == 'Misc') {
                   base.updateData(data.page + '/' + data.desc, QTYitem); 
                } else {
                    base.updateData(data.page + '/' + data.sku, QTYitem);
                }
                logItem(LOGDATA);
                return data.name+" saved and added to QTY Running.";
            } else {
                LOGDATA.data.push(['Added to Stock:', data.quantity]);
                  QTYitem.Stock = QTYitem.Stock? QTYitem.Stock : 0;
                QTYitem.Stock = QTYitem.Stock + data.quantity;
                data.name = data.desc + " " + data.orderdate + " " + data.quantity;
                data.row = max + 1;
                base.updateData('Inventory/' + data.key, data);

                if (data.page == 'Misc') {
            base.updateData(data.page + '/' + data.desc, QTYitem);
                } else {
          base.updateData(data.page + '/' + data.sku, QTYitem);
                    
                }
                logItem(LOGDATA);
                return data.name+" saved and added to QTY Stock.";

            }


        }
    } catch (e) {
    LOGDATA.status=false;
      LOGDATA.data.push(['Failed:', e.message]);
      logItem(LOGDATA);
        return e.message;
    }


}

function getInventoryData() {

    var data = base.getData('Inventory');
    if (data) {
        var result = Object.keys(data).map(function(key) {
            return [Number(key), data[key]];
        });

        var retArr = [];
        for (var i = 0; i < result.length; i++) {
            retArr.push(result[i][1]);

        }
        retArr.sort(function(a, b) {
            return (a.row) - (b.row)
        });
        return retArr;
    } else {
        return [];
    }
}

function removefromInventory(identif,page){
try{

base.removeData('Inventory/'+identif);


return "Item "+identif+" Removed";
}catch(e){
return e.message;
}

}

function removefromOrders(batch){
try{
base.removeData('Orders/'+batch);
return "Batch "+batch+" Removed";
}catch(e){
return e.message;
}

}

function getItemData(item){
var oldData=base.getData('Inventory/'+item);
var data=getInventoryDescription();

return [data,oldData];




}