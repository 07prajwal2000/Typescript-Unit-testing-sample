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
exports.AuthService = void 0;
class AuthService {
    constructor(repository) {
        this.repository = repository;
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.email || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)) {
                return {
                    code: 400,
                    message: 'Invalid email',
                    success: false
                };
            }
            if (data.age < 18 || data.age > 65) {
                return {
                    code: 400,
                    message: "Age should be in between 18 and 65",
                    success: false
                };
            }
            if (!data.name || data.name.length < 3) {
                return {
                    code: 400,
                    message: "Name is too short",
                    success: false
                };
            }
            try {
                const result = yield this.repository.createUser(data.name, data.email, data.age);
                if (!result) {
                    return {
                        code: 400,
                        message: 'failed to create user',
                        success: false
                    };
                }
                return {
                    data: result,
                    code: 200,
                    message: 'ok',
                    success: true
                };
            }
            catch (e) {
                return {
                    data: null,
                    code: 500,
                    message: 'Server error',
                    success: false
                };
            }
        });
    }
}
exports.AuthService = AuthService;
