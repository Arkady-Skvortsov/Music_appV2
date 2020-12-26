<template>
	<div class="Search">
        
        <div class="SearchChoice" @click="ChangeChoice">
        	<span class="ChoiceTXT" ref="ChoiceTXT">{{searchChoice}}</span>
        </div>

		<UsuallySearchPole
            :searchChoice="searchChoice"
		/>

		<div class="SearchContainer">
			<Soundtracks 
			    v-for="(sound, index) in FilterBySearch"
			    :key="index"
          :soundtrack_info="sound"
      />
    </div>
  </div>
</template>

<script>
  import UsuallySearchPole from './UsuallySearchPole.vue'
  import Soundtracks from './Soundtracks.vue'

	export default {
		name: "Search",

		data() {
			return {
				SearchArray: [],
				searchChoice: "По композициям"
			}
		},

        methods: {
           SearchFilter() { 
               let vm = this

               this.SearchArray = []

               if(this.searchVal) {
                  if(this.searchChoice === "По композициям") {
                     this.SearchArray = this.soundtracks.filter(item => {
                       return item.SoundName.toLowerCase().includes(vm.searchVal.toLowerCase())
                     })
                  } else if(this.searchChoice === "По авторам") {
                     this.SearchArray = this.soundtracks.filter(item => {
                       return item.ComposerName.toLowerCase().includes(vm.searchVal.toLowerCase())
                     })
                  } else {
                     this.SearchArray = this.soundtracks.filter(item => {
                       return item.SoundCollection.toLowerCase().includes(vm.searchVal.toLowerCase()) 
                     })
                  }
               } else {
                  this.SearchArray = this.soundtracks
               }
           },

           ChangeChoice() {
           	  if(this.searchChoice === "По композициям") {
                 this.searchChoice = "По авторам"
           	  } else if(this.searchChoice == "По авторам") {
           	  	 this.searchChoice = "По теме"
           	  } else {
                 this.searchChoice = "По композициям"
              }
           }
        },

        computed: {
           FilterBySearch() {
           	  return this.SearchArray
           },

           soundtracks() {
             return this.$store.getters.SOUNDTRACKS
           },

           searchVal() {
             return this.$store.getters.SEARCHVALUE
           }   
        },

        watch: {
        	searchVal() {
        		this.SearchFilter()
        	}
        },

        mounted() {
           this.$store.dispatch('GET_SOUND_FROM_API')

           .then(() => {
             	this.SearchFilter()

              this.SearchArray = this.soundtracks
           })
        },

		components: {
			UsuallySearchPole,
			Soundtracks
		}
	}
</script>

<style lang="scss">
	.Search {
		min-height: 757px;
		width: 1592px;
		background: $b;
		position: absolute;

		.SearchChoice {
			height: 105px;
			width: 200px;
			background: black;
			border: 2px solid $l_color;
			top: 15px;
			left: 125px;
			position: absolute;

			.ChoiceTXT {
				position: relative;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: bold;
				color: $l_color;
				top: 35px;
				font-size: 22.5px;
				font-family: $farro;
				transition: $tran_8;
				-o-transition: $tran_8;
		        -moz-transition: $tran_8;
		        -webkit-transition: $tran_8;

		        &:hover {
                    text-shadow: 0 0 20px $l_color;
		        }
			}
		}

		.SearchContainer {
	        margin: 200px auto;
	        width: 1592px;
	        min-height: 757px;
	        background: $b;
		}
	}
</style>