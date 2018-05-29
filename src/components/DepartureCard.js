import React from 'react';

import RemainingTimeArcs from './RemainingTimeArcs';
import MinuteCount from './MinuteCount';

import { cardStyle, cardBodyStyle, cardTitleStyle } from '../styles';

const SECONDS_TO_KEEP_AFTER_DEPARTURE = 60;

function clampBelow(value, lowerLimit) {
  return Math.max(value, lowerLimit);
}

export default function DepartureCard({ lineNumber, departures, currentTime }) {
  function remainingSeconds(departure) {
    return Math.floor((new Date(departure) - currentTime) / 1000);
  }

  let secondsToNextBus = departures.map(remainingSeconds).find(s => (s >= -SECONDS_TO_KEEP_AFTER_DEPARTURE));
  let minutes = clampBelow(Math.floor(secondsToNextBus / 60 + 1), 0);
  let showArcs = minutes > 0 && minutes <= 3;

  if (Number.isNaN(secondsToNextBus)) {
    return null;
  }

  return (
    <div className="col-sm-6">
      <div className="card" style={cardStyle}>
        <div className="card-body" style={cardBodyStyle}>
          <h3 className="card-title" style={cardTitleStyle}>Line {lineNumber}</h3>
          {
            showArcs
              ? <RemainingTimeArcs t={secondsToNextBus} minutes={minutes} />
              : <MinuteCount minutes={minutes} />
          }
        </div>
      </div>
    </div>
  );
}