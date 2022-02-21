export class JwtPayload {
  userId: string;
  deviceId: string;
  iat?: number;
  exp?: number;
}
