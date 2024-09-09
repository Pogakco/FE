import { httpClient } from "@/api/apiClient";
import Loading from "@/components/commons/Loading";
import { useRequestKaKao, useSocialLogin } from "@/hooks/useOauth";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const KaKaoCallback = () => {
  const [searchParams] = useSearchParams();

  const getCode = (): string | null => {
    return searchParams.get("code");
  };

  const currentUri = window.location.origin + window.location.pathname;

  const { mutate: requestKaKao } = useRequestKaKao();
  const { mutate: socialLogin } = useSocialLogin();

  const code = getCode();

  useEffect(() => {
    if (!code) return;

    requestKaKao(
      { code, currentUri },
      {
        onSuccess: (data) => {
          httpClient.defaults.headers.Authorization = `Bearer ${data.access_token}`;

          socialLogin("KAKAO");
        },
        onError: (error) => {}
      }
    );
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
export default KaKaoCallback;
