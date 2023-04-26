import { buttonStyle } from '@/constants/styles';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import Image from 'next/image';
import { FiUpload } from 'react-icons/fi';
import moment from 'moment';
import { IPost } from '@/models/post.model';

interface PostFormProps {
  id?: string;
  onClose: () => void;
}

const initialPost = {
  title: '',
  tags: [],
  date: new Date(),
  description: '',
  image: '',
};
const PostsForm: React.FC<PostFormProps> = ({ id, onClose }) => {
  const [post, setPost] = useState<IPost>(initialPost);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load saved form data from database when the component mounts
    const fetchSavedData = async () => {
      try {
        if (!id) return;
        setIsLoading(true);
        const response = await fetch(`/api/dashboard/posts/${id}`);
        console.log(response);
        if (response.ok) {
          const savedData = await response.json();
          setPost((prev) => ({ ...prev, ...savedData }));
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setErrors((prev) => ({ ...prev, general: 'Error fetvhing data' }));
      }
    };
    fetchSavedData();
  }, [id]);

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',');
    setPost((prevPost) => ({
      ...prevPost,
      tags: tags.map((tag) => tag.trim()),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === 'image' &&
      e.target instanceof HTMLInputElement &&
      e.target?.files
    ) {
      const file = e.target?.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        setPost((prevPost) => ({
          ...prevPost,
          [name]: reader.result as string,
        }));
      };
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        [name]: value,
      }));
    }

    // clear the error message for the input field when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const onSubmit = async (post: IPost) => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboard/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      setLoading(false);
      onClose();
      setPost(initialPost);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleUpdate = async (post: IPost) => {
    try {
      setLoading(true);
      // Make a POST request to the server to create the post
      const response = await fetch(`/api/dashboard/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      onClose();
      setPost(initialPost);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!post.title.trim()) {
      newErrors.name = 'Please enter an post name';
    }

    if (!post.date) {
      newErrors.date = 'Please enter a valid post date';
    }
    if (post.tags.length === 0) {
      errors.tags = 'At least one tag is required';
    }

    if (!post.description.trim()) {
      newErrors.description = 'Please enter an post description';
    }

    if (Object.keys(newErrors).length > 0) {
      // update the error messages for the input fields
      setErrors(newErrors);
      return;
    }

    id ? handleUpdate(post) : onSubmit(post);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="flex md:flex-row gap-4 ">
        <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">Add</h2>
        <h2 className="text-2xl md:text-4xl uppercase font-bold mb-8 text-red">
          post
        </h2>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <Loading />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.title && 'border-red'
              }`}
              id="title"
              name="title"
              type="text"
              placeholder="Enter title"
              value={post.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="tags"
            >
              Tags
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.tags && 'border-red'
              }`}
              id="tags"
              name="tags"
              type="text"
              placeholder="Enter tags, separated by commas"
              value={post.tags}
              onChange={handleTagsChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.date && 'border-red'
              }`}
              id="date"
              name="date"
              type="date"
              value={moment(post.date).format('YYYY-MM-DD')}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className={`mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red ${
                errors.description && 'border-red'
              }`}
              id="description"
              name="description"
              placeholder="Enter description"
              value={post.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <div className="relative">
              <input
                className="sr-only"
                id="image"
                name="image"
                type="file"
                onChange={handleChange}
              />
              <div className="h-48 w-full border-dashed border-2 border-gray-300">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={`Preview of ${post.title} post`}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center h-full text-gray-400"
                  >
                    <p className="mb-2">
                      <FiUpload className="h-8 w-8" />
                    </p>
                    <p className="text-sm">Upload a preview image</p>
                  </label>
                )}
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-white rounded-md">
                <label
                  htmlFor="image"
                  className="cursor-pointer flex items-center justify-center"
                >
                  <FiUpload className="h-6 w-6 mr-2" />
                  Change
                </label>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-end">
        {loading && (
          <div className="mr-8">
            <Loading />
          </div>
        )}
        <button className={buttonStyle} type="submit">
          {id ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default PostsForm;
