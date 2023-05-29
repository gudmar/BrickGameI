import styles from './styles.module.css';
import { NavigationButtonInterface } from '../WidgetPropsInterface';

function NavButton({ label, onClick, disabled }: NavigationButtonInterface) {
  const isNotDisabled = (classIfNotDisabled: string) => disabled ? styles.disabled : classIfNotDisabled;
    return (
        <div className={isNotDisabled(styles.container)} onClick={disabled ? () => {} : onClick}>
          <span className='name'>{label}</span>
        </div>
  );
};
export default NavButton;
