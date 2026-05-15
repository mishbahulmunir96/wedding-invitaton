export type AttendanceStatus = "hadir" | "tidak_hadir" | "ragu";

export interface RsvpFormValues {
  name: string;
  attendance: AttendanceStatus | "";
  guestCount: number;
}

export interface Rsvp {
  id: number;
  name: string;
  attendance: AttendanceStatus;
  guestCount: number;
  createdAt: string;
}
