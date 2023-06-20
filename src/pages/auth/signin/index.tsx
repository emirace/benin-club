import Loading from "@/components/Loading";
import LoginForm from "@/components/LoginForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {}

const SignIn: React.FC<Props> = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Loading />;
  }
  if (session) {
    router.replace("/");
    return null;
  }
  return (
    <>
      <div className="h-24 w-full bg-black" />
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <LoginForm />
      </div>
    </>
  );
};

export default SignIn;
