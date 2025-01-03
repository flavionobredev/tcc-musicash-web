type Constructor = {
  id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
};

type UserJSON = Constructor;

export class UserEntity {
  static fromJSON(json: UserJSON): UserEntity {
    return new UserEntity(json);
  }

  id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(input: Constructor) {
    this.id = input.id;
    this.name = input.name;
    this.email = input.email;
    this.picture = input.picture;
    this.createdAt = new Date(input.createdAt);
    this.updatedAt = input.updatedAt ? new Date(input.updatedAt) : undefined;
  }

  public toJSON(): UserJSON {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      picture: this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
