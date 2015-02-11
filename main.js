(function(){

    var app = angular.module('brincandoPromiseApp', ['ajoslin.promise-tracker']);
    
    app.constant('_', window._);
    
    app.controller('mainController', ['$scope', 'promiseTracker', '$q',
        function($scope, promiseTracker, $q){
        
       $scope.tracker = {};
       $scope.tracker.alterandoCor = promiseTracker();
            
       $scope.listaItens = _.map(_.range(1,850), function(num){
            var aleatorio = _.random(1,10);
            return {
                id: aleatorio,
                descricao: 'Anúncio ('+num+') + id ('+aleatorio+')'
            }
       });
            
       function alteraCor (idItem){
           return $q(function(resolve){
                setTimeout(
                    function(){
                        $scope.listaItens[idItem].id = 11;
                        console.log('Teoricamente alteraria');
                        testPromise(_.random(0,350));
                        resolve();
                    }
                ,1000);
           });
       }
            
       function testPromise (){
           var random = _.random(0,350);
           
           alteraCor(random).then(
                function(){
                    console.log('Alterando...');
                }
           );
       }
       
       (function(){
           testPromise();
       })();
               
    }]);
})();