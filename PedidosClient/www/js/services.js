angular.module('app.services', [])

.factory('Storage', ["$window",function($window){
var get=function(keyid){
  var val=$window.localStorage.getItem(keyid);
 if (val==null)
 {
   return val;
 }
  return  JSON.parse(val);
}
var set=function(keyid,val){
  $window.localStorage.setItem(keyid,JSON.stringify(val));
}
return{
  set:set,
  get:get
}
}])

.factory('Config', ["$window","Storage",function($window,Storage){
  var message={};
  var configx={
    server:"",
    id_empresa:"",
    agencia:""
  };

var save=function(object){
  configx.server=  object.server;
  configx.id_empresa=  object.id_empresa;
  configx.agencia=  object.agencia;

      Storage.set("config",configx);
}
var get=function(){
  config=Storage.get("config");
  return config;
}

return{
  save:save,
  get:get,

}

}])


.factory('Productos', ["$window","$http","$q","Config","Storage",function($window,$http,$q,Config,Storage){


var productos=[];
var shortproductos=[];
var sync = function(){
  var df = $q.defer();
  var url= Config.get().server +"/productos" ;
  $http.get(url).then(function(data){
    productos=data.data;
    Storage.set("productos",productos);
    df.resolve(productos);
  },function(){
    df.reject([]);
  })
  return df.promise;
}
var get=function(){
  if (productos.length >0)
  {
    return productos;
  }
  var pi=Storage.get("productos");
  return pi != null ? pi :[];
}
var getCount=function(number){
    if (shortproductos.length >0)
    {
      return shortproductos;
    }
    var pi=Storage.get("productos");
    shortproductos=pi.slice(0,number)
    return shortproductos != null ? shortproductos:[];
}

return{
  sync:sync,
  get:get,
  getCount:getCount
}
}])
.factory('Messages', ["$window",function($window){
  var   messages=[];
   var clear=function(){
    messages.splice(0,messages.length);
   }

  var add=function(message){
    var messageitem={text:""};
    messageitem.text=message;
   if(message!=null){
    messages.push(messageitem);
   }
  }
   return{
     add:add,
     show:messages,
     clear:clear
   }

}])
.factory('Vendedores', ["$window","$http","$q","Config","Storage",function($window,$http,$q,Config,Storage){
var vendedores=[];
var currVend={};
var sync = function(){
  var df = $q.defer();
  var url= Config.get().server +"/vendedores" ;
  $http.get(url).then(function(data){
    vendedores=data.data;
    Storage.set("vendedores",vendedores);
    df.resolve(vendedores);
  },function(){
    df.reject([]);
  })
  return df.promise;
}
var setcurrVend=function(vendedor){
    currVend=vendedor;
}
var getcurrVend=function(){
    return currVend;
}
var get=function(){
  if (vendedores.length >0)
  {
    return vendedores;
  }
  var pi=Storage.get("vendedores");
  if (pi==null)
  {
    return [];
  }
  return pi;
}
return{
  sync:sync,
  get:get,
  setcurrVend:setcurrVend,
  getcurrVend:getcurrVend
}
}])
.factory('Clientes', ["$window","$http","$q","Config","Storage","Messages",function($window,$http,$q,Config,Storage,Messages){
var clientes=[];
var messageT="";
var sync = function(){
  var df = $q.defer();
  var url= Config.get().server +"/clientes" ;
  $http.get(url).then(function(data){
    clientes=data.data;
    Storage.set("clientes",clientes);
    df.resolve(clientes);
  },function(error){
    df.reject(error);
  })

    return df.promise;
}
var messagex=function(){
  return messageT;
}
var get=function(){
  if (clientes.length >0)
  {
    return clientes;
  }
  var pi=Storage.get("clientes");
  return pi != null ? pi :[];
}
return{
  sync:sync,
  message:messagex,
  get:get
}

}])
.factory('Sync', ["$window","Productos","Clientes","Vendedores","Messages",
function($window,Productos,Clientes,Vendedores,Messages){
var messages=Messages;

var init=function(){
    messages.clear();
    Productos.sync().then(function(){
      messages.add("Productos Actualizados")
    },function(error){
      messages.add(error.data);
    });

    Clientes.sync().then(function(){
      messages.add("Clientes Actualizados")
    },function(error){
      messages.add(error.data);
    });

    Vendedores.sync().then(function(){
      messages.add("Vendedores Actualizados")
    },function(error){
      messages.add(error.data);
    });


    return messages.show;
}
return{
  init:init
}
}])
.factory('Pedidos', ["$window","Clientes","Productos","Vendedores","Storage",
function($window,Clientes,Productos,Vendedores,Storage){
 var pedidott={documento:"",
 moneda:"000",
 codcliente:"",
 nombrecli:"",
 rif:"",
 direccion:"",
 tipoprecio:"1",
 emision:"",
 recepcion:"",
 vence:"",
 fechacrea:"",
 totcosto:"",
 totbruto:"",
 totneto:"",
 totimpuest:"",
 totalfinal:""
};

var curpedido=null;
var pedidos=[];
var productoP=function(producto,cantidad){
    return {
      producto:producto,
      cantidad:0
    };
}
var curprod={};
var pedido= function(id){
return{codigo:id,
  vendedor:Vendedores.getcurrVend(),
  cliente:null,
  status:"guardado",
  curprod:{},
  productos:[],
  totalprod:0,
  monto:0,
  fecha:new Date()
}
};

var getAll=function(){
    if (pedidos.length >0)
    {
    return pedidos;
    }
    pedidos=Storage.get("pedidos");
    if (pedidos==null)
    {
      pedidos= [];
    }
  return pedidos;
}
var setall=function(){
  Storage.set("pedidos",pedidos);
}
var add=function(pedido){
    getAll().push(pedido);
}
var addproduct=function(item){
   getCurPedido().productos.push(item);
}
var create=function(){
    curpedido=pedido(getid());
}
var getCurPedido=function(){
    return curpedido;
}
var setCurPedido=function(item){
    curpedido=item;
}
var getCurProd=function(){
    return curprod;
}
var setClient=function(item){
   getCurPedido().cliente=item;

}
var setcurprod=function(item){
    curprod.producto=item;
    curprod.cantidad=1;
}
var setVendor=function(item){
   getCurPedido().vendedor=item;

}

var getid=function(){
  function S4() {return (((1+Math.random())*0x10000)|0).toString(16).substring(1); }
  return(S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
var proccess=function(pedido,status){
    pedido.status=status;
    var indexer=pedidos.indexOf(pedido);
    if (indexer!=-1)
    {
      pedidos.splice(indexer,1)
    }
    pedidos.push(pedido);
    setall("pedidos",pedidos);
}

return{
  setVendor:setVendor,
  setClient:setClient,
  getCurPedido:getCurPedido,
  create:create,
  add:add,
  getall:getAll,
  addproduct:addproduct,
  setcurprod:setcurprod,
  getCurProd:getCurProd,
  process:proccess,
  getid:getid,
  setall:setall,
  setCurPedido:setCurPedido
}

}])
