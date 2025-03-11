import React from 'react';
import { BestFlight, Flight, Layover } from '../types';
import { Clock, Plane } from 'lucide-react';

interface FlightResultsProps {
  flights: BestFlight[];
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function formatDateTime(dateTimeStr: string): string {
  return new Date(dateTimeStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

function FlightSegment({ flight }: { flight: Flight }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <img src={flight.airline_logo} alt={flight.airline} className="w-8 h-8 object-contain" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{flight.departure_airport.id} → {flight.arrival_airport.id}</p>
            <p className="text-sm text-gray-600">{flight.airline} {flight.flight_number}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{formatDateTime(flight.departure_airport.time)}</p>
            <p className="text-sm text-gray-600">{flight.departure_airport.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{formatDuration(flight.duration)}</span>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-sm text-gray-600">
            <p>{flight.airplane}</p>
            <p>{flight.travel_class} • {flight.legroom}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{formatDateTime(flight.arrival_airport.time)}</p>
            <p className="text-sm text-gray-600">{flight.arrival_airport.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LayoverInfo({ layover }: { layover: Layover }) {
  return (
    <div className="flex items-center gap-2 p-4 bg-gray-50 border-b border-gray-200">
      <Plane className="w-4 h-4 text-gray-400" />
      <p className="text-sm text-gray-600">
        {formatDuration(layover.duration)} layover in {layover.name} ({layover.id})
      </p>
    </div>
  );
}

export default function FlightResults({ flights }: FlightResultsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Available Flights</h3>
      {flights.map((bestFlight, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={bestFlight.airline_logo}
                  alt="Airline"
                  className="w-6 h-6 object-contain"
                />
                <span className="font-semibold">${bestFlight.price}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span>Total duration: {formatDuration(bestFlight.total_duration)}</span>
              </div>
            </div>
          </div>
          
          {bestFlight.flights.map((flight, flightIndex) => (
            <React.Fragment key={flight.flight_number}>
              <FlightSegment flight={flight} />
              {bestFlight.layovers && bestFlight.layovers[flightIndex] && (
                <LayoverInfo layover={bestFlight.layovers[flightIndex]} />
              )}
            </React.Fragment>
          ))}
          
          <div className="p-4">
            <div className="text-sm text-gray-600">
              <p>Carbon emissions: {bestFlight.carbon_emissions.this_flight / 1000}kg</p>
              <p className="text-green-600">
                {bestFlight.carbon_emissions.difference_percent}% less than average
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}