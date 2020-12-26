<template>
	<div class="authorization-block">
		<div class="authorization-block__flex">
			<form class="flex__form">
				<div class="form__email-block blocks">
					<label for="email2" class="email-block__txt txt">Email</label>
					<input type="text" id="email2" placeholder="Введите свой email" class="inpt" v-model="email" />
				</div>
				<div class="form__password-block blocks">
					<label for="pas2" class="password-block__txt txt">Password</label>
					<input type="password" id="pas2" placeholder="Введите свой пароль" class="inpt" v-model="password" />
				</div>

				<button class="authorization-button" type="submit" @click.prevent="Authoriz" :disabled="processing2">Авторизоваться</button>
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
       	 Authoriz() {
       	 	this.$store.dispatch('SIGNIN', {
       	 		email: this.email,
       	 		password: this.password
       	 	})
       	 }
       },

       computed: {
       	    processing2() {
       	        return this.$store.getters.PROCESSING
       	    }
       }
	}
</script>

<style lang="scss">
	.authorization-block {
		position: fixed;
		width: 450px;
		height: 645px;
		border-radius: 45px;
		background: linear-gradient(180deg, #FFD700 0%, rgba(255, 255, 255, 0) 100%), url(../assets/Images/registration_background.jpg);

		&__flex {
			margin: 40px auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: space-between;

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

			    .authorization-button {
			    	border: 0;
                	margin: 5px 125px;
                	border-radius: 15px;
                	height: 50px;
                	width: 200px;
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