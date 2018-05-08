import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'register'
})

export default class Register extends Vue {
  backLogin() {
    console.log(this.$store.getters.routeInfo)
  }
}