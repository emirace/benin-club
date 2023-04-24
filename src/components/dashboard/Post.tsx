import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { News } from '@/types/newsCard';

interface PostProps {
  posts: News[];
}

function Post(props: PostProps): JSX.Element {
  const { posts } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Filtering posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Posts</h3>
        <button className="px-3 py-2 bg-red text-white rounded-md hover:bg-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2">
          Add Post
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-4 py-2 border border-gray rounded-md"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="w-[calc(100vw_-_75px)] md:w-auto overflow-y-auto">
        <table className="w-full ">
          <thead>
            <tr className="bg-gray-200 whitespace-nowrap">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Tags</th>
              <th className="px-4 py-2 text-left">Short Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, index) => (
              <tr key={index} className="bg-white">
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 rounded-md mr-4 overflow-hidden">
                      <Image
                        src={post.image}
                        layout="fill"
                        objectFit="cover"
                        alt={post.title}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">{post.title}</h4>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">{post.date}</td>
                <td className="px-4 py-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-sm font-medium bg-gray-200 rounded-md mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-2">{post.description}</td>
                <td className="px-4 py-2">
                  <button className="mr-2">
                    <FaEdit />
                  </button>
                  <button className="text-red">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex  items-center mt-4">
        <ul className="flex">
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                className={`px-3 py-1 rounded-md mr-2 hover:bg-gray-200 focus:outline-none ${
                  currentPage === pageNumber ? 'bg-red text-white' : 'text-red'
                }`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Post;
