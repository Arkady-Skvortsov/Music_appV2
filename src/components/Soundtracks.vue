<template>
	<div class="soundtrack_block" @click="SoundtrackParams">
		<div 
		    class="soundtrack_img_block"  
		    :style="{'background-image': `url(${soundtrack_info.MainImg})`, 'background-size': 'cover', 'background-position': 'center'}"
		>
		</div> 

		<div class="soundtrack_names">
			<span class="soundtrack_name" ref="soundtrackName">{{soundtrack_info.SoundName}}</span>
			<span class="composer_name" ref="composerName">{{soundtrack_info.ComposerName}}</span>
		</div>
        
        <div>
	       <span class="music_time">{{soundtrack_info.Duration}}</span> 
	    </div>
	</div>
</template>

<script>
	export default {
		name: "Soundtracks",

		data() {
			return {
               SoundPlayer: "SoundPlayer"
			};
		},

		props: {
			soundtrack_info: {
				type: [Array, Object, String],
				require() {
					return []
				}
			}
		},

		methods: {
           SoundtrackParams() {
               this.$store.dispatch('GET_SOUNDTRACK', this.soundtrack_info)
           }
		}
	}
</script>

<style lang="scss">
	.soundtrack_block {
		height: 150px;
		width: 1555px;
		left: 15px;
		background: $b;
		position: relative;
		// border-radius: $f_size_2;
		border: 1px solid $l_color;
		margin-top: 50px;
		transition: $tran_8;
		-o-transition: $tran_8;
		-moz-transition: $tran_8;
		-webkit-transtion: $tran_8;

	    &:hover {
	    	transform: translateY(-2.5px);
	    	background: $l_color;
	    	border: 1px solid $b;

	    	.soundtrack_name {
	    	   color: $b;
	    	}

	        .composer_name {
	    	   color: $b;
	    	}

	    	.music_time {
	    	   color: $b;
	    	}

	    	.soundtrack_img_block {
	    	   box-shadow: inset 0 0 20px $l_color;
	    	}
	    }

		.soundtrack_img_block {
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

		.soundtrack_names {
              color: $l_color;
              position: relative;

		     .soundtrack_name {
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

		     .composer_name {
		     	font-size: $m_author;
		     	font-family: $fauna_one;
		     	margin-left: 360px;
		     }
		}

        .music_time {
        	font-size: $f_size_2;
        	font-family: $fauna_one;
        	color: $l_color;
        	position: relative;
            float: right;
            margin-right: $f_size_2;
            bottom: 70px;
        }
   }
</style>