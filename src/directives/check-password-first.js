export default {
   update(el, expression) {
      expression.context.password.length > 5 ? el.style.color = "#008000" : el.style.color = "#FF0000"
   }
};