import * as Sentry from "sentry-expo";

export const reportError = (error: unknown): void => {
  Sentry.Native.captureException(error);
};
