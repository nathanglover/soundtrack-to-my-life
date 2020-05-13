import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NotFound from "./NotFound";
import { Soundtrack } from "../components";

function DatePage() {
  const { dateParam } = useParams();
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (
      dateParam &&
      new Date(dateParam) instanceof Date &&
      !isNaN(new Date(dateParam))
    ) {
      const x = new Date(dateParam);
      setDate(new Date(x.getTime() + Math.abs(x.getTimezoneOffset() * 60000)));
    } else if (!dateParam) {
      setDate(new Date());
    }
  }, [dateParam]);

  if (!date) {
    return <></>;
  }

  return <Soundtrack date={date} />;
}

export default DatePage;
