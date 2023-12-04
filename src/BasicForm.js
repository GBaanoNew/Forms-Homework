// BasicForm.js
import React from 'react';

class BasicForm extends React.Component {
  state = {
    formData: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    formErrors: {},
  };

  validateField = (name, value) => {
    let errors = { ...this.state.formErrors };

    switch (name) {
      case 'name':
        errors.name = value.length < 3 ? 'Name must be at least 3 characters long' : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.email = !emailRegex.test(value) ? 'Invalid email address' : '';
        break;
      case 'phoneNumber':
        const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
        errors.phoneNumber = !phoneRegex.test(value) ? 'Invalid phone number' : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors: errors });
  };

  validateForm = () => {
    const { name, email, phoneNumber } = this.state.formData;
    let errors = {};
  
    if (!name.trim()) errors.name = 'Name is required';
    if (!email.trim()) errors.email = 'Email is required';
    if (!phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
  
    this.setState({ formErrors: errors });
    return Object.keys(errors).length === 0;
  };
  

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: value,
        },
      }),
      () => {
        this.validateField(name, value);
      }
    );
  };
  

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      const { name, email, phoneNumber } = this.state.formData;
      console.log('Form submitted:', { name, email, phoneNumber });
      // Add logic to update the list of names if needed
    }
  };

  render() {
    const { formData, formErrors } = this.state;

    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={this.handleChange}
            />
            {formErrors.name && <p>{formErrors.name}</p>}
          </div>

          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={this.handleChange}
            />
            {formErrors.email && <p>{formErrors.email}</p>}
          </div>

          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={this.handleChange}
            />
            {formErrors.phoneNumber && <p>{formErrors.phoneNumber}</p>}
          </div>

          <input type="submit" />
        </form>

        <div>
          <h3>Names</h3>
          <ul>{/* Display names */}</ul>
        </div>
      </div>
    );
  }
}

export default BasicForm;
