"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testcontainers_1 = require("testcontainers");
const authServices_1 = require("./services/authServices");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const service = new authServices_1.AuthService({
        createUser(name, email, age) {
            return Promise.resolve({
                age,
                email,
                id: 1,
                name
            });
        },
    });
    console.log("Create user function: ", yield service.createUser({ age: 22, email: 'manuaradhya07@gmail.com', name: 'Prajwal' }));
    const redis = yield new testcontainers_1.GenericContainer('redis')
        .withExposedPorts(6379)
        .start();
    console.log(redis.getHost());
    yield redis.stop({
        remove: true
    });
}))();
