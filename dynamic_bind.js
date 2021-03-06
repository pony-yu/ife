function Observer(data) {
  this.data=data;
  this.walk(data);
}

let p = Observer.prototype;

p.walk =function(obj){
  let val;
  for (let key in obj){
    if(obj.hasOwnProperty(key)){
      val=obj[key];
      if(typeof val === 'object'){
        new Observer(val);
      }
      this.convert(key,val);
    }
  }
};

p.convert=function(key,val){
  object.defineProperty(this.data,key,{
    enumerable:true,
    configurable:true,
    get: function(){
      console.log('你访问了 '+key);
      return val;
    },
    set:function(newVal){
      console.log('你设置了'+key);
      console.log('新的'+key+'  =  '+newVal);
      if (newVal===val) {
        return;
      }
      val=newVal;
    }
  })
};


let data={
    user:{
        name:'pony',
        age:24
    },
    address:{
        city:'chongqing'
    }
};

let app=new Observer(data);
console.log(app.data.user);
app.data.address='sichuan';
console.log(app.data.address);
