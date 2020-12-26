import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "firebase/firestore";
import firebaseConfig from "./config/firebase.js";
import firebase from "firebase";
// SCSS
import "./components/SCSS/styles.scss";
/* Font-awesome для Vue.js/React.js */
import "font-awesome/css/font-awesome.min.css";
/* Material icons... А работает со всеми фреймами)) */
import "material-design-icons-iconfont";

//Vue.$http = axios // Пример с договоренностью - работает!

Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);

Vue.config.productionTip = false;

const firebaseApp = firebase.initializeApp(firebaseConfig);

//Cloud FireStore
const db = firebaseApp.firestore()

db.settings({
	timestampsInSnapshots: true
})

Vue.$db = db

new Vue({
  router,
  store,
  render: h => h(App),
  created() { 
    firebase.auth().onAuthStateChanged((user) => {
       if(user) {
         this.$store.dispatch('SET_CHANGED', user)

         this.$store.dispatch('SET_NOTIFICATION', {
            id: Date.now().toLocaleString(),
            MainImg: '',
            name: user.email,
            message: "вы зарегистрировались"  
         })

         console.log(this.$store.getters.IS_AUTH2)
       } else {
       	 this.$store.commit('CLEAR_USER')

         this.$store.dispatch('SET_NOTIFICATION', {
            id: Date.now().toLocaleString(),
            MainImg: "",
            name: "Пользователь",
            message: "вы не зарегистрировались"
         }) 

         console.log(this.$store.getters.IS_AUTH2)
       }
    })
  }
}).$mount("#app");
