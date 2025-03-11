export interface TravelPlan {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  interests: string[];
  includeFlights?: boolean;
}

export interface TravelResponse {
  itinerary: string;
  loading: boolean;
  error: string | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Airport {
  name: string;
  id: string;
  time: string;
}

export interface Flight {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  legroom: string;
  extensions: string[];
  overnight?: boolean;
}

export interface Layover {
  duration: number;
  name: string;
  id: string;
}

export interface CarbonEmissions {
  this_flight: number;
  typical_for_this_route: number;
  difference_percent: number;
}

export interface BestFlight {
  flights: Flight[];
  layovers?: Layover[];
  total_duration: number;
  carbon_emissions: CarbonEmissions;
  price: number;
  type: string;
  airline_logo: string;
  booking_token: string;
}

export interface FlightSearchResponse {
  best_flights: BestFlight[];
}