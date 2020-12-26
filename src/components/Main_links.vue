<template>
	<div 
	       id="link_block" 
	       :class="data_link.clas" 
	       @mouseover="Hover"
	       @mouseleave="Over"
	       @click="Go"
    >

        <linkScreen 
            v-if="isVisible" 
		/> 
		
		<div class="link_img_block">	
		   	  <img
		   	      ref="link_img" 
		   	      class="link_img" 
		   	      :src="require('../assets/Images/' + data_link.main_img)" 
		   	      :title="data_link.name" 
		   	      :alt="data_link.name" 
		   	  />
		</div>

        <span class="name">{{data_link.name}}</span> 
	</div>
</template>
<script>
    import linkScreen from "./Link_screen.vue";

	export default {
		name: "Main_links",

		emits: ['Go'],

		props: {
           data_link: {
           	  type: Object
           } 
		},

		data() {
			return {
               isVisible: false
   			};
		},

		methods: {
           Hover() {
           	   this.isVisible = true

           	   this.$refs.link_img.classList.add('link_animation')

           	   this.$refs.link_img.src = require("../assets/Images/" + this.data_link.img_second)
           },

           Over() {
           	    this.isVisible = false

           	    this.$refs.link_img.classList.remove('link_animation')

           	    setTimeout(() => {
                    this.$refs.link_img.classList.add('link_animation')
           	    }, 25)

           	    setTimeout(() => {
                    this.$refs.link_img.classList.remove('link_animation')
           	    }, 1025)

           	    this.$refs.link_img.src = require("../assets/Images/" + this.data_link.main_img)
           },

           Go() {
           	  this.$emit('Go_to_page', this.data_link)
           }
		},

		components: {
			linkScreen
		}
	}
</script>
<style lang="scss">
	#link_block {
		height: 400px;
		width: 685px;
		position: relative;
		display: inline-block;
		margin-top: 15px;
		margin-left: 75px;
		border-radius: $radius;
        cursor: pointer;
		transition: $tran_8;
		-o-transition: $tran_8;
		-moz-transition: $tran_8;
		-webkit-transition: $tran_8;

	    &:hover {
	    	transform: translateY(-10px);
 
            .name { /* Да, оказывается так можно */
	    		color: white;
            }
	    }

		.link_img_block {
		   height: 400px;
		   width: 685px;
		   top: 0;
		   left: 0;
		   border-radius: $radius;

		   .link_img {
		   	 height: 400px;
		   	 width: 685px;
		   	 left: 0;
		   	 top: 0;
		   	 border-radius: $radius;
		   	 transition: $tran_8;
		   	 -o-transition: $tran_8;
		   	 -moz-transition: $tran_8;
		   	 -webkit-transition: $tran_8;
		   } 

		    .link_animation {
		   	 	animation: 1s link_animation linear 1;
		   	 }

		   	 @keyframes link_animation {
                 0% {
                   opacity: .2;
                 }

                 25% {
                   opacity: .4;
                 }

                 50% {
                   opacity: .6;  
                 } 

                 75% {
                   opacity: .8;
                 }

                 100% {
                    opacity: 1;
                 }
		   	 }
		}

		.name {
			font-size: $f_size;
			font-family: $farro;
			color: $b;
			display: flex;
			justify-content: center;
		    padding-top: 7.5px;
			transition: $tran_8;
			-o-transition: $tran_8;
			-moz-transition: $tran_8;
			-webkit-transition: $tran_8;
		}
	}

	.down {
		top: 65px;
	}
</style>