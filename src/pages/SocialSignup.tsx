import SocialSignupForm from "@/components/form/SocialSignupForm";
import { TProvider } from "@/models/oauth.model";
import { useSearchParams } from "react-router-dom";

const SocialSignup = () => {
  const [searchParams] = useSearchParams();
  const provider = (searchParams.get("provider") as TProvider) ?? "KAKAO";
  return <SocialSignupForm provider={provider} />;
};

export default SocialSignup;
