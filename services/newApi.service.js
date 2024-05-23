"use strict";

const sequelizeTest = require("../mixins/sequelizeTest");
const {ServiceBroker} = require("moleculer");

const broker = new ServiceBroker();
broker.createService(sequelizeTest);

module.exports = {
	name: "new-api",
	settings: {
		testsetting: "this is test setting"
	},
	actions: {

		async newAction(ctx){
			return "this is new action" + this.newPrivateMethod();
		},
		async findAllCities(ctx){            
			const cities = broker.start().then(() => broker.call("citiesModel.find"));

			return cities;
		},
		insertCityInfo: {
			params:{
				name: "string",
				location: "string"
			},
			async handler(ctx){
				// ctx = this.handler();
				const parameters = ctx.params;
				const cityName = parameters.name;
				const cityLocation = parameters.location;
				console.log(cityName + ", " + cityLocation);
				return broker.start()
					.then(() => 
						broker.call("citiesModel.create", {name: cityName, location: cityLocation}))
					.then(() =>
						broker.call("citiesModel.find"));
    
    
			}
		},
		updateCityInfo:{
			params:{
				name: "string",
				location: "string"
			},
			async handler(ctx){
				const parameters = ctx.params;
				const cityName = parameters.name;
				const cityLocation = parameters.location;

				return broker.start()
					.then(() => broker.call("citiesModel.update", {id: cityName, location: cityLocation}))
					.then(() => broker.call("citiesModel.find"));
			}
		},
		deleteCityInfo: {
			params: {
				name: "string" //,
				// location: "string"
			},
			async handler(ctx){
				const parameters = ctx.params;
				const cityName = parameters.name;
				// const cityLocation = parameters.location;

				return broker.start()
					.then(() => broker.call("citiesModel.remove", {id: cityName}))
					.then(() => broker.call("citiesModel.find"));
			}
		}


	},
	methods: {
		newPrivateMethod(ctx){
			return " and this is new private method";
		}
	},
	events: {
		"hello.world"(ctx){
			console.log("Welcome to the world.");
		}
	},
	created(){
		console.log("The service, ", this.name, "has been created");
	}, 
	async started(){
		// runs when service starts
		console.log("new-api service is started");
	},
	async stopped(){
		// runs when service stops
		console.log("new-api service is stopped");
	},
	// list of other services this service uses
	dependencies: [],
	metadata: {
		scalable: true,
		priority: 5
	}
	// Properties available to service instances
	// https://moleculer.services/docs/0.14/services.html#Properties-of-Service-Instances

}
