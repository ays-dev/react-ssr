import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';

import Media from 'reactstrap/lib/Media';
import Button from 'reactstrap/lib/Button';

import * as ArticleActions from '../../../modules/article/articleActions';
import * as formUtils from '../../../utils/form';

class ArticleComment extends Component {
  render() {
    const { comments, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(ArticleActions.comment)} className='mt-5'>
        <Media>
          <Media body>
            <Media heading tag='h4'>
              <span className='font-weight-bold'>
                {`${comments.length} Comments`}
              </span>
            </Media>
          </Media>
        </Media>
        <Media className='mt-2'>
          <Media left href='#'>
            <Media object src='/img/movie-placeholder.gif' className='mr-2' style={{ width: '50px', height: '50px', borderRadius: '100%' }} alt='Generic placeholder image' />
          </Media>
          <Media body>
            <div>
              <div className='form-group'>
                <Field
                  name='comment'
                  type='textarea'
                  component={formUtils.renderTextarea}
                  label='Comment'
                />
              </div>
              <Button color='primary' className='float-right' disabled>
                ADD COMMENT
              </Button>
              {' '}
              <Button color='transparent' className='float-right' disabled>
                CANCEL
              </Button>
            </div>
          </Media>
        </Media>
        {Boolean(comments.length) && comments.map(comment => (
          <Media className='mt-5' key={comment.id}>
            <Media left href='#'>
              <Media object src='/img/movie-placeholder.gif' className='mr-2' style={{ width: '50px', height: '50px', borderRadius: '100%' }} alt='Generic placeholder image' />
            </Media>
            <Media body>
              <Media heading tag='h4'>
                {comment.user.username}
                {' '}
                <small className='text-muted'>
                  {moment(comment.createdAt).fromNow()}
                </small>
              </Media>
              <div>
                <span>
                  {comment.comment}
                </span>
              </div>
              <div>
                <i className='icon-lightest icon-inline material-icons'>
                  thumb_up
                </i>
                <span className='text-primary'>
                  {'27 '}
                </span>
                <i className='icon-lightest icon-inline material-icons'>
                  thumb_down
                </i>
                <small className='text-muted font-weight-bold'>
                  {' '}
                  • Respond
                </small>
              </div>
              <div>
                {comment.numberOfResponses}
                {' responses'}
              </div>
            </Media>
          </Media>
        ))}
      </form>
    );
  }
}

export default reduxForm({
  form: 'articleCommentForm'
})(ArticleComment);
