"use strict";

const dbService = require("moleculer-db");
const sqlAdapter = require("moleculer-db-adapter-sequelize");
const sequelize = require("sequelize");

const seq = new sequelize("postgres", "postgres", "hoomanhoo2@", {
						//접속할 데이터베이스, DB 계정명, 비밀번호, 
	host: "localhost",  //DB Server의 Host 정보
	port: 5432,			// DB Server의 Port 정보
	dialect: "postgres" // 사용하는 DB의 방언 (dialect) 종류
});


const model = {
	name: "citiesModel",	//Table의 프로젝트 내에서 사용할 이름을 지정한다. (Table명과는 다름)
	mixins:[dbService],		// 해당 서비스의 mixin을 지정한다. mixins는 상속과 비슷한 역할을 한다.
							// mixins에 대한 자세한 내용은 https://razvanpredescu.medium.com/moleculer-mixins-a-short-introduction-a69f053148f5 룰 참고한다.
	adapter: new sqlAdapter(seq),	//Adapter를 설정한다
	model: {	//프로젝트에서 사용할 객체 모델을 정의한다.
		name: "cities",	//Table의 이름을 지정한다
		define: {		// Table의 네부 속성을 정의한다.
			name: {		// 컬럼명을 정의한다.
				type: sequelize.STRING,	// 컬럼의 자료형을 지정한다.
				primaryKey: true    //명시적으로 PK지정 안하면 "id" 라는 이름의 필드를 찾게 됨 (존재하지 않더라도)
			},
            location: sequelize.STRING
			// location: sequelize.GEOMETRY("POINT")  //POSTGRES의 POINT 타입은 GEOMETRY의 하위 분류로 존재
		},
		options: {	//기타 설정을 정의한다.
			sequelize,
			modelName: "citiesModel",
            timestamps: false   //이 옵션이 없을 경우 Model에서 createAt updateAt 필드를 찾게 됨(존재하지 않더라도)
		}
        
	},
	settings: {
	},
	actions: {
	}

};
module.exports = model;


