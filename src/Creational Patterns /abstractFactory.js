/**
 * Creational Patterns
 */

/**
 * Abstract Factory Method
 */

/**
 * Problem as explained under Factory Method in
 * https://refactoring.guru/design-patterns/abstract-factory
 */
 
/**
 * It's like a super factory
 * That can manage group of Factories
 * Each one sharing common/related properties.
 * Its like different variant of same Product
 * eg: Phone, Mobile Phone, Smart Phone sharing common/related properties
 * with some advance features
 */


 /**
  * A Simple Furniture Factory Class
  * Why factory - It knows how to create a Sofa, a Table, a Chair
  * We just need to call the createMethod. This is what a factory does.
  * A Factory does not know the implementation details. It just use
  * the subClass.
  */
var FurnitureFactory = function() {
    this.createSofa = function() {
        // or
        // return new Sofa()
        return 'Sofa'
    }

    this.createTable = function() {
        // or
        // return new Table()
        return 'Table'
    }
    this.createChair = function() {
        // or
        // return new Chair()
        return 'Chair'
    }
}

/**
 * Another Furniture Factory.
 * A Furniture factory with some added features
 * in this case - type
 */
var RoyalFurintureFactory = function(factory) {
    this.type = 'Royal'

    this.createSofa = function() {
        return this.type + factory.createSofa()
    }

    this.createTable = function() {
        return this.type + factory.createTable()
    }
    this.createChair = function() {
        return this.type + factory.createChair()
    }
}

/**
 * Another Furniture Factory.
 * A Furniture factory with some added features
 * in this case - type
 */
var ModernFurintureFactory = function(factory) {
    this.type = 'Modern'

    this.createSofa = function() {
        return this.type + factory.createSofa()
    }

    this.createTable = function() {
        return this.type + factory.createTable()
    }
    this.createChair = function() {
        return this.type + factory.createChair()
    }
}

/**
 * Here comes the Abstract Factory.
 * A big factory that returns small factory.
 * Small Factories include - Royal Furniture Factory and 
 * Modern Furniture factory depending on the type provided to
 * the abstract factory
 * 
 */
var ConfigFactory = function(type) {
    var factory = new FurnitureFactory()
    if(type == 'Royal') {
        this.factory = new RoyalFurintureFactory(factory)
    } else if(type == 'Modern') {
        this.factory = new ModernFurintureFactory(factory)
    } else {
        this.factory = new FurintureFactory(factory)
    }
    return this.factory
}


var factory = new ConfigFactory('Royal')
console.log(factory.createChair())
console.log(factory.createSofa())
console.log(factory.createTable())

var factory = new ConfigFactory('Modern')
console.log(factory.createChair())
console.log(factory.createSofa())
console.log(factory.createTable())

var factory = new FurnitureFactory('Modern')
console.log(factory.createChair())
console.log(factory.createSofa())
console.log(factory.createTable())

/**
 * Another very common problem - Themes
 */

/**
 * A Simple Form Class
 */
 var Form = function(style) {
    this.child = [];
    this.style = style || 'layout one column'
    this.addChild = function(item) {
        this.child.push(item)
    }
    this.getForm = function() {
        return {
            [this.style] : this.child
        }
    }
}

/**
 * A Theme Class with some elements designed
 */
var Theme = function() {
    this.createButton = function() {
        return 'Button'
    }
    this.createTextBox = function() {
        return 'TextBox'
    }
    this.createLabel = function() {
        return 'Label'
    }
    this.createForm = function(style) {
        return new Form(style)
    }
}

/**
 * A Theme Factory which modifies Theme to produce
 * some Form elements designed for or compatible with Windows OS
 */

var WindowsTheme = function(factory) {
    this.type = 'windows'
    this.createButton = function() {
        return this.type + factory.createButton()
    }
    this.createTextBox = function() {
        return this.type + factory.createTextBox()
    }
    this.createLabel = function() {
        return this.type + factory.createLabel()
    }
    this.createForm = function() {
        return factory.createForm(this.type + ' three col layout')
    }
}

/**
 * A Theme Factory which modifies Theme to produce
 * some Form elements designed for or compatible with Mac OS
 */

var MacTheme = function(factory) {
    this.type = 'Mac'
    this.createButton = function() {
        return this.type + factory.createButton()
    }
    this.createTextBox = function() {
        return this.type + factory.createTextBox()
    }
    this.createLabel = function() {
        return this.type + factory.createLabel()
    }
    this.createForm = function() {
        return factory.createForm(this.type + ' two col layout')
    }
}

/**
 * Here comes the Abstract Factory.
 * That return a factory depending on the type provided
 */
var configTheme = function(type) {
    var theme = new Theme()
    if(type == 'windows') {
        // This will modify Theme to return a Windows Theme Factory
        this.factory = new WindowsTheme(theme);
    } else {
        // This will modify Theme to return a MAC Theme Factory
        this.factory = new MacTheme(theme);
    }
    return this.factory
}

var macTheme = new configTheme('mac')
// When you have the factory - Create your elements using factory
console.log(macTheme.createButton())
console.log(macTheme.createLabel())
console.log(macTheme.createTextBox())
console.log(macTheme.createForm())
console.log(macTheme.createForm())
console.log(macTheme.createForm().getForm())


var windowsTheme = new configTheme('windows')
// When you have the factory - Create your elements using factory
console.log(windowsTheme.createButton())
console.log(windowsTheme.createLabel())
console.log(windowsTheme.createTextBox())
console.log(windowsTheme.createForm())
console.log(windowsTheme.createForm().getForm())

var theme = new Theme()
// Without any factory - Create your elements with Normal Theme Factory
console.log(theme.createButton())
console.log(theme.createLabel())
console.log(theme.createTextBox())
console.log(theme.createForm())
console.log(theme.createForm().getForm())


/**
 * Another interesting case - Shapes.
 * Shapes can be 2D, 3D depending upon the canvas it is painted on.
 */

 /**
  * A 2D Shape
  */
var Circle = function() {
    this.name = 'Circle'
    this.getShape = function() {
        return this.name
    }
}

 /**
  * A 2D Shape
  */
 var Square = function() {
    this.name = 'Square'
    this.getShape = function() {
        return this.name
    }
}

 /**
  * A 3D Shape
  */
 var Sphere = function() {
    this.name = 'Sphere'
    this.getShape = function() {
        return this.name
    }
}

 /**
  * A 3D Shape
  */
 var Cube = function() {
    this.name = 'Cube'
    this.getShape = function() {
        return this.name
    }
}

 /**
  * A 2D Shape Factory
  */

var Shape2DFactory = function() {
    this.createCircle = function() {
        return new Circle()
    }
    this.createSquare = function() {
        return new Square()
    }
}

 /**
  * A 3D Shape Factory
  */
 var Shape3DFactory = function() {
    //  Note: Here create circle is creating a Sphere
    this.createCircle = function() {
        return new Sphere()
    }
    this.createSquare = function() {
    //  Note: Here create square is creating a Cube
    return new Cube()
    }
}

/**
 * An Abstract Factory for a Canvas - 2D/3D
 */
var Canvas = function(type) {
    this.items = []
    if(type == '3d') {
        this.factory = new Shape3DFactory()
    } else if(type == '2d') {
        this.factory = new Shape2DFactory()
    }

    // Just for the simplicity of the example
    this.items.push(this.factory.createCircle())
    this.items.push(this.factory.createSquare())
}

var c = new Canvas('3d')
c
console.log(c.items)


var c = new Canvas('2d')
c
console.log(c.items)


/**
 * Here comes the most interesting example
 *
*/

/**
 * A Car Class
 */
var Car = function(company) {
    this.model = ''
    this.company = company
    console.log(company.name)
    console.log(this)
}

/**
 * A Luxury Car Class
 */

var luxury = function(company) {
    Car.call(this, company)
    console.log(this)
    this.createCar = function() {
        console.log('Constructed a luxury car')
        return (`Constructed a luxury ${this.company.name} car`)
    }
}

/**
 * A Mini Car Class
 */

var mini = function(company) {
    Car.call(this, company)
    this.createCar = function() {
        console.log(`Constructed a mini ${this.company.name} car`)
        return (`Constructed a mini ${this.company.name} car`)
    }
}

/**
 * A Micro Car Class
 */

var micro = function(company) {
    Car.call(this, company)
    this.createCar = function() {
        console.log(`Constructed a micro ${this.company.name} car`)
        return (`Constructed a micro ${this.company.name} car`)
    }
}

// Just inhreritance stuff
luxury.prototype = Object.create(Car.prototype)
luxury.prototype.constructor = luxury.prototype

mini.prototype = Object.create(Car.prototype)
mini.prototype.constructor = mini.prototype

mini.prototype = Object.create(Car.prototype)
mini.prototype.constructor = mini.prototype


// A manufaturer Company Class
var Company = function(name) {
    this.name = name
}

var bmw = new Company('BMW')
var mercedes = new Company('Mercedes')
bmw
mercedes


/**
 * A BMW Factory creates all three variants of the Car :- 
 * A Luxury, A Mini and A Micro
 */

var BMWFactory = function(type) {
    this.factory = ''
    switch (type) {
        case 'luxury': 
        this.factory = new luxury(bmw);
            break;
        case 'mini': 
        this.factory = new mini(bmw);
            break;
        case 'micro':
            this.factory = new micro(bmw);
            break; 
    }
    return this.factory
}

/**
 * A Mercedes Factory creates all three variants of the Car :- 
 * A Luxury, A Mini and A Micro
 */
var MercedesFactory = function(type) {
    this.factory = ''
    switch (type) {
        case 'luxury': 
        this.factory = new luxury(mercedes);
            break;
        case 'mini': 
        this.factory = new mini(mercedes);
            break;
        case 'micro':
            this.factory = new micro(mercedes);
            break; 
    }
    return this.factory
}

/**
 * Here comes the Abstract Factory which returns
 * a Car Factory to Create a Car depending upon
 * its Type and the Manufacturer Company/Brand
 */

var CarAbstractFactory = function(config) {
    this.factory = '';
    this.getCar = function() {
        if(config.company == 'BMW') {
            this.factory =  new BMWFactory(config.type)
        } else {
            this.factory =  new MercedesFactory(config.type)
        }    
        return this.factory.createCar()
    }
}

// Please note the config passed - Brand and Type
var bmwLuxury = new CarAbstractFactory({
    company:'BMW',
    type:'luxury'
})
console.log(bmwLuxury.getCar())


var mercedesMini = new CarAbstractFactory({
    company:'Mercedes',
    type:'mini'
})
console.log(mercedesMini.getCar())
