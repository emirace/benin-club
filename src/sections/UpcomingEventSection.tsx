import UpcomingEventCard from '@/components/UpComingEventCard';
import { events } from '@/constants/events';
import { buttonStyle } from '@/constants/styles';
import Link from 'next/link';

const UpcomingEventSection = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-col justify-center items-center">
        <div className="uppercase">book</div>
        <div className="flex md:flex-row gap-4 ">
          <h2 className="text-4xl md:text-6xl uppercase font-base mb-2">
            Upcoming
          </h2>
          <h2 className="text-4xl md:text-6xl uppercase font-bold mb-8 text-red">
            events
          </h2>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {events.slice(0, 4).map((event) => (
          <UpcomingEventCard key={event.id} {...event} />
        ))}
      </div>
      <Link href={'/#'} className="flex justify-center items-center mt-8">
        <button className={`${buttonStyle}`}>MORE EVENT</button>
      </Link>
    </div>
  );
};

export default UpcomingEventSection;
