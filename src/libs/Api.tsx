export default class Api {
     url: string
     constructor(url: string) {
          this.url = url
     }
     async post(data: any) {
          const post = await fetch(this.url, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
          })
          if(post.status==200){
               return await post.json();
          }
          return null
     }

     async get(params: any = {}) {
          const param = new URLSearchParams(params).toString();
          const data = await fetch(`${this.url}?${param}`, {
               method: 'GET',
          })
          if(data.status==200){
               return await data.json();
          }
          return null
     }
}