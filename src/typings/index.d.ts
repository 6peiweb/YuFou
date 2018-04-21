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
  }
  export interface ILib {
    http: any;
    md5: any;
  }
  
}

declare var ILib: lp.ILib;