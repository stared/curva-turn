function span(i, j){
	var x = [];
	for(var k = i; k <= j; k++){
		x.push(k);
	}
	return x;
}

// because standard JS "%" sucks at negative numbers
function mod(n, m){
	return (n % m + m) % m;
}

function World(k){
	this.nodes = [];

	this.init = function(k){
		this.nodes.push({neighbours: span(1,k), flourished: true, id:0});
		for(var i = 0; i < k; i++){
			this.bud(0, i);
		}
		return true;
	};

	this.bud = function(n, i){
		var children = this.nodes[n].neighbours;
		if(! this.nodes[children[i]]){
			var node_on_left = children[mod(i + 1, children.length)];  // but "mod vs %" used only once, for init...
			var node_on_right = children[mod(i - 1, children.length)];   // we look outwards; counterclockwise conv
			this.nodes[children[i]] = {neighbours: [node_on_left, n, node_on_right], flourished: false, id:children[i]};
			return true;
		} else {
			return false;
		}
	};

	this.init(k);

	this.flourish = function(n, k){
		var node = this.nodes[n];
		var k0 = node.neighbours.length;
		var no_of_nodes = this.nodes.length;
		if(!node.flourished){
			if(k > k0) {
				this.nodes[node.neighbours[0]].neighbours.push(no_of_nodes + k - k0 - 1);
				this.nodes[node.neighbours[k0 - 1]].neighbours.unshift(no_of_nodes);
				var new_nodes = span(no_of_nodes, no_of_nodes + k - k0 - 1);
				node.neighbours = node.neighbours.concat(new_nodes);
				for(var i = k0; i < k; i++){
					this.bud(n, i);
				}
				node.flourished = true;
				return true;
			} else if (k == k0) {
				this.nodes[node.neighbours[0]].neighbours.push(node.neighbours[k0 - 1]);
				this.nodes[node.neighbours[k0 - 1]].neighbours.unshift(node.neighbours[0]);
				node.flourished = true;
				return true;
			} else {
				console.log("Already too many neighbours!");
				return false;
			}
		} else {
			return false;
		}
	};

	this.toNeighbourList = function(){
		var res = [];
		for(var i = 0; i < this.nodes.length; i++){
			res.push(this.nodes[i].neighbours);
		}
		return res;
	};


	this.sightRange = function(n, cutoff, if_expand){
		var queue = [ {id: n, dist: 0} ];
		// var output = {};
		var visible_nodes = [];
		var dist = 0;
		var angle_counter = 0;  // hack for naive vis
		var range_counter = [0];
		while(queue.length !== 0){
			var nx = queue.shift();  // why pop() does not work here?
			var node = this.nodes[nx.id];
			if(node.dist_from !== n){
				visible_nodes.push(node);
				if (dist !== nx.dist) {
					angle_counter = 0;
				}
				dist = nx.dist;
				if (range_counter[dist] === undefined) { range_counter[dist] = 0; }
				range_counter[dist]++;
				// in some pathological cases dist might get shorter 
				node.dist_from = n;
				node.dist = dist;
				node.angle = angle_counter++;
				// output[nx.id] = dist;
				if(node.flourished === false && if_expand === true){
					this.flourish(nx.id, 6);  // now only flat, we will see later
				}
				if(dist < cutoff){
					for(var i in node.neighbours){
						queue.push({id: node.neighbours[i], dist: dist + 1});
					}
				}
			}
		}
		//this.visible = output;
		return {visible_nodes: visible_nodes, range_counter: range_counter};
		// I need links as well (or  d3 Voronoi)
	};

}


var inList = function(x, list){
	for(var i = 0; i < list.length; i++){
		if (list[i] === x){
			return true;
		}
	}
	return false;
};



