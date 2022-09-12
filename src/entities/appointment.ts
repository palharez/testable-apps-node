export interface AppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private props: AppointmentProps;

  constructor(props: AppointmentProps) {
    const { startsAt, endsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error("Invalid startsAt");
    }

    if (endsAt <= startsAt) {
      throw new Error("Invalid endsAt");
    }

    this.props = props;
  }

  get startsAt() {
    return this.props.startsAt;
  }

  get customer() {
    return this.props.customer;
  }

  get endsAt() {
    return this.props.endsAt;
  }
}
