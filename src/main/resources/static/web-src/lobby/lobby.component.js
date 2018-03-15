module.exports = function(ngModule){
    function controller(){
        var vm = this;

        vm.message = "";
        vm.$onInit = function(){
            console.log('init lobby...');
            vm.message = "Hello";
        }
    }

    ngModule.component('lobby',{
        template: require('./lobby.html'),
        bindings:{
            message:'<'
        },
        controllerAs:'vm',
        controller:[controller]
    })
}