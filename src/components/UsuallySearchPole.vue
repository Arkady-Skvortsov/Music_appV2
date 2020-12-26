<template>
	<div class="UsuallySearchPole">
		   <input type="text" :placeholder="searchChoice" v-model.trim="UsuallysearchValue" @keyup="UsuallyShowInformation" class="UsuallySearchText" /> <!-- Пока что    отложу -->
		   <div v-if="UsuallysearchValue.length"> <!-- Положу сюда анимацию <transition></transition>-->
			   <i class="material-icons UsuallyClose" ref="UsuallyClose" @click="UsuallyClear">close</i>
           </div> 
    </div>
</template>

<script>
	export default {
		name: "UsuallySearchPole",

		data() {
			return {
				UsuallysearchValue: ''
			}
		},

		props: {
			searchChoice: {
				type: String,
				default() {
					return ""
				}
			}
		},

		methods: {
            UsuallyShowInformation() {
                this.$store.dispatch("GET_SEARCH_VALUE", this.UsuallysearchValue)
            },

			UsuallyClear() {
				this.UsuallysearchValue = ""

				this.$store.dispatch("GET_SEARCH_VALUE") // GET_SEARCH_VALUE // Но тут передача пустого в порожне сработает, так как нет привязке не к одному "textContent'у",ну или к HTML элементу 

				this.$refs.UsuallyClose.classList.add('UsuallyCloseAnim') //Навсегда от этого откажусь в SPA/?PWA? на Vue.js, React.js и прочее, а вот с обычным JS буду делать)

				setTimeout(() => {
					this.$refs.UsuallyClose.classList.remove('UsuallyCloseAnim')
				}, 810)
			}
		}
	}
</script>

<style lang="scss">
	.UsuallySearchPole {
		height: 80px;
		width: 800px;
		background: $l_color;
		position: absolute;
		z-index: 4;
		top: 15px;
		left: 365px;

	    .UsuallySearchText {
	    	font-size: $f_size_2;
	    	font-family: $fauna_one;
	    	margin-top: 0;
	    	margin-left: 0;
	    	border: 0;
	    	width: 1200px;
	    	height: 105px;
	    }

	    .UsuallyClose {
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

	    .UsuallyCloseAnim {
	    	animation: .8s UsuallyCloseAnim linear 1;
	    }

	    @keyframes UsuallyCloseAnim {
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