/**
 * Type representing a successful result (isOk is true).
 * @template T - The type of the value in the Ok result.
 * @returns An Ok result with the given value.
 */
export type Ok<T> = { isOk: true; value: T };
/**
 * Type representing a failed result (isOk is false).
 * @template E - The type of the error in the Err result.
 * @returns An Err result with the given error.
 */
export type Err<E> = { isOk: false; error: E };
/**
 * Type representing a result of a function.
 * @template T - The type of the value in the Ok result.
 * @template E - The type of the error in the Err result.
 * @returns A result of type Ok<T> or Err<E>.
 */
export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Function to create a successful result.
 * @param value - The value to wrap in an Ok result.
 * @returns An Ok result with the given value.
 */
export const ok = <T>(value: T): Ok<T> => ({ isOk: true, value });

/**
 * Function to create a failed result.
 * @param error - The error to wrap in an Err result.
 * @returns An Err result with the given error.
 */
export const err = <E>(error: E): Err<E> => ({ isOk: false, error });
