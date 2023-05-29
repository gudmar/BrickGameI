import React from "react";

export const BUTTON = 'button';
export const SELECT = 'select';
export enum WidgetType {BUTTON, SELECT}

export interface WidgetProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    items?: String[];
  }

  export interface WidgetItemProps {
    label: string,
    onSelect: (e: React.MouseEvent<HTMLElement>) => void,
    items?: String[],
    value: string | number,
    disabled?: boolean,
  }

  export interface NavigationButtonInterface {
    label: string,
    onClick: (e: React.MouseEvent<HTMLElement>) => void,
    disabled?: boolean,
  }

