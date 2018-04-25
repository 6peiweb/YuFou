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
    name: string;
    component: any;
    redirect?: Object;
    children?: Array<RouteConfig>;
  }
  export interface ILib {
    http: any;
    md5: any;
  }

  export interface Tabbar {
    id: string;
    title: string;
    imgSrc: string;
  }
  
}

declare var ILib: lp.ILib;