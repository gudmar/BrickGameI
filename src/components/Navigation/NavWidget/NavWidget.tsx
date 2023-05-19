import React from 'react';
import { WidgetProps, WidgetType } from './WidgetPropsInterface';
import NavButton from './NavButton/NavButton';
import NavSelect from './NavSelect/NavSelect';

function NavWidget({ label, onClick, items }: WidgetProps) {
    const widgetType = items ? WidgetType.SELECT : WidgetType.BUTTON
    switch(widgetType) {
        case WidgetType.SELECT : return (
            <NavSelect
                label={label}
                onClick={onClick}
                items={items}
            ></NavSelect>
        )
        case WidgetType.BUTTON : return (
            <NavButton
                label={label}
                onClick={onClick}
            ></NavButton>
        )
        default: 
            console.error(`Type ${widgetType} not supported by NavWidget`)
            return <></>
    }
};
export default NavWidget;
