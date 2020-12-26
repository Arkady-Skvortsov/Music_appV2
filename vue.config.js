module.exports = {
   css: {
     loaderOptions: {
     	sass: { 
     		prependData: "@import './src/components/SCSS/styles.scss'; "
     	}
     }
   } 
};