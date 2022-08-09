import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { timer } from '../redux/actions';

const trinta = 30;
const mil = 1000;
const timeleft = { time: 30 };

function Timer({ getTime, getTimer }) {
  const [time, setTime] = useState(trinta);
  // timeleft.time = getTimer;
  useEffect(() => {
    const interval = setInterval(() => {
      timeleft.time -= 1;
      setTime(timeleft.time);
      getTime(timeleft.time);
      if (timeleft.time === 0) {
        clearInterval(interval);
        timeleft.time = 30;
      }
    }, mil);
  }, [getTime]);
  if (timeleft.time === 0) {
    timeleft.time = getTimer;
  }

  return (
    <div>{time}</div>
  );
}

Timer.propTypes = {
  getTime: PropTypes.func.isRequired,
  getTimer: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTime: (data) => dispatch(timer(data)),
});

const mapStateToProps = (state) => ({
  getTimer: state.player.timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
