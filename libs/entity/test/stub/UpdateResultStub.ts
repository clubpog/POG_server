export class UpdateResult {
  private readonly _generatedMaps: string[];
  private readonly _raw: string[];
  private readonly _affected: number;

  private constructor(
    generatedMaps: string[],
    raw: string[],
    affected: number,
  ) {
    this._generatedMaps = generatedMaps;
    this._raw = raw;
    this._affected = affected;
  }

  get generatedMaps() {
    return this._generatedMaps;
  }

  get raw() {
    return this._raw;
  }

  get affected() {
    return this._affected;
  }

  static async Result(): Promise<UpdateResult> {
    return new UpdateResult([], [], 1);
  }
}
