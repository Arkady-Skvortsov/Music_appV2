<template>
	<div class="nav_bar">
		<ul class="icon_list">
			<ol>
				<router-link 
				   :to="{name: 'Search'}"
                   active-class="active" 
				>
				    <div class="navigation-icons">
					    <i class="material-icons links">search</i>
			        </div>
			    </router-link>
			</ol>
			<ol>
				<router-link 
				      exact
				      active-class="active" 
				      :to="{name: 'Home'}"
				>
				    <div class="navigation-icons">
					    <i class="material-icons links">home</i>	
				    </div>
				</router-link>
			</ol>
			<ol>
				<router-link 
				    :to="{name: 'List'}"
				    active-class="active" 
				>
				    <div class="navigation-icons">
					    <i class="material-icons links">queue_music</i>
				    </div>
				</router-link>
		    </ol>
			<ol>
				<router-link 
				    :to="{name: 'User'}"
                    active-class="active" 
				>
				    <div class="navigation-icons">
					    <i class="material-icons links">account_circle</i>
				    </div>
				</router-link>
            </ol>
		</ul>
	</div>
</template>

<script>

	export default {
		name: "navBar",
	}
</script>

<style lang="scss">
	.nav_bar {
		position: fixed;
		background: $b;
		left: 0;
		top: 657px;
		border-top: 2px solid $l_color;
		height: 100px;
		width: 100%;
		z-index: 3;

		.icon_list { 
          text-decoration: none;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          cursor: pointer;

          ol {

          	.active {
          	  text-shadow: 0 0 15px $l_color;
          	}
         
          	.navigation-icons {
               background: $b;
               height: 70px;
               width: 70px;
               border-radius: 40px;
               margin-top: 10px;
                
               .links {
          	 	   font-size: 70px;
          	  	   color: $l_color;
          	    }
            }
          }
       } 
   }
</style>