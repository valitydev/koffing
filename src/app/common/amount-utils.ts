import { isNil, round } from 'lodash';

export const toMinor = (amount: number): number => (isNil(amount) ? null : round(amount * 100, 2));

export const toDisplayAmount = (minor: number): number =>
    isNil(minor) ? null : round(minor / 100, 2);
