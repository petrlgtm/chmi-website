export interface Pastor {
  name: string;
  role: string;
  image: string | null;
}

export interface Testimonial {
  name: string;
  text: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  lat: number;
  lng: number;
  pastors: Pastor[];
  testimonials: Testimonial[];
  images: string[];
  services: string;
}

export interface ChurchEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  tagline: string;
  category: string;
  isMajor?: boolean;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  description: string;
  type: "video";
  videoId: string;
  thumbnail: string;
  thumbnailHigh?: string;
}
