export interface IUserResponse {
  id?: string;
  name: string;
  email: string;
  gender?: string;
  born?: Date;
  avatar?: string;
  avatar_url(): string;
}
