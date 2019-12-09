/**
 * Creational Patterns
 */

/**
 * Builder Factory
 */

/**
 * Problem as explained under Factory Method in
 * https://refactoring.guru/design-patterns/builder
 * for better understanding use - https://quokkajs.com/
 */

 /**
  * House Class (Not Dr. House)
  * Everyone wants to create their own Dream House.
  * Some wants a Swimming Pool, some wants a garage, some wants garden.
  * House class takes care of everything.
  */

var House = function() {
    this.garden = false;
    this.swimmongPool = false;
    this.roof = false;
    this.garage = false;
    this.windows = 1;
    this.doors = 1;
    this.houseConfig = []
    this.reset = function() {
        this.garden = false;
        this.swimmongPool = false;
        this.roof = false;
        this.garage = false;
        this.windows = 1;
        this.doors = 1;
        this.houseConfig.splice(0)    
    }
    this.setGarden = function(garden) {
        this.garden = garden
        this.houseConfig.push('garden')
    }
    this.setSwimmingPool = function(swimmingPool) {
        this.swimmingPool = swimmingPool
        this.houseConfig.push(swimmingPool + ' swimming pool')
    }
    this.setRoof = function(roof) {
        this.roof = roof
        this.houseConfig.push('roof')
    }
    this.setGarage = function(garage) {
        this.garage = garage
        this.houseConfig.push('garage')
    }
    this.setWindows = function(windows) {
        this.windows = windows
        this.houseConfig.push(windows + ' windows')
    }
    this.setDoors = function(doors) {
        this.doors = doors
        this.houseConfig.push(doors + ' doors')
    }
    this.getHouse = function() {
        return 'House with ' + this.houseConfig.join(', ') +  ' created'
    }

}

/**
  * Everyone wants unique feature in their house as per their need.
  * But we can't have separate builder for every customer.
  * Our builder is so skilled that it can fullfill your every need.
 */
var HouseBuilder = function() {
    this.house = new House();
    this.reset = function(garden) {
        this.house.reset()
    }
    this.setGarden = function(garden) {
        this.house.setGarden(garden)
    }
    this.setSwimmingPool = function(swimmingPool) {
        this.house.setSwimmingPool(swimmingPool)
    }
    this.setRoof = function(roof) {
        this.roof = roof
        this.house.setRoof(roof)
    }
    this.setGarage = function(garage) {
        this.garage = garage
        this.house.setGarage(garage)
    }
    this.setWindows = function(windows) {
        this.windows = windows
        this.house.setWindows(windows)
    }
    this.setDoors = function(doors) {
        this.doors = doors
        this.house.setDoors(doors)
    }
    this.getHouse = function() {
        return this.house.getHouse()
    }
}

/**
 * A Builder also need someone that can tell him/her what to create
 * We need a Director class which can help increase the efiiciency of
 * our Builder. 
 * A Director class knows the specification for some common customer needs
 * and can also fullfill a new demand because he/she has a skilled Builder.
 * He/She can quickly direct builder to create different variant of House.
 */
var Director = function() {
    this.builder = new HouseBuilder();
    this.createSmallHouse = function() {
        this.builder.reset()
        this.builder.setWindows(2)
        this.builder.setDoors(1)
        return this.builder
    }
    this.createBiglHouse = function() {
        this.builder.reset()
        this.builder.setWindows(5)
        this.builder.setDoors(2)
        return this.builder
    }
    this.createMansionHouse = function() {
        this.builder.reset()
        this.builder.setWindows(15)
        this.builder.setDoors(20)
        this.builder.setGarage(true)
        this.builder.setSwimmingPool(2)
        this.builder.setRoof(true)
        return this.builder
    }
}

var director = new Director()
var mySmallHouse = director.createSmallHouse()
mySmallHouse = mySmallHouse.getHouse()
mySmallHouse

var myBigHouse = director.createBiglHouse()
myBigHouse = myBigHouse.getHouse()
myBigHouse

var myMansion = director.createMansionHouse()
myMansion = myMansion.getHouse()
myMansion
