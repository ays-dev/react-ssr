import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';

class SearchBar extends Component {
  render() {
    const { handleSubmit, history } = this.props;

    return (
      <form
        className='form-inline my-2 my-lg-0 w-50 d-none d-sm-block'
        onSubmit={handleSubmit(
          values => history.push(`/search?q=${values.query}`)
        )}
      >
        <Field className='form-control mr-sm-2 w-75' autoComplete='off' type='search' aria-label='Search' placeholder='Search' component='input' name='query' />
        <button className='btn btn-primary my-0 pt-2 pb-0 my-sm-0' type='submit'>
          <i className='icon-lightest icon-inline material-icons' style={{ fontSize: '21px' }}>
            search
          </i>
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'searchFrom'
})(withRouter(SearchBar));
