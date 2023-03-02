export default class DateTime {
     date: string
     constructor(date: string = new Date().toISOString()) {
          this.date = date
     }
     format(y: string) {
          const x: Date = new Date(this.date)
          var z: any = {
               M: x.getMonth() + 1,
               d: x.getDate(),
               h: x.getHours(),
               m: x.getMinutes(),
               s: x.getSeconds()
          };
          y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
               return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
          });

          return y.replace(/(y+)/g, function (v) {
               return x.getFullYear().toString().slice(-v.length)
          });
     }

     indo(hour:boolean = false,minute:boolean = false,second:boolean= false) {
          const date = new Date(this.date)
          var tahun = date.getFullYear();
          var bulan : any = date.getMonth();
          var tanggal = date.getDate();
          var hari :any = date.getDay();
          var jam = date.getHours();
          var menit = date.getMinutes();
          var detik = date.getSeconds();
          switch (bulan) {
               case 0: bulan = "Jan"; break;
               case 1: bulan = "Feb"; break;
               case 2: bulan = "Mar"; break;
               case 3: bulan = "Apr"; break;
               case 4: bulan = "May"; break;
               case 5: bulan = "Jun"; break;
               case 6: bulan = "Jul"; break;
               case 7: bulan = "Aug"; break;
               case 8: bulan = "Sep"; break;
               case 9: bulan = "Oct"; break;
               case 10: bulan = "Nov"; break;
               case 11: bulan = "Dec"; break;
          }
          return `${tanggal.toString().padStart(2, '0')} ${bulan} ${tahun}`
     }
}