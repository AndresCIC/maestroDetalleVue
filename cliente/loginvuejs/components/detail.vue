<template>
	<div class="detail-div" id="Detail">
		<div v-if="menuChoice==='Usuarios'">
			<div id ="FormularioUsuarios"  class="Formulario">
				<label>Nombre:</label>
				<input :disabled="read" v-model="currentObject.property1" type="text" id="nombreInput" placeholder="Nombre"></input>
				<label>Apellido:</label>
				<input :disabled="read" type="text" v-model="currentObject.property2" id="apellidoInput" placeholder="Apellido"></input>
				<label>Edad:</label>
				<input :disabled="read" type="number" v-model="currentObject.property3" id="edadInput" placeholder="Edad"></input>
				<div class = "buttonContainer">
					<button  id="acceptButton" v-on:click="buttonAccept">ACEPTAR</button>
					<button  id="limpiarButton" v-on:click="buttonClean">LIMPIAR</button>
					<button  id="resetButton" v-on:click="buttonReset">RESET</button>
				</div>
			</div>
		</div>

		<div v-if="menuChoice==='CuentaBancarias'">
			<div id ="FormularioCuentas"  class="Formulario">
				<label>Credito:</label>
				<input :disabled="read" v-model="currentObject.property1" type="checkbox" id="nombreInput" placeholder="Credito"></input>
				<label>Numero:</label>
				<input :disabled="read" type="number" v-model="currentObject.property2" id="apellidoInput" placeholder="Numero"></input>
				</br>
				<label>Saldo:</label>
				<input :disabled="read" type="number" v-model="currentObject.property3" id="edadInput" placeholder="Saldo"></input>
				<div class = "buttonContainer">
					<button  id="acceptButton" v-on:click="buttonAccept">ACEPTAR</button>
					<button id="limpiarButton" v-on:click="buttonClean">LIMPIAR</button>
					<button  id="resetButton" v-on:click="buttonReset">RESET</button>
				</div>
			</div>
		</div>

		<div v-if="menuChoice==='Domicilios'">
			<div id ="FormularioDomicilios"  class="Formulario">
				<label>Calle:</label>
				<input :disabled="read" v-model="currentObject.property1" type="text" id="nombreInput" placeholder="Calle"></input>
				<label>Numero:</label>
				<input :disabled="read" type="number" v-model="currentObject.property2" id="apellidoInput" placeholder="Numero"></input>
				</br>
				<label>Ciudad:</label>
				<input :disabled="read" type="text" v-model="currentObject.property3" id="edadInput" placeholder="Ciudad"></input>
				<div class = "buttonContainer">
					<button id="acceptButton" v-on:click="buttonAccept">ACEPTAR</button>
					<button  id="limpiarButton" v-on:click="buttonClean">LIMPIAR</button>
					<button id="resetButton" v-on:click="buttonReset">RESET</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
var baseURL = "http://localhost:62270/api/";
export default {
	props: ['menuChoice'],
	name:"Detail",
	data: function () {
		return {
     		currentObject:{
				index:"",
				property1:"",
				property2:"",
				property3:""
			},
			previousObject:{
				index:"",
				property1:"",
				property2:"",
				property3:""
			},
			read: true
		}
	},
	methods:{
	  // all code for my component goes here
	 	 makeGetRequest: function(id){
					$.ajax(url="http://localhost:62270/api/" + this.menuChoice + "/" + id,
						method="GET")
					.done(this.submitDetailValues)
		},
		readDetail: function(index){
		this.makeGetRequest(index);
		this.read = true;
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
		updateDetail: function(index){
			this.makeGetRequest(index);
			this.previousPerson.index = this.currentPerson.index;
			this.previousPerson.name = this.currentPerson.name;
			this.previousPerson.surname = this.currentPerson.surname;
			this.previousPerson.age = this.currentPerson.age;
			this.read = false;
		},
		newDetail: function(index){
			this.read= false;
			this.currentPerson.index = "";
			this.currentPerson.name = "";
			this.currentPerson.surname = "";
			this.currentPerson.age = "";
		},
		deleteItem: function(index){
			$.ajax({url:"http://localhost:57470/api/ " + this.menuChoice +"/" + index,
				method:"DELETE"})	
			.done(this.makeGetListRequest)
			.fail(function(){
				alert("ELEMENTO NO BORRADO");
			})
		},
		buttonAccept: function(){
			if(this.currentObject.index==""){
				this.makePostRequest(this.currentObject);
			}
			else{
				this.makePutRequest(this.currentObject);

			}
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
	},
	mounted() {
            console.log('Component mounted.')
        }
}
</script>

<style scoped>
  /* CSS here
   * by including `scoped`, we ensure that all CSS
   * is scoped to this component!
   */
</style>
