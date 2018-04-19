declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare namespace lp {

  export interface RouteConfig {
    path: string;
    name: string;
    component: any;
  }

}
