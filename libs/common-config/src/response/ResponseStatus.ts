export const ResponseStatus = {
  OK: 200,
  CREATED: 201,
  SERVER_ERROR: 500,
  BAD_PARAMETER: 400,
  FORBIDDEN: 403,
} as const;

export type ResponseStatus = typeof ResponseStatus[keyof typeof ResponseStatus];
