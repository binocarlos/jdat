var jdat = require('../src/index');

describe('jdat', function(){

  function new_jdat(){
    var herodata = [{
      name:'Superman',
      speed:9,
      children:[{
        name:'Super Bike',
        speed:7
      },{
        name:'Super Boat',
        speed:5
      }]
    },{
      name:'Spiderman',
      speed:8,
      children:[{
        name:'Spider Bike',
        speed:8
      },{
        name:'Spider Boat',
        speed:6
      }]
    },{
      name:'SilverSurfer',
      speed:11,
      children:[{
        name:'Silver Bike',
        speed:11
      },{
        name:'Silver Boat',
        speed:11
      }]
    }]

    var HeroClass = function(arr){
      this.models = arr;
    }

    HeroClass.prototype.halfspeed = function(){
      return this.models[0].speed/2;
    }

    function factory(arr){
      return new HeroClass(arr);
    }

    jdat({
      proto:HeroClass.prototype,
      field:'models',
      childfield:'children',
      spawn:function(arr){
        return new HeroClass(arr);
      }
    })

    return new HeroClass(herodata);
  }

  describe('constructor', function(){
  
    it('should be a function', function(){
      jdat.should.be.type('function');
    })

    it('should return the extended object', function(){

      var Obj = function(arr){
        this.models = arr;
      }

      Obj.prototype.len = function(){
        return this.models.length;
      }

      jdat({
        proto:Obj.prototype,
        field:'models',
        childfield:'children',
        spawn:function(arr){
          return new Obj(arr);
        }
      })

      var obj = new Obj([{
        name:'test'
      }])

      obj.len().should.equal(1);
      obj.instances().length.should.equal(1);
      
    })


    it('should spawn a new instance', function(){

      var dat = new_jdat();

      var spawned = dat.spawn([dat.get(1)]);

      spawned.get(0).name.should.equal('Spiderman');
      
    })


  })

  describe('accessors', function(){


    it('should do toJSON', function(){
      var dat = new_jdat();

      dat.toJSON()[1].name.should.equal('Spiderman');
    })


    it('should get a model at indexes', function(){
      var dat = new_jdat();

      var superman = dat.get(0);
      superman.name.should.equal('Superman');

      var spider = dat.get(1);
      spider.name.should.equal('Spiderman');

      var silver = dat.get(2);
      silver.name.should.equal('SilverSurfer');
    })

    it('should an instance at indexes', function(){
      var dat = new_jdat();

      var superman = dat.eq(0);
      superman.models[0].name.should.equal('Superman');

      var spider = dat.eq(1);
      spider.models[0].name.should.equal('Spiderman');

      var silver = dat.eq(2);      
      silver.models[0].name.should.equal('SilverSurfer');
    })

    it('should get the first instance', function(){
      var dat = new_jdat();

      var superman = dat.first();
      superman.models[0].name.should.equal('Superman');
    })

    it('should get the last instance', function(){
      var dat = new_jdat();

      var silver = dat.last();
      silver.models[0].name.should.equal('SilverSurfer');
    })

    it('should count', function(){
      var dat = new_jdat();

      dat.count().should.equal(3);
    })
  })

  describe('iterators', function(){

    it('should do an each over the instances', function(){
      var dat = new_jdat();

      var names = {};

      dat.each(function(instance){
        names[instance.models[0].name] = true;
      })

      names.Superman.should.equal(true);
      names.Spiderman.should.equal(true);
      names.SilverSurfer.should.equal(true);

    })

    it('should do a map over the instances', function(){
      var dat = new_jdat();

      var names = dat.map(function(instance){
        return instance.get(0).name;
      })

      names[0].should.equal('Superman');
      names[1].should.equal('Spiderman');
      names[2].should.equal('SilverSurfer');

    })

  })


  describe('tree', function(){

    it('should return an array of all children', function(){
      var dat = new_jdat();

      var children = dat.children();

      children.count().should.equal(6);

      children.get(0).name.should.equal('Super Bike');
      children.get(1).name.should.equal('Super Boat');
      children.get(2).name.should.equal('Spider Bike');
      children.get(3).name.should.equal('Spider Boat');
      children.get(4).name.should.equal('Silver Bike');
      children.get(5).name.should.equal('Silver Boat');

    })


    it('should return an array of all descendents', function(){
      var dat = new_jdat();

      var des = dat.descendents();

      des.count().should.equal(9);

    })


    it('should run a recurse function', function(){
      var dat = new_jdat();

      var hit = [];

      dat.recurse(function(instance){
        hit[instance.get(0).name] = 10;
      })

      Object.keys(hit).length.should.equal(9);
      hit['Spider Bike'].should.equal(10);

    })
  })

})


/*

   children:[{
        name:'Super Bike',
        speed:7
      },{
        name:'Super Boat',
        speed:5
      }]
    },{
      name:'Spiderman',
      speed:8,
      children:[{
        name:'Spider Bike',
        speed:8
      },{
        name:'Spider Boat',
        speed:6
      }]
    },{
      name:'SilverSurfer',
      speed:11,
      children:[{
        name:'Silver Bike',
        speed:11
      },{
        name:'Silver Boat',
        speed:11
      }]
  
*/