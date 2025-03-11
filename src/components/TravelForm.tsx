import React, { useState, useEffect } from 'react';
import { Plane, Users, IndianRupee, Heart } from 'lucide-react';
import { TravelPlan } from '../types';

interface TravelFormProps {
  onSubmit: (data: TravelPlan) => void;
  loading: boolean;
}

const STORAGE_KEY = 'previousTravelPlans';

export default function TravelForm({ onSubmit, loading }: TravelFormProps) {
  const [interests, setInterests] = useState<string[]>([]);
  const [previousPlans, setPreviousPlans] = useState<TravelPlan[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPreviousPlans(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newPlan: TravelPlan = {
      source: formData.get('source') as string,
      destination: formData.get('destination') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      budget: Number(formData.get('budget')),
      travelers: Number(formData.get('travelers')),
      interests,
      includeFlights: formData.get('includeFlights') === 'on'
    };

    // Save to localStorage
    const updatedPlans = [newPlan, ...previousPlans].slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlans));
    setPreviousPlans(updatedPlans);
    
    onSubmit(newPlan);
  };

  const loadPreviousPlan = (plan: TravelPlan) => {
    setInterests(plan.interests);
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      (form.elements.namedItem('source') as HTMLInputElement).value = plan.source;
      (form.elements.namedItem('destination') as HTMLInputElement).value = plan.destination;
      (form.elements.namedItem('startDate') as HTMLInputElement).value = plan.startDate;
      (form.elements.namedItem('endDate') as HTMLInputElement).value = plan.endDate;
      (form.elements.namedItem('budget') as HTMLInputElement).value = plan.budget.toString();
      (form.elements.namedItem('travelers') as HTMLInputElement).value = plan.travelers.toString();
      (form.elements.namedItem('includeFlights') as HTMLInputElement).checked = plan.includeFlights || false;
    }
  };

  const handleInterestInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const value = (e.target as HTMLTextAreaElement).value.trim();
      if (value && !interests.includes(value)) {
        setInterests([...interests, value]);
        (e.target as HTMLTextAreaElement).value = '';
      }
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  return (
    <div>
      {previousPlans.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-200 mb-4">Previous Plans</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {previousPlans.map((plan, index) => (
              <button
                key={index}
                onClick={() => loadPreviousPlan(plan)}
                className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-lg"
              >
                {plan.source} → {plan.destination}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-lg font-medium text-gray-200 mb-2">Source</label>
            <div className="mt-1 relative">
              <div className="absolute left-4 top-4 p-2 bg-gray-700 rounded-lg">
                <Plane className="h-6 w-6 text-gray-300" />
              </div>
              <input
                required
                type="text"
                name="source"
                className="pl-16 block w-full h-16 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-lg"
                placeholder="Where are you traveling from?"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-200 mb-2">Destination</label>
            <div className="mt-1 relative">
              <div className="absolute left-4 top-4 p-2 bg-gray-700 rounded-lg">
                <Plane className="h-6 w-6 text-gray-300" />
              </div>
              <input
                required
                type="text"
                name="destination"
                className="pl-16 block w-full h-16 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-lg"
                placeholder="Where do you want to go?"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-200 mb-2">Start Date</label>
            <input
              required
              type="date"
              name="startDate"
              className="mt-1 block w-full h-16 rounded-lg bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 text-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-200 mb-2">End Date</label>
            <input
              required
              type="date"
              name="endDate"
              className="mt-1 block w-full h-16 rounded-lg bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500 text-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-200 mb-2">Budget (₹)</label>
            <div className="mt-1 relative">
              <div className="absolute left-4 top-4 p-2 bg-gray-700 rounded-lg">
                <IndianRupee className="h-6 w-6 text-gray-300" />
              </div>
              <input
                required
                type="number"
                name="budget"
                min="0"
                className="pl-16 block w-full h-16 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-lg"
                placeholder="Your budget in INR"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-200 mb-2">Number of Travelers</label>
            <div className="mt-1 relative">
              <div className="absolute left-4 top-4 p-2 bg-gray-700 rounded-lg">
                <Users className="h-6 w-6 text-gray-300" />
              </div>
              <input
                required
                type="number"
                name="travelers"
                min="1"
                className="pl-16 block w-full h-16 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-lg"
                placeholder="How many people?"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-200 mb-2">Interests</label>
          <div className="mt-1 relative">
            <div className="absolute left-4 top-4 p-2 bg-gray-700 rounded-lg">
              <Heart className="h-6 w-6 text-gray-300" />
            </div>
            <textarea
              className="pl-16 block w-full rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] text-lg"
              placeholder="Type your interests and press Enter (e.g., hiking, food, culture)"
              onKeyPress={handleInterestInput}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center px-4 py-2 rounded-lg text-base font-medium bg-gradient-to-r from-blue-900 to-blue-800 text-blue-100"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  className="ml-2 text-blue-200 hover:text-blue-100"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeFlights"
            name="includeFlights"
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
          />
          <label htmlFor="includeFlights" className="ml-3 block text-lg text-gray-200">
            Include flight search in travel plan
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 px-6 rounded-lg text-white font-medium text-xl bg-gradient-to-r ${
            loading 
              ? 'from-gray-600 to-gray-700 cursor-not-allowed' 
              : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
          }`}
        >
          {loading ? 'Generating Plan...' : 'Generate Travel Plan'}
        </button>
      </form>
    </div>
  );
}