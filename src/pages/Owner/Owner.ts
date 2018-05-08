import Component from 'vue-class-component'
import Vue from 'vue'

@Component({
  name: 'owner'
})

export default class Owner extends Vue {
  private UserName: string = '石头'
  private UserId: string = 'shitou'
  
  jumpRoute() {
    this.$router.push((<lp.RawLocation>{name: 'setting'}))
  }

}
