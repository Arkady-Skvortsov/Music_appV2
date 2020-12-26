export default {
   update(el, expression) {
      // expression.context.password.value > 5 ? el.style.color = "#008000" : el.style.color = "#FF0000"

      switch(el.className) {
      	case "first-block__pass-length stop-check":
      	    if(expression.value.length > 5) {
      	    	el.style.color = 'green'

                el.parentNode.parentNode.children[0].children[0].style.color = "green"
                el.parentNode.parentNode.children[0].children[0].textContent = "done" 
      	    } else {
      	    	el.style.color = 'red'

                el.parentNode.parentNode.children[0].children[0].style.color = "red"
                el.parentNode.parentNode.children[0].children[0].textContent = "clear"   
      	    }
      	break;
      	case "second-block__pass-word stop-check":
            if(expression.value.search(/[A-Z]/)) {
            	el.style.color = 'green'

                el.parentNode.parentNode.children[0].children[0].style.color = "green"
                el.parentNode.parentNode.children[0].children[0].textContent = "done" 
            } else {
            	el.style.color = 'red'

                el.parentNode.parentNode.children[0].children[0].style.color = "red"
                el.parentNode.parentNode.children[0].children[0].textContent = "clear"   
            }
      	break;
      	case "third-block__pass-checked stop-check":
            if(expression.value.search(/[0-9]/)) {
            	el.style.color = 'green'

                el.parentNode.parentNode.children[0].children[0].style.color = "green"
                el.parentNode.parentNode.children[0].children[0].textContent = "done" 
            } else {
            	el.style.color = 'red'

                el.parentNode.parentNode.children[0].children[0].style.color = "red"
                el.parentNode.parentNode.children[0].children[0].textContent = "clear"   
            }
      	break;
      	case "fourth-block__word-checked stop-check":
             console.log("LOL DISCRIPTION")
      	break;
        case "fifth-block__email stop-check":
           console.log('Email')
        break;
      }
   }
};