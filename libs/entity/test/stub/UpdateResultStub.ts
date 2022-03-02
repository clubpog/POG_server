export class UpdateResult {
  private generatedMaps: string[];
  private raw: string[];
  private affected: number;

  static async updateLoggedAtByDeviceId() {
    const updateResult = new UpdateResult();
    updateResult.generatedMaps = [];
    updateResult.raw = [];
    updateResult.affected = 1;
    return updateResult;
  }

  static async updateFirebaseToken() {
    const updateResult = new UpdateResult();
    updateResult.generatedMaps = [];
    updateResult.raw = [];
    updateResult.affected = 1;
    return updateResult;
  }
}
