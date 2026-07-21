export type UserRole = "user" | "admin";

export interface UserProfile {
  _id: string;

  name: string;
  email: string;
  image: string;
  phone: string;
  address: string;

  role: UserRole;
  isBlocked: boolean;

  emailVerified: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface UserSnapshot {
  userId: string;
  name: string;
  email: string;
}

export type CreateUserProfilePayload = Pick<
  UserProfile,
  "name" | "phone" | "address"
>;

export type UpdateProfilePayload = Partial<CreateUserProfilePayload>;

export interface AuthUser {
  user: UserProfile;
}

export interface UserProfiledetails {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role?: string;
  memberSince?: string;
  avatarUrl?: string | null;
  area?: string;
  district?: string;
}
