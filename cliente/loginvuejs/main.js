import Vue from 'vue'
//import Master from './components/master.vue'
//import Detail from './components/detail.vue'
import Root from './components/root.vue'

new Vue({
  el: '#Master-Detail',
  render: h => h(Root),
  //components: {
    //'master': Master,
    //'detail': Detail
  //}
})