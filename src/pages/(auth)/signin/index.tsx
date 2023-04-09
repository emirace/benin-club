import LoginForm from '@/components/LoginForm';

export default function SignIn() {
  return (
    <>
      <div className="h-24 w-full bg-black" />
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <LoginForm />
      </div>
    </>
  );
}
