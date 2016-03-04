/**
 * Created by emilnamen on 12/1/15.
 */



var app = angular.module('LEVL',['restangular','ngFileUpload']);
app.config(["RestangularProvider",function(RestangularProvider){
    RestangularProvider.setRestangularFields({
        id: "_id"
    });
    RestangularProvider.setBaseUrl('http://masa.stratigeek.com:3000/api');
    RestangularProvider.setDefaultHttpFields({'withCredentials':'true'});

}]);

app.config(['$httpProvider', function ($httpProvider) {
    var $http,
        interceptor = ['$q', '$injector', function ($q, $injector) {
            var error;

            function success(response) {
                console.log("SUCCESS"+JSON.stringify(response));
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                if($http.pendingRequests.length < 1) {
                    $('#loadingWidget').hide();
                }
                return response;
            }

            function error(response) {
                console.log("ERROR"+JSON.stringify(response));
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                if($http.pendingRequests.length < 1) {
                    $('#loadingWidget').hide();
                }
                return $q.reject(response);
            }

            return function (promise) {
                $('#loadingWidget').show();
                return promise.then(success, error);
            }
        }];

    $httpProvider.responseInterceptors.push(interceptor);
}]);



app.controller('retrieveUsername',retrieveUsername);
app.controller('retrieve0', retrieve0);
app.controller('retrieve1', retrieve1);
app.controller('retrieve2', retrieve2);
app.controller('retrieve3', retrieve3);
app.controller('retrieve4', retrieve4);
app.controller('retrieve5', retrieve5);
app.controller('retrieve6', retrieve6);
app.controller('retrieve7', retrieve7);
app.controller('retrieve8', retrieve8);
app.controller('retrieve9', retrieve9);
app.controller('put1',put1);
app.controller('put2',put2);
app.controller('put3',put3);
app.controller('put4',put4);
app.controller('MyCtrl',MyCtrl);
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



//CONTROLLER LOGIN
function retrieve0(Restangular,$scope,$http){

    $scope.user = {};

    // Register the login() function
    $scope.loginForm = function(){

        /* $http({
         method: 'POST',
         url: 'http://localhost:3000/login',
         data: {
         username: $scope.user.username,
         password: $scope.user.password,
         }
         }).then(function successCallback(response) {
         alert(JSON.stringify(response));
         // this callback will be called asynchronously
         // when the response is available
         }, function errorCallback(response) {
         alert(JSON.stringify(response));
         // called asynchronously if an error occurs
         // or server returns response with an error status.
         });*/

        Restangular.oneUrl('login','http://masa.stratigeek.com:3000/login').customPOST({
            username: $scope.user.username,
            password: $scope.user.password,
        }).then(function(data){
            if(String(data) == "false"){
                alert("Contraseña Incorrecta");
                window.location = "/index.html";
            }
            else{
                //alert("Autenticado");
                window.location = "/home.html";
            }
        });
    };

    $scope.signupForm = function(){
        Restangular.oneUrl('signup','http://masa.stratigeek.com:3000/signup').customPOST({

            username: $scope.user.username,
            password: $scope.user.password,
            email: $scope.user.email,
            firstName: $scope.user.firstName,
            secondName: $scope.user.secondName

        });
    };

    $scope.logout =  function(){
        Restangular.oneUrl('signout','http://masa.stratigeek.com:3000/signout').get();
        window.location = "/index.html";
    };

}

function retrieveUsername(Restangular, $scope){

    $scope.user = {}

    var resource = Restangular.oneUrl('me','http://masa.stratigeek.com:3000/api/users/me');
    resource.getList().then(function(users){
        $scope.user = users;

    });

}

// CONTROLLER HOME
function retrieve1(Restangular, $scope){

    var resource = Restangular.all('items');
    resource.getList().then(function(items){
        if(isAuthenticated(items) == true){
            $scope.items = items;
        }

    });

    var resource2 = Restangular.all('transactions');
    resource2.getList().then(function(transactions) {
        if (isAuthenticated(transactions) == true){
            $scope.transaction = {};
            $scope.transaction.item = transactions[0].item;
            $scope.transactions = transactions;


            $scope.graphSubmitForm = function () {

                //alert(_.filter($scope.transactions,function(trans){return trans.item.localeCompare($scope.transaction.item)==0}));

                if ($scope.transaction.item.localeCompare('undefined') === 0 && $scope.transaction.item != null);
                {
                    var dps = [];
                    var acumQuantity = 0;
                    var transactionsItem = [];
                    transactions.forEach(function (transaction) {

                        if (transaction.item === $scope.transaction.item) {

                            transactionsItem.push(transaction);

                            var transactionDate = new Date(transaction.date);
                            transactionDate = transactionDate.getTime();
                            acumQuantity = acumQuantity + transaction.quantity;

                            var itemAct = {"x": transactionDate, "y": acumQuantity};
                            dps.push(itemAct);
                        }
                    });

                    $scope.transactions = transactionsItem;


                    createChart(dps, $scope.getNameItemByID($scope.transaction.item));


                }
            };
        }
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

    $scope.unitsTypes = [{type:'mass', label:'MASA'},{type:'volume', label:'VOLUMEN'},{type:'length', label:'LONGITUD'}];

    $scope.getUnitsByType = function(){
        if($scope.item.unitsType){
            Restangular.all('convert/possibilities?measure='+$scope.item.unitsType).getList().then(function(measures){
                $scope.units = measures;
            });
        }
    };

    var resource2 = Restangular.all('providers');
    resource2.getList().then(function(providers){
        if(isAuthenticated(providers) == true){
            $scope.providers = providers;
        }
    });


}

// CONTROLLER INGRESAR COMPRA
function put2(Restangular, $scope){

    var resource = Restangular.all('items');
    resource.getList().then(function(items){

        if(isAuthenticated(items) == true){
            $scope.items = items;
        }

    });

    var resourceTransactions = Restangular.all('transactions');
    resourceTransactions.getList().then(function(transactions){
        $scope.transactions = transactions;
    });


    var resource2 = Restangular.all('providers');
    resource2.getList().then(function(providers){
        $scope.providers = providers;
    });

    $scope.itemTemp = {};


    $scope.getTypeByItemId = function(itemID){

        $scope.itemType = _.find($scope.items, function(act){ return act._id== itemID; }).unitsType;
        $scope.itemOriginalType = _.find($scope.items, function(act){ return act._id== itemID; }).units;
        if($scope.itemType){
            Restangular.all('convert/possibilities?measure='+$scope.itemType).getList().then(function(measures){
                $scope.units = measures;
            });
        }
    };

    $scope.transaction = {};

    $scope.ingresarCompra = function(){

        // calling our submit function
        // CREO $scope.transactionPOST para agregarle a este objeto temporal la cantidad convertida.
        $scope.transactionPOST = $scope.transaction;
        $scope.transactionPOST.type = "***COMPRA";
        $scope.transactionPOST.date = new Date();

        Restangular.one('convert?quantity='+$scope.transaction.quantity+'&from='+$scope.itemTemp.units+'&to='+$scope.itemOriginalType).getList().then(
            function(respConvertion){
                $scope.transactionPOST.quantity = respConvertion;
                resourceTransactions.post($scope.transactionPOST).then(function(data) {
                    //interprete save result
                    alert("saved"+ JSON.stringify(data));
                    reloadPage();
                });
            });

    };





    /*$scope.unitsTypes = [{type:'mass', label:'MASA'},{type:'volume', label:'VOLUMEN'},{type:'length', label:'LONGITUD'}];
     $scope.showUnitsType = false;



     $scope.getUnitsByItemId = function(itemID){

     alert(_.find($scope.items, function(act){ return act._id== itemID; }).unitsType);

     if(String(_.find($scope.items, function(act){ return act._id== itemID; }).unitsType) === 'undefined'){
     $scope.showUnitsType = true;
     }
     else{
     $scope.showUnitsType = false;
     }
     };


     */

}

// CONTROLLER REVISAR INVENTARIO
function retrieve2(Restangular, $scope){

    $scope.items = [];

    var resource = Restangular.all('items');
    resource.getList().then(function(items){
        if (items) {
            if(isAuthenticated(items) == true){
                $scope.items = items;
            }

            items.forEach(function (item) {
                var resource2 = Restangular.all('inventory/currentStock/' + '?item=' + item._id + '&date=' + new Date());
                resource2.getList().then(function (currents) {
                    item.currentStock = currents;
                });
            });

            $scope.item = {};
        }

    });

    $scope.removeRowItem = function(element){

        Restangular.all('inventory/isItemOnRecipe/'+element._id).getList().then(function(data){

            if(String(data) == "true"){
                alert("No se puede eliminar: Este insumo está asociado un producto");
            }
            else {
                Restangular.one("/items/delete", element._id).remove().then(function () {

                    var index = $scope.items.indexOf(element);
                    if (index > -1) $scope.items.splice(index, 1);

                });
            }

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

        //alert(JSON.stringify($scope.actualItemEdit));

        Restangular.one("items/update/"+$scope.actualItemEdit._id).customPUT($scope.actualItemEdit).then(function(data){
            alert("edited");
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

// CONTROLLER INGRESAR PRODUCTO
function put3(Restangular, $scope){

    var resource = Restangular.all('items');
    resource.getList().then(function(items){
        if(isAuthenticated(items) == true){
            $scope.items = items;
        }
    });

    var resource2 = Restangular.all('plates');

    $scope.platesTEMP = {};
    $scope.platesTEMP.ingredients = [];
    $scope.platesTEMP.ingredientsQuantity = [];
    $scope.platesTEMP.ingredientsUnit = [];

    $scope.plate = {};
    $scope.plate.ingredients=[];
    $scope.plate.ingredientsQuantity=[];
    $scope.plate.ingredientsUnit = [];
    $scope.iterator = 0;


    $scope.ingresarProducto = function() {

        console.log('want to send');


        $scope.plate.ingredients = $scope.platesTEMP.ingredients;
        $scope.plate.ingredientsQuantity = $scope.platesTEMP.ingredientsQuantity;
        $scope.plate.ingredientsUnit = $scope.platesTEMP.ingredientsUnit;

        delete $scope.plate.ingredientsUnit;

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


    $scope.getTypeByItemId = function(itemID){
        $scope.itemType = _.find($scope.items, function(act){ return act._id== itemID; }).unitsType;
        $scope.itemOriginalType = _.find($scope.items, function(act){ return act._id== itemID; }).units;
        if($scope.itemType){
            Restangular.all('convert/possibilities?measure='+$scope.itemType).getList().then(function(measures){
                $scope.units = measures;
            });
        }
    };


    $scope.addRow = function(ingredient,quantity, unit){

        if($scope.iterator === 0){
            $scope.platesTEMP.ingredients.push(ingredient);
            $scope.platesTEMP.ingredientsQuantity.push(quantity);
            $scope.platesTEMP.ingredientsUnit.push(unit);
            $scope.iterator++;
        }
        else{

            var index = _.indexOf($scope.platesTEMP.ingredients, String(ingredient));

            if( index == -1){
                $scope.platesTEMP.ingredients.push(ingredient);
                $scope.platesTEMP.ingredientsQuantity.push(quantity);
                $scope.platesTEMP.ingredientsUnit.push(unit);
                $scope.iterator++;

            }
            else{
                alert("Se guardaran en las unidades iniciales que ingresó");
                var quantityAct = parseInt($scope.platesTEMP.ingredientsQuantity[index]);
                var quantityNum = parseInt(quantity);
                $scope.platesTEMP.ingredientsQuantity[index] = quantityAct+quantityNum;

            }
        }
    };


    $scope.removeRow = function(ingredient){


        var index = _.indexOf($scope.platesTEMP.ingredients, String(ingredient));

        if( index == -1){
            alert("ERROR: No se encuentra el ingrediente");
        }
        else{
            $scope.platesTEMP.ingredients.splice(index,1);
            $scope.platesTEMP.ingredientsQuantity.splice(index,1);
            $scope.platesTEMP.ingredientsUnit.splice(index,1);
        }
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

    $scope.items = [];
    var resource = Restangular.all('items');
    resource.getList().then(function(items){
        $scope.items = items;
    });



    var resource2 = Restangular.all('plates');
    resource2.getList().then(function(plates){
        $scope.plates = plates;

        $scope.selectedPlate = $scope.plates[0];
    });



    $scope.getNameByID= function(id){
        for (var k = 0; k < $scope.items.length; ++k)
        {
            if($scope.items[k]._id == id){
                return $scope.items[k].name;
            }
        }
    };
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


    $scope.addRow = function(ingredient,quantity){

        if($scope.iterator === 0){
            $scope.selectedPlate.ingredients.push(ingredient);
            $scope.selectedPlate.ingredientsQuantity.push(quantity);
            $scope.iterator++;
        }
        else{

            var index = _.indexOf($scope.selectedPlate.ingredients, String(ingredient))

            if( index == -1){
                $scope.selectedPlate.ingredients.push(ingredient);
                $scope.selectedPlate.ingredientsQuantity.push(quantity);
                $scope.iterator++;


            }
            else{
                var quantityAct = parseInt($scope.selectedPlate.ingredientsQuantity[index]);
                var quantityNum = parseInt(quantity);
                $scope.selectedPlate.ingredientsQuantity[index] = quantityAct+quantityNum;
            }
        }
    };


    $scope.removeRow = function(ingredient){


        var index = _.indexOf($scope.selectedPlate.ingredients, String(ingredient))

        if( index == -1){
            alert("ERROR: No se encuentra el ingrediente");
        }
        else{
            $scope.selectedPlate.ingredients.splice(index,1);
            $scope.selectedPlate.ingredientsQuantity.splice(index,1);
        }
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

        if(rowsInventoryTable){

            $scope.rowsInventoryTable = rowsInventoryTable;

            rowsInventoryTable.forEach( function( item ) {

                var resource3 = Restangular.all('inventory/currentStock'+'?item='+item[1]+'&date='+new Date());
                resource3.getList().then(function(currents){
                    item[6] = currents;
                });
            });

            $scope.rowsInventoryTable = rowsInventoryTable;
        }

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


    $scope.items = [];
    var resource3 = Restangular.all('items');
    resource3.getList().then(function(items) {
        $scope.items = items;
    });

    $scope.getUnitsByID= function(element){
        if (element) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == element) {
                    return $scope.items[k].units;
                }
            }
        }
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

                item[6] = currentstock;
                item[7] = currentstock;
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

            var dif =  row[7]-row[6];

            if(dif!=0){
                $scope.transaction.item = row[1];
                $scope.transaction.quantity = dif*-1;
                $scope.transaction.type = "***AJUSTE";
                $scope.transaction.description = "***AJUSTE INVENTARIO  "+new Date().toISOString().slice(0, 10);
                $scope.transaction.date = new Date();
                resourceTransaction.post($scope.transaction).then(function(data){

                });
            }

        });

        alert("Se realizaron las transacciones de ajuste correctamente");
        localStorage.setItem('activeTab','10');
        reloadPage();

        //alert($scope.rowsiInventoryTable);

        // calling our submit function
        //$scope.transaction.date = new Date();
        //resourceTransactions.post(transaction).then(function(data) {
        //interprete save result
        //alert("saved");
        //reloadPage();
        //});
    };


    $scope.items = [];
    var resource3 = Restangular.all('items');
    resource3.getList().then(function(items) {
        $scope.items = items;
    });

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
            if(getTransactionsPorAjuste()==1){
                $scope.transactions = _.filter(transactions, function(transaction){return transaction.description.startsWith("***AJUSTE INVENTARIO")});
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

    $scope.getUnitsByID= function(element){
        if (element) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == element) {
                    return $scope.items[k].units;
                }
            }
        }
    };

    $scope.removeRowTransaction = function(element){
        Restangular.one("/transactions/delete", element._id).remove().then(function () {

            var index = $scope.transactions.indexOf(element);
            if (index > -1) $scope.transactions.splice(index, 1);

        });
    };
}



// CONTROLLER ORDENES DE COMPRA
function retrieve8(Restangular, $scope){

    $scope.providers = [];
    var resource4 = Restangular.all('providers');
    resource4.getList().then(function(providers) {
        $scope.providers = providers;
    });

    var resource2 = Restangular.all('inventory/inventoryTable');

    resource2.getList().then(function(rowsInventoryTable){
        $scope.rowsiInventoryTable = rowsInventoryTable;

        rowsInventoryTable.forEach( function( item ) {

            Restangular.all('inventory/currentStock?item='+item[1]+'&date='+new Date()).getList().then(function(currentStock){

                item[6] = currentStock;
                item[7] = currentStock;
            });


            Restangular.all('inventory/getLastProvider?item='+item[1]).getList().then(function(idProvider){
                if(idProvider){
                    var providerName = _.find($scope.providers,function(act){return act._id==idProvider.replace(/["]/g, "")});
                    if(providerName) {
                        item[8] = providerName.name;
                    }
                }
                else{
                    item[8] = "undefined";
                }
            });

        });

        $scope.rowsiInventoryTable = rowsInventoryTable;

    });

    var resourceTransaction = Restangular.all('transactions');
    resourceTransaction.getList().then(function(transactions){
        $scope.transactions = transactions;
    });

    $scope.transaction = {};

    $scope.ordenar = function(){

        var ordersArray = [];
        var order = {};

        var value = [];
        var valuesArray = [];
        var column = [];

        column.push({ text: 'INSUMO', alignment: 'center'});
        column.push({ text: 'CANTIDAD',alignment: 'center'});
        column.push({ text: 'UNIDADES', alignment: 'center'});
        column.push({ text: 'PROVEEDOR', alignment: 'center'});

        valuesArray.push(column);

        $scope.rowsiInventoryTable.forEach(function(row){

            var dif =  row[7]-row[2];

            if(dif<=0){
                order.item = row[1];
                order.quantity = dif*-1;
                order.provider = row[8];
                order.type = "ORDEN";
                order.description = "***ORDEN DE COMPRA"  +new Date().toISOString().slice(0, 10);
                ordersArray.push(order);


                value.push({ text: row[0], style: 'tableHeader'});
                value.push({ text: ''+dif*-1, style: 'tableHeader'});
                value.push({ text: ''+$scope.getUnitsByID(row[1]), style: 'tableHeader'});
                value.push({ text: row[8], style: 'tableHeader'});
                valuesArray.push(value);
                value = [];


                /*$scope.transaction.item = row[1];
                 $scope.transaction.quantity = dif*-1;
                 $scope.transaction.type = "ORDEN";
                 $scope.transaction.description = "***ORDEN DE COMPRA  "+new Date().toISOString().slice(0, 10);
                 $scope.transaction.date = new Date();
                 resourceTransaction.post($scope.transaction).then(function(data){
                 alert("ajustado");
                 reloadPage();
                 });*/
            }

        });

        var docDefinition = {
            content: [

                /*{
                 image: 'data:http://localhost:63342/LEVL/levlHeader.png/jpg',
                 fit: [100, 100]
                 },*/

                // if you don't need styles, you can use a simple string to define a paragraph
                {
                    text: 'ORDENES DE COMPRA',
                    fontSize: 25
                },


                {
                    text: ' ',
                    fontSize: 20
                },

                // using a { text: '...' } object lets you set styling properties
                { text: 'Estas son las siguientes ordenes de compra que se deben realizar ' +
                'para cumplir con el stock mínimo:', fontSize: 10 },

                {text: ' ', fontSize:  20 },

                {table: {
                    headerRows: 1,
                    widths: [ '*', 'auto', 'auto', 100],
                    body: valuesArray
                }},



                /*{ text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
                 {
                 style: 'tableExample',
                 table: {
                 headerRows: 1,
                 body: valuesArray
                 },
                 layout: 'headerLineOnly'
                 },*/



                {text: ' ', fontSize:  20 },


                {text: 'Aprobado por: ________________________________________', fontSize:  10 }
            ]
        };
        // open the PDF in a new window
        pdfMake.createPdf(docDefinition).open();

    };


    $scope.items = [];
    var resource3 = Restangular.all('items');
    resource3.getList().then(function(items) {
        $scope.items = items;
    });


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


// CONTROLLER SUBIR PMIX

function MyCtrl (Restangular,$scope, Upload, $timeout) {


    $scope.err = true;

    $scope.uploadFiles = function (file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'http://masa.stratigeek.com:3000/api/inventory/uploadFile',
                withCredentials: true,
                data: {file: file}
            });


            file.upload.then(function (response) {
                $scope.responseData = response.data;
                if (_.contains(_.pluck($scope.responseData, 'exists'), false)) {
                    $scope.err = true;
                }
                else {
                    $scope.err = false;
                }
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                $scope.responseData = JSON.stringify(response.data);

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    }


    Restangular.all('items').getList().then(function (items) {
        $scope.items = items;
    });

    $scope.platesPMIXTEMP = {};
    $scope.platesPMIXTEMP.ingredients = [];
    $scope.platesPMIXTEMP.ingredientsQuantity = [];
    $scope.platesPMIXTEMP.ingredientsUnit = [];

    $scope.platePMIX = {};
    $scope.addPlate = function (plateName) {
        $scope.platePMIX.name = plateName;
    }

    $scope.platePMIX.ingredients = [];
    $scope.platePMIX.ingredientsQuantity = [];
    $scope.platePMIX.ingredientsUnit = [];
    $scope.iteratorPMIX = 0;


    $scope.sendFormModalWindow = function () {

        console.log('want to send');

        $scope.platePMIX.ingredients = $scope.platesPMIXTEMP.ingredients;
        $scope.platePMIX.ingredientsQuantity = $scope.platesPMIXTEMP.ingredientsQuantity;
        $scope.platePMIX.ingredientsUnit = $scope.platesPMIXTEMP.ingredientsUnit;

        delete $scope.platePMIX.ingredientsUnit;


        Restangular.all('plates').post($scope.platePMIX).then(function (data) {
            //interprete save result
            _.find($scope.responseData, function (act) {
                return act.plateName == $scope.platePMIX.name
            }).exists = true;
            if (_.contains(_.pluck($scope.responseData, 'exists'), false)) {
                $scope.err = true;
            }
            else {
                $scope.err = false;
            }
            $scope.platesPMIXTEMP = {};
            $scope.platesPMIXTEMP.ingredients = [];
            $scope.platesPMIXTEMP.ingredientsQuantity = [];
            $scope.platesPMIXTEMP.ingredientsUnit = [];


        });

    };

    $scope.closeModalPmix = function () {
        $scope.platesPMIXTEMP = {};
        $scope.platesPMIXTEMP.ingredients = [];
        $scope.platesPMIXTEMP.ingredientsQuantity = [];
        $scope.platesPMIXTEMP.ingredientsUnit = [];

    };

    $scope.getNameByID = function (id) {
        if (id) {
            for (var k = 0; k < $scope.items.length; ++k) {
                if ($scope.items[k]._id == id) {
                    return $scope.items[k].name;
                }
            }
        }
    };

    /*$scope.getUnitsByID= function(element){
     if (element) {
     for (var k = 0; k < $scope.items.length; ++k) {
     if ($scope.items[k]._id == element) {
     return $scope.items[k].units;
     }
     }
     }
     };*/

    $scope.getTypeByItemIdPMIX = function (itemPMIXID) {
        if (itemPMIXID) {
            $scope.itemPMIXType = _.find($scope.items, function (act) {
                return act._id == itemPMIXID;
            }).unitsType;
            $scope.itemPMIXOriginalType = _.find($scope.items, function (act) {
                return act._id == itemPMIXID;
            }).units;
            if ($scope.itemPMIXType) {
                Restangular.all('convert/possibilities?measure=' + $scope.itemPMIXType).getList().then(function (measures) {
                    $scope.unitsPMIX = measures;
                });
            }
        }
    };


    $scope.addRowPMIX = function (ingredient, quantity, unit) {

        if ($scope.iteratorPMIX === 0) {
            $scope.platesPMIXTEMP.ingredients.push(ingredient);
            $scope.platesPMIXTEMP.ingredientsQuantity.push(quantity);
            $scope.platesPMIXTEMP.ingredientsUnit.push(unit);
            $scope.iteratorPMIX++;
        }
        else {

            var index = _.indexOf($scope.platesPMIXTEMP.ingredients, String(ingredient))

            if (index == -1) {
                $scope.platesPMIXTEMP.ingredients.push(ingredient);
                $scope.platesPMIXTEMP.ingredientsQuantity.push(quantity);
                $scope.platesPMIXTEMP.ingredientsUnit.push(unit);
                $scope.iteratorPMIX++;


            }
            else {
                var quantityAct = parseInt($scope.platesPMIXTEMP.ingredientsQuantity[index]);
                var quantityNum = parseInt(quantity);
                $scope.platesPMIXTEMP.ingredientsQuantity[index] = quantityAct + quantityNum;
            }
        }
    };


    $scope.removeRowPMIX = function (ingredient) {


        var index = _.indexOf($scope.platesPMIXTEMP.ingredients, String(ingredient))

        if (index == -1) {
            alert("ERROR: No se encuentra el ingrediente");
        }
        else {
            $scope.platesPMIXTEMP.ingredients.splice(index, 1);
            $scope.platesPMIXTEMP.ingredientsQuantity.splice(index, 1);
            $scope.platesPMIXTEMP.ingredientsUnit.splice(index, 1);
        }
    };

    var resourceTransaction = Restangular.all('transactions');
    resourceTransaction.getList().then(function (transactions) {
        $scope.transactions = transactions;
    });


    $scope.addTransactionPmix = function () {

        if (_.contains(_.pluck($scope.responseData, 'exists'), false)) {
            $scope.err = true;
        }
        else {
            $scope.err = false;
        }
        if ($scope.err == false) {
            var map = _.each($scope.responseData, function (pmixItem) {
                delete pmixItem.exists
            });
            Restangular.one("inventory/platesToItems").customPUT(map).then(function (data) {
                $scope.itemsPmix = data;
            });
        }

    };


    $scope.acceptTransactionPMIX = function () {

        _.each($scope.itemsPmix, function(itemAct){

            Restangular.setDefaultHttpFields({'withCredentials':'true'});

            $scope.transactionPMIX = {};
            $scope.transactionPMIX.item = itemAct.itemID;
            $scope.transactionPMIX.type = "***PMIX";
            $scope.transactionPMIX.quantity = itemAct.quantity * -1;
            $scope.transactionPMIX.description = "***VENTA PMIX  " + new Date().toISOString().slice(0, 10);
            $scope.transactionPMIX.date = new Date();

            //alert(JSON.stringify($scope.transaction));
            Restangular.all('transactions').post($scope.transactionPMIX).then(function(data){
                alert(JSON.stringify(data));
            });
        });


        alert("Se realizaron las " + $scope.itemsPmix.length + " transacciones correctamente");
        localStorage.setItem('activeTab', '11');
        reloadPage();

    };

}


//Function used to reload the page in order to reload controllers calls
function reloadPage() {
    location.reload();
}


function isAuthenticated(response){

    if(String(response) === String("not authenticated")){
        window.location = "/index.html";
    }else{
        return true;
    }

}


// CONTROLLER COSTOS RECETAS
function retrieve9(Restangular, $scope){

    $scope.platesCostos = [];

    var resourcePlatesCostos = Restangular.all('cost/platesaverage');
    resourcePlatesCostos.getList().then(function(platesCostos){
        if (platesCostos) {
            if(isAuthenticated(platesCostos) == true){
                $scope.platesCostos = platesCostos;
            }
        }

    });
}
