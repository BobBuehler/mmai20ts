// Functions to serialize and un-serialize json communications strings

import { BaseGame } from "./base-game";
import { BaseGameObject } from "./base-game-object";

// tslint:disable:only-arrow-functions only-arrow-functions
/** Non array types we can serialize */
export type SomeSerializableTypes = ISerializableObject | string | number | undefined | boolean;
/** All the acceptable types we can serialize. */
export type SerializableTypes = SomeSerializableTypes | SomeSerializableTypes[];
/** The shape of an object (dictionary) that can be serialized. */
export interface ISerializableObject { [key: string]: SerializableTypes; }
// tslint:disable-next-line:no-any
/** An object of keys to any value */
interface IAnyObject { [key: string]: any; }

/** A game object reference encountered that represents the actual game object */
export interface IGameObjectReference { id: string; }

/**
 * Checks if an object is empty (has not keys).
 * @param obj The object to check.
 * @returns True if the object is an empty object `{}`, otherwise False.
 */
export function isEmpty(obj: object): obj is {} {
    return (Object.getOwnPropertyNames(obj).length === 0);
}

/**
 * Checks if an object is empty except for some key
 * @param obj The object to check inside of.
 * @param key The key names to check for.
 * @returns True if the object is empty except for the given key.
 * False otherwise.
 */
export function isEmptyExceptFor(obj: object, key: string): boolean {
    return (isObject(obj)
        && Object.getOwnPropertyNames(obj).length === 1 && obj[key] !== undefined
    );
}

/**
 * Checks if an object is just a game object reference.
 * @param obj The object to check.
 * @returns True if the object is a GameObjectReference, false otherwise.
 */
export function isGameObjectReference(obj: object): obj is IGameObjectReference {
    return isEmptyExceptFor(obj, "id");
}

// tslint:disable-next-line:no-any
/**
 * Checks if something is an object
 * @param obj The value to check
 * @returns True if the given obj is an object. False otherwise.
 */
export function isObject(obj: any): obj is { [key: string]: any } {
    return (typeof(obj) === "object" && obj !== null);
}

/**
 * Checks if a given object and its key can be serialized.
 * @param obj The object to check inside.
 * @param key The key on said object to check.
 * @returns True if they are serializable, false otherwise.
 */
export function isSerializable(obj: object, key: string): boolean {
    return isObject(obj)
        && obj.hasOwnProperty(key)
        && !String(key).startsWith("_");
}

/**
 * Serializes some value into data safe to serialize into JSON that the game
 * server can understand.
 * @param data Some value to serialize.
 * @returns data now safe to serialize to JSON.
 */
export function serialize(data: SerializableTypes): SerializableTypes {
    if (!isObject(data)) {
      // Then no need to serialize it
      // As it"s already json serializable primitive such as a string, number, boolean, null, etc.
      return data;
    }

    if (data instanceof BaseGameObject) {
      // No need to serialize this whole thing, send an object reference
      return { id: data.id };
    }

    const serialized: IAnyObject = Array.isArray(data) ? [] : {};
    for (const [key, value] of Object.entries(data)) {
      if (isSerializable(data, key)) {
        serialized[key] = serialize(value);
      }
    }

    return serialized;
  }

// tslint:disable-next-line:no-any
/**
 * De-serializes some data into it's actual value
 * @param data The data to de-serialize.
 * @param game The game used to lookup gameObjects inside of.
 * @returns the data value, now de-serialized.
 */
export function deSerialize(data: any, game: BaseGame): any {
    if (!isObject(data)) {
      return data;
    }

    if (isGameObjectReference(data)) {
      // It's a tracked game object
      return game.gameObjects[data.id];
    }

    const result: IAnyObject = Array.isArray(data) ? [] : {};

    for (const [key, value] of Object.entries(data)) {
      result[key] = (typeof(value) === "object")
        ? deSerialize(value, game)
        : value;
    }

    return result;
}
