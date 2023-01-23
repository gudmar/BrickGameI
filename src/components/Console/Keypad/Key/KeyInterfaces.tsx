export enum KeySize { small, medium, big }

export interface KeyProps {
  label: String
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  size: KeySize;
}
