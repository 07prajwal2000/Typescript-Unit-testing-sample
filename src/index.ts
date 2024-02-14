import { AuthService } from "./services/authServices";

(async () => {
  const service = new AuthService({
    createUser(name, email, age) {
      return Promise.resolve({
        age,
        email,
        id: 1,
        name
      });
    },
  });
  console.log("Create user function: ", await service.createUser({age: 22, email: 'manuaradhya07@gmail.com', name: 'Prajwal'}));
})();