"use strict";

const sequelizeTest = require("../mixins/sequelizeTest");
const {ServiceBroker} = require("moleculer");

const broker = new ServiceBroker();
broker.createService(sequelizeTest);	
//Service Broker를 생성한 뒤 sequelizeTest를 Service Broker를 통해 newApi.service.js에서 사용할 Service로 등록한다.

module.exports = {
	name: "new-api",	//module의 이름을 지정한다.
	settings: {
		testsetting: "this is test setting"	//settings에서는 전역적으로 사용할 변수등을 선언할 수 있다.
	},
	actions: {	//이 서비스에서 실행할 동작들을 정의한다. 함수형과 key:value 형식으로 정의할 수 있다.
		
		//함수형 정의
		async newAction(ctx){
			return "this is new action" + this.newPrivateMethod();
		},
		async findAllCities(ctx){            	
			const cities = broker.start().then(() => broker.call("citiesModel.find"));
			// Service Broker로 등록한 sequelizeTest 를 호출하여 find action을 실행한다. find action은 mixins에 설정한 moleculer-db에 정의되어있다.
			return cities;
		},

		// key:value 형식 정의
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

				return broker.start()
					.then(() => broker.call("citiesModel.remove", {id: cityName}))
					.then(() => broker.call("citiesModel.find"));
			}
		}


	},
	methods: {
		newPrivateMethod(ctx){	//methods에서는 이 서비스 내에서만 사용할 수 있는 private Method를 정의할 수 있다.
			return " and this is new private method";
		}
	}
	// events: {
	// 	"hello.world"(ctx){
	// 		console.log("Welcome to the world.");
	// 	}
	// },
	// created(){
	// 	console.log("The service, ", this.name, "has been created");
	// }, 
	// async started(){
	// 	// runs when service starts
	// 	console.log("new-api service is started");
	// },
	// async stopped(){
	// 	// runs when service stops
	// 	console.log("new-api service is stopped");
	// },
	// // list of other services this service uses
	// dependencies: [],
	// metadata: {
	// 	scalable: true,
	// 	priority: 5
	// }
	// Properties available to service instances
	// https://moleculer.services/docs/0.14/services.html#Properties-of-Service-Instances

};
