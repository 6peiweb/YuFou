import Component from 'vue-class-component';
import Vue from 'Vue'

@Component({
  name: 'chatlog'
})

export default class chatlog extends Vue {
  private selectedTab: string = 'message';

}
