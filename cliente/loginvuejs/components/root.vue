<template>


	<div id="AppFormulario">
		<div id = "Menu" >
				<a :class ="anchorClass('Usuarios')" v-on:click="chooseMenu('Usuarios')">Usuarios</a>
				<a :class ="anchorClass('CuentaBancarias')" v-on:click="chooseMenu('CuentaBancarias')">Cuentas Bancarias</a>
				<a :class ="anchorClass('Domicilios')" v-on:click="chooseMenu('Domicilios')">Domicilios</a>

		</div>
		<master	:menuChoice="menuChoice"></master>
		<detail :menuChoice="menuChoice"></detail>
	</div>
</template>
<script>
	import Master from './master.vue'
	import Detail from './detail.vue'

export default {
	data: function () {
		return {
     		menuChoice: "Usuarios"
		}
	},
	components: {
    'master': Master,
    'detail': Detail
  	},
  	methods: {
		anchorClass: function(anchor){
			let classproperty1 = "anchorMenu ";

			if(anchor == this.menuChoice){
			classproperty1 = classproperty1+ "anchorSelected";
			}
			else{
			classproperty1 = classproperty1 +	"anchorNotSelected";
			}
			return classproperty1;
		},

  	},
	
}


</script>
<style type="text/css"></style>