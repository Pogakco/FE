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

export interface IRessetPassword {
  passwordCheck: string;
}
