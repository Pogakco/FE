import { getProfile } from "@/api/auth.api";
import { useQuery } from "@tanstack/react-query";

const useFetchProfile = () => {
  const { data: profile, isError: isFetchError } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
    throwOnError: true // errorboundary
  });

  return { profile, isFetchError };
};

export default useFetchProfile;
