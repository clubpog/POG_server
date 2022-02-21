export class JwtPayload {
  userId: number;
  deviceId: string;
  iat?: number;
  exp?: number;
}
