import Component from 'vue-class-component'
import Vue from 'Vue'

@Component({
  name: 'owner'
})

export default class Owner extends Vue {
  private UserName: string = '石头'
  private UserId: string = 'shitou'
  
  jumpRoute() {
    // console.log(this.$router)
    this.$router.push({name: 'setting'})
    // this.$router.go(-1)
  }
  
}
