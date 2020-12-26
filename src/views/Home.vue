<template>
  <div class="main_page">
      <div class="main_page__change-block">
        <div class="change-block__registration" v-if="Authorization === true">
            <Registration />
        </div>
      </div>

  	  <mainLink 
         v-for="link in links"
         :key="link.id"
         :data_link="link"
         @Go_to_page="Go_to_page_2"
      />
  </div>
</template>

<script>
import Registration from "../components/Registration.vue"
import mainLink from "../components/Main_links.vue"
 
export default {
  name: "Home",
  data() {
    return {
       links: [
          {
            id: 1,
            name: "The Last of Us Part 2",
            main_img: "Main_TLOU2.jpg",
            img_second: "bonus_TLOU2.jpg"
          },
          {
            id: 2,
            name: "The Last of Us",
            main_img: "Main_TLOU.jpg",
            img_second: "first_TLOU.jpg"
          },
          {
            id: 3,
            name: "Uncharted 4",
            main_img: "Main_Uncharted4.jpg",
            img_second: "first_Uncharted4.jpg",
            clas: "down" 
          },
          {
             id: 4,
             name: "God of War",
             main_img: "Main_God.jpg",
             img_second: "first_God.jpg",
             clas: "down"
          }
       ]
    };
  },

  methods: {
    Go_to_page_2(param) {
      this.$router.push({name: "Music_container", query: {"soundtrack": param.name}})
    }
  },

  computed: {
    Authorization() {
       return this.$store.getters.IS_AUTH
    },

    Authorization2() {
       return this.$store.getters.IS_AUTH2
    }
  },

  beforeRouteLeave(to, from, next) { 
    if(to.path === "/Search" && this.Authorization2 === false || to.path === "/List" && this.Authorization2 === false || to.path === "/Music_container" && this.Authorization2 === false || to.path === "/User" && this.Authorization2 === false || to.path === "/Home" && this.Authorization2 === false) {
        this.$store.dispatch('CHANGE_AUTH', true)
    } else {
        this.$store.dispatch('CHANGE_AUTH', false)

        next()
    }
  },

  components: {
    mainLink,
    Registration
  }
};
</script>

<style lang="scss">
    @import "../components/SCSS/styles.scss";

	.main_page {
	   height: 1100px;
	   width: 1592px;
	   top: 0;
	   left: 0;
     background-image: url("../assets/background/Background.jpg");
     background-position: center;
     background-size: cover;

     .main_page__change-block {
       margin-top: 5px;
       margin-left: calc(100% / 2.85);
       position: fixed;
       z-index: 6;
       width: 450px;
       height: 645px;
       border-radius: 45px;

       .change-block__registration {
          height: inherit;
          width: inherit;
       }

       .change-block__authorization {
          height: inherit;
          width: inherit;
       }
     }
	}
	
</style>
