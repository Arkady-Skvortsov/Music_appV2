<template>
	<div class="LovelyList">
         <div class="SearchSettings" @click="SettingsShow">
            <i class="material-icons s">settings</i>
         </div>
         
        <keep-alive>
         <SettingsList
            v-if="SettingsProps"
            @CloseSettings="CloseSettings2"
            :SortedArrayNum2="SortedArray"
            :LOVELYSOUNDTRACKS2="lovelySoundtracks"
            :TransitionName2="TransitionName"
         > 
         </SettingsList>
        </keep-alive>

         <SearchPole />
      
         <span v-if="!lovelySoundtracks.length">У вас пустой список</span>

         <span class="SearchTxt" ref="SearchTxt" v-else>{{searchValue2}}</span>

        <div class="LovelyList_container">
            <LovelySoundtracks 
         	    v-for="(fLove, index) in FilteredLove"
         	    :key="index"
              :LovelyProp="fLove"
              @DeleteSound2="DeleteSound3(index)"
              @ShowMark="ShowMark2"
              @SetComponent="SetComponent2"
         	  /> 
        </div> 
	</div>
</template>

<script>
	import LovelySoundtracks from './LovelySoundtracks.vue'
  import SearchPole from './SearchPole.vue'
  import SettingsList from './SettingsList.vue'

	export default {
		name: "List",

		data() {
			return {
          SortedArray: [],

          SettingsProps: false,

          InputVal: 0,

          TransitionName: "SettingsL",

          Notification2: [],

          settings: []
   			};
		},

		methods: {
           DeleteSound3(index) {
              this.$store.dispatch("DELETE_LOVELY_SOUNDTRACKS", index)
              .then(console.log(index))
           },

           ShowMark2(mark) {
              mark = 0
           },

           SearchCheck() { 
              this.SortedArray = []
                           
              let vm = this

              if(this.searchValue2 && this.showDelete === false) {
                 this.SortedArray = this.lovelySoundtracks.filter(item => {
                    return item.SoundName.toLowerCase().includes(this.searchValue2.toLowerCase())
                 }) // Зачем писать return, когда у нас есть lambda функция?
              } else {
                 this.SortedArray = this.lovelySoundtracks
              }
           },

           SettingsShow() {
             if(this.showDelete === true)
                this.SettingsProps = false

              else 
                this.SettingsProps = true 
           },

           CloseSettings2() {
             this.SettingsProps = false
           },

           SetComponent2(data2) { 
            let obj = {
              id: new Date().toLocaleString(),
              name: data2.SoundName,
              img: data2.MainImg,
            }

            if(!this.deleteArray.includes(data2)) {
               this.$stre.dispatch("SET_DELETE_ARRAY", data2)

               obj.message = "был выбран"

               this.$store.dispatch("SET_NOTIFICATION", obj)

               data2.BgColor = "#4254B1"

               this.$store.dispatch("SET_DELETE", true)

               data2.Shows = this.$store.dispatch("SET_DELETE2", true)
            } else {
               this.$store.dispatch("DEL_DELETE_ARRAY", data2.index)

               data2.BgColor = "black"

               data2.Shows = this.$store.dispatch("SET_DELETE2", false)

               obj.message = "был удален из массива"

               this.$store.dispatch("SET_NOTIFICATION", obj)

               if(this.deleteArray.length === 0) {
                this.$store.dispatch("SET_DELETE", false)

                data2.Shows = this.$store.dispatch("SET_DELETE2", false)
               }
            }
           }
		},

    watch: {
        searchValue2() {
           this.SearchCheck()
        }
    },

		computed: {
        soundtracks() {
          return this.$store.getters.SOUNDTRACKS
        },

        searchValue2() {
          return this.$store.getters.SEARCHVALUE2
        },

        lovelySoundtracks() {
          return this.$store.getters.LOVELYSOUNDTRACKS
        },

        deleteArray() {
          return this.$store.getters.DELETEARR
        },

        showDelete() {
          return this.$store.getters.SHOW_DELETE
        },

        showDelete2() {
          return this.$store.getters.SHOW_DELETE2
        },

        FilteredLove() {
           return this.SortedArray
        }
		},

    mounted() {
        this.SortedArray = this.lovelySoundtracks

        this.SearchCheck()
    },

		components: {
       LovelySoundtracks,
       SearchPole,
       SettingsList
		}
	}
</script>

<style lang="scss">
  body {
    background: $b;
  }

	.LovelyList {
		min-height: 757px; /* 757px - default height */
		width: 1592px;
	    background: $b;
	    position: absolute;

      .SearchSettings {
          height: 105px;
          width: 105px;
          position: absolute;
          top: 15px;
          left: 75px;
          background: $b;
          cursor: pointer;
          border: 2px solid $l_color;

          .s {
             display: flex;
             justify-content: center;
             align-items: center;
             margin-top: 10px;
             font-size: 85px;
             color: $l_color;
             transition: $tran_8;
             -o-transition: $tran_8;
             -moz-transition: $tran_8;
             -webkit-transition: $tran_8;

             &:hover {
               transform: rotate(180deg);
             }
          }
      }

      .SearchTxt {
        color: $l_color;
        font-size: $f_size_2;
        position: absolute;
        font-family: $farro;
        top: 120px;
        left: 585px;
      }

	    .LovelyList_container {
	    	width: 1592px;
	    	min-height: 2000px;
	    	position: absolute;
	    	background: $b;
	    	top: 175px;
	    	left: 0;
	    }
	}
</style>