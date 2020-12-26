<template>
	<div class="stat-rating__item" :data-rating="dataR">
        <i class="material-icons Star" @click="SetMark">star</i>
    </div> 
</template>

<script>
	export default {
	   props: {
	   	  dataR: {
	   	  	type: Number,
	   	  	required: true
	   	  }
	   },

	   emits: ['SetMark'],

	   methods: {
          SetMark() {
          	this.$emit('SetMark')
          }
	   }
	}
</script>

<style lang="scss">
	.stat-rating__item {
        transition: .8s;
	    -o-transition: .8s;
	    -webkit-transition: .8s;
	    -moz-transition: .8s;

	    .Star {
	      	font-size: 110px;
	      	color: black;
	      	cursor: pointer;
	      	transition: .8s;
	        -o-transition: .8s;
	        -webkit-transition: .8s;
	        -moz-transition: .8s;

	      	&:hover {
              transform: scale(.9);
              opacity: .9;
	      	}
	    }           
	}
</style>