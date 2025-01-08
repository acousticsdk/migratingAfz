import React from 'react';
import PropTypes from 'prop-types';

function ConfirmationCheckbox({ isConfirmed, onChange }) {
  return (
    <div className="confirmation">
      <label>
        <input 
          type="checkbox" 
          checked={isConfirmed}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>Я подтверждаю, что верно указал логин Steam</span>
      </label>
    </div>
  );
}

ConfirmationCheckbox.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ConfirmationCheckbox;