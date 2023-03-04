import String from "./String"

const sessionName = 'user-session'
export default class Auth{
     login(data:{
          username : string
          password : string
     }){
          const {username,password}  = data
          if(username == process.env.APP_USERNAME && password == process.env.APP_PASSWORD){
               const user = new String().base64encode(JSON.stringify({
                    username,password
               }))
               localStorage.setItem(sessionName,user);
               return true
          }
          return false
     }
     verify(){
          let userLogin : any = localStorage.getItem(sessionName)
          if(userLogin){
               userLogin = JSON.parse(new String().base64decode(userLogin))
               if(userLogin?.username == process.env.APP_USERNAME && userLogin?.password == process.env.APP_PASSWORD){
                    return true
               }
          }
          return false
     }

     user(){
          return process.env.APP_USERNAME
     }
     logout(){
          localStorage.removeItem(sessionName)
     }
}