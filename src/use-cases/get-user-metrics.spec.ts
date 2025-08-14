import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUserCase } from "./get-user-metrics";

let CheckInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUserCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    CheckInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUserCase(CheckInsRepository);
  });

  it("shold be able to get check-ins count from metrics", async () => {
    await CheckInsRepository.create({
      gymId: "gym-01",
      user_id: "user-01",
    });
    await CheckInsRepository.create({
      gymId: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
