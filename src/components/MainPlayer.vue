<template>
	<div class="main-player">
		<div class="control-block">
			<div class="control-block__previous controls controls-first" disabled>
				<i class="material-icons control" @click="Previous">skip_previous</i>
			</div>
			<div class="control-block__play controls controls-second">
				<i class="material-icons control play" ref="play" @click="Play">play_arrow</i>
			</div>
			<div class="control-block__next controls controls-third" disabled>
				<i class="material-icons control" @click="Next">skip_next</i>
			</div>
		</div>
		<div class="names-block">
			  <div>
          <span class="composition txt" ref="composition">{{soundtrack.SoundName}}</span>
		    </div>
		    <div>
          <span class="compositor txt">{{soundtrack.ComposerName}}</span>
	    	</div>
		</div>
		<div class="change-block">
			<div class="change-block__time-block" ref="time_block" v-if="isVisible">
				<span class="time">00:00</span>
			</div>
			<div class="change-block__main" ref="mainMusic" @click="changeTime2($event)" @mouseover="TimeOver" @mouseout="TimeOut" @mousemove="changeTime">
        <audio @timeupdate="Update" :src="soundtrack.SoundSource" ref="audio" class="audio"></audio>
				<div class="change-block__children" ref="childrenMusic"></div>
			</div>
		</div>
		<div class="functional-block">
			<div class="functional-block__download f_blocks">
				<i class="material-icons functional-icons functional-icon-1" :class="{down: isDownload}" @click="Download">get_app</i>
			</div>
			<div class="functional-block__random f_blocks">
        <span class="material-icons functional-icons functional-icon-2" :class="{rand: isShuffle, rand_times: isShuffle}" @click="Random">shuffle</span>
			</div>
			<div class="functional-block__volume f_blocks">
				<i class="material-icons functional-icons functional-icon-3" ref="volume" @click="Volume">volume_up</i>
			</div>
			<div class="functional-block__reload f_blocks">
				<i class="material-icons functional-icons functional-icon-4" ref="repeat" :class="{rep: isRepeat, rep_times: isRepeat}" @click="Repeat">cached</i>
			</div>
      <div class="f_blocks" v-if="soundtrack.Mark">
        <span class="functional-icon-mark">{{soundtrack.Mark}}</span>
      </div>
      <div v-if="star">
        <div class="functional-block__star f_blocks">
          <i class="material-icons functional-icons functional-icon-5" ref="Star" :class="{Star_times: isMarked}" @click="GetMark">star</i>
        </div>
      </div>
			<div class="functional-block__heart f_blocks">
			  <i class="material-icons functional-icons functional-icon-6" ref="hearT" :class="{heart: isHeart, heart2: isHeart2, heart_times: isHeart}" @click="AddFavorite">favorite</i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: "Hello",
				isVisible: false,
        isDownload: false,
        isShuffle: false,
				isRepeat: false,
        isHeart: false,
        isHeart2: false,
        isMarked: false
			}
		},

		methods: {
			changeTime(e) {
        let cords = e.offsetX / this.$refs.mainMusic.offsetWidth * this.$refs.audio.duration

        let specialCords = e.offsetX / this.$refs.mainMusic.offsetWidth * this.$refs.audio.duration * 0.8

        let formulaMin = Math.floor(cords / 60)
        let formulaSec = Math.floor(cords - formulaMin * 60)

        this.$refs.time_block.style.marginLeft = `${specialCords}px`

        if(formulaMin > 9) {
          this.$refs.time_block.children[0].innerHTML = `${formulaMin}:0${formulaSec}`
        } else if(formulaSec > 9) {
          this.$refs.time_block.children[0].innerHTML = `0${formulaMin}:${formulaSec}`
        } else {
          this.$refs.time_block.children[0].innerHTML = `0${formulaMin}:0${formulaSec}`
        }
			},

      TimeOver() {
          this.isVisible = true
      },

      TimeOut() {
          this.isVisible = false
      },

			Previous() {
				 console.log("Previous")
			},

      Play() {
        let obj = {
          id: Date.now().toLocaleString(),
          name: this.soundtrack.SoundName,
          img: this.soundtrack.MainImg
        }

				if(this.$refs.audio.paused) {
          obj.message = "воспроизводится"

					this.$refs.audio.play()
          this.$refs.play.textContent = "pause"

          this.$store.dispatch("SET_NOTIFICATION", obj)
				} else {
          obj.message = "на паузе"

					this.$refs.audio.pause()
          this.$refs.play.textContent = "play_arrow"
          
          this.$store.dispatch("SET_NOTIFICATION", obj) 
				}
			},

			Next() {
          console.log("Next")
			},

            changeTime2(e) {
               let change = e.offsetX / this.$refs.mainMusic.offsetWidth * this.$refs.audio.duration 

               this.$refs.audio.currentTime = change  
            },

            Update() {
               let time = this.$refs.audio.currentTime / this.$refs.audio.duration * 100

               this.$refs.childrenMusic.style.width = `${time}%`
            },

            Ending() {
              this.$refs.play.textContent = "play_arrow"             
 
              console.log('ending')
            },

            Download() {
              let obj = {
                id: Date.now().toLocaleString(),
                name: this.soundtrack.SoundName,
                img: this.soundtrack.MainImg
              }

              this.isDownload = !this.isDownload 

              obj.message = "скачивается"

            	let silka = document.createElement('a')
            	silka.setAttribute("href", `${this.$refs.audio.src}`)
              silka.setAttribute("target", "_blank")
              silka.setAttribute("download", `${this.$refs.composition.textContent}`)

              this.$store.dispatch("SET_NOTIFICATION", obj)

              silka.click() 
              return false
            },

            Random() {
              this.isShuffle = !this.isShuffle

              // this.$refs.audio.src = require('../assets/Sounds/' + Math.random(this.SOUNDTRACK.SoundSource) * 15)

              console.log(this.$refs.audio.src)
            },

            Volume() {
              let obj = {
                id: Date.now().toLocaleString(),
                name: this.soundtrack.SoundName,
                img: this.soundtrack.MainImg
              }

            	if(this.$refs.audio.volume === 1) {
                obj.message = "громкость 0%"

            		this.$refs.audio.volume = 0
            		this.$refs.volume.textContent = "volume_off"

                 this.$store.dispatch("SET_NOTIFICATION", obj)
            	} else {
                obj.message = "громкость 100%"

                this.$refs.audio.volume = 1
                this.$refs.volume.textContent = "volume_up"

                 this.$store.dispatch("SET_NOTIFICATION", obj)
            	}
            },

            Repeat() {
                let obj = {
                   id: Date.now().toLocaleString(),
                   name: this.soundtrack.SoundName,
                   img: this.soundtrack.MainImg
                }

                if(!this.$refs.audio.loop) {
                  obj.message = "поставлен на повторное воспроизведение"

                	this.$refs.audio.loop = true

                  this.isRepeat = true

                  this.$refs.repeat.style.color = 'rgba(255, 174, 0, 1)'

                  this.$store.dispatch("SET_NOTIFICATION", obj)
                } else {
                  obj.message = "снят с повторного воспроизведения"  

                	this.$refs.audio.loop = false
                  
                  this.isRepeat = false

                  this.$refs.repeat.style.color = 'white'

                  this.$store.dispatch("SET_NOTIFICATION", obj)
                }
            },

            GetMark() {
               this.$store.dispatch("SET_INFORMATION", {id: Date.now().toLocaleString(), name: this.soundtrack.SoundName, img: this.soundtrack.MainImg})
                .then(this.$store.dispatch("SET_SOUNDTRACK2", this.soundtrack))

                this.$store.dispatch("SET_SHOW", true)
            },

            AddFavorite() { // +/-  
                let obj = {
                  id: Date.now().toLocaleString(),
                  name: this.soundtrack.SoundName,
                  img: this.soundtrack.MainImg
                }

               if(!this.lovelySoundtracks.includes(this.soundtrack)) { 
                  obj.message = "добавлен в любимые саундтреки"
 
                  this.isHeart = true
                  this.$store.dispatch("SET_STAR", true)
                  this.$refs.hearT.style.color = "rgba(255,20,147, 1)"

                  this.$store.dispatch("SET_NOTIFICATION", obj)

                  this.$store.dispatch("PUT_LOVELY_SOUNDTRACKS", this.soundtrack)
               } else {
                  obj.message = "удален из любимых саундтреков"  
                  
                  this.isHeart = false  
                  this.$store.dispatch("SET_STAR", false)
                  this.$refs.hearT.style.color = "white"

                  this.$store.dispatch("SET_NOTIFICATION", obj)

                  this.$store.dispatch("DELETE_LOVELY_SOUNDTRACKS", this.soundtrack.index)

                  this.soundtrack.Mark = 0
               }
            },
            
            //Нужно исправить баг с оценкой 
            Sycle() { 
               if(!this.lovelySoundtracks.includes(this.soundtrack)) {
                 this.isHeart = false 
                 this.$refs.hearT.style.color = "white"

                 this.$store.dispatch("SET_STAR", false)
               } else {
                  if(this.soundtrack.Mark !== 0) {  
                    this.soundtrack.Mark = this.MARK

                    this.isMarked = true
                  } else {
                    this.soundtrack.Mark = 0
                   
                    this.isMarked = false 
                  }

                  this.$store.dispatch("SET_STAR", true)

                  this.isHeart = true
                  this.$refs.hearT.style.color = "rgba(255,20,147, 1)"
              }

              switch(this.$refs.audio.volume) {
                case 0:
                  this.$refs.audio.volume = 0
                  this.$refs.volume.textContent = "volume_off"
                break;

                case 1: 
                  this.$refs.audio.volume = 1
                  this.$refs.volume.textContent = "volume_up"
                break;
              }

              switch(this.$refs.audio.loop) {
                case true:
                  this.$refs.audio.loop = true
                  this.$refs.repeat.style.color = 'rgba(255, 174, 0, 1)'
                break;

                case false: 
                  this.$refs.audio.loop = false
                  this.$refs.repeat.style.color = 'white'
                break;
              }

              switch(this.$refs.play.textContent) {
                case "play_arrow":
                  this.$refs.audio.pause()
                  this.$refs.play.textContent = "play_arrow"
                break;

                case "pause":
                  this.$refs.audio.play()
                  this.$refs.play.textContent = "pause"
                break;
              }

              // this.$refs.play.textContent = "play_arrow"

              // this.$refs.childrenMusic.style.width = 0
            } 
		},

		computed: {
      soundtrack() {
        return this.$store.getters.SOUNDTRACK   
      },

      soundtracks() {
        return this.$store.getters.SOUNDTRACKS
      },

      lovelySoundtracks() {
        return this.$store.getters.LOVELYSOUNDTRACKS
      },

      notification() {
        return this.$store.getters.NOTIFICATION 
      },

      star() {
        return this.$store.getters.STAR
      },

      mark() {
        return this.$store.getters.MARK
      }
	},

  mounted() {
    this.soundtrack.Mark = this.mark
  },

  updated() {
    this.Sycle()
  }
}
</script>

<style lang="scss" scoped>
	.main-player {
		top: 580px;
		position: fixed;
		border-top: 1px solid $l_color;
    border-bottom: 1px solid $l_color;
		height: 80px;
		width: 100%;
		background: $b;
		z-index: 3;
		overflow: hidden;
		display: flex;
		flex-direction: row;

		.control-block {
			margin-top: 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			max-width: 130px;

            .controls {
            	color: white;
            	cursor: pointer;
            	transition: .9s;

            	.control {
            		font-size: 40px;
            	}
            } 

            .controls-first {
            	&:hover {
            		transform: translateX(-5px);
            		text-shadow: 0 0 10px $l_color; 
            	}
            }

            .controls-second {
            	&:hover {
            		transform: scale(.8);
            		text-shadow: 0 0 15px $l_color;
            	}
            }

            .controls-third {
            	&:hover {
            		transform: translateX(5px);
            		text-shadow: 0 0 10px $l_color;
            	}
            }
		}

		.names-block {
			dispay: flex;
			flex-direction: column;
			justify-content: space-between;
			max-width: 580px; //590px
			margin-left: 10px;
      margin-top: 10px;

			.txt {
			   color: $l_color;
			}

			.composition {
				font-size: 25px !important;
				font-family: $farro;
			}

			.compositor {
				font-size: 15px;
				font-family: $fauna_one;
			}
		}

		.change-block {
			max-width: 700px;
			display: flex;
			margin-left: 15px;
			flex-direction: column;
			justify-content: center;
			align-items: space-around;

            .change-block__time-block {
            	width: 60px;
            	background: $b;
            	border: 1px solid $l_color;
            	height: 25px;
            	margin-top: -40px;
              position: absolute;
              z-index: 9;
            	// display: none;

            	.time {
                font-size: 20px;
                font-family: $fauna_one;
                color: $l_color;   
            	}
            }

            .change-block__main {
            	width: 700px;
            	height: 5px;
            	cursor: pointer;
            	border-radius: 25px;
            	background: $l_color;
            	transition: .7s;
            	-o-transition: .7s;
            	-moz-transition: .7s;
            	-webkit-transition: .7s;

            	&:hover {
            		opacity: .65;
            	}

            	.change-block__children {
            		height: 5px;
            		width: 0;
            		background: orange;
            		border-radius: inherit;
            	}
            }
		}

		.functional-block {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 400px;

            .f_blocks {
                .functional-icon-mark {
                  font-size: 35px;
                  color: rgba(255, 215, 0, 1);
                  font-family: $farro;
                }

                .functional-icons {
                  font-size: 45px;  
                  color: white;
            	    cursor: pointer;
            	    transition: .8s;
                  -o-transition: .8s;
                  -moz-transition: .8s;
                  -webkit-transition: .8s;
                }

                .functional-icon-1 {
                    &:hover {
                  	  transform: translateY(5px);
                      color: rgba(254, 174, 0, 1);
                    } 
                  }      

                  .functional-icon-2 {
                    &:hover {
                  	  transform: rotateX(360deg);
                      color: rgba(254, 174, 0, 1);
                    } 
                  }  

                   .functional-icon-3 {
                    &:hover {
                  	  transform: scale(.9);
                      text-shadow: 0 0 15px $l_color;
                    } 
                  }  

                   .functional-icon-4 {
                    &:hover {
                  	  transform: rotate(360deg);
                      color: rgba(254, 174, 0, 1);
                    } 
                  }   

                  .functional-icon-5 {
                    color: white;

                    &:hover {
                      transform: scale(.8);
                      opacity: .65;
                    }
                  }

                  .functional-icon-6 {
                    &:hover {
                  	  transform: scale(.8);
                      color: $h_color;
                    } 
                  }   
            }

            .down {
               animation: Downloading .8s linear 1;
            }

            @keyframes Downloading {
              0% {
                transform: translateY(5px);
                color: rgba(254, 174, 0, .6);
              }

              25% {
                 transform: translateY(10px);
                 color: rgba(254, 174, 0, .8); 
              }

              35% {
                 transform: translateY(15px);
                 color: rgba(254, 174, 0, 1);
              }

              50% {
                 transform: translateY(10px);
                 color: rgba(254, 174, 0, .6);
              }

              65% {
                 transform: translateY(7.5px);
                 color: rgba(254, 174, 0, .4);
              }

              75% {
                 transform: translateY(5px);
                 color: rgba(254, 174, 0, .2);
              }

              100% {
                 transform: translateY(0);
                 color: white;
              }
            }

            .rand {
              animation: rand .8s linear 1;
              color: rgba(254, 174, 0, 1);
            }

            .rand_times {
              transform: rotateX(360deg);
              //color: rgba(254, 174, 0, 1);
            }

            @keyframes rand {
              0% {
                transform: rotateX(60deg);
                color: rgba(254, 174, 0, .2);
              }

              25% {
                transform: rotateX(180deg);
                color: rgba(254, 174, 0, .4); 
              }
                        
              50% {
                transform: rotateX(240deg);
                color: rgba(254, 174, 0, .6); 
              }

              75% {
                transform: rotateX(300deg);
                color: rgba(254, 174, 0, .8);  
              }

              100% {
                transform: rotateX(360deg);
                color: rgba(254, 174, 0, 1);
              }
            }

            .rep {
               animation: rep 0.8s linear 1;
            }

            .rep_times {
              color: rgba(255, 174, 0, 1);
              transform: rotate(360deg);
            }

            @keyframes rep {
              0% {
                transform: rotate(60deg);
                color: white;
              }

              25% {
                transform: rotate(120deg);
                color: rgba(255, 174, 0, .2);
              }

              35% {
                transform: rotate(180deg);
                color: rgba(255, 174, 0, .4);
              }

              50% {
                transform: rotate(240deg);
                color: rgba(255, 174, 0, .6);
              }

              75% {
                transform: rotate(300deg);
                color: rgba(255, 174, 0, .8);
              }

              100% {          
                transform: rotate(360deg);
                color: rgba(255, 174, 0, 1);
              }
            }

            .Star_times {
              background-color: rgba(255, 215, 0, 1);
            } 

            .Star {
              animation: star 1s linear 1;
            }

            @keyframes star {
              0% {
                transform: rotate(60deg);
                color: rgba(255, 215, 0, .2);
              }

              25% {
                transform: rotate(120deg);
                color: rgba(255, 215, 0, .4);
              }

              50% {
                transform: rotate(180deg);
                color: rgba(255, 215, 0, .6);
              }

              75% {
                transform: rotate(270deg);
                color: rgba(255, 215, 0, .8);
              }

              100% {
                tranfrom: rotate(360deg);
                color: rgba(255, 215, 0, 1);  
              }
            }

            .heart {
              animation: heart .5s linear 1; 
            }

            .heart2 {
              animation: heart .5s linear 1 reverse;
            }

            .heart_times {
                transform: scale(1);
                color: rgba(255,20,147, 1);
            }

            @keyframes heart {
              0% {
                transform: scale(1);
                color: rgba(255,20,147, .1);
              }

              15% {
                transform: scale(.8);
                color: rgba(255,20,147, .2);
              }

              25% {
                transform: scale(.6);
                color: rgba(255,20,147, .3);
              }

              35% {
                transform: scale(.4);
                color: rgba(255,20,147, .4);
              }

              50% {
                transform: scale(.2);
                color: rgba(255,20,147, .5);
              }

              65% {
                transform: scale(.4);
                color: rgba(255,20,147, .6);
              }

              75% {
                transform: scale(.6);
                color: rgba(255,20,147, .7);
              }

              85% {
                transform: scale(.8);
                color: rgba(255,20,147, .8);  
              }

              95% {
                transform: scale(1.3);
                color: rgba(255,20,147, .9);
              }

              100% {
                transform: scale(1);
                color: rgba(255,20,147, 1);
              }
            }
        }
	}
</style>