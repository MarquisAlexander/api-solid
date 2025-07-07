import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUserCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserCase(usersRepository);
  });
  it("shold be able to authenticate", async () => {
    await usersRepository.create({
      name: "Marquis Alexander",
      email: "test@test.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "test@test.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("shold not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "test@test.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("shold not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Marquis Alexander",
      email: "test@test.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "test@test.com",
        password: "123123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
