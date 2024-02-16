var Edge = (function(){
    function Edge(cityA, cityB) {
        this._cityA = cityA;
        this._cityB = cityB;
        this._initPheromone = 1; //this represents the initial level of pheromone on the edge when it is first created.
        this._pheromone = this._initPheromone; //represents the current level of pheromone on the edge.

        // Calculate edge distance --> distance between two cities.
        var deltaXSq = Math.pow((cityA.getX() - cityB.getX()), 2);
        var deltaYSq = Math.pow((cityA.getY() - cityB.getY()), 2);
        this._distance = Math.sqrt(deltaXSq + deltaYSq);
    }
    Edge.prototype.pointA = function() {
        return { 'x': this._cityA.getX(), 'y': this._cityA.getY() };
    }//this method returns coordinates of cityA
    
    Edge.prototype.pointB = function() {
        return { 'x': this._cityB.getX(), 'y': this._cityB.getY() };
    }//this method returns coordinates of cityB
    
    Edge.prototype.getPheromone = function() { return this._pheromone; };
    //this method returns current phermone level of the edge.

    Edge.prototype.getDistance = function() { return this._distance; };
    //Returns the distance between cityA and cityB.

    Edge.prototype.contains = function(city) {
        if (this._cityA.getX() == city.getX()) {
            return true;
        }
        if (this._cityB.getX() == city.getX()) {
            return true;
        }
        return false;
    };//checks if a given city is one of the cities connected by the edge.

    Edge.prototype.setInitialPheromone = function(pheromone) {
        this._initPheromone = pheromone;
    };//sets the initial pheromone level of the edge.

    Edge.prototype.setPheromone = function(pheromone) {
        this._pheromone = pheromone;
    };//sets the pheromone level of the edge
    
    Edge.prototype.resetPheromone = function() {
        this._pheromone = this._initPheromone;
    };//resets the pheromone level of the edge to its initial value.
    return Edge;
})();