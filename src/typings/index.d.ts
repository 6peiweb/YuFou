declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare namespace lp {

  export interface UserConfig {
    username: string;
    password: string;
    mobilephone: string;
  }

  export interface RouteConfig {
    path: string;
    name?: string;
    component?: any;
    redirect?: Object;
    children?: Array<RouteConfig>;
    beforeEnter?: (to: RouteConfig, form: RouteConfig, next: any) => void;
    beforeRouteUpdate?: (to: RouteConfig, form: RouteConfig, next: any) => void;
    beforeRouteLeave?: (to: RouteConfig, form: RouteConfig, next: any) => void;
  }
  export interface ILib {
    http: any;
    md5: any;
  }

  export interface Tabbar {
    name: string;
    title: string;
    imgSrc: string;
  }
  
}

declare var ILib: lp.ILib;