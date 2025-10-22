import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function DateInput({ date, setDate, ...props }) {
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      calendar={persian}
      locale={persian_fa}
      format="YYYY/MM/DD"
      containerStyle={{
        display: "block",
      }}
      {...props}
    />
  );
}

export default DateInput;
