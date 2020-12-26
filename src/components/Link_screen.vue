<template>
	<div class="link_block">
		<vue-fontawesome icon="play-circle" class="link_icon" color="white" size="7.5"></vue-fontawesome>
	</div>
</template>

<script>
	export default {
		name: "Link_screen"
	}
</script>

<style lang="scss">
	.link_block {
		background: rgba(0, 0, 0, .75);
		height: 400px;
		width: 685px;
		position: absolute;
		z-index: 2;
		border-radius: $radius;
        cursor: pointer;
        

        .link_icon {
        	display: flex;
        	justify-content: center;
        	margin-top: 140px;
        	transition: $tran_8;
        	-o-transition: $tran_8;
        	-moz-transition: $tran_8;
        	-webkit-transition: $tran_8;

        	&:hover {
        		filter: blur(5px); //Блюрит иконку
        	}
        }
	}
</style>