<template>
	<div class="user-block">
		<div class="user-block__information">
			<div class="information-block__user">
				<div class="user-block__email">
					<span class="email-user">Email: {{user.email}}</span>
				</div>
			    <div class="user-block__uid">
			    	<span class="uid-user">SpecialKey:</span>

			    	<input 
			    	   readonly 
			    	   class="uid-visibility" 
			    	   :type="type" 
			    	   :value="user.uid" 
			    	/>

			    	<button class="uid-visibility-block" @click="Visible">
			    		<i class="material-icons visibility-icon" ref="check">visibility_off</i>
			    	</button>
			    </div>

			    <button class="information-block__out" @click="Out">
			        Удалить
		        </button> 
		    </div>
		</div>
	</div>
</template>

<script>
	export default {
       data() {
       	 return {
       	 	type: "password"
       	 }
       }, 

       methods: {
          Out() { //Выходим из аккаунта и нас кидает на "главную"
            if(confirm('Вы точно хотите удалить свой аккаунт?')) {
          	    this.$store.dispatch('SIGNOUT')

          	    this.$router.push('/')
            } else {
            	return;
            }
          },

          Visible() {
          	 if(this.type === "password") {
          	 	this.$refs.check.textContent = "visibility"
          	 	this.type = "text"
          	 } else {
          	 	this.$refs.check.textContent = "visibility_off"
          	 	this.type = "password"
          	 }
          }
       },

       computed: {
       	  user() {
       	  	 return this.$store.getters.USER
       	  }
       },

	   destroyed() {
	   	  console.log(this.$store.getters.IS_AUTH2)
	   }
	}
</script>

<style lang="scss">
    .user-block {
    	height: 100vh;
    	width: 100vw;
    	background: $b;

    	.user-block__information {
            max-width: 800px;
            margin: 0 auto;

            .information-block__user {
               font-size: 45px;
               color: $l_color;

               .user-block__uid {
               	 .uid-visibility {
               	 	border: 0;
               	 	background: $b;
               	 	color: $l_color;
               	 	font-size: 25px;
               	 	width: 450px;
               	 	outline: none;
               	 	margin: 5px;
               	 }

               	 .uid-visibility-block {
                    border: 1px solid $l_color;
                    cursor: pointer;
                    background: transparent;
                    height: 50px;
                    width: 50px;

                    .visibility-icon {
                      color: $l_color;
                      font-size: 40px;
                    }
               	 }
               }

               .information-block__out {
               	    height: 100px;
               	    margin: 150px 200px;
               	    background: $r;
               	    border-radius: 25px;
               	    border: 0;
               	    width: 360px;
           	        cursor: pointer;
           	        font-size: 45px;
           	        color: $l_color;
           	        transition: $tran_8;
           	        -o-transiiton: $tran_8;
           	        -moz-transition: $tran_8;
           	        -webkit-transition: $tran_8;

           	        &:hover {
           	        	transform: scale(.9);
           	        	box-shadow: 0 0 20px $r;
           	        }
               }

            }
    	} 
    }	
</style>







