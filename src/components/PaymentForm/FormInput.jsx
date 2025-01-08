import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import PropTypes from 'prop-types';
import SteamLoginModal from '../Modal/SteamLoginModal';

const FormInput = forwardRef(({ 
  label, 
  placeholder, 
  helpButton,
  icon,
  value,
  onChange,
  onFocus,
  optional = false,
  type = 'text',
  error = null
}, ref) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const inputRef = useRef(null);

  // Expose focus method to parent
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus()
  }));

  // Auto-focus when error appears
  useEffect(() => {
    if (error) {
      inputRef.current?.focus();
    }
  }, [error]);

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  return (
    <div className="form-group">
      <h3>
        {label}
        {optional && <span className="optional-label"> (необязательно)</span>}
      </h3>
      <div className={`input-group ${error ? 'error' : ''}`}>
        {icon && <img src={icon} alt="Input Icon" className="currency-icon" />}
        <input 
          ref={inputRef}
          type={type}
          placeholder={placeholder} 
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
        />
        {helpButton && (
          <button 
            className="btn-help"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            type="button"
          >
            <img src="/assets/eye.png" alt="Help Icon" className="btn-icon" />
            {helpButton}
          </button>
        )}
      </div>
      {error && (
        <div className="warning-message" role="alert">
          {error}
        </div>
      )}
      <SteamLoginModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
});

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  helpButton: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  optional: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.string
};

FormInput.displayName = 'FormInput';

export default FormInput;