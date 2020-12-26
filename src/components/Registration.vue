<template>
	<div class="registration-block">
		<div class="registration-block__flex">
			<form class="flex__form">
				<div class="form__email-block blocks">
					<label for="email" class="email-block__txt txt">Email</label>
					<input type="text" id="email"  placeholder="Введите свой email" class="inpt" v-model="email" />
				</div> 
				<div class="form__password-block blocks">
					<label for="pas" class="password-block__txt txt">Password</label>
					<input type="password" id="pas" placeholder="Придумайте свой пароль"  class="inpt" v-model="password" />
				</div>

				<button class="trebovania__registration" type="submit" @click.prevent="Registr" :disabled="processing">Зарегистрироваться</button>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
       data() {
       	  return {
       	  	 email: null,
       	  	 password: null
       	  }
       },

       methods: {
       	 Registr() {
       	 	this.$store.dispatch('SIGNUP', {
       	 	    email: this.email, 
       	 	    password: this.password
       	 	}) 
       	 }
       },

       computed: {
       	    processing() {
				return this.$store.getters.PROCESSING
		    }
       }
	}
</script>

<style lang="scss">
	.registration-block {
		position: fixed;
		overflow: hidden;
		width: 450px;
		height: 645px;
		border-radius: 45px;
		background: linear-gradient(180deg, #E03535 0%, rgba(255, 255, 255, 0) 100%), url('../assets/Images/registration_background.jpg');

		&__flex {
			margin: 0px auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: space-between;

			.in_green {
        	   color: $g;
            }

			.flex__form {

				.blocks {
					width: 380px;
					margin: 55px auto;

					.txt {
						font-family: $farro;
						color: $l_color;
						font-size: 30px;
					}

					.email-block__txt {
						margin-left: 145px;
					}

					.password-block__txt {
						margin-left: 120px;
					}

					.inpt {
						border: 0;
						width: 380px;
						height: 50px;
						background: $l_color;
						font-family: $farro;
						color: $b;
						font-size: 20px;
					}
				}

                .trebovania__registration {
                	border: 0;
                	margin: 15px 100px;
                	border-radius: 15px;
                	height: 75px;
                	width: 250px;
                	background: $l_color;
                	cursor: pointer;
                	font-size: 20px;
                	font-family: $farro;
                	transition: $tran_8;
                	-o-transition: $tran_8;
                	-moz-transiiton: $tran_8;
                	-webkit-transition: $tran_8;

                	&:hover {
                       transform: scale(.9); 
                	}
                }
			}
		}
	}
</style>