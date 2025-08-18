import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyUseCase;

describe("Fetch Nearby Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyUseCase(gymsRepository);
  });

  it("shold be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Perto gym",
      description: null,
      phone: null,
      latitude: -5.8172408,
      longitude: -35.2048643,
    });
    await gymsRepository.create({
      title: "longe gym",
      description: null,
      phone: null,
      latitude: -6.1129744,
      longitude: -35.0965065,
    });

    const { gyms } = await sut.execute({
      userLatitude: -5.8172408,
      userLongitude: -35.2048643,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Perto gym" })]);
  });
});
