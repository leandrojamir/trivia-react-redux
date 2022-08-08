import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { timer } from '../redux/actions';

const trinta = 30;
const mil = 1000;
const timeleft = { time: trinta };

function Timer({ getTime }) {
  const [time, setTime] = useState(trinta);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeleft.time === 0) {
        clearInterval(interval);
        timeleft.time = 31;
      }
      timeleft.time -= 1;
      setTime(timeleft.time);
      getTime(timeleft.time);
      if (timeleft.time === trinta) {
        getTime(0);
      }
    }, mil);
  }, [getTime]);
  return (
    <div>{time}</div>
  );
}

Timer.propTypes = {
  getTime: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTime: (data) => dispatch(timer(data)),
});

export default connect(null, mapDispatchToProps)(Timer);
