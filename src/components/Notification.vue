<template>
 <div class="notification">
  <transition-group 
      name="notificationAnim"
      class="musicNotification"
  >
	<div class="Notification" 
        v-for="notif in notification"
        :key="notif.id" 
	> <!-- Создам условие по которому будет вылетать ошибка с email при регистрации/авторизации -->
		<div 
 		    class="Notification__image" :style="{'background-image': `url(${notif.img})`, 'background-position': 'center', 'background-size': 'cover'}"></div>
		<div class="Notification__txt-block">
			<span class="Notification__txt">{{NotificationMessage(notif.name, notif.message)}}</span>
		</div>
	</div>
  </transition-group>
 </div>
</template>

<script>
	export default {
		name: "Notification", //Да, все нормально

		methods: {
			DeleteNotifications() {
              let vm = this

              if(this.notification.length) {
              	setTimeout(() => {
                   vm.notification.splice(vm.notification.length - 1, 1)
              	}, 5500)
              }      
			},

			NotificationMessage(a, b) { 
                return `${a} - ${b}`
			}
		},

		computed: {
			authToken() {
				return this.$store.getters.IS_AUTH2
			},

			notification() {
				return this.$store.getters.NOTIFICATION
			}
		},

		watch: {
			notification() {
				this.DeleteNotifications()
			}
		},

		mounted() {
			this.DeleteNotifications()
		}
	}
</script>

<style lang="scss">
	.notification {
		top: 15px;
		position: fixed;
		justify-content: center;
		height: 95px;
		cursor: pointer;
		z-index: 11;
		transition: .6s;
		-o-transition: .6s;
		-moz-transition: .6s;
		-webkit-transition: .6s;

		&:hover {
			transform: translateY(2.5px);

		   .Notification__image {
		   	  box-shadow: inset 0 0 30px white;
		   }

           .Notification__txt-block {
                background: $l_color;

			    .Notification__txt {
                   color: $b;
			    }
	       }
		}

		.musicNotification {
			display: flex;
			flex-direction: column-reverse;
		}

		.notificationAnim-enter {
		    transform: translateX(-400px);
		    opacity: 0;
    	}

	    .notificationAnim-enter-active {
		    transition: opacity .6s, transform .6s;
 	    }

	    .notificationAnim-enter-to {
		    opacity: 1;
		    tranform: translateX(0);
	    }

	    .notificationAnim-leave {
		    transform: translateX(-200px);
	    }

        .notificationAnim-leave-active {
    	    transition: opacity .6s, transform .6s;
        }

        .notificationAnim-leave-to {
    	    opacity: 0;
    	    transform: translateX(-400px);
        }

        .notificationAnim-move {
    	    transition: opacity .6s, transform .6s;
        }

        .Notification {
        	height: 95px;
        	width: 450px;
        	background: $b;
        	border: 1px solid $l_color;
        	transition: .6s;
        	margin-bottom: 7.5px;
        }

		.Notification__image {
			height: 95px;
			width: 160px;
			margin-left: 0;
			margin-top: 0;
			z-index: 8;
		}

		.Notification__txt-block {
            height: 95px;
            width: 290px;
            margin-left: 150px;
            float: right;
            top: -95px;
            position: relative;
            background: $b;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;

			.Notification__txt {
                font-family: $farro;
                color: $l_color;
                transition: .6s;
                -o-transition: .6s;
                -moz-transition: .6s;
                -webkit-transition: .6s;
			}
		}
	}
</style>