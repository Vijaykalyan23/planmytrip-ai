import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Compass } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import TravelForm from './components/TravelForm';
import FlightResults from './components/FlightResults';
import Chat from './components/Chat';
import { TravelPlan, TravelResponse, FlightSearchResponse, ChatMessage } from './types';
import { generateTravelPlan, createTravelPrompt, generateChatResponse } from './lib/gemini';
import { searchFlights } from './lib/flights';

function App() {
  const [response, setResponse] = useState<TravelResponse>({
    itinerary: '',
    loading: false,
    error: null,
  });
  const [flightResults, setFlightResults] = useState<FlightSearchResponse | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleSubmit = async (data: TravelPlan) => {
    setResponse({ itinerary: '', loading: true, error: null });
    setFlightResults(null);
    setMessages([]);
    
    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        toast.error('Please configure your Gemini API key in the .env file');
        setResponse({ 
          itinerary: '', 
          loading: false, 
          error: 'Gemini API key is not configured' 
        });
        return;
      }

      const [itinerary, flights] = await Promise.all([
        generateTravelPlan(createTravelPrompt(data)),
        data.includeFlights ? searchFlights() : null,
      ]);
      
      if (!itinerary) {
        throw new Error('Failed to generate itinerary');
      }

      setResponse({ itinerary, loading: false, error: null });
      if (flights) {
        setFlightResults(flights);
      }
      toast.success('Travel plan generated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setResponse({ itinerary: '', loading: false, error: errorMessage });
      toast.error(errorMessage);
    }
  };

  const handleChatMessage = async (message: string) => {
    if (!response.itinerary) {
      toast.error('Please generate a travel plan first');
      return;
    }

    const newMessage: ChatMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, newMessage]);
    setChatLoading(true);

    try {
      const aiResponse = await generateChatResponse([...messages, newMessage], response.itinerary);
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      toast.error('Failed to get response');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full">
              <Compass className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">AI Travel Planner</h1>
          <p className="text-xl text-gray-300">
            Plan your perfect trip with our AI-powered travel assistant
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl p-8 mb-8 border border-gray-700">
          <TravelForm onSubmit={handleSubmit} loading={response.loading} />
        </div>

        {response.error && (
          <div className="bg-red-900 border border-red-700 rounded-xl p-6 mb-8">
            <p className="text-red-200">{response.error}</p>
          </div>
        )}

        {flightResults && (
          <div className="bg-gray-800 rounded-xl shadow-xl p-8 mb-8 border border-gray-700">
            <FlightResults flights={flightResults.best_flights} />
          </div>
        )}

        {response.itinerary && (
          <>
            <div className="bg-gray-800 rounded-xl shadow-xl p-8 mb-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Your Travel Plan</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown>{response.itinerary}</ReactMarkdown>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">Chat with Travel Assistant</h2>
              <Chat
                messages={messages}
                onSendMessage={handleChatMessage}
                loading={chatLoading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;