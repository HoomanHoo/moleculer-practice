"use strict";

const DbService = require("moleculer-db");
const Adapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");

module.exports = function () {

    const dbInfo = new Sequelize("postgres", "postgres", "hoomanhoo2@", {
        host: "localhost",
        port: 5432,
        dialect: "postgres"
    }); //접속할 데이터베이스, DB 계정명, 비밀번호, {host, port, dialect}

    const schema = {
        name: "performance",    //sequelize는 단수형으로 엔티티 이름을 설정해도 복수형으로 바꾸어 DB와 매핑한다
        mixins: [DbService],
        adapter: new Adapter(dbInfo),
        settings: {
        },
        model: {
            name: "performance",
            define: {
                id: {
                    type: Sequelize.STRING,
                    primaryKey: true    //명시적으로 primaryKey 설정 안 해주면 "id"라는 이름의 필드를 자동으로 탐색함
                },
                name: {
                    type: Sequelize.STRING
                },
                passwd: {
                    type: Sequelize.STRING
                },
                age: {
                    type: Sequelize.INTEGER
                },
                ref_val1: {
                    type: Sequelize.STRING
                }
            },
            options: {
                Sequelize,
                modelName: "performance",
                timestamps: false //false로 설정하지 않을 경우 createAt, updateAt 이라는 이름의 필드를 자동으로 탐색함
            }
        },
        actions: {
        },
        methods: {
        },
        events: {
        },
        created() {
        },
        async started() {
            console.log("DB SERVICE IS START");
        }
    };

    return schema;
};