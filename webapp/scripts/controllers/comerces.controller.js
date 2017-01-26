angular.module('mpos').controller('comercesCtrl', function(){
   let vm = this;
   vm.sendComerce = ()=>{
       if(vm.comercesForm.$invalid){
           angular.forEach(vm.comercesForm.$error.required, field=>{
              field.$setDirty();
              field.$setTouched();
           });
       }
   }
});