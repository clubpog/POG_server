export const ResponseStatus = {
  OK: 200,
  CREATED: 201,
  SERVER_ERROR: 500,
  BAD_PARAMETER: 400,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UN_AUTHORIZED: 401,
  UNPROCESSABLE: 422,
} as const;

export type ResponseStatus = typeof ResponseStatus[keyof typeof ResponseStatus];
