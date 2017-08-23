<template>
	<div id="Master" class="master-div">
		<h1>MASTER: {{menuChoice}}</h1>

		<div :class=computedClass(item.Id) v-for="(item, index) in lista" >
			<p class = "nameParagraph">{{index}}    </p>
			<p class = "nameParagraph">{{item.Nombre}}</p>
			<div class ="rowButtonsContainer" >
				<button class="masterButton" v-on:click="readDetail(item.Id)" ><img class="buttonImage" src="images/read.png"/></button>
				<button class="masterButton" v-on:click="updateDetail(item.Id)" ><img class="buttonImage" src="images/update.png"/></button>
				<button class="masterButton" v-on:click="deleteItem(item.Id)" ><img class="buttonImage" src="images/delete.png"/></button>
			</div>
		</div>
		<button class="masterButton buttonNew" v-on:click="newDetail()" ><img class="buttonImage" src="images/new.png"/></button>

	</div>
</template>

<script type="text/javascript">
export default {
	name:"master",
 	props: ['menuChoice'],
	data: function () {
		return {
     		lista:[]
		}
	},

	methods:{
			chooseMenu: function(menu){
				this.menuChoice = menu;
				this.read = this.read; // Esto es para que se recargue menuChoice. No se por que
				this.makeGetListRequest();
				this.read = true;
				this.currentObject.index = "";
				this.currentObject.property1 = "";
				this.currentObject.property2 = "";
				this.currentObject.property3 = "";

			},
			makeGetListRequest: function(){
				$.ajax(url=baseURL + this.menuChoice,
					method="GET")
				.done(this.submitGetListValues)
			},
			submitGetListValues: function(datos){
				this.lista = datos;
			},
			makeGetRequest: function(id){
				$.ajax(url=baseURL + this.menuChoice + "/" + id,
					method="GET")
				.done(this.submitDetailValues)
			},
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
			submitDetailValues: function(datos){
				if(this.menuChoice == 'Usuarios'){
				this.currentObject.index = datos.Id;
				this.currentObject.property1 = datos.Nombre;
				this.currentObject.property2 = datos.Apellido;
				this.currentObject.property3 = datos.Edad;
			}
			else if(this.menuChoice == 'CuentaBancarias'){
				this.currentObject.index = datos.Id;
				this.currentObject.property1 = datos.Credito;
				this.currentObject.property2 = datos.Numero;
				this.currentObject.property3 = datos.Saldo;
			}
			else if(this.menuChoice == 'Domicilios'){
				this.currentObject.index = datos.Id;
				this.currentObject.property1 = datos.Calle;
				this.currentObject.property2 = datos.Numero;
				this.currentObject.property3 = datos.Ciudad;
			}
			},
			buttonAccept: function(){
				if(this.currentObject.index==""){
					this.makePostRequest(this.currentObject);
				}
				else{
					this.makePutRequest(this.currentObject);

				}
			},
			makePutRequest: function(item){
				$.ajax({url:baseURL + this.menuChoice +"/" + item.index,
					method:"PUT",
					data: 	{Id: item.index,
						Nombre: item.property1,
						Apellido: item.property2,
						Edad: item.property3}})	
				.done(this.makeGetListRequest)
				.fail(function(){
					alert("ELEMENTO NO ACTUALIZADO");
				})
			},
			makePostRequest: function(item){
				var datos;
				if(this.menuChoice == 'Usuarios'){
					datos = {
				Nombre: this.currentObject.property1,
				Apellido: this.currentObject.property2,
				Edad: this.currentObject.property3
			};
			}
			else if(this.menuChoice == 'CuentaBancarias'){
				datos = {
				Credito: this.currentObject.property1,
				Numero: this.currentObject.property2,
				Saldo: this.currentObject.property3
			};
			}
			else if(this.menuChoice == 'Domicilios'){
				datos = {
				Calle: this.currentObject.property1,
				Numero: this.currentObject.property2,
				Ciudad: this.currentObject.property3
			};
			}
				$.ajax({url:baseURL + this.menuChoice,
					method:"POST",
					data: datos})	
				.done(this.afterPostHandler)
				.fail(function(){
					alert("ELEMENTO NO CREADO");
				})
			},
			afterPostHandler: function(datos){
				this.makeGetListRequest();
				this.currentObject.index = datos.Id;
				this.previousObject.index = this.currentObject.index;
				this.previousObject.property1 = this.currentObject.property1;
				this.previousObject.property2 = this.currentObject.property2;
				this.previousObject.property3 = this.currentObject.property3;
			},
			computedClass: function (index) {
				classArray = "master-div-row ";
				if (this.currentObject.index != "" && index == this.currentObject.index) {
					classArray = classArray + "selected";
				}            

				return classArray;
			},
			readDetail: function(index){
				this.makeGetRequest(index);
				this.read = true;
			},
			updateDetail: function(index){
				this.makeGetRequest(index);
				this.previousObject.index = this.currentObject.index;
				this.previousObject.property1 = this.currentObject.property1;
				this.previousObject.property2 = this.currentObject.property2;
				this.previousObject.property3 = this.currentObject.property3;
				this.read = false;
			},
			newDetail: function(index){
				this.read= false;
				this.currentObject.index = "";
				this.currentObject.property1 = "";
				this.currentObject.property2 = "";
				this.currentObject.property3 = "";
			},
			deleteItem: function(index){
				$.ajax({url: baseURL + this.menuChoice +"/" + index,
					method:"DELETE"})	
				.done(this.makeGetListRequest)
				.fail(function(){
					alert("ELEMENTO NO BORRADO");
				})
			},
			buttonClean: function(){
				this.currentObject.index = "";
				this.currentObject.property1 = "";
				this.currentObject.property2 = "";
				this.currentObject.property3 = "";
			},
			buttonReset: function(){
				this.currentObject = this.previousObject;
			},
		}


}

</script>
<style type="text/css"></style>