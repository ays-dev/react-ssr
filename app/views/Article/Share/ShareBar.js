import React, { Component } from 'react';
import Input from 'reactstrap/lib/Input';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon
} from 'react-share';

class ShareBar extends Component {
  handleFocus(event) {
    event.target.select();
  }

  render() {
    return (
      <div className='action-social my-3'>
        <div className='my-3 w-100'>
          <span className='clearfix'>
            <span className='float-left'>
              <span className='text-muted'>
                <i style={{ fontSize: '1rem', verticalAlign: 'bottom', transform: 'scaleX(-1)' }} className='icon-lightest icon-inline material-icons'>
                  reply
                </i>
              </span>
              {' Share'}
            </span>
            <span className='float-left ml-3'>
              <span className='text-muted'>
                <i style={{ fontSize: '1rem', verticalAlign: 'bottom' }} className='icon-lightest icon-inline material-icons'>
                  turned_in
                </i>
              </span>
              {' Bookmark'}
            </span>
            <span className='float-right'>
              <span className='text-muted'>
                <i style={{ fontSize: '1rem', verticalAlign: 'bottom' }} className='icon-lightest icon-inline material-icons'>
                  more_horiz
                </i>
              </span>
            </span>
          </span>
        </div>

        <div className='my-1'>
          <FacebookShareButton url='https://127.0.0.1:3030/'>
            <FacebookIcon size={40} />
          </FacebookShareButton>
          <TwitterShareButton url='https://127.0.0.1:3030/'>
            <TwitterIcon size={40} />
          </TwitterShareButton>
          <WhatsappShareButton url='https://127.0.0.1:3030/'>
            <WhatsappIcon size={40} />
          </WhatsappShareButton>
          <RedditShareButton url='https://127.0.0.1:3030/'>
            <RedditIcon size={40} />
          </RedditShareButton>
          <EmailShareButton url='https://127.0.0.1:3030/'>
            <EmailIcon size={40} />
          </EmailShareButton>
        </div>
        <div className='share-link pb-3'>
          <Input
            type='text'
            value='https://www.xxxxxxxx.com/pages/'
            onFocus={this.handleFocus}
            readOnly
          />
        </div>
      </div>
    );
  }
}

export default ShareBar;
