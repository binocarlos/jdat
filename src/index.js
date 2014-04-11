function getPrototype(options){
	return {
		toJSON:function(){
			return this[options.field] || [];
		},
		instances:function(){
			var self = this;
			return this.toJSON().map(function(model){
				return self.spawn([model]);
			})
		},
		spawn:function(models){
		  return options.spawn.apply(this, [(models || [])]);
		},
		children:function(){
		  var models = [];
		  this.each(function(container){
		  	var model = container.get(0);
		  	var children = model[options.childfield];
		    models = models.concat(children || []);
		  })
			return this.spawn(models);
		},
		descendents:function(){
			var ret = [];

		  function scoopmodels(instance){
		    ret = ret.concat(instance.toJSON());
		    instance.children().each(scoopmodels);
		  }

		  scoopmodels(this);

		  return this.spawn(ret);
		},
		recurse:function(fn){
			this.descendents().instances().forEach(fn);
		},
		each:function(fn){
			this.instances().forEach(fn);
			return this;
		},
		map:function(fn){
			return this.instances().map(fn);
		},
		count:function(){
			return this.toJSON().length;
		},
		first:function(){
			return this.eq(0);
		},
		last:function(){
			return this.eq(this.count()-1);
		},
		eq:function(index){
			return this.spawn([this.get(index)]);
		},
		get:function(index){
			return this.toJSON()[index];
		}
	}
}

module.exports = function(options){
	options = options || {};

	if(!options.field){
		throw new Error('field option needed');
	}

	if(!options.proto){
		throw new Error('proto option needed');
	}

	if(!options.childfield){
		throw new Error('childfield option needed');
	}

	if(!options.spawn){
		throw new Error('spawn option needed');
	}

	var proto = getPrototype(options);

	Object.keys(proto || {}).forEach(function(key){
	  options.proto[key] = proto[key];
	})

	return options.proto;
}