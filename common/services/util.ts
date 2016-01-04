'use strict';

export const filters = {
  all: new RegExp(''),
  listeners: /^on.+/,
};

export const getInObject =
  <T extends {[key: string]: any}, U extends T>
  (obj: U, ...keys: Array<string>): T =>
    keys.reduce((agg: T, key: string): T => {
      if (obj.hasOwnProperty(key)) {
        agg[key] = obj[key];
      }
      return agg;
    }, {} as T);

export const id = <T>(x: T): T => x;

export const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const dashify = (str: string): string =>
  str.replace(/[\/\s\.\_\-]+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const camelCase = (str: string): string =>
  dashify(str).replace(/-(\w)/g, (match, letter) => letter.toUpperCase());
