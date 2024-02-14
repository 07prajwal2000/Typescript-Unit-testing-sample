import { AuthService, IAuthService } from "../src/services/authServices";
import { CreateUserRequest } from "../src/models/user";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Test createUser function", () => {
	describe("Given proper details service should return 200 code", () => {
		let authService: IAuthService;
		let createUser = vi.fn();
		beforeEach(() => {
			const repository = { createUser };
			authService = new AuthService(repository);
		});

		it("should return 200 code and not-null data", async () => {
			createUser.mockReturnValue({
				name: "Prajwal",
				email: "prajwal@email.com",
				age: 23,
				id: 1,
			});

			const userRequest: CreateUserRequest = {
				name: "Prajwal",
				email: "prajwal@email.com",
				age: 23,
			};
			const result = await authService.createUser(userRequest);
			expect(result.data).not.toBeNull();
			expect(result.data).toBeTruthy();
			expect(result.code).toEqual(200);
			expect(result.success).toEqual(true);
			expect(result.data).toHaveProperty("id", 1);
			expect(result.data).toHaveProperty("name", userRequest.name);
			expect(result.data).toHaveProperty("email", userRequest.email);
			expect(result.data).toHaveProperty("age", userRequest.age);
		});

		it("should return 400 code and null data when db sends null/undefined", async () => {
			createUser.mockReturnValue(null);
			const userRequest: CreateUserRequest = {
				name: "Prajwal",
				email: "prajwal@email.com",
				age: 23,
			};
			const result = await authService.createUser(userRequest);
			expect(result.data).not.toBeTruthy();
			expect(result.message).toMatch(new RegExp('failed', 'i'))
			expect(result.code).toEqual(400);
			expect(result.success).toEqual(false);
		});
		
		it("should return 400 code and null data when invalid email passed", async () => {
			const userRequest: CreateUserRequest = {
				name: "Prajwal",
				email: "prajwalemail",
				age: 23,
			};
			const result = await authService.createUser(userRequest);
			expect(result.data).not.toBeTruthy();
			expect(result.message).toMatch(new RegExp('invalid email', 'i'));
			expect(result.code).toEqual(400);
			expect(result.success).toEqual(false);
		});

		it("should return 400 code and null data when empty email passed", async () => {
			const userRequest: CreateUserRequest = {
				name: "Prajwal",
				email: "",
				age: 23,
			};
			const result = await authService.createUser(userRequest);
			expect(result.message).toMatch(new RegExp('invalid email', 'i'))
			expect(result.data).not.toBeTruthy();
			expect(result.code).toEqual(400);
			expect(result.success).toEqual(false);
		});

		it("should return 400 code and null data when invalid name passed", async () => {
			const userRequest: CreateUserRequest = {
				name: "P",
				email: "prajwal@email.com",
				age: 23,
			};
			const result = await authService.createUser(userRequest);
			expect(result.message).toMatch(new RegExp('name', 'i'))
			expect(result.data).not.toBeTruthy();
			expect(result.code).toEqual(400);
			expect(result.success).toEqual(false);
		});

		it("should return 400 code and null data when empty name passed", async () => {
			const userRequest: CreateUserRequest = {
				name: "",
				email: "prajwal@email.com",
				age: 23,
			};
			const result = await authService.createUser(userRequest);
			expect(result.message).toMatch(new RegExp('name', 'i'))
			expect(result.data).not.toBeTruthy();
			expect(result.code).toEqual(400);
			expect(result.success).toEqual(false);
		});

		it("should return 400 code and null data when age is below 18", async () => {
			const userRequest: CreateUserRequest = {
				name: "Prajwal",
				email: "prajwal@email.com",
				age: 12,
			};
			const result = await authService.createUser(userRequest);
			expect(result.message).toMatch(new RegExp('age', 'i'))
			expect(result.data).not.toBeTruthy();
			expect(result.code).toEqual(400);
			expect(result.success).toEqual(false);
		});

		it("should return 400 code and null data when age is above 65", async () => {
			const userRequest: CreateUserRequest = {
				name: "Prajwal",
				email: "prajwal@email.com",
				age: 72,
			};
			const result = await authService.createUser(userRequest);
			expect(result.message).toMatch(new RegExp('age', 'i'))
			expect(result.data).not.toBeTruthy();
			expect(result.code).toEqual(400);
			expect(result.success).toEqual(false);
		});
	});
});
