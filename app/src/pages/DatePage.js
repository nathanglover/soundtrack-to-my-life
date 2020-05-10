import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NotFound from "./NotFound";
import { Soundtrack } from "../components";

function DatePage() {
  const { dateParam } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(null);
  const onMount = () => {
    if (
      dateParam &&
      new Date(dateParam) instanceof Date &&
      !isNaN(new Date(dateParam))
    ) {
      setDate(new Date(dateParam));
    } else if (!dateParam) {
      setDate(new Date());
    }
    setIsLoading(false);
  };
  useEffect(onMount, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!date) {
    return <NotFound />;
  }

  return <Soundtrack date={date} />;
}

export default DatePage;
