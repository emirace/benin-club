import { buttonStyle } from "@/constants/styles";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { IUser } from "@/models/user.model";

interface Props {
  user: IUser;
}
const Page: NextPage<Props> = ({ user }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

  const config = {
    public_key: apiKey || "try",
    tx_ref: generateID(),
    amount: 7000,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user.email,
      phone_number: `${user.tel}`,
      name: user.surName + " " + user.firstName,
    },
    customizations: {
      title: "Form Payment",
      description: "Payment for registration form",
      logo: "/images/logo.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSbmit = async (transactionId: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/payment", {
        method: "POST",
        body: JSON.stringify({ transactionId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
        router.push("/auth/signup/form");
        setLoading(false);
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message);
        setLoading(false);
      }
    } catch (error) {
      setError("Something went wrong, pls try again later");
      console.log(error);
      setLoading(false);
    }
  };

  function generateID() {
    return (
      "BENCLUB_tx_ref_" +
      Date.now().toString(36) +
      Math.random().toString(36).slice(2)
    );
    // e.g. 'TRXkqjw1i7z6w29k3zqx8'
  }

  return (
    <>
      <div className="h-24 w-full bg-black" />
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <button
          onClick={() =>
            handleFlutterPayment({
              callback: async (response) => {
                console.log(response);
                closePaymentModal(); // this will close the modal programmatically
                await handleSbmit(response.transaction_id);
              },
              onClose: () => {},
            })
          }
          className={buttonStyle}
        >
          Make Payment
        </button>
        <div className="mt-8">{loading && <Loading />}</div>
      </div>
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  if (session.user.signupStep !== "Payment") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};
