<template>
	<transition
      name="star_stat"
	>	
	    <div class="star-statistic">
          <div class="star-statistic__middle">
            <div class="star-statistic__stat-rating" ref="stat-rating" :data-total-value="total">
            	<Star 
                v-for="star in numberArr"
                :key="star.id"
                :dataR="star.num"
                @SetMark="SetMark2(star.num)"
            	/>
            </div>
            
            <div class="star-statistic__different"> 
              <div class="mark-block">
            	 <span>{{total}}</span>
              </div>
            
              <button class="stopThat" @click="GoOut">Принять</button>
            </div>
        </div>
	    </div>
    </transition>
</template>

<script>
  import Star from './Star.vue' 

	export default {
		data() {
			return  {
				numberArr: [
				  {
				  	id: 1,
            num: 5 
				  },
				  {
            id: 2,  
				  	num: 4
				  },
          {
            id: 3, 
            num: 3
          },
          {
            id: 4,
            num: 2
          },
          {
            id: 5,
            num: 1
          }
				],

        information: [],

        sound2: {},

			  total: 0
			}
		},

		methods: {
			GoOut() {
        this.$store.dispatch("SET_SHOW", false)

        this.sound2.Mark = this.$store.dispatch("SET_MARK", this.total)
			},

			SetMark2(data) {
				this.total = data

        this.information.message = `Была выставлена оценка ${this.total} из 5`
        
        this.$store.dispatch("SET_NOTIFICATION", this.information)
			}
		},

    mounted() {
      this.information = this.Information

      this.sound2 = this.soundtrack2
    }, 

		computed: {
      mark() {
        return this.$store.getters.MARK
      },

      Information() {
        return this.$store.getters.INFORMATION
      },

      soundtrack2() {
        return this.$store.getters.SOUNDTRACK2
      } 
		},
          
    components: {
      Star
    }
	} 
</script>

<style lang="scss">
	.star-statistic {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background: rgba(255, 255, 255, .80);
    z-index: 10;

    .star-statistic__middle {
        margin: 250px 550px;      

      .star-statistic__stat-rating {
        display: inline-flex;
        flex-direction: row-reverse;
      }
        
        .star-statistic__different {
          display: flex;
          flex-direction: column;
        }

        .mark-block {
          color: $s_color;
          font-size: 50px;
          font-family: $farro; 
          margin-bottom: 50px;
          margin-left: 265px;
        }

        .stopThat {
        	height: 80px;
        	width: 400px;
        	border: 0;
        	cursor: pointer;
          margin-left: 75px;
        	backgorund: $l_color;
          font-size: 60px;
          font-family: $farro;
          transition: .7s;
          -o-transition: .7s;
          -webkit-transition: .7s;
          -moz-transition: .7s;

          &:hover {
            box-shadow: 0 0 20px $b;
          }
        }
    }
	}

  .star-stat-enter {
    opacity: 0;
  }

  .star-stat-enter-to {
    opacity: 1;
  }

	.star-stat-enter-active,
	.star-stat-leave-active {
		transition: opacity .8s;
    -o-transition: opacity .8s;
    -moz-transition: opacity .8s;
    -webkit-transition: opacity .8s;
	}
</style>