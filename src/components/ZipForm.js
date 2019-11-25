import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

/**
 * Validate us zip code.
 *
 * @param {string} elementValue Value to test.
 */
function validateZipCode(elementValue){
  var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
  return zipCodePattern.test(elementValue);
}

function ZipForm(props) {

  const [zip, setZip] = useState({ value: props.value });

  useEffect(() => {
    setZip({ value: props.value });
  }, [props.value]);

  const handleSubmit = e => {
    e.preventDefault();
    if(zip.validateStatus === 'success') {
      props.onSubmit(zip.value);
      setZip({ value: '' });
    }
  };

  const handleZipChange = value => {
    let res = {
      validateStatus: 'success',
      errorMsg: null,
      value: value.target.value,
    };
    if(!validateZipCode(value.target.value)) {
      res.validateStatus = 'error';
      res.errorMsg = 'Zip is invalid!';
    }
    setZip(res);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item
      validateStatus={zip.validateStatus}
      help={zip.errorMsg || ''}>
        <Input.Search
          placeholder="zip"
          value={zip.value}
          onChange={handleZipChange}
          loading={props.loading}
        />
      </Form.Item>
    </Form>
  );
}

ZipForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Form.create()(ZipForm);