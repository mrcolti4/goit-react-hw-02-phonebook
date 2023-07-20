import { Formik, Form } from 'formik';
import { Component } from 'react';
import style from './ContactForm.module.css';
import { InputField } from 'components/InputField/InputField';

function validateName(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (
    !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(value)
  ) {
    error = 'Invalid name';
  }
  return error;
}

function validateNumber(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (
    !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(
      value
    )
  ) {
    error = 'Invalid Number';
  }
  return error;
}

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    isNotValidate: true,
  };

  handleChangeInput = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }
    // if (this.state.name.trim() === '' || this.state.number.trim() === '') {
    //   return;
    // }
    const contact = { ...this.state };
    this.props.onAddContact(contact);
    this.setState({
      name: '',
      number: '',
    });
  };

  canBeSubmitted() {
    const errors = {
      name: Boolean(validateName(this.state.name)),
      number: Boolean(validateNumber(this.state.number)),
    };
    const isDisabled = Object.keys(errors).some(error => errors[error]);

    return !isDisabled;
  }

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: this.state.name,
          number: this.state.number,
        }}
      >
        {({ values, errors, touched }) => (
          <Form className={style.contact__form}>
            <label className={style.contact__label}>
              Name
              {/* <Field
                validate={validateName}
                type="text"
                name="name"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={this.state.name}
                onChange={this.handleChangeInput}
                className={errors.name && 'error'}
              /> */}
              <InputField
                validate={validateName}
                type="text"
                name="name"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={this.state.name}
                changeState={this.handleChangeInput}
                className={errors.name && 'error'}
                validateOnChange={true}
              />
            </label>
            <label className={style.contact__label}>
              Phone
              {/* <Field
                validate={validateNumber}
                type="tel"
                name="number"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={this.state.number}
                onChange={this.handleChangeInput}
                className={errors.number && 'error'}
              /> */}
              <InputField
                validate={validateNumber}
                type="tel"
                name="number"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={this.state.number}
                changeState={this.handleChangeInput}
                className={errors.number && 'error'}
                validateOnChange={true}
              />
            </label>
            <button
              // disabled={this.state.isNotValidate}
              onClick={this.handleSubmit}
              disabled={!this.canBeSubmitted()}
              type="submit"
            >
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}
