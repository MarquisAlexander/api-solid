import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("shold be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "js gym",
      description: null,
      phone: null,
      latitude: -5.8172408,
      longitude: -35.2048643,
    });
    await gymsRepository.create({
      title: "ts gym",
      description: null,
      phone: null,
      latitude: -5.8172408,
      longitude: -35.2048643,
    });

    const { gyms } = await sut.execute({
      query: "js",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "js gym" })]);
  });

  it("shold be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `js gym ${i}`,
        description: null,
        phone: null,
        latitude: -5.8172408,
        longitude: -35.2048643,
      });
    }

    const { gyms } = await sut.execute({
      query: "js",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "js gym 21" }),
      expect.objectContaining({ title: "js gym 22" }),
    ]);
  });
});
