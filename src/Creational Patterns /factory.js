/**
 * Creational Patterns
 */

/**
 * Factory Method
 */

/**
 * Problem as explained under Factory Method in
 * https://refactoring.guru/design-patterns/factory-method
 */

 /**
  * We have different transport methods
  */

var Truck = function(truckNo) {
  this.truckNo = truckNo;
};

var Ship = function(shipNo) {
  this.shipNo = shipNo;
};

var Aeroplane = function(planeNo) {
  this.planeNo = planeNo;
};

/**
 * For each type of transport method. We have different operator.
 * 1. A Driver is linked to Truck Only. A driver should have a valid
 * Road Driving License
 * 2. A Captain is linked to Ship only. A Captain should have a valid Sailing License.
 * 3. A Pilot is linked to Aeroplane Only. A Pilot should have a valid License
 * 
 * Each Operator class may have their own proprties, function definitions.
 */
var Driver = function(name, isValid) {
  this.name = name;
  this.isValid = isValid;
  this.haveValidDrivingLicense = function() {
    return this.isValid;
  };
};

var Captain = function(name, isValid) {
  this.name = name;
  this.isValid = isValid;
  this.haveValidSailingLicense = function() {
    return this.isValid;
  };
};

var Pilot = function(name, isValid) {
  this.name = name;
  this.isValid = isValid;
  this.haveValidAirLicense = function() {
    return this.isValid;
  };
};

/**
 * One vehicle class is linked to one operator only.
 * There is no connection between one type of vehicle to 
 * other type of Operator.
 * 
 * The problem is to create a common interface for all kinds of billing/order
 * 
 * As Each Operator class may have their own function definitions.
 * We need to create a generic solution that works for all.
 */


 /**
  * Here is lets say our previously implmented Order class
  * which works ony for Truck.
  * 
  * Every order need a vehicle and every vehicle need a Operator/Driver.
  */
 var Order = function() {
  this.assignedTo = "";
  this.vehicle = "";
  this.costPerOrder = 1000;
  this.startDelivery = function() {
    // Delivery can only start if the Operator have
    // a valid License to operate assigned vehicle
    if (this.assignedTo.haveValidDrivingLicense()) {
      return (
        "delivered by " +
        this.assignedTo.name +
        " using a truck having no " +
        this.vehicle.truckNo
      );
    } else {
      return false;
    }
  };
  this.setDeliveryPerson = function(driver) {
    this.assignedTo = driver;
  };
  this.assignVehicle = function(driver) {
    this.vehicle = driver;
  };
};

/**
 * We need to create separate order class for each kind of transportation
 * because each transport method may have their own properties, billing behaviour,
 * cost etc.
 * Note here, the definition/structure of the class is same as Order.
 * Underline functionality can be different.
 */
var OrderRoad = function() {
  this.assignedTo = "";
  this.vehicle = "";
  this.costPerOrder = 1000;
  this.startDelivery = function() {
    if (this.assignedTo.haveValidDrivingLicense()) {
      return (
        "delivered by " +
        this.assignedTo.name +
        " using a truck having no " +
        this.vehicle.truckNo
      );
    } else {
      return false;
    }
  };
  this.setDeliveryPerson = function(driver) {
    this.assignedTo = driver;
  };
  this.assignVehicle = function(driver) {
    this.vehicle = driver;
  };
};

var OrderShip = function() {
  this.assignedTo = "";
  this.vehicle = "";
  this.costPerOrder = 5000;
  this.startDelivery = function() {
    if (this.assignedTo.haveValidSailingLicense()) {
      return (
        "delivered by " +
        this.assignedTo.name +
        " using a Ship having no " +
        this.vehicle.shipNo
      );
    } else {
      return false;
    }
  };
  this.setDeliveryPerson = function(driver) {
    this.assignedTo = driver;
  };
  this.assignVehicle = function(driver) {
    this.vehicle = driver;
  };
};

var OrderAirCargo = function() {
  this.assignedTo = "";
  this.vehicle = "";
  this.costPerOrder = 10000;
  this.startDelivery = function() {
    if (this.assignedTo.haveValidAirLicense()) {
      return (
        "delivered by " +
        this.assignedTo.name +
        " using a Plane having no " +
        this.vehicle.planeNo
      );
    } else {
      return false;
    }
  };
  this.setDeliveryPerson = function(driver) {
    this.assignedTo = driver;
  };
  this.assignVehicle = function(driver) {
    this.vehicle = driver;
  };
};

/**
 * Here comes the role of factory.
 * Where we just need to place an order and factory will take
 * care which vehicle, person to assign for that order delivery
 * depending upon the order type without affecting other dependent
 * classes like Bill.
 * 
 * Earlier we were using
 * var order = new Order() // Fixed Road order using Trucks only
 * 
 * Now, order can be of different type which will be using a different vehicle
 * which can be operated by a different skilled person
 * 
 */
var FactoryOrder = function(orderType) {
  if (orderType == "road") {
    return new OrderRoad();
  } else if (orderType == "sea") {
    return new OrderShip();
  } else {
    return new OrderAirCargo();
  }
};

/**
 * A simple class to return total bill amount depending
 * upon the no of order placed by the use
 * 
 * This class know nothing about Transportation method, Delivery Person used.
 * Its job is to just calculate total bill for N number of orders.
 * Earlier this class was working for Trucks only.
 * 
 * After creating factory classes, this class will still work
 * for Road, Cargo, AirCargo without doing any chages this class
 */
var Bill = function(orderList) {
  this.calculateBill = function() {
    return orderList.reduce((acc, item) => {
      return acc + item.costPerOrder;
    }, 0);
  };
};

// First order - Interstate
var order1 = new FactoryOrder("road");
var person1 = new Driver("harpreet", true);
order1.setDeliveryPerson(person1);
var eicher = new Truck('DL 1234');
order1.assignVehicle(eicher);
console.log(order1.startDelivery());

// Second order - Sea Link
var order2 = new FactoryOrder("sea");
var person2 = new Captain("captain haddock", true);
order2.setDeliveryPerson(person2);
var karabudin = new Ship('S 1234');
order2.assignVehicle(karabudin);
console.log(order2.startDelivery());

// Third order - International Order - Urgent Delivery
var order3 = new FactoryOrder("air");
var person3 = new Pilot("Bade Meaow", true);
order3.setDeliveryPerson(person3);
var blackCat = new Aeroplane('Boeing 1234');
order3.assignVehicle(blackCat);
console.log(order3.startDelivery());

// Fourth order - International Order - Urgent Delivery
var order4 = new FactoryOrder("air");
var d4 = new Pilot("Mr. Emirates", true);
order3.setDeliveryPerson(d4);
var emirates = new Aeroplane();
order4.assignVehicle(emirates);
console.log(order3.startDelivery());

var myBill = new Bill([order1, order2, order3, order4]);
console.log(myBill.calculateBill());
