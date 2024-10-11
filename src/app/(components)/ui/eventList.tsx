import EventElement from "./dashboard/eventElement";
import { Event } from "../../../types/event";

type eventListProps = {
  events: Event[];
};

export default function EventList({ events }: eventListProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {events.map((event) => (
        <div
          key={event._id}
          className="w-[630px] h-[200px] flex justify-between shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] mt-10 rounded-[10px] p-6"
        >
          <EventElement event={event} />
          <div className="self-end">
            <button className="w-[140px] h-10 bg-[#ccff69] text-[#252531] mr-2 rounded-md shadow-sm hover:bg-[#aaff50] transition duration-300 self-center">
              Apply for Gigs
            </button>
            <button className="w-[140px] h-10 bg-[#fe6927] text-[#252531] rounded-md shadow-sm hover:bg-[#aaff50] transition duration-300 self-center">
              View the Event
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

