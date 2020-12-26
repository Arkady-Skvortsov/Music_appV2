<template>
		<div class="SearchPole">
		   <input type="text" placeholder="Введите название любимой композиции" v-model.trim="searchValue" @keyup="ShowInformation" class="SearchText" /> <!-- Пока что    отложу -->
		   <div v-if="searchValue.length">
			   <i class="material-icons Close" ref="Close" @click="Clear">close</i>
           </div> 
        </div>
</template>
<script>
	export default {
		name: "SearchPole",

		data() {
			return {
			   searchValue: ''
		    }
		},

		methods: {
			ShowInformation() {
				this.$store.dispatch("GET_SEARCH_VALUE2", this.searchValue)
			},

			Clear() {
                this.searchValue = ""

                this.$store.dispatch("GET_SEARCH_VALUE2", this.searchValue) //Если оставить её пустой, то естественно ничего ВООБЩЕ не произойдет, так как у нас Getter получает не известно какое значение! А если напишем - то будет 

                this.$refs.Close.classList.add('CloseAnim')

                setTimeout(() => {
                   this.$refs.Close.classList.remove('CloseAnim')
                }, 810)
			}
		}
	}
</script>
<style lang="scss">
	.SearchPole {
		height: 80px;
		width: 800px;
		background: $l_color;
		position: absolute;
		z-index: 3;
		top: 15px;
		left: 250px;

	    .SearchText {
	    	font-size: $f_size_2;
	    	font-family: $fauna_one;
	    	margin-top: 0;
	    	margin-left: 0;
	    	border: 0;
	    	width: 1200px;
	    	height: 105px;
	    }

	    .Close {
	    	font-size: $close_i;
	    	color: $b;
	    	font-weight: 500;
	    	position: relative;
	    	float: right;
	    	margin-right: -385px;
	    	top: -90px;
	    	z-index: 3;
	    	cursor: pointer;
	    	transition: $tran_8 ease-in-out;
	    	-o-transition: $tran_8 ease-in-out;
	    	-moz-transition: $tran_8 ease-in-out;
	    	-webkit-transition: $tran_8 ease-in-out;

	        &:hover {
	        	transform: rotate(-180deg);
	        	text-shadow: 0 0 25px $b;
	        }
	    }

	    .CloseAnim {
	    	animation: .8s CloseAnim linear 1;
	    }

	    @keyframes CloseAnim {
	    	0% {
               transform: rotate(-120deg);
	    	}

	    	50% {
               transform: rotate(-60deg);
	    	}

	    	100% {
               transform: rotate(0);
	    	}
	    }
	}
</style>