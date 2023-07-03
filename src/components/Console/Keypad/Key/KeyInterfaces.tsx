export enum KeySize { small, medium, big }

export interface KeyProps {
  label: String
  onMouseDown: (e: React.MouseEvent<HTMLElement>) => void,
  onMouseUp: (e: React.MouseEvent<HTMLElement>) => void,
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  activator: string,
  size: KeySize;
  disabled?: boolean;
}
