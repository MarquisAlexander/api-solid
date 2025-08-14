import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let CheckInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    CheckInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(CheckInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "academia js",
      description: "academia javascript",
      phone: "",
      latitude: -5.518109,
      longitude: -35.2574227,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shold be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -5.517286,
      userLongitude: -35.256714,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("shold not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -5.517286,
      userLongitude: -35.256714,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -5.517286,
        userLongitude: -35.256714,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("shold be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -5.517286,
      userLongitude: -35.256714,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -5.517286,
      userLongitude: -35.256714,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("shold not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "academia js",
      description: "academia javascript",
      phone: "",
      latitude: new Decimal(-5.8172408),
      longitude: new Decimal(-35.2048643),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -22.9081088,
        userLongitude: -43.1915008,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
