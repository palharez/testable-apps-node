import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointmentsRepository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overLappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overLappingAppointment) {
      throw new Error("Another appointment overlaps this appointment!");
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
