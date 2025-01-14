import { UserEntity } from "~/shared/domain/user.entity";
import { backendHttpClient } from "./client";

export const getUserInfo = async () => {
  const { data } = await backendHttpClient.get("/auth/user/info");
  if (!data) {
    return null;
  }
  return new UserEntity({
    id: data.id,
    email: data.email,
    name: data.name,
    picture: data.picture,
    createdAt: new Date(data.createdAt),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
  });
};

export const registerUser = async () => {
  const { data } = await backendHttpClient.post("/auth/user/register", {});
  return new UserEntity({
    id: data.id,
    email: data.email,
    name: data.name,
    picture: data.picture,
    createdAt: new Date(data.createdAt),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
  });
};
