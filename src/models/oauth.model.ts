export type TProvider = "GOOGLE" | "KAKAO";

export interface ISocialSignup {
  email: string;
  nickname: string;
  provider: TProvider;
}
