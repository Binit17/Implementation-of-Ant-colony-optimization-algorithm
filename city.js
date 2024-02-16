var City = (function(){
    function City(x,y) {
        this._x = x;
        this._y =y;
    }
    City.prototype.getX = function(){return this._x;};
    City.prototype.getY = function(){return this._y;};
    //now convert the coordinates to string in format x,y
    City.prototype.toString = function(){ 
        return this._x + ','+ this._y;
    };
    City.prototype.isEqual = function(city){
        if(this._x == city._x && this._y == city._y){
            return true;
        }
        return false;
    }
})

//IIFE (Immediately Invoked Function Expression):
//The entire code is wrapped inside an IIFE (function() { /* code here */ })();.
//This is a common pattern used to create a closure and prevent pollution of the global namespace. 
//It also encapsulates the code, making the variables within it inaccessible from outside, unless explicitly exposed.