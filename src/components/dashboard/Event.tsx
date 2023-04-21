import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { FiTrash } from 'react-icons/fi';

interface EventProps {
  events: Array<{
    image: string;
    name: string;
    date: string;
    time: string;
    description: string;
    location: string;
  }>;
}

function Event(props: EventProps): JSX.Element {
  const { events } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);

  // Filtering events based on search query
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEvents.length / eventsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Events</h3>
        <button className="px-3 py-2 bg-red text-white rounded-md hover:bg-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2">
          Add Event
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 ">
        <input
          type="text"
          placeholder="Search events..."
          className="border border-gray-200 rounded py-2 px-4 w-full md:w-64 focus:outline-none focus:border-red mb-0 md:ml-4"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <ul className="divide-y divide-gray">
        {currentEvents.map((event, index) => (
          <li key={index} className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-md mr-4 overflow-hidden">
                  <Image
                    src={event.image}
                    layout="fill"
                    objectFit="cover"
                    alt={event.name}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-medium">{event.name}</h4>
                  <p className="text-gray">
                    {event.date} - {event.time}
                  </p>
                  <p className="text-gray">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="px-3 py-2 bg-gray text-white rounded-md hover:bg-gray focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 ml-4">
                  <FaEdit />
                </button>

                <button className="ml-2 px-3 py-2 bg-red text-white rounded-md hover:bg-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2">
                  <FiTrash />
                </button>
              </div>
            </div>
            <p className="text-gray mt-2">{event.description}</p>
          </li>
        ))}
      </ul>
      <div className="flex  items-center mt-8">
        <nav className="flex" aria-label="Pagination">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-2 rounded-md mr-2 hover:bg-pink focus:outline-none ${
                currentPage === pageNumber
                  ? 'bg-red text-white font-medium'
                  : ' text-red'
              }`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Event;
