import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NotFound from "./NotFound";
import { Soundtrack } from "../components";

function DatePage() {
  let { year, month, day } = useParams();
  year = parseInt(year);
  month = parseInt(month);
  day = parseInt(day);
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (year && month && day) {
      setDate(new Date(year, month - 1, day));
    } else {
      const today = new Date();
      setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    }
  }, [year, month, day]);

  if (!date) {
    return <></>;
  }

  return <Soundtrack date={date} />;
}

export default DatePage;
