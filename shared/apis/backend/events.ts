import { backendHttpClient } from "./client";

type CreateDefaultEventInput = {
  title: string;
  type: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string;
};

export type CreateDefaultEventOutputDTO = {
  title: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  description: string;
  type: string;
  id: string;
};

export const createDefaultEvent = async (input: CreateDefaultEventInput) => {
  const { data } = await backendHttpClient.post<CreateDefaultEventOutputDTO>(
    "/api/events",
    input
  );

  const event = {
    title: data.title,
    ownerId: data.ownerId,
    startDate: new Date(data.startDate),
    endDate: data.endDate ? new Date(data.endDate) : null,
    description: data.description,
    type: data.type,
    id: data.id,
  };

  return event;
};
