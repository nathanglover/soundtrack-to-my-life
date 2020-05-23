import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Soundtrack } from "../components";

function DatePage() {
  let { year, month, day } = useParams();
  year = parseInt(year);
  month = parseInt(month);
  day = parseInt(day);
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (year && month && day) {
      const d = new Date(year, month - 1, day);
      setDate(d);
      document.title = `${d.toLocaleDateString()} - Soundtrack To My Life`;
    } else {
      const today = new Date();
      setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
      document.title = `Soundtrack To My Life`;
    }
  }, [year, month, day]);

  let component;
  if (!date) {
    component = <></>;
    return component;
  }
  component = <Soundtrack date={date} />;
  return component;
}

export default DatePage;
