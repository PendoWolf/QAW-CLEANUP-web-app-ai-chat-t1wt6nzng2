import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trackEvent, tripLengthDays } from "../analytics/pendo";
import { tripsApi, type NewTrip } from "../api/trips";
import { TripForm } from "../components/TripForm";

/** Plans a new trip, then goes back to the trip list. */
export function NewTripPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const createTrip = async (trip: NewTrip) => {
    try {
      setError(null);
      await tripsApi.create(trip);
      // The API saved the new trip, before going back to the trip list.
      trackEvent("Trip created", {
        destination: trip.destination.slice(0, 100),
        travelers: trip.travelers,
        trip_length_days: tripLengthDays(trip.startDate, trip.endDate),
      });
      navigate("/trips");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <>
      <TripForm heading="Plan a trip" submitLabel="Add trip" onSubmit={createTrip} />
      {error && <p className="error">{error}</p>}
    </>
  );
}
