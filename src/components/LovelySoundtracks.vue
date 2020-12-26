<template>
	<div class="lovely_soundtrack_block" 
	     ref="lovely_soundtrack_block"
	     :style="{background: LovelyProp.BgColor}"
	     @click="SetComponent"
	> <!-- What?  -->
		<div 
		    class="lovely_soundtrack_img_block"
		    :style="{'background-image': `url(${LovelyProp.MainImg})`, 'background-position': 'center', 'background-size': 'cover'}"
		>
		</div>

		<div class="lovely_soundtrack_names">
			<span class="lovely_soundtrack_name" ref="lovely_soundtrackName" @click="GoToPlayer">{{LovelyProp.SoundName}}</span>
			<span class="lovely_composer_name" ref="lovely_composerName">{{LovelyProp.ComposerName}}</span>
		</div>
        
       <div v-if="LovelyProp.Shows === false && LovelyProp.Mark >= 0">
            <div>
               <span class="mark">{{LovelyProp.Mark}}</span>	 
            </div>
       </div>
        <div v-if="LovelyProp.Shows === false">
           <i class="material-icons lovely_star" ref="star" @click="openStat">star</i>	
        </div>
       <div v-if="LovelyProp.Shows === false">
           <i class="material-icons lovely_heart" ref="lovely_heart" @click="DeleteSound">favorite</i> 
	   </div>
	</div>
</template>

<script>
	export default {
		name: "LovelySoundtracks",
		
		props: {
			LovelyProp: {
				type: [Array, Object, String, Number],
				default() {
					return []
				}
			}
		},

		emits: ['DeleteSound2', 'ShowMark', 'SetComponent'],

		data() {
		  return {
		  	  obj: {
		        id: new Date().toLocaleString(),
                name: this.LovelyProp.SoundName,
                img: this.LovelyProp.MainImg,
                message: "удален из любимых саундтреков"
		  	  }
		  } 
		},

		methods: {
          SetComponent(e) {
          	if(e.target.className === "lovely_soundtrack_block" || e.target.className === "lovely_soundtrack_block other_color") {
                this.$emit('SetComponent', this.LovelyProp)
            }
          }, 

          GoToPlayer() {
			      this.$store.dispatch("GET_SOUNDTRACK", this.LovelyProp)
		      },

		  DeleteSound() {
		  	 this.$refs.lovely_heart.classList.add('HeartBeatDelete') // :class="{}", :style="{}".... 

		  	 setTimeout(() => {
                this.$refs.lovely_heart.classList.remove('HeartBeatDelete')

                this.$store.dispatch("SET_NOTIFICATION", this.obj)

                this.$emit('ShowMark', this.LovelyProp.Mark)

                this.$emit('DeleteSound2') //Да спасет меня <transition></transition>
		  	 }, 510)
		  },

		  openStat() {
           this.$store.dispatch("SET_INFORMATION", {id: Date.now().toLocaleString(), name: this.LovelyProp.SoundName, img: this.LovelyProp.MainImg})
           .then(this.$store.dispatch("SET_SOUNDTRACK2", this.LovelyProp))

           this.$store.dispatch("SET_SHOW", true)
		  }
		},

		computed: {
        mark() {
          return this.$store.getters.MARK
        },

        show_delete() {
          return this.$store.getters.SHOW_DELETE
        },

        show_delete2() {
          return this.$store.getters.SHOW_DELETE2
        },

        deleteArray() {
          return this.$store.getters.DELETEARR
        }
		},

		updated() {
          this.LovelyProp.Mark = this.mark

          this.LovelyProp.Shows = this.show_delete2
		}
	}
</script>

<style lang="scss">
	.lovely_soundtrack_block {
		height: 150px;
		width: 1555px;
		left: 15px;
		position: relative;
		border: 1px solid $l_color;
		margin-top: 50px;
		transition: $tran_8;
		-o-transition: $tran_8;
		-moz-transition: $tran_8;
		-webkit-transtion: $tran_8;

		 &:hover {
		 	transform: translateY(-2.5px);

		 	.lovely_soundtrack_img_block {
                box-shadow: inset 0 0 20px $l_color;		 		
		 	}
		}

		.lovely_soundtrack_img_block {
			height: 154px;
			width: 327px;
			position: absolute;
			left: -2px;
			top: -2px;
			transition: $tran_8;
		    -o-transition: $tran_8;
		    -moz-transition: $tran_8;
		    -webkit-transtion: $tran_8;
		}

		.lovely_soundtrack_names {
              color: $l_color;
              position: relative;

		     .lovely_soundtrack_name {
		     	font-size: $m_name;
		     	font-family: $farro;
		     	margin-left: 360px;
		     	display: block;
		     	cursor: pointer;
		     	margin-top: 40px;
		     	transition: $tran_8;
		     	-o-transition: $tran_8;
		     	-moz-transition: $tran_8;
		     	-webkit-transition: $tran_8;

		     	 &:hover {
		           text-shadow: 0 0 10px $b;
		        }
		     }

		     .lovely_composer_name {
		     	font-size: $m_author;
		     	font-family: $fauna_one;
		     	margin-left: 360px;
		     }
		}

		.mark {
			font-size: $close_i;
			color: $s_color;
			position: absolute;
			margin-top: -80px;
			margin-left: 1275px;
			cursor: pointer;
		}

		.lovely_star {
			font-size: $close_i;
			color: $s_color;
			position: relative;
			float: right;
			margin-top: -75px;
			margin-right: 150px;
			transition: $tran_8;
            -o-transition: $tran_8;
            -moz-transition: $tran_8;
            -webkit-transition: $tran_8;
            cursor: pointer;

            &:hover {
                opacity: .2;
            	transform: rotate(145deg);
            }
		}

        .lovely_heart {
        	font-size: $close_i;
        	color: $h_color;
        	position: relative;
        	float: right;
        	margin-top: -75px;
        	margin-right: 50px;
            transition: $tran_8;
            -o-transition: $tran_8;
            -moz-transition: $tran_8;
            -webkit-transition: $tran_8;
            cursor: pointer;

            &:hover {
            	color: rgba(255, 20, 147, .2);
            	text-shadow: 0 0 30px rgba(255, 20, 147, .2);
            }
        }

        .rem {
        	font-size: $close_i;
        	color: $r;
        	position: relative;
        	float: right;
        	margin-top: -75px;
        	margin-right: 50px;
            transition: 1s ease-in;
            -o-transition: 1s ease-in;
            -moz-transition: 1s ease-in;
            -webkit-transition: 1s ease-in;
            cursor: pointer;
            font-weight: bold;

            &:hover {
            	transform: rotate(360deg);
            	text-shadow: 0 0 20px $r;
            }
        }

        .HeartBeatDelete {
        	animation: HeartBeatDelete .5s linear 1;
        }

        @keyframes HeartBeatDelete {
        	0% {
               transform: scale(.8);
               color: rgba(255, 20, 147, .1);
        	}

            25% {
               transform: scale(.6);
               color: rgba(255, 20, 147, .3);  
            }

            35% {
               transform: scale(.4);
               color: rgba(255, 20, 147, .5);
            }

        	50% {
               transform: scale(.6);
               color: rgba(255, 20, 147, .7);
        	}

        	75% {
               transform: scale(.8);
               color: rgba(255, 20, 147, .8);
        	}

        	85% {
               transform: scale(1.4);
               color: rgba(255, 20, 147, .9);
        	}

        	100% {
               transform: scale(1);
               color: rgba(255, 20, 147 , 1);
        	}
        }
   }

   .other_color {
	    background: $del_color;
	}
</style>