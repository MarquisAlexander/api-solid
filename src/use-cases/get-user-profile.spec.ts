import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourseNotFoundError } from "./errors/resourse-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get Use Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });
  it("shold be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Marquis Alexander",
      email: "test@test.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("Marquis Alexander");
  });

  it("shold not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "not-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError);
  });
});
