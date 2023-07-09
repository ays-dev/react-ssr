import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeadTag from 'react-head';

import Container from 'reactstrap/lib/Container';

class AdminPage extends Component {
  static loadContext(getState) {
    const user = getState().user.data;

    if (!user) {
      return {
        status: 301,
        to: '/'
      };
    }
    return null;
  }

  static loadMeta(getState) {
    const { username } = getState().user.data || {};
    return [
      <HeadTag tag='title'>
        {`${username}'s account - YT`}
      </HeadTag>
    ];
  }

  render() {
    return (
      <div>
        <Container>
          <h4>Images list:</h4>
          <div>Image - refresh cache - blacklist</div>
          <h4>Comments list:</h4>
          <h4>Article list:</h4>
          <h4>Tag list:</h4>
          <h4>get_dump: download and unzip dump</h4>
          <div>params: url of dump</div>
          <h4>simplify_dump: simplify dump</h4>
          <div>params: file input, file output</div>
          <h4>download_category_ids: download ids for categories using wikidata sparql endpoint</h4>
          <div>params: category list, sparql endpoint url</div>
          <h4>push_to_mongodb: import to mongo and create indexes</h4>
          <div>params: mongo collection</div>
          <h4>categorize_items: categorize items inside mongo</h4>
          <div>params: category list</div>
          <h4>parse_items: parse items based on rules</h4>
          <div>params: category list, file output</div>
          <h4>update_database_items: update SQL database</h4>
          <div>params: category, sql database, file input</div>
          <h4>compute_recommendations: compute latest recommendations</h4>
          <div>params: category list, recommendation type</div>
          <h4>update_database_recommendations: update SQL database recommendations</h4>
          <div>params: category list, recommendation type</div>
        </Container>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user.data
}))(AdminPage);
