import { httpClient } from "@/api/apiClient";
import Loading from "@/components/commons/Loading";
import { useRequestGoogle, useSocialLogin } from "@/hooks/useOauth";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();

  // 'code'를 검색 파라미터에서 가져오는 함수
  const getCode = (): string | null => {
    return searchParams.get("code");
  };

  const currentUri = window.location.origin + window.location.pathname;

  const { mutate: requestGoogle } = useRequestGoogle();
  const { mutate: socialLogin } = useSocialLogin();

  const code = getCode();

  useEffect(() => {
    if (!code) return;

    requestGoogle(
      { code, currentUri },
      {
        onSuccess: (data) => {
          httpClient.defaults.headers.Authorization = `Bearer ${data.access_token}`;

          socialLogin("GOOGLE");
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default GoogleCallback;
