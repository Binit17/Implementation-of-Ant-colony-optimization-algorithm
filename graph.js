var Graph = (function(){
    function Graph() { //constructor function.
        this._cities = []; //an array that holds instances of City class.
        this._edges = {}; //an object that will store edges between cities.
    }
    Graph.prototype.getEdges = function() { return this._edges; }; //returns the _edges object.
    Graph.prototype.getEdgeCount = function() { return Object.keys(this._edges).length };//returns the number of edges in the graph.
    // In this case, this._edges is an object containing the edges of the graph. Object.keys(this._edges) returns an array of strings representing the keys (property names) of the _edges object.
    //.lenght gives the total number of elements in an array.

    Graph.prototype.getCity = function(cityIndex) {
        return this._cities[cityIndex];
    }; //returns the city at the specified index in the '_cities' array.

    Graph.prototype.getCities = function() {
        return this._cities;
    }; //return the array of cities
    
    Graph.prototype.size = function() {
        return this._cities.length;
    }; //return the number of cities in a graph.

    Graph.prototype.addCity = function(x, y) {
        this._cities.push(new City(x,y));
    }; //adds a new city to the graph by creating a new instance of the 'city' class with coordinates (x,y) and push it to '_cities' array.

    Graph.prototype._addEdge = function(cityA, cityB) {
        this._edges[cityA.toString() + '-' + cityB.toString()] = new Edge(cityA, cityB);
    };//Private method that creates a new Edge object between two cities (cityA and cityB) and adds it to the _edges object.
    
    Graph.prototype.getEdge = function(cityA, cityB) {
        if (this._edges[cityA.toString() + '-' + cityB.toString()] != undefined) {
            return this._edges[cityA.toString() + '-' + cityB.toString()];
        }
        if (this._edges[cityB.toString() + '-' + cityA.toString()] != undefined) {
            return this._edges[cityB.toString() + '-' + cityA.toString()];
        }
    };//Returns the edge between two cities if it exists in _edges.

    Graph.prototype.createEdges = function() {
        this._edges = {};

        for (var cityIndex = 0; cityIndex < this._cities.length; cityIndex++) {
            for (var connectionIndex = cityIndex; connectionIndex < this._cities.length; connectionIndex++) {
                this._addEdge(this._cities[cityIndex], this._cities[connectionIndex]);
            }
        }
    };//kunai city add garesi, teslai aru sabai cities sanga connect garidinxa by calling addEdge function with the help of addEdge code.
    
    Graph.prototype.resetPheromone = function() {
        for (var edgeIndex in this._edges) {
            this._edges[edgeIndex].resetPheromone();
        }
    }//Resets the pheromone level of all edges in the _edges object.
    
    Graph.prototype.clear = function() {
        this._cities = [];
        this._edges = {};
    }//Clears both the _cities array and the _edges object, effectively resetting the graph.

    return Graph;
})();