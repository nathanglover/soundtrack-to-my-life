import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { TIMELINE_QUERY } from "../graphql";

function Soundtrack({ date }) {
  const [timeline, setTimeline] = useState([]);
  const { loading, error, data } = useQuery(TIMELINE_QUERY, {
    variables: { date: date.getTime() },
  });

  useEffect(() => {
    if (!loading) {
      setTimeline(data.timeline);
    }
  }, [data, loading]);

  if (loading) {
    return <>Loading</>;
  }

  return (
    <div>
      <ol>
        {timeline.map((playHistory, idx) => (
          <li key={idx}>
            <a href={playHistory.track.urls.web}>{playHistory.track.name}</a>
          </li>
        ))}
      </ol>
    </div>
  );

  return <>{date.getTime()}</>;
}

export default Soundtrack;
