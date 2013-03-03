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

function World(){
	this.nodes = [];

	this.init = function(k){
		this.nodes.push({neighbours: span(1,k)});
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
			this.nodes[children[i]] = {neighbours: [node_on_left, n, node_on_right]};
			return true;
		} else {
			return false;
		}
	};

	this.flourish = function(n, k){
		var node = this.nodes[n];
		var k0 = node.neighbours.length;
		var no_of_nodes = this.nodes.length;
		if(k0 > 2){
			this.nodes[node.neighbours[0]].neighbours.push(no_of_nodes);
			this.nodes[node.neighbours[2]].neighbours.unshift(no_of_nodes + k - k0 - 1);
			var new_nodes = span(no_of_nodes, no_of_nodes + k - k0 - 1);
			node.neighbours = node.neighbours.concat(new_nodes);
			for(var i = 3; i < k; i++){
				this.bud(n, i);
			}
			return true;
		} else {
			return false;
		}
	};
}
