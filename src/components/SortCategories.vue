<template>
	<div class="MainSortCategories">
		<div class="SortSection"
            v-for="(sortk, index) in SortK"
            :key="sortk.id"
            @click="HideCategories(index)"
		>
		    <span class="SortText">{{sortk.text}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SortCategories',

		props: {
			SortK: {
				type: [Array, Object, String]
			}
		},
         
        methods: {
        	HideCategories(index) {
        		this.$emit('HideCategories2', index)
        	}
        }  
	}
</script>

<style lang="scss">
	.MainSortCategories {
		height: 240px; /* 240px */
		width: 350px;
		background: $l_color;
		margin: -100px auto;
	    position: relative;
	    z-index: 4;

		.SortSection {
			height: 60px;
			width: 350px;
			background: $l_color;
			display: inline-block;
			margin-top: 0px;
			border-top: 1px solid $b;
			border-bottom: 1px solid $b;
			cursor: pointer;
			transition: $tran_8;
			-o-transition: $tran_8;
			-moz-transition: $tran_8;
			-webkit-transition: $tran_8;

			&:hover {
				border-top: 1px solid $l_color;
				border-bottom: 1px solid $l_color;
			}

			.SortText {
				margin-top: 10px;
				font-size: $f_size_3;
				font-family: $farro;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: $tran_8;
				-o-transition: $tran_8;
				-moz-transition: $tran_8;
				-webkit-transition: $tran_8;

				&:hover {
					transform: translateX(10px);
					text-shadow: 0 0 20px $b;
				}
			}
		}
	}
</style>