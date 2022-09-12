import { describe, it, expect } from "vitest";
import { CreateAppointment } from "./createAppointment";
import { Appointment } from "./../entities/appointment";
import { getFutureDate } from "../tests/utils/getFutureDate";
import { InMemoryAppointmentsRepository } from "../repositories/inMemory/inMemoryAppointmentsRepository";

describe("Create Appointment", () => {
  it("should be able to create appointment", () => {
    const inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();

    const createAppointment = new CreateAppointment(
      inMemoryAppointmentsRepository
    );

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");

    expect(
      createAppointment.execute({
        customer: "John Doe",
        endsAt,
        startsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create appointment with overlapping dates", () => {
    const inMemoryAppointmentsRepository = new InMemoryAppointmentsRepository();

    const createAppointment = new CreateAppointment(
      inMemoryAppointmentsRepository
    );

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-14"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toThrow;
  });
});
