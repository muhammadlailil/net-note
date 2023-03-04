import DateTime from "./DateTime";

export default class String {
     randomString(length: number) {
          let result = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
          let counter = 0;
          while (counter < length) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
               counter += 1;
          }
          return result;
     }

     uuid() {
          return this.randomString(70) + new DateTime().format('yyyyMMddhms')
     }

     slug(str: string) {
          return str
               .toLowerCase()
               .trim()
               .replace(/[^\w\s-]/g, '')
               .replace(/[\s_-]+/g, '-')
               .replace(/^-+|-+$/g, '');
     }
     truncate(str:string,length : number = 30) {
          if (str.length > length) {
               return str.substring(0, length) + '...';
          }
          return str;
     }
     
     base64encode(string:string){
          return window.btoa(string)
     }
     base64decode(string:string){
          return window.atob(string)
     }
}