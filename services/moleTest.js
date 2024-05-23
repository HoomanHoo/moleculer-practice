const {ServiceBroker} = require("moleculer");
const HttpServer = require("moleculer-web");


const broker1 = new ServiceBroker({
	nodeID: "test",
	transporter:"TCP"

});

broker1.createService({
	name: "gateway",
	mixins: [HttpServer],

	settings:{
		routes: [{
			aliases: {
				"GET /test": "test.testFunc",
                "GET /link-test": "linkTest.linkTestFunc"
			}
		}]
	}
});

const broker2 = new ServiceBroker({
	nodeID: "testNode",
	transporter: "TCP"
});

broker2.createService({
	name: "test",
	actions: {
		testFunc(){
			return [{this: "is test value"}];
		}
	}
});

const broker3 = new ServiceBroker({
	nodeID: "testNode2",
	transporter: "TCP"
});;

broker3.createService({
	name: "linkTest",
	actions: {
		linkTestFunc(req){
			const result = req.params.frontData + " is turn around back-end";
			return result;
		}
	}
})

Promise.all([broker1.start(), broker2.start(), broker3.start()]);
