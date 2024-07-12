export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  nickname: string;
  email: string;
  password: string;
  passwordCheck?: string;
}

export interface IResetPassword {
  password: string;
}

export interface ICheckDuplicateEmail {
  email: string;
}

export interface ICheckDuplicateNickname {
  nickname: string;
}

export interface IProfile {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}
