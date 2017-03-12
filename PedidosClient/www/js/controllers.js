angular.module('app.controllers', [])

.controller('loginCtrl', ['$scope', '$stateParams',"$state","Vendedores","TimeMsg", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,Vendedores,TimeMsg) {
  $scope.$on('$stateChangeSuccess', function () {
$scope.selectedVend={};

$scope.vendedores=Vendedores.get();
$scope.passwordx="";
$scope.message=TimeMsg.get();
});
$scope.login=function(pass,vend){
     var vende=JSON.parse(vend);
   if(pass==vende.claverest.trim()){
      Vendedores.setcurrVend(vende);
      $state.go("ilogicPedidos");
   }else {
     TimeMsg.set("Error en clave/usuario",2000);
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
.controller('detalleDelProductoCtrl', ['$scope', '$stateParams','Pedidos','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Pedidos,$state) {
$scope.producto=Pedidos.getCurProd();
$scope.addproducto=function(){
      var copyItem={};
      Pedidos.setcurprod($scope.producto.producto,$scope.producto.cantidad);
      angular.copy(Pedidos.getCurProd(),copyItem);
      Pedidos.addproduct(copyItem);
      $state.go("pedido");
}
$scope.addprice=function(){
  $state.go("listaDePrecios");
}
}])
.controller('modalCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

$scope.mensaje=$stateParams.msg;

}])

.controller('pedidoCtrl', ['$scope', '$stateParams',"Pedidos","$state","TimeMsg", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Pedidos,$state,TimeMsg) {

function init(){
  if (Pedidos.getCurPedido()==null)
  {
  Pedidos.create();
  }
  $scope.message=TimeMsg.get();
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
    acum+=item.producto.precio1 * item.cantidad;
  })
  return acum;
}
$scope.removeItem = function(index){
    $scope.Listproductos.splice(index,1);
};
$scope.proccess=function(pedido,status){
  if (pedido.cliente==null)
  {
    TimeMsg.set("Seleccione Cliente",2000);
    return;
  }
  if (pedido.productos.length==0)
  {
    TimeMsg.set("Agregue un producto",2000);
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
$scope.closeapp=function(){
  ionic.Platform.exitApp(); // stops the app
  window.close();
}

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
        Pedidos.setcurprod(item,1);
        angular.copy(Pedidos.getCurProd(),copyItem);
        Pedidos.addproduct(copyItem);
        $state.go("pedido");
    }
  }
  $scope.editProduct=function(item){
    if ($stateParams.state=="pedido")
    {
    Pedidos.setcurprod(item,1);
    $state.go("detalleDelProducto");
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


.controller('configuraciNCtrl', ['$scope', '$stateParams',"Config","Sync","TimeMsg", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Config,Sync,TimeMsg) {
//var config={};
$scope.message=TimeMsg.get();
  $scope.saveConfig=function(config){
    Config.save(config);
    Sync.init();

    TimeMsg.set("Se guardo la configuración",2000);

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
  .controller('listaDePreciosCtrl', ['$scope', '$stateParams','Pedidos','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams,Pedidos,$state) {
  $scope.precios=Pedidos.getprecios();
  Pedidos.getCurProd().producto
  $scope.setprice=function(price){
    Pedidos.getCurProd().producto.precio1=price.precio;
    $state.go('detalleDelProducto');
  }
  }])
  .controller('nuevoClienteCtrl', ['$scope', '$stateParams','Clientes','$state','TimeMsg', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams,Clientes,$state,TimeMsg) {
  $scope.$on('$stateChangeSuccess', function () {
    init();
  })
  function init(){
    Clientes.addnew();
    $scope.message=TimeMsg.get();
    $scope.cliente=Clientes.getcurClient();
    $scope.tiposvend=Clientes.getTypes();
  }
     $scope.save =function(){
      if (Clientes.getcurClient().codigo=='' || Clientes.getcurClient().nombre=='')
      {
        TimeMsg.set("Ya existe un cliente con este codigo o faltan datos",2000);
        return;
      }
       Clientes.getcurClient().tipo=JSON.parse(Clientes.getcurClient().tipo);
       var salvo=Clientes.save(Clientes.getcurClient());
       if (salvo==true)
       {
         TimeMsg.set("Cliente guardado",2000);
         init();
       }else {
         TimeMsg.set("Ya existe un cliente con este codigo o faltan datos",2000);
       }
     }
  }])
