
export const BUTTON = 'button';
export const SELECT = 'select';
export enum WidgetType {BUTTON, SELECT}

export interface WidgetProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    items?: String[];
  }

  export interface WidgetItemProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    items?: String[];
  }

