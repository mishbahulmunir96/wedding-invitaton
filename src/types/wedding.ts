export interface Person {
  name: string;
  nickname: string;
  parents: {
    father: string;
    mother: string;
  };
  order: string;
  address: string;
  initial: string;
}

export interface WeddingEvent {
  type: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  icon: string;
}

export interface WeddingData {
  groom: Person;
  bride: Person;
  weddingDate: string;
  weddingDateDisplay: {
    day: string;
    date: string;
    month: string;
    year: string;
  };
  events: WeddingEvent[];
}
