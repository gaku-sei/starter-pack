'use strict';

export interface IState {
  cheers: string;
}

interface IAction extends Types.Action { }

export const reducer = (state: IState, action: IAction): IState => state;
