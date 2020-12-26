<template>
	<div class="music_container">
		   <span class="name_of_music">{{name_of_music}}</span>

		   <Soundtracks 
              v-for="(sound, index) in FilterSound"
              :key="index"
              :soundtrack_info="sound"
              :tlou2="TLOU2"
              :tlou="TLOU"
              :uncharted="UNCHARTED"
              :god="GOD"
		   /> 
	</div>
</template>

<script>
    import Soundtracks from "./Soundtracks.vue"

	export default {
		name: "Music_container",

		data() {
			return {
               TLOU2: [],

               TLOU: [],

               UNCHARTED: [],

               GOD: [],

               name_of_music: ''
   			};
		},

		methods: {
			RenderMusic() {
               let vm = this

               switch(this.$route.query.soundtrack) {
			 	    case "The Last of Us Part 2": 
                         this.soundtracks.map(item => { //Попробую не много изменить логику для "backend"
                         	if(item.SoundCollection === "The Last of Us Part 2") {
                                vm.TLOU2.push(item)
                         	 	
                                vm.name_of_music = item.SoundCollection   
                            }
                         })

                         console.log('The Last of Us part 2')
                    break;
			 		case "The Last of Us":
			 		    this.soundtracks.map(item => {
                         	 if(item.SoundCollection === "The Last of Us") {
                         	 	vm.TLOU.push(item)
                                
                                vm.name_of_music = item.SoundCollection
                         	 }
                         })

			 		    console.log('The Last of Us')
                     break;
			 		 case "God of War":
			 		     this.soundtracks.map(item => {
                         	 if(item.SoundCollection === "God of War") {
                         	 	vm.GOD.push(item)

                         	 	vm.name_of_music = item.SoundCollection
                         	 }
                         })

                         console.log('God of War')
                     break;
			 		case "Uncharted 4":
			 		     this.soundtracks.map(item => {
                        	 if(item.SoundCollection === "Uncharted 4") {
                        	 	vm.UNCHARTED.push(item)

                        	 	vm.name_of_music = item.SoundCollection
                           }
                         })

                         console.log('Uncharted 4')
			 		break;    
			 	}
			}
		},

		computed: {
			soundtracks() {
				return this.$store.getters.SOUNDTRACKS
			},

			FilterSound() {
			   if(this.TLOU2.length) {
			   	 return this.TLOU2
			   } 

			   else if(this.TLOU.length) {
			   	 return this.TLOU
			   } 

			   else if(this.UNCHARTED.length) {
			   	 return this.UNCHARTED
			   } 

			   else if(this.GOD.length) {
			   	 return this.GOD
			   } 

			   else {
                 return this.soundtracks
			   }

			} //ДОЛЖНО СРАБОТАТЬ!. Хах, оно то и сработало). Привет из будущего)
		},

		mounted() {
            this.$store.dispatch("GET_SOUND_FROM_API")
            .then(() => this.RenderMusic())  
		},

		components: {
			Soundtracks
		}
	}
</script>

<style lang="scss">
	.music_container {
		height: 3240px; /* 757px */
		width: 1592px;
		background: $b;

		.name_of_music {
			font-size: $f_size_2;
			font-family: $farro;
            color: $l_color;
            display: flex;
            justify-content: center;
            top: 35px;
		}
	}
</style>