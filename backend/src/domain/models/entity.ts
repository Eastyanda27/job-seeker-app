export interface IBaseDomainProperty {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<T> {
  protected readonly _id: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : "";
    this.props = props;
  }

  get id(): string {
    return this._id;
  }
}
