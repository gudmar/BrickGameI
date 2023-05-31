import styles from './styles.module.css';
import ExpandIcon from '../../../Icons/ExpandIcon'
import { WidgetItemProps } from '../WidgetPropsInterface';

function NavSelect({ label, onSelect, items, value, disabled }: WidgetItemProps) {
  const isExpandable = !items ? false : items.length > 0;
  const isNotDisabled = (classIfNotDisabled: string) => disabled ? styles.disabled : classIfNotDisabled;
  const isNotDisabledContainer = () => disabled ? styles['disabled-container'] : styles.container;
  const isNotDisabledHeadline = () => disabled ? styles['headline-disabled'] : styles.headline;
  const isNotDisabledMenu = (classIfNotDisabled: string) => disabled ? styles['disabled-hide'] : classIfNotDisabled
    return (
      <div className={isNotDisabledContainer()}>
        <div className={isNotDisabledHeadline()}>
          <>{isExpandable && <div className = { isNotDisabled(styles.icon)}><ExpandIcon variant='white'/></div>}</>
          <>{isExpandable && <span className={isNotDisabled(styles.space)}></span>}</>
          <span className='name'>{`${label} :`}</span><span className={isNotDisabled(styles.value)}>{value}</span>
        </div>
        <div className={isNotDisabledMenu(styles.menu)}>
          {
            items!.map((item) => <div key={item.toString()} className={`${styles.menuItem} ${value.toString() === item.toString() ? styles.selected : ''}`} onClick={onSelect}>{item}</div>)
          }
        </div>
      </div>
  );
};

NavSelect.defaultProps = {
  items: [],
  disabled: false,
}

export default NavSelect;
