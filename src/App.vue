<template>
  <div id="app">

    <Notification />

    <DeleteSoundtracks v-if="ShowDel" />
    
    <StarStatistic v-if="IsShow" />

    <mainPlayer /> 

    <navbar />

    
    <router-view />
  </div>
</template>

<script>
  import Notification from "./components/Notification.vue"
  import StarStatistic from "./components/StarStatistic.vue"
  import navbar from "./components/navbar.vue"
  import mainPlayer from "./components/MainPlayer.vue"
  import DeleteSoundtracks from './components/DeleteSoundtracks.vue'

	export default {
		components: {
			navbar,
      mainPlayer,
      Notification,
      StarStatistic,
      DeleteSoundtracks
		},
    
    computed: {
      IsShow() {
        return this.$store.getters.ISSHOW
      },

      ShowDel() {
        return this.$store.getters.SHOW_DELETE
      },

      soundtrack() {
        return this.$store.getters.SOUNDTRACK
      }
    }
	}
</script>

<style lang="scss">
   @import url('https://fonts.googleapis.com/css2?family=Farro&display=swap'); //Farro - "Farro", sans-serif
   @import url('https://fonts.googleapis.com/css2?family=Fauna+One&display=swap'); //Fauna One - "Fauna One", serif
   
   * {
   	 margin: 0;
   	 padding: 0;
   }
   
   ::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

::-webkit-scrollbar-thumb {
  background: #888; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
} /* Для scrollbar */

</style>
