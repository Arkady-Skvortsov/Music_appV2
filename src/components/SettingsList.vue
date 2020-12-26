<template>
  <transition :name="TransitionName3">
	<div class="SettingsList" :key="TransitionName3">
		<div class="CloseBlock" @click="CloseSettings">
			<i class="material-icons cl">close</i>
		</div>

		<div class="SortBlock" @click="ArrowAnim">
			<span class="TextSort" ref="TextSort">{{SortText}}</span>
			<div>
			   <i class="material-icons down" ref="down">keyboard_arrow_up</i>
			</div>
		</div>

		<SortCategories 
       v-if="ShowCat"
       :SortK="setting"
       @HideCategories2="HideCategories3"
		/>
	</div>
  </transition>
</template>

<script> 
    import SortCategories from './SortCategories.vue'

    export default {
    	name: "SettingsList",

    	data() {
    		return {
          SortText: "Стандартно",

          setting: [],

          ShowCat: false,

          TransitionName3: '',

          SortedArrayNum3: []
     		};
    	},

    	props: {
           SortedArrayNum2: {
           	  type: [Array, Object, String],
           	  default() {
           	  	 return []
           	  } 
           },

           LOVELYSOUNDTRACKS2: {
           	  type: [Array, Object],
           	  default() {
           	  	 return []
           	  }
           },

           TransitionName2: {
               type: String,
               default() {
                 return ""
               }
           }
    	},

    	methods: {
    		CloseSettings() {
    			this.$emit('CloseSettings')
    		},

    		ArrowAnim() {
              if(!this.$refs.down.classList.contains("downActive")) {
              	 this.$refs.down.classList.add('downActive')

              	 this.ShowCat = true
              } else {
              	 this.$refs.down.classList.remove('downActive')

              	 this.ShowCat = false
              }
           },

           shuffle(arr){
               let j, temp;

               for(let i = arr.length - 1; i > 0; i--){
                 j = Math.floor(Math.random()*(i + 1));
                 temp = arr[j];
                 arr[j] = arr[i];
                 arr[i] = temp;
               }

               return arr;
           },

           HideCategories3(param) {
              if(this.$refs.down.classList.contains('downActive')) {
                 this.$refs.down.classList.remove("downActive")

                 this.ShowCat = false

                 this.SortText = this.setting[param].text  

                 if(param >= 3) { //Починил выбор категорий(проблемы с текстом). Да, исправил. Проблемы с версткой
                    this.$refs.TextSort.style.fontSize = '25px'
                    this.$refs.TextSort.style.top = '15px'
                    this.$refs.TextSort.style.left = '10px'
                 } else {
                 	  this.$refs.TextSort.style.fontSize = '45px'
                 	  this.$refs.TextSort.style.top = '0px'
                 	  this.$refs.TextSort.style.left = '0px'
                 }

                 switch(param) {
                   case 0: 
                     this.SortedArrayNum3.sort((a, b) => String(a.index).localeCompare(String(b.index)))
                   break; 

                   case 1: 
                    this.SortedArrayNum3.sort((a, b) => a.ComposerName.localeCompare(b.ComposerName))
                   break;

                   case 2: 
                    this.SortedArrayNum3.sort((a, b) => a.SoundName.localeCompare(b.SoundName))
                   break;

                   case 3:                       
                    this.shuffle(this.SortedArrayNum3)
                   break;

                   case 4: 
                    this.SortedArrayNum3.sort((a, b) => b.Duration.localeCompare(a.Duration)) 
                   break;

                   case 5: 
                    this.SortedArrayNum3.sort((a, b) => String(b.Mark).localeCompare(String(a.Mark)))
                   break;
                 }
              } //Продолжу завтра).. Надо будет исправить ошибку и сделать воторой Action для поля и его значения: cheched!
           }
    	},

      computed: {
        settings() {
          return this.$store.getters.SETTINGS
        }
      },

    	mounted() {
           this.SortedArrayNum3 = this.SortedArrayNum2

           this.TransitionName3 = this.TransitionName2

           this.setting = this.settings
    	},

    	components: {
           SortCategories
    	}
    }
</script>

<style lang="scss">
	.SettingsList {
		height: 757px; /* 757px */
		width: 1592px;
		background: $b;
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;

		.CloseBlock {
			height: 100px;
			width: 100px;
			background: $b;
			margin: 40px auto;
			border: 2px solid $l_color;

			.cl {
				font-size: 90px;
				color: $l_color;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 7.5px;
				cursor: pointer;
				transition: $tran_8;
				-o-transition: $tran_8;
				-moz-transition: $tran_8;
				-webkit-transition: $tran_8;
         
                &:hover {
                	transform: rotate(360deg);
                }
			}
		}

		.downActive {
	    	transform: rotate(180deg);
	    }

	    .SortBlock {
	    	height: 60px;
	    	width: 350px; 
	    	background: $l_color;
	      margin: 100px auto; // margin: 25px auto;
	      border-bottom: 2px solid $b;
	    	cursor: pointer;

	    	.TextSort {
	    		font-family: $farro;
	    		position: relative;
	    		float: left;
	    		font-size: $f_size_2;
	    	}

	    	.down {
	    		font-size: $i_panel;
	    		color: black;
	    		margin: 0 auto;
          margin-left: 5px;
	    		transition: $tran_8;
	    		-o-transition: $tran_8;
	    		-moz-transition: $tran_8;
	    		-webkit-transition: $tran_8;
	    	}
	    }
	}

    .SettingsL-enter-to {
        animation: SettingsL .5s ease-in-out 1;
    }

    .SettingsL-leave-to { 
        animation: SettingsL .5s ease-in-out 1 reverse;
    }

    .SettingsL-enter-active, .Settings-leave-active {
         transition: transform opacity .7s;
         -o-transiition: transform opacity .7s;
         -moz-transition: transform opacity .7s;
         -webkit-transition: transform opacity .7s;
    }

    @keyframes SettingsL {
      0% {
        opacity: 0;
        transform: translateY(757px);
      }

      25% {
        opacity: .2;
        transform: translateY(600px); 
      }

      50% {
        opacity: .4;
        transform: translateY(450px);
      }

      65% {
        transform: translateY(300px);
        opacity: .6;
      }

      75% {
        opacity: .8;
        transform: translateY(150px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

</style>