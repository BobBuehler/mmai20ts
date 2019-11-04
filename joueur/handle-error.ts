import chalk from "chalk";
import { client } from "./client";

// tslint:disable:only-arrow-functions typedef no-console no-any

/** Program exit codes coresponding to errors the client could encounter. */
export enum ErrorCode {
    NONE = 0,
    INVALID_ARGS = 20,
    COULD_NOT_CONNECT = 21,
    DISCONNECTED_UNEXPECTEDLY = 22,
    CANNOT_READ_SOCKET = 23,
    DELTA_MERGE_FAILURE = 24,
    REFLECTION_FAILED = 25,
    UNKNOWN_EVENT_FROM_SERVER = 26,
    SERVER_TIMEOUT = 27,
    FATAL_EVENT = 28,
    GAME_NOT_FOUND = 29,
    MALFORMED_JSON = 30,
    UNAUTHENTICATED = 31,
    AI_ERRORED = 42,
}

/**
 * Handles an error with just a message
 * @param errorCode The error encountered.
 * @param message The human readable message about the error.
 */
export function handleError(errorCode: ErrorCode, message: string): never;

/**
 * Handles an error with a proper thrown error caught.
 * @param errorCode The error encountered.
 * @param err The Error caught that caused this to be invoked.
 * @param message The human readable message about the error.
 */
export function handleError(errorCode: ErrorCode, err: Error | string, message?: string): never;

/**
 * Invoked when we encounter an unexpected error and must exit erroneously
 * @param errorCode The error encountered.
 * @param err The Error caught that caused this to be invoked.
 * @param message The human readable message about the error.
 */
export function handleError(errorCode: ErrorCode, err: Error | string, message?: string): never {
    let msg = message || "";
    if (msg === undefined && typeof(err) === "string") {
        msg = err;
    }

    console.error(chalk.red(`---\nError: ${ErrorCode[errorCode]}\n---`));

    if (message) {
        console.error(chalk.red(`${message}\n---`));
    }

    if (err) {
        console.error(chalk.red(`${err instanceof Error ? err.message : err}\n---`));
    }

    if (err && (err as any).stack) {
        console.error(chalk.red(`${(err as any).stack}\n---`));
    } else {
        console.trace();
        console.error(chalk.red("---"));
    }

    client.disconnect();

    return process.exit(errorCode || 0);
}
