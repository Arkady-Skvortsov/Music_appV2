<template>
	<div class="delete-soundtrack">
		<div class="delete-soundtrack__flex">
            <div class="flex__choice-block">
            	<span class="choice-txt">Выбрано: {{deleteArray.length}}</span>
            </div>

            <button class="flex__del" @click="Delete">
               <i class="material-icons del-icon">delete</i>
       	    </button> 

			<div class="flex__delete-block" @click="Clear">
			  <i class="material-icons cl">clear</i>
			</div>
		</div>
	</div> 
</template>

<script>
	export default {
		data() {
			return {
				txt: "Delete", // Just)
                
        DeleteArray: []
		 	}
		},
        
        methods: {
        	Clear() {
               this.deleteArray.map(item => {
               	  item.BgColor = "black"

                  item.Shows = this.$store.dispatch('SET_DELETE2', false)
               }) 

        	     this.$store.dispatch("SET_DELETE", false)
        	},

        	Delete() {
               this.deleteArray.map(item => {
               	  	 let obj = {
                       id: new Date().toLocaleString(),
                       name: item.SoundName,
                       img: item.MainImg,
                       message: "был удален"
               	     }

               	     item.BgColor = "black"

                     item.Mark = 0

                     item.Shows = this.$store.dispatch("SET_DELETE2", false)

               	     this.$store.dispatch("SET_NOTIFICATION", obj)
               }) 

        	   this.lovelySound.splice(0, this.deleteArray.length)

        	   this.$store.dispatch("SET_DELETE", false)
        	}
        },

		computed: {
      show_delete() {
        return this.$store.getters.SHOW_DELETE
      },

      deleteArray() {
        return this.$store.getters.DELETEARR
      },

      lovelySound() {
        return this.$store.getters.LOVELYSOUNDTRACKS
      }
		},

		destroyed() {
       this.deleteArray.length = 0

		   console.log(this.deleteArray.length)
		}
	}
</script>

<style lang="scss"> 
	.delete-soundtrack {
        border-top: 1px solid $l_color;
		width: 100vw;
		height: 200px;
		margin: 560px auto;
		z-index: 4;
		background: $b;
		position: fixed;
		overflow: hidden;

	    &__flex {
          display: flex;
	      flex-direction: row;
	      justify-content: space-evenly;
	      align-items: center;
	      color: $l_color;
	      margin: 55px auto;

	      .flex__choice-block {

	      	.choice-txt {
               font-size: 45px;
	    	   font-family: $fauna_one;
	      	}

	      }

	      .flex__del {
            border: 0;
            border-radius: 25px;
            background: $l_color;  
            width: 450px;
            height: 75px;
            cursor: pointer;
            transition: .8s;
            -o-transition: .8s;
            -webkit-transition: .8s;
            -moz-transition: .8s;

            &:hover {
               transform: scale(.95);
               box-shadow: 0 0 15px $l_color;
            }

            .del-icon {
               font-size: 55px;
               color: $r;
            }
	       }

	       .flex__delete-block {
	       	  .cl {
	       	  	font-size: 75px;
	    			cursor: pointer;
	    			transition: .8s;
	    			-o-transition: .8s;
	    			-webkit-transition: .8s;
	    			-moz-transition: .8s;
	    			font-weight: bold;

	    			&:hover {
	    				transform: rotate(180deg);
	    			}
	       	  }
	       }
       }
	} //Сделаю на флексах
</style>