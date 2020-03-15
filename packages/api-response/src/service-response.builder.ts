class ServiceResponseBuilder {
  private success: boolean;
  private message: string;
  private data: any;
  private meta: any;
  private errors: any;

  constructor(data: any = null) {
    this.data = data;
    this.success = true;
    return this;
  }

  public err(message: string = null, errors = null) {
    this.success = false;
    this.errors = errors;
    this.setMessage(message);
    return this;
  }

  public setMessage(message: string) {
    this.message = message;
    return this;
  }

  public setMeta(meta: any) {
    this.meta = meta;
    return this;
  }

  public toJSON(): any {
    const res = {};

    for (const key of Object.keys(this)) {
      if (this[key] !== undefined && this[key] !== null) {
        res[key] = this[key];
      }
    }

    return res;
  }
}

export default ServiceResponseBuilder;
