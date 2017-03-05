angular.module('app.controllers', [])

.controller('loginCtrl', ['$scope', '$stateParams',"$state","Vendedores", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,Vendedores) {

$scope.selectedVend={};
$scope.vendedores=Vendedores.get();
$scope.passwordx="";

$scope.login=function(pass,vend){
   var vende=JSON.parse(vend);
   if(pass==vende.claverest.trim()){
      Vendedores.setcurrVend(vende);
      $state.go("ilogicPedidos");
   }
}
$scope.config=function(){
  $state.go("configuraciN");
}

}])
.controller('ilogicPedidosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
.controller('modalCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

$scope.mensaje=$stateParams.msg;

}])

.controller('pedidoCtrl', ['$scope', '$stateParams',"Pedidos","$state","$timeout", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Pedidos,$state,$timeout) {
$scope.message="";
function init(){
  if (Pedidos.getCurPedido()==null)
  {
  Pedidos.create();
  }
  $scope.currentPedido=Pedidos.getCurPedido();
  $scope.Listproductos=Pedidos.getCurPedido().productos;
  $scope.producto=Pedidos.getCurProd();
}
init()
$scope.getotalItems=function(){
  var counter=0;
  $scope.Listproductos.forEach(function(item){
    counter++;
  })
  return counter;
}
$scope.getTotal=function(){
  var acum=0;
  $scope.Listproductos.forEach(function(item){
    acum+=item.producto.precio1;
  })
  return acum;
}
$scope.removeItem = function(index){
    $scope.Listproductos.splice(index,1);
};
$scope.proccess=function(pedido,status){
  if (pedido.cliente==null)
  {
    $scope.message="Seleccione Cliente"
    $timeout(function () { $scope.message="";}, 3000);
    return;
  }
  if (pedido.productos.length==0)
  {
      $scope.message="Agregue un Producto"
    $timeout(function () { $scope.message="";}, 3000);
    return;
  }

  pedido.totalprod=$scope.getTotal();
  pedido.monto=$scope.getTotal();
  Pedidos.process(pedido,status);
  Pedidos.create();
  init();
  $state.go("modal:msg",{msg:'Pedido Procesado'});
}
}])

.controller('ilogicPedidosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuPedidoCtrl', ['$scope', '$stateParams',"Pedidos","$state", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Pedidos,$state) {
  $scope.$on('$stateChangeSuccess', function () {
  $scope.items = Pedidos.getall();
  });

  $scope.nuevoPedido=function(){
    Pedidos.create();
    $state.go("pedido");
  };
  $scope.removeItem = function(index){
      $scope.items.splice(index,1);
      Pedidos.setall();
  };
  $scope.addpedido=function(item){
       if (item.status=="pendiente"){
        Pedidos.setCurPedido(item);
        $state.go("pedido");
      }
  };
}])



.controller('productosCtrl', ['$scope', '$stateParams',"Productos","Pedidos","$state", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Productos,Pedidos,$state) {
  var fullproductos=Productos.get();
  $scope.$on('$stateChangeSuccess', function () {
    $scope.numberOfItemsToDisplay = 50; // number of item to load each time
       $scope.items = fullproductos;
  });
  $scope.addproducto=function(item){
    if ($stateParams.state=="pedido")
    {
        var copyItem={};
        Pedidos.setcurprod(item);
        angular.copy(Pedidos.getCurProd(),copyItem);
        Pedidos.addproduct(copyItem);
        $state.go("pedido");
    }
  }

}])

.controller('clientesCtrl', ['$scope', '$stateParams',"Clientes","Pedidos","$state", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Clientes,Pedidos,$state) {
  $scope.$on('$stateChangeSuccess', function () {
    $scope.clientes=Clientes.get();
  });
  $scope.addClient=function(item){
    if ($stateParams.state=="pedido")
    {
     Pedidos.setClient(item);
     $state.go("pedido");
    }
  }
}])

.controller('vendedoresCtrl', ['$scope', '$stateParams',"Vendedores","$state","Pedidos", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Vendedores,$state,Pedidos) {
  $scope.$on('$stateChangeSuccess', function () {
  $scope.vendedores=Vendedores.get();
  });
  $scope.addVendedor=function(item){
    if ($stateParams.state=="pedido")
    {
     Pedidos.setVendor(item);
     $state.go("pedido");
    }
  }
}])


.controller('configuraciNCtrl', ['$scope', '$stateParams',"Config","Sync", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Config,Sync) {
//var config={};
  $scope.saveConfig=function(config){
    Config.save(config);
    Sync.init();
  }
  $scope.$on('$stateChangeSuccess', function () {
    $scope.config=Config.get();
  });
  }])
  .controller('syncCtrl', ['$scope', '$stateParams',"Productos","Sync","Messages", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams,Productos,Sync,Messages) {
    $scope.sync=function(){
    $scope.messages=Sync.init();
    }
  }])
