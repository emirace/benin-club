import { useRouter } from "next/router";
import { User } from "@/models/user.model";
import { useEffect } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    async function getUser() {
      const user = await User.findOne({
        "verificationToken.token": token,
        "verificationToken.expires": { $gt: Date.now() },
      });
      if (!user) {
        // Handle invalid or expired verification token
        router.replace("/auth/signin");
      } else {
        // Render password reset form
      }
    }
    getUser();
  }, [router, token]);

  // ...
}
