import { UserEntity } from "~/shared/domain/user.entity";
import { makeClient } from "./client";

const client = makeClient();

export const getUserInfo = async (token?: string) => {
  const { data } = await client.get("/auth/user/info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export const registerUser = async (token: string) => {
  const { data } = await client.post(
    "/auth/user/register",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return new UserEntity({
    id: data.id,
    email: data.email,
    name: data.name,
    picture: data.picture,
    createdAt: new Date(data.createdAt),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
  });
};
