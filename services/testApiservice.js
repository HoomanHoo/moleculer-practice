// "use strict";

// const DBMix = require("../mixins/testDB.mixin");

// module.exports = {
//     name: "new-api",
//     mixins: [DBMix("performance")],
//     settings: {
//     },
//     actions: {
//         hello(ctx) {
//             return "Hello, World!";
//         },
//         dbConnectionTest: {
//             async handler(ctx) {
//                 return this.adapter.find();
//             }
//         },
//         createUser: {
//             params: {
//                 id: "string",
//                 name: "string",
//                 passwd: "string",
//                 age: "number|integer|positive",
//                 ref_val1: "string"
//             },
//             async handler(ctx) {    //아직 create는 불가능함
//                 this.adapter.create({
//                     id: ctx.params.id,
//                     name: ctx.params.name,
//                     passwwd: ctx.params.passwd,
//                     age: ctx.params.age,
//                     ref_val1: ctx.params.ref_val1
//                 });
//                 return this.adapter.find();
//             }
//         }
//     },
//     methods: {
//         helloPrivate(ctx) {
//             return "a private Hello! :D";
//         }
//     },
//     events: {
//         "hello.world"(ctx) {
//             console.log("Welcome to the world.");
//         }
//     },
//     created() {
//         console.log("The service, ", this.name, "has been created");
//     },
//     async started() {
//         // runs when service starts
//     },
//     async stopped() {
//         // runs when service stops
//     },
//     // list of other services this service uses
//     dependencies: [],
//     metadata: {
//         scalable: true,
//         priority: 5
//     }
//     // Properties available to service instances
//     // https://moleculer.services/docs/0.14/services.html#Properties-of-Service-Instances

// }