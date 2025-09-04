import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "js gym",
        description: "Some description",
        phone: "11233333333",
        latitude: -5.8172408,
        longitude: -35.2048643,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "ts gym",
        description: "Some description",
        phone: "11233333333",
        latitude: -6.1129744,
        longitude: -35.0965065,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -5.8172408,
        longitude: -35.2048643,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "js gym",
      }),
    ]);
  });
});
