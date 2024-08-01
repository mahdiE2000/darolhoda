
import React, { useEffect, useState } from 'react';
import { CDatePicker } from "@coreui/react-pro";
import { format as formatGregorian, parse } from 'date-fns';
import { format as formatJalali } from 'date-fns-jalali';

const DatePicker = ({label, name, onChange, timepicker=false, date=null}) =>{
    const [defaultDate, setDefaultDate] = useState(new Date());

    const dateChangeHandler = (name) => (date) => {
        onChange({ name, value: formatGregorian(new Date(date), 'yyyy-MM-dd hh:mm:ss') });
    };
    useEffect(()=>{
        // console.log('date :: ',date )
        if (date)
            setDefaultDate(date);
    },[date])
    return(
    <CDatePicker
        firstDayOfWeek={6}
        label={label}
        locale="fa-IR"
        timepicker={timepicker}
        name={name}
        inputDateFormat={(date) => formatJalali(new Date(date), 'yyyy-MM-dd hh:mm:ss')}
        onDateChange={dateChangeHandler(name)}
        date={defaultDate}
        placeholder="انتخاب کنید"
        confirmButton="تایید"
        cancelButton="لغو"
        todayButton="امروز"
        todayButtonColor="success"
    />
    )
}


export default DatePicker;
