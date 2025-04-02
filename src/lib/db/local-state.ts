import { User } from "@prisma/client";

export class LocalState {
  private usersState: Record<string, User> = {};

  public user: {
    findUnique: (params: { where: { email: string } }) => Promise<User | null>;
    create: (params: { data: User }) => Promise<User>;
  } = {
    findUnique: async (params) => {
      return this.usersState[params.where.email];
    },
    create: async (params: { data: { email: string, name: string | null, password: string } }) => {
      const user = {
        id: crypto.randomUUID(),
        email: params.data.email,
        name: params.data.name,
        password: params.data.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.usersState[params.data.email] = user;
      return user;
    }
  }

  constructor() {

  }
}
