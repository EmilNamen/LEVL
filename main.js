/**
 * Created by emilnamen on 12/1/15.
 */

var app = angular.module('LEVL',['restangular','ngFileUpload']);
app.config(["RestangularProvider",function(RestangularProvider){
    RestangularProvider.setRestangularFields({
        id: "_id"
    });
    RestangularProvider.setBaseUrl('http://masa.stratigeek.com:3000/api/');

}]);
app.controller('retrieve1', retrieve1);
app.controller('retrieve2', retrieve2);
app.controller('retrieve3', retrieve3);
app.controller('retrieve4', retrieve4);
app.controller('retrieve5', retrieve5);
app.controller('retrieve6', retrieve6);
app.controller('retrieve7', retrieve7);
app.controller('put1',put1);
app.controller('put2',put2);
app.controller('put3',put3);
app.controller('put4',put4);

// CONTROLLER HEADER
app.controller('TabController', function($scope){

    if(!localStorage.getItem('activeTab')){
        localStorage.setItem('activeTab','1');
    }

    var num = parseInt(localStorage.getItem('activeTab'));

    $scope.tab = num;


    $scope.setTab = function(tab){
        $scope.tab = tab;
    };

    $scope.isSet = function(tab){
        return ($scope.tab === tab);
    };
});

// CONTROLLER HOME
function retrieve1(Restangular, $scope){


    var resource = Restangular.all('items');
    resource.getList().then(function(items){
        $scope.items = items;
    });



    var resource2 = Restangular.all('transactions');
    resource2.getList().then(function(transactions){

        $scope.transaction = {};
        $scope.transaction.item = transactions[0].item;


        $scope.transactions = transactions;


        $scope.graphSubmitForm = function() {

            //alert(_.filter($scope.transactions,function(trans){return trans.item.localeCompare($scope.transaction.item)==0}));

            if( $scope.transaction.item.localeCompare('undefined') === 0 &&  $scope.transaction.item != null);
            {
                var dps = [];
                var acumQuantity = 0;
                var transactionsItem = [];
                transactions.forEach( function( transaction ) {

                    if(transaction.item === $scope.transaction.item){

                        transactionsItem.push(transaction);

                        var transactionDate = new Date(transaction.date);
                        transactionDate = transactionDate.getTime();
                        acumQuantity = acumQuantity + transaction.quantity;

                        var itemAct = { "x": transactionDate, "y" :acumQuantity};
                        dps.push(itemAct);
                    }
                });

                $scope.transactions = transactionsItem;


                createChart(dps, $scope.getNameItemByID($scope.transaction.item));


            }
        };
    });



    $scope.getNameItemByID = function(id){

        if (id) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == id) {
                    return $scope.items[k].name;
                }
            }
        }


    };


}

function createChart(data, nameChart){

    var chart = new CanvasJS.Chart("chartContainer",
        {
            title:{
                text: nameChart
            },
            axisX:{
                gridThickness: 2
            },
            axisY: {
                title: "Cantidad Total "
            },

            data: [
                {
                    type: "area",
                    xValueType: "dateTime",
                    dataPoints: data

                }
            ]
        });
    chart.render();
}

// CONTROLLER NUEVO INSUMO
function put1(Restangular, $scope){

    var resourceInsumo = Restangular.all('items');
    $scope.item = {};
    // calling our submit function.
    $scope.ingresarInsumo =  function(insumo){
        resourceInsumo.post(insumo).then(function(data) {
            //interprete save result
            alert("saved");
            reloadPage();
        });
    };

    var resource2 = Restangular.all('providers');
    resource2.getList().then(function(providers){
        $scope.providers = providers;
    });


}

// CONTROLLER INGRESAR COMPRA
function put2(Restangular, $scope){

    var resource = Restangular.all('items');
    resource.getList().then(function(items){
        $scope.items = items;
    });

    var resourceTransactions = Restangular.all('transactions');
    resourceTransactions.getList().then(function(transactions){
        $scope.transactions = transactions;
    });


    var resource2 = Restangular.all('providers');
    resource2.getList().then(function(providers){
        $scope.providers = providers;
    });

    $scope.transaction = {};

    $scope.ingresarCompra = function(transaction){

        // calling our submit function
        $scope.transaction.date = new Date();
        resourceTransactions.post(transaction).then(function(data) {
            //interprete save result
            alert("saved");
            reloadPage();
        });
    };

    $scope.getUnitsByID= function(element){

        if (element) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == element) {
                    return $scope.items[k].units;
                }
            }
        }
    };


}

// CONTROLLER REVISAR INVENTARIO
function retrieve2(Restangular, $scope){

    var resource = Restangular.all('items');
    resource.getList().then(function(items){
        $scope.items = items;

        items.forEach( function( item ) {
            var resource2 = Restangular.all('inventory/currentStock/'+'?item='+item._id+'&date='+new Date());
            resource2.getList().then(function(currents){
                item.currentStock = currents;
            });
        });

        $scope.item = {};

    });

    $scope.removeRowItem = function(element){

        Restangular.one("/items/delete",element._id).remove().then(function(){

            var index = $scope.items.indexOf(element);
            if (index > -1) $scope.items.splice(index, 1);

        });

    };


    $scope.actualItemEdit = "";

    $scope.addItemEdit =  function (item){
        $scope.actualItemEdit = item;
    };

    $scope.editItem =  function(){

        delete $scope.actualItemEdit.__v;
        delete $scope.actualItemEdit.route;
        delete $scope.actualItemEdit.parentResource;
        delete $scope.actualItemEdit.restangularCollection;
        delete $scope.actualItemEdit.$$hashKey;

        alert(JSON.stringify($scope.actualItemEdit));

        Restangular.one("items/update/"+$scope.actualItemEdit._id).customPUT($scope.actualItemEdit).then(function(data){
            alert("edited");
        });
    }



}

// CONTROLLER INGRESAR PRODUCTO
function put3(Restangular, $scope){

    var resource = Restangular.all('items');
    resource.getList().then(function(items){
        $scope.items = items;
    });

    var resource2 = Restangular.all('plates');

    $scope.platesTEMP = {};
    $scope.platesTEMP.ingredients = [];
    $scope.platesTEMP.ingredientsQuantity = [];

    $scope.plate = {};
    $scope.plate.ingredients=[];
    $scope.plate.ingredientsQuantity=[];
    $scope.iterator = 0;


    $scope.ingresarProducto = function() {

        console.log('want to send');

        resource2.post($scope.plate).then(function(data) {
            //interprete save result
            alert("saved");
            reloadPage();
        });



    };

    $scope.getNameByID= function(id){
        if (id) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == id) {
                    return $scope.items[k].name;
                }
            }
        }
    };

    $scope.getUnitsByID= function(element){
        if (element) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == element) {
                    return $scope.items[k].units;
                }
            }
        }
    };


    $scope.addRow = function(){
        $scope.platesTEMP.ingredients.push($scope.plate.ingredients[$scope.iterator]);
        $scope.platesTEMP.ingredientsQuantity.push($scope.plate.ingredientsQuantity[$scope.iterator]);
        $scope.iterator++;

    };
    $scope.removeRow = function(name){
        var index = -1;
        var comArr = eval( $scope.platesTEMP );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].name === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.platesTEMP.splice( index, 1 );
    };
}

// CONTROLLER NUEVO PROVEEDOR
function put4(Restangular, $scope){

    var resource = Restangular.all('providers');
    $scope.provider = {};
    // calling our submit function.
    $scope.ingresarProveedor = function(provider) {
        resource.post(provider).then(function(data) {
            //interprete save result
            alert("saved");
            reloadPage();
        });
    };
}

// CONTROLLER REVISAR PRODUCTOS
function retrieve3(Restangular, $scope){

    var resource = Restangular.all('items');
    resource.getList().then(function(items){
        $scope.items = items;
    });

    var resource2 = Restangular.all('plates');
    resource2.getList().then(function(plates){
        $scope.plates = plates;
    });

    $scope.getNameByID= function(id){
        for (var k = 0; k < $scope.items.length; ++k)
        {
            if($scope.items[k]._id == id){
                return $scope.items[k].name;
            }
        }
    }
    $scope.deleteProduct = function(element){

        Restangular.one("plates/delete",element._id).remove().then(function(){

            alert("DELETED: "+element.name);
            $scope.selectedPlate = $scope.plates[0];

            reloadPage();
        });

    };


    $scope.getUnitsByID= function(element){
        if (element) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == element) {
                    return $scope.items[k].units;
                }
            }
        }
    };

    $scope.removeRowProduct = function(itemPlate,plate){


        delete plate.__v;
        delete plate.route;
        delete plate.parentResource;
        delete plate.restangularCollection;
        delete plate.$$hashKey;

        for(var i= 0; i<plate.ingredients.length; i++){
            if(plate.ingredients[i].localeCompare(itemPlate)==0){
                plate.ingredients.splice(i,1);
            }
        }
        Restangular.one("plates/update/"+plate._id).customPUT(plate).then(function() {

            alert("EDITED: " + plate.name);
            reloadPage();
        });

    };

    $scope.addItemProduct =  function(){

    };

    $scope.addRow = function(){
        $scope.selectedPlate.ingredients.push($scope.selectedPlate.ingredients[$scope.iterator]);
        $scope.selectedPlate.ingredientsQuantity.push($scope.selectedPlate.ingredientsQuantity[$scope.iterator]);
        $scope.iterator++;

    };
    $scope.removeRow = function(itemPlate,plate){

        delete plate.__v;
        delete plate.route;
        delete plate.parentResource;
        delete plate.restangularCollection;
        delete plate.$$hashKey;

        for(var i= 0; i<plate.ingredients.length; i++){
            if(plate.ingredients[i].localeCompare(itemPlate)==0){
                plate.ingredients.splice(i,1);
            }
        }
        Restangular.one("plates/update/"+plate._id).customPUT(plate).then(function() {

            alert("EDITED: " + plate.name);
        });
    };

    $scope.updateProductModalWindow = function(plate){
        Restangular.one("plates/update/"+plate._id).customPUT(plate).then(function() {

            alert("EDITED: " + plate.name);
            reloadPage();
        });

    };

}

// CONTROLLER REVISAR PROVEEDORES
function retrieve4(Restangular, $scope){


    var resource2 = Restangular.all('providers');
    resource2.getList().then(function(providers){
        $scope.providers = providers;
    });


    $scope.removeRow = function(element){

        Restangular.one("/providers/delete",element._id).remove().then(function(){

            var index = $scope.providers.indexOf(element);
            if (index > -1) $scope.providers.splice(index, 1);

        });

    };


    $scope.actualProviderEdit = "";

    $scope.addProviderEdit =  function (provider){
        $scope.actualProviderEdit = provider;
    };

    $scope.editProvider =  function(){

        delete $scope.actualProviderEdit.__v;
        delete $scope.actualProviderEdit.route;
        delete $scope.actualProviderEdit.parentResource;
        delete $scope.actualProviderEdit.restangularCollection;
        delete $scope.actualProviderEdit.$$hashKey;

        Restangular.one("providers/update/"+$scope.actualProviderEdit._id).customPUT($scope.actualProviderEdit).then(function(data){

            alert("edited");

        });
    }


}

// CONTROLLER REVISAR TABLA INVENTARIO
function retrieve5(Restangular, $scope){

    var resource2 = Restangular.all('inventory/inventoryTable');
    resource2.getList().then(function(rowsInventoryTable){
        $scope.rowsInventoryTable = rowsInventoryTable;

        rowsInventoryTable.forEach( function( item ) {

            var resource3 = Restangular.all('inventory/currentStock'+'?item='+item[1]+'&date='+new Date());
            resource3.getList().then(function(currents){
                item[4] = currents;
            });
        });

        $scope.rowsInventoryTable = rowsInventoryTable;

    });

    $scope.element = {};

    $scope.sendDatesTableInventario =  function(){

        if(startDateAsObject) var start = startDateAsObject;
        if(endDateAsObject){
            var end = endDateAsObject;
        }
        else{
            var end = new Date();
        }


        var query = 'inventory/inventoryTable';
        var query2 = '';

        if(start && end) query += '?startDate='+start+'&endDate='+end;

        var resource2 = Restangular.all(query);
        resource2.getList().then(function(rowsInventoryTable){
            $scope.rowsInventoryTable = rowsInventoryTable;

            rowsInventoryTable.forEach( function( item ) {
                query2 = 'inventory/currentStock'+'?item='+item[1]+'&date='+end;
                var resource3 = Restangular.all(query2);
                resource3.getList().then(function(currents){
                    item[4] = currents;
                });
            });


            $scope.rowsInventoryTable = rowsInventoryTable;

        });


    };
    //$scope.removeRow = function(element){
    //
    //    Restangular.one("/providers/delete",element._id).remove().then(function(){
    //
    //        var index = $scope.providers.indexOf(element);
    //        if (index > -1) $scope.providers.splice(index, 1);
    //
    //    });
    //
    //};
}


// CONTROLLER AJUSTAR TABLA INVENTARIO
function retrieve6(Restangular, $scope){

    var resource2 = Restangular.all('inventory/inventoryTable');

    resource2.getList().then(function(rowsInventoryTable){
        $scope.rowsiInventoryTable = rowsInventoryTable;

        rowsInventoryTable.forEach( function( item ) {

            Restangular.all('inventory/currentStock?item='+item[1]+'&date='+new Date()).getList().then(function(currentstock){

                item[4] = currentstock;
                item[5] = currentstock;
            });

        });

        $scope.rowsiInventoryTable = rowsInventoryTable;

    });

    var resourceTransaction = Restangular.all('transactions');
    resourceTransaction.getList().then(function(transactions){
        $scope.transactions = transactions;
    });

    $scope.transaction = {};

    $scope.ajustar = function(){

        $scope.rowsiInventoryTable.forEach(function(row){

            var dif =  row[5]-row[4];

            if(dif!=0){
                $scope.transaction.item = row[1];
                $scope.transaction.quantity = dif;
                $scope.transaction.description = "***AJUSTE INVENTARIO  "+new Date().toISOString().slice(0, 10);
                $scope.transaction.date = new Date();
                alert(JSON.stringify($scope.transaction));
                resourceTransaction.post($scope.transaction).then(function(data){
                    alert("ajustado");
                    reloadPage();
                });
            }

        });

        //alert($scope.rowsiInventoryTable);

        // calling our submit function
        //$scope.transaction.date = new Date();
        //resourceTransactions.post(transaction).then(function(data) {
        //interprete save result
        //alert("saved");
        //reloadPage();
        //});
    };
}


// CONTROLLER REVISAR ACTIVIDADES FILTRO
function retrieve7(Restangular, $scope){

    var resource = Restangular.all('providers');
    resource.getList().then(function(providers){
        $scope.providers = providers;
    });

    var resource2 = Restangular.all('transactions');
    resource2.getList().then(function(transactions){
        $scope.transactions = transactions;
    });

    $scope.items = [];
    var resource3 = Restangular.all('items');
    resource3.getList().then(function(items) {
        $scope.items = items;
    });

    $scope.transaction = {};

    $scope.filtrar = function(){


        var uri = "transactions?";
        var args='';

        if($scope.transaction.item){
            args += (args==''?'':'&')+'item='+$scope.transaction.item;
        }

        if(startDateFiltroAsObject){
            args += (args==''?'':'&')+'startDate='+startDateFiltroAsObject;

        }

        if(endDateFiltroAsObject){
            args += (args==''?'':'&')+'endDate='+endDateFiltroAsObject;
        }

        if($scope.transaction.provider){
            args += (args==''?'':'&')+'provider='+$scope.transaction.provider;
        }

        // 0 DOS APAGADOS , 1 UNO PRENDIDO DOS APAGADO, 2 DOS PRENDIDO UNO APAGADO, 3 DOS PRENDIDOS

        $scope.transaction.inOurOut = getActivesDirections();

        Restangular.all(uri+args).getList().then(function(transactions) {
            if(getActivesDirections()==3){
                $scope.transactions = transactions;
            }
            if(getActivesDirections()==1){
                $scope.transactions = _.filter(transactions, function(transaction){return transaction.quantity>0});
            }
            if(getActivesDirections()==2){
                $scope.transactions = _.filter(transactions, function(transaction){return transaction.quantity<0});
            }
            if(getActivesDirections()==0){
                $scope.transactions = transactions;
            }
        });


    };


    $scope.getNameItemByID= function(id){

        if (id) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == id) {
                    return $scope.items[k].name;
                }
            }
        }
    };
}


// CONTROLLER SUBIR PMIX


app.controller('MyCtrl', ['$scope', 'Upload', '$timeout','Restangular', function ($scope, Upload, $timeout, Restangular){

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'http://masa.stratigeek.com:3000/api/inventory/uploadFile',
                data: {file: file}
            });


            file.upload.then(function (response) {
                $scope.responseData = response.data;
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                //$scope.responseData = JSON.stringify(response.data);

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    }


    Restangular.all('items').getList().then(function(items) {
        $scope.items = items;
    });

    $scope.platesTEMP = {};
    $scope.platesTEMP.ingredients = [];
    $scope.platesTEMP.ingredientsQuantity = [];

    $scope.plate = {};

    $scope.actualPlateName = "";
    $scope.addPlate = function(plateName){
        $scope.actualPlateName = plateName;
        $scope.plate.name = plateName;
    }

    $scope.plate.ingredients=[];
    $scope.plate.ingredientsQuantity=[];
    $scope.iterator = 0;


    $scope.sendFormModalWindow = function() {

        console.log('want to send');

        Restangular.all('plates').post($scope.plate).then(function(data) {
            //interprete save result
            alert("saved");
            reloadPage();
        });



    };

    $scope.getNameByID= function(id){
        if (id) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == id) {
                    return $scope.items[k].name;
                }
            }
        }
    };

    $scope.getUnitsByID= function(element){
        if (element) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == element) {
                    return $scope.items[k].units;
                }
            }
        }
    };


    $scope.addRow = function(){
        $scope.platesTEMP.ingredients.push($scope.plate.ingredients[$scope.iterator]);
        $scope.platesTEMP.ingredientsQuantity.push($scope.plate.ingredientsQuantity[$scope.iterator]);
        $scope.iterator++;

    };
    $scope.removeRow = function(name){
        var index = -1;
        var comArr = eval( $scope.platesTEMP );
        for( var i = 0; i < comArr.length; i++ ) {
            if( comArr[i].name === name ) {
                index = i;
                break;
            }
        }
        if( index === -1 ) {
            alert( "Something gone wrong" );
        }
        $scope.platesTEMP.splice( index, 1 );
    };






}]);


//Function used to reload the page in order to reload controllers calls
function reloadPage() {
    location.reload();
}


