import styles from './styles.module.css';
import ExpandIcon from '../../../Icons/ExpandIcon'
import { WidgetItemProps } from '../WidgetPropsInterface';
import { useEffect } from 'react';


const NavSelect = ({ label, onSelect, setOpen, items, value, disabled, isOpen }: WidgetItemProps) => {
  useEffect(() => {console.log('opening', label)}, [isOpen, label])
  return (
    <div className={styles.container}>
      <div className={`${styles.headline} ${disabled ? styles.disabled : ''}`} onClick={() => {if (!disabled) setOpen() }}>
        {
          disabled ? 
            <div className={styles.arrow}><ExpandIcon variant='black'/></div>
            :
            <div className={`${styles.arrow} ${isOpen ? styles['arrow-rotated']:''}`}><ExpandIcon variant='white'/></div>
        }
        <div className={styles.label}>{label}</div>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={`${styles.menu} ${isOpen ? styles['menu-open'] : ''}`}>
        {
          items!.map(
            (item) => 
              <div 
                key={item.toString()}
                className={`
                    ${styles['menu-item']} 
                    ${value.toString() === item.toString()
                      ? styles.selected 
                      : ''}`
                    }
                onClick={onSelect}
              >{item}</div>
          )
        }
      </div>
    </div>
  )
}

// function NavSelect({ label, onSelect, setOpen, items, value, disabled, isOpen }: WidgetItemProps) {
//   const isExpandable = !items ? false : items.length > 0;
//   const isNotDisabled = (classIfNotDisabled: string, classIfDisabled: string = styles.disabled) => 
//       disabled ? classIfDisabled : classIfNotDisabled;
//   const isNotDisabledContainer = () => disabled ? `${styles['disabled-container']} ${styles.container}` : `${styles.container} ${styles.open}`;
//   const isNotDisabledHeadline = () => disabled ? styles['headline-disabled'] : styles.headline;
//   const isNotDisabledMenu = (classIfNotDisabled: string) => disabled ? styles['disabled-hide'] : classIfNotDisabled
//     return (
//       <div className={isNotDisabledContainer()} onClick={() => {if (!disabled) {setOpen()}}}>
//         <div className={isNotDisabledHeadline()}>
//           <>{isExpandable && <div className = { isNotDisabled(`${styles.icon} ${isOpen ? styles.openIcon : ''}`, styles['disabled-icon'])}><ExpandIcon variant='white'/></div>}</>
//           {/* <>{isExpandable && <span className={isNotDisabled(styles.space)}></span>}</> */}
//           <span className='name'>{`${label} :`}</span><span className={isNotDisabled(styles.value)}>{value}</span>
//         </div>
//         <div className={isNotDisabledMenu(`${styles.menu} ${isOpen ? styles.open : ''}`)}>
//           {
//             items!.map((item) => <div key={item.toString()} className={`${styles.menuItem} ${value.toString() === item.toString() ? styles.selected : ''}`} onClick={onSelect}>{item}</div>)
//           }
//         </div>
//       </div>
//   );
// };

NavSelect.defaultProps = {
  items: [],
  disabled: false,
  isOpen: false,

}

export default NavSelect;
