import { FlightSearchResponse } from '../types';

export async function searchFlights(): Promise<FlightSearchResponse> {
  // Mock response
  return {
    "best_flights": [
      {
        "flights": [
          {
            "departure_airport": {
              "name": "Indira Gandhi International Airport",
              "id": "DEL",
              "time": "2025-02-07 00:05"
            },
            "arrival_airport": {
              "name": "Noi Bai International Airport",
              "id": "HAN",
              "time": "2025-02-07 05:35"
            },
            "duration": 240,
            "airplane": "Airbus A330",
            "airline": "Vietjet",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/VJ.png",
            "travel_class": "Economy",
            "flight_number": "VJ 972",
            "legroom": "31 in",
            "extensions": [
              "Average legroom (31 in)",
              "Carbon emissions estimate: 205 kg"
            ],
            "overnight": true
          }
        ],
        "total_duration": 240,
        "carbon_emissions": {
          "this_flight": 205000,
          "typical_for_this_route": 223000,
          "difference_percent": -8
        },
        "price": 298,
        "type": "One way",
        "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/VJ.png",
        "booking_token": "WyJDalJJVjFORk5VWlpPSEZwTWsxQlFrcDZhSGRDUnkwdExTMHRMUzB0TFhaMGJuY3lNRUZCUVVGQlIyVnJXWFJOVFdKdmNEUkJFZ1ZXU2prM01ob0xDTm5vQVJBQ0dnTlZVMFE0SEhEWjZBRT0iLFtbIkRFTCIsIjIwMjUtMDItMDciLCJIQU4iLG51bGwsIlZKIiwiOTcyIl1dXQ=="
      },
      {
        "flights": [
          {
            "departure_airport": {
              "name": "Indira Gandhi International Airport",
              "id": "DEL",
              "time": "2025-02-07 16:30"
            },
            "arrival_airport": {
              "name": "Netaji Subhash Chandra Bose International Airport",
              "id": "CCU",
              "time": "2025-02-07 18:35"
            },
            "duration": 125,
            "airplane": "Airbus A321neo",
            "airline": "IndiGo",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
            "travel_class": "Economy",
            "flight_number": "6E 529",
            "legroom": "29 in",
            "extensions": [
              "Below average legroom (29 in)",
              "Carbon emissions estimate: 92 kg"
            ]
          },
          {
            "departure_airport": {
              "name": "Netaji Subhash Chandra Bose International Airport",
              "id": "CCU",
              "time": "2025-02-07 22:05"
            },
            "arrival_airport": {
              "name": "Noi Bai International Airport",
              "id": "HAN",
              "time": "2025-02-08 02:10"
            },
            "duration": 155,
            "airplane": "Airbus A321neo",
            "airline": "IndiGo",
            "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
            "travel_class": "Economy",
            "flight_number": "6E 1631",
            "legroom": "29 in",
            "extensions": [
              "Below average legroom (29 in)",
              "Carbon emissions estimate: 117 kg"
            ],
            "overnight": true
          }
        ],
        "layovers": [
          {
            "duration": 210,
            "name": "Netaji Subhash Chandra Bose International Airport",
            "id": "CCU"
          }
        ],
        "total_duration": 490,
        "carbon_emissions": {
          "this_flight": 210000,
          "typical_for_this_route": 223000,
          "difference_percent": -6
        },
        "price": 416,
        "type": "One way",
        "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/6E.png",
        "booking_token": "WyJDalJJVjFORk5VWlpPSEZwTWsxQlFrcDZhSGRDUnkwdExTMHRMUzB0TFhaMGJuY3lNRUZCUVVGQlIyVnJXWFJOVFdKdmNEUkJFZ3cyUlRVeU9YdzJSVEUyTXpFYUN3alB4QUlRQWhvRFZWTkVPQnh3ejhRQyIsW1siREVMIiwiMjAyNS0wMi0wNyIsIkNDVSIsbnVsbCwiNkUiLCI1MjkiXSxbIkNDVSIsIjIwMjUtMDItMDciLCJIQU4iLG51bGwsIjZFIiwiMTYzMSJdXV0="
      }
    ]
  };
}