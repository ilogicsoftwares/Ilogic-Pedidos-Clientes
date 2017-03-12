angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('pedido', {
    url: '/page4',
    templateUrl: 'templates/pedido.html',
    controller: 'pedidoCtrl'
  })

  .state('ilogicPedidos', {
    url: '/page5',
    templateUrl: 'templates/ilogicPedidos.html',
    controller: 'ilogicPedidosCtrl'
  })

  .state('menuPedido', {
    url: '/page6',
    templateUrl: 'templates/menuPedido.html',
    controller: 'menuPedidoCtrl'
  })

  .state('cargarPedido', {
    url: '/page7',
    templateUrl: 'templates/cargarPedido.html',
    controller: 'cargarPedidoCtrl'
  })

  .state('listaDeProductos', {
    url: '/page8',
    templateUrl: 'templates/listaDeProductos.html',
    controller: 'listaDeProductosCtrl'
  })

  .state('productos', {
    url: '/page9/:state',
    templateUrl: 'templates/productos.html',
    controller: 'productosCtrl'
  })

  .state('detalleDelProducto', {
    url: '/page10',
    templateUrl: 'templates/detalleDelProducto.html',
    controller: 'detalleDelProductoCtrl'
  })

  .state('listaDeClientes', {
    url: '/page11',
    templateUrl: 'templates/listaDeClientes.html',
    controller: 'listaDeClientesCtrl'
  })

  .state('detalleDeCliente', {
    url: '/page12',
    templateUrl: 'templates/detalleDeCliente.html',
    controller: 'detalleDeClienteCtrl'
  })

  .state('clientes', {
    url: '/page13/:state',
    templateUrl: 'templates/clientes.html',
    controller: 'clientesCtrl'
  })

  .state('vendedores', {
    url: '/page14/:state',
    templateUrl: 'templates/vendedores.html',
    controller: 'vendedoresCtrl'
  })

  .state('listaDeVendedores', {
    url: '/page15',
    templateUrl: 'templates/listaDeVendedores.html',
    controller: 'listaDeVendedoresCtrl'
  })

  .state('detalleDeVendedor', {
    url: '/page16',
    templateUrl: 'templates/detalleDeVendedor.html',
    controller: 'detalleDeVendedorCtrl'
  })

  .state('configuraciN', {
    url: '/page17',
    templateUrl: 'templates/configuraciN.html',
    controller: 'configuraciNCtrl'
  })
  .state('sync', {
    url: '/page18',
    templateUrl: 'templates/sync.html',
    controller: 'syncCtrl'
  })
  .state('modal:msg', {
    url: '/page19:msg',
    templateUrl: 'templates/modal.html',
    controller: 'modalCtrl'
  })
  .state('login', {
    url: '/page20',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .state('listaDePrecios', {
    url: '/page21',
    templateUrl: 'templates/listaDePrecios.html',
    controller: 'listaDePreciosCtrl'
  })
  .state('nuevoCliente', {
    url: '/page22',
    templateUrl: 'templates/nuevoCliente.html',
    controller: 'nuevoClienteCtrl'
  })

$urlRouterProvider.otherwise('/page20')

});
