"use strict";

const { ServiceBroker } = require("moleculer");
const dbService = require("moleculer-db");
const sqlAdapter = require("moleculer-db-adapter-sequelize");
const sequelize = require("sequelize");
const { actions, settings } = require("../services/greeter.service");

const broker = new ServiceBroker();

const seq = new sequelize("testdb", "postgres", "Sikbbang2@", {
	host: "localhost",
	port: 5432,
	dialect: "postgres"
});


const model = {
	name: "citiesModel",
	mixins:[dbService],
	adapter: new sqlAdapter(seq),
	model: {
		name: "cities",
		define: {
			name: {
				type: sequelize.STRING,
				primaryKey: true    //명시적으로 PK지정 안하면 "id" 라는 이름의 필드를 찾게 됨 (존재하지 않더라도)
			},
            location: sequelize.STRING
			// location: sequelize.GEOMETRY("POINT")  //POSTGRES의 POINT 타입은 GEOMETRY의 하위 분류로 존재
		},
		options: {
			sequelize,
			modelName: "citiesModel",
            timestamps: false   //이 옵션이 없을 경우 Model에서 createAt updateAt 필드를 찾게 됨(존재하지 않더라도)
		}
        
	},
	settings: {
		// idField: "name", //Sequelize Adapter하고는 사용할 수 없음
		fields: ["name", "location"]
	},
	actions: {
		find: {
			populate: ["name", "location"],
			fields: ["name", "location"],
            searchFields: ["name", "location"]
		},
		selectAllCities(ctx){
			return this.adapter.findAll();
		}
	}

};
module.exports = model;
// broker.start();





// broker.createService({
// 	name: "cities",
// 	mixins:[dbService],
// 	adapter: new sqlAdapter(seq),
// 	model: {
// 		name: "cities",
// 		define: {
// 			name: sequelize.STRING,
// 			location: sequelize.GEOMETRY("POINT")  //POSTGRES의 POINT 타입은 GEOMETRY의 하위 분류로 존재
// 		},
//         options: {
//             sequelize,
//             modelName: "cities"
//         }
// 	}
// });

// broker.start();

