var Ant = (function () {
    function Ant(graph, params) {  
        this._graph = graph;
        this._alpha = params.alpha;
        this._beta = params.beta;
        this._q = params.q;
        this._tour = null;
    }//constructor function.
    // here we pass two parameters. we send an instance of graph class.
    //next is params. it is an object containing parameters like alpha, beta and q.

    Ant.prototype.reset = function() {
        this._tour = null;
    };
    
    Ant.prototype.init = function() {
        this._tour = new Tour(this._graph);
        var randCityIndex = Math.floor(Math.random() * this._graph.size());
        this._currentCity = this._graph.getCity(randCityIndex);
        this._tour.addCity(this._currentCity);
    }//first this method initializes the ant's tour by selecting a random starting city from graph.
    //it adds the selcted city to the tour.

    Ant.prototype.getTour = function() {
        return this._tour;
    };//returns current tour of ant.

    Ant.prototype.makeNextMove = function() {
        if (this._tour == null) {
            this.init();
        }

        var rouletteWheel = 0.0; // it is initialized to keep track of cumulative probability.
        var cities = this._graph.getCities();  // retrieves the list of cities from the graph.

        var cityProbabilities = [];
        for (var cityIndex in cities) {
            if (!this._tour.contains(cities[cityIndex])) {
                var edge = this._graph.getEdge(this._currentCity, cities[cityIndex]);
                if (this._alpha == 1) {
                    var finalPheromoneWeight = edge.getPheromone();
                } else {
                    var finalPheromoneWeight = Math.pow(edge.getPheromone(), this._alpha);
                }
                cityProbabilities[cityIndex] = finalPheromoneWeight * Math.pow(1.0 / edge.getDistance(), this._beta);
                rouletteWheel += cityProbabilities[cityIndex];
            }
        }//this mathematics is explained in copy.
        var wheelTarget = rouletteWheel * Math.random();
        var wheelPosition = 0.0;
        for (var cityIndex in cities) {
            if (!this._tour.contains(cities[cityIndex])) {
                wheelPosition += cityProbabilities[cityIndex];
                if (wheelPosition >= wheelTarget) {
                    this._currentCity = cities[cityIndex];
                    this._tour.addCity(cities[cityIndex]);
                    return;
                }
            }
        }
    };//this method determines the next move of the ant based on the pheromone trails and distances between cities.
    //it calculates the probabilites of selecting each unvisited city using a roulette wheel selection mechanism.
    //it selects the next city based on the calculated probabilites and updates the tour accordingly.

    Ant.prototype.tourFound = function() {
        if (this._tour == null) {
            return false;
        }
        return (this._tour.size() >= this._graph.size());
    };//this method checks if the ant has completed its tour.(i.e visited all cities.)

    Ant.prototype.run = function(callback) {
        this.reset();
        while (!this.tourFound()) {
            this.makeNextMove();
        }
    };//repeatedly calls 'makeNextMove()' until it finds a complete solution.

    Ant.prototype.addPheromone = function(weight) {
        if (weight == undefined) {
            weight = 1;
        }

        var extraPheromone = (this._q * weight) / this._tour.distance();
        for (var tourIndex = 0; tourIndex < this._tour.size(); tourIndex++) {
            if (tourIndex >= this._tour.size()-1) {
                var fromCity = this._tour.get(tourIndex);
                var toCity = this._tour.get(0);
                var edge = this._graph.getEdge(fromCity, toCity);
                var pheromone = edge.getPheromone();
                edge.setPheromone(pheromone + extraPheromone);
            } else {
                var fromCity = this._tour.get(tourIndex);
                var toCity = this._tour.get(tourIndex+1);
                var edge = this._graph.getEdge(fromCity, toCity);
                var pheromone = edge.getPheromone();
                edge.setPheromone(pheromone + extraPheromone);
            }
        }
    };//this method updates the pheromone levels on the edges of the tour path.
    return Ant;
})();