import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'userDetail'
})

export default class UserDetail extends Vue {

  created() {
    console.log(this.$route.params.friendId);
    console.log(this.$store.getters.userInfo.U_ID)
  }

}
