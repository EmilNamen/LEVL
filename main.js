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
        $scope.transactions = transactions;

        $scope.transaction = {};

        $scope.transaction.item = transactions[0].item;

        $scope.graphSubmitForm = function() {

            if( $scope.transaction.item.localeCompare('undefined') === 0 &&  $scope.transaction.item != null);
            {
                var dps = [];
                var acumQuantity = 0;
                transactions.forEach( function( transaction ) {

                    if(transaction.item === $scope.transaction.item){
                        var transactionDate = new Date(transaction.date);
                        transactionDate = transactionDate.getTime();
                        acumQuantity = acumQuantity + transaction.quantity;

                        var itemAct = { "x": transactionDate, "y" :acumQuantity};
                        dps.push(itemAct);
                    }
                });

                createChart(dps);
            }
        };
    });
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
    $scope.submitFormInsumo = function() {
        alert(JSON.stringify($scope.item));

        resourceInsumo.post($scope.item).then(function(data) {
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

    var resource2 = Restangular.all('transactions');
    resource2.getList().then(function(transactions){
        $scope.transactions = transactions;
    });

    $scope.transaction = {};

    $scope.transactionSubmitForm = function() {

        // calling our submit function

        $scope.transaction.date = new Date();

        resource2.post($scope.transaction).then(function(data) {
            //interprete save result

            alert("saved");
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

        Restangular.one("/items/update",$scope.actualItemEdit._id).put().then(function(){


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


    $scope.sendForm = function() {

        console.log('want to send');

        resource2.post($scope.plate).then(function(data) {
            //interprete save result
            alert("saved");
        });

        reloadPage();


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
    $scope.submitForm = function() {
        resource.post($scope.provider).then(function(data) {
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

        Restangular.one("/plates/delete",element._id).remove().then(function(){

            var index = $scope.plates.indexOf(element);
            if (index > -1) $scope.plates.splice(index, 1);
        });
        alert("DELETED: "+element.name);
        $scope.selectedPlate = $scope.plates[0];

        reloadPage();

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

    $scope.removeRowProduct = function(element){
        alert(JSON.stringify(element));
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
        alert(JSON.stringify($scope.actualProviderEdit));

        Restangular.one("/providers/update",$scope.actualProviderEdit._id).put().then(function(){

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

    $scope.ajustar =  function(){


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

        // inOurOut = 1 Entrantes    = 0 Salientes

        $scope.transaction.inOurOut = buttonActive;

        if($scope.transaction.inOurOut){
            args += (args==''?'':'&')+'inOurOut='+$scope.transaction.inOurOut;
        }

        Restangular.all(uri+args)
            .getList().then(function(transactions) {
            $scope.transactions = transactions;
        });


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
