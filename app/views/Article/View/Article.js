import React, { Component } from 'react';

import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import ArticleItem from './ArticleItem';
import ArticleComment from '../Comment/ArticleComment';
import { ArticleItemGallery } from '.';
import { ShareBar } from '../Share';
import ArticleRecommendationList from '../Recommendation/ArticleRecommendationList';

export default class Article extends Component {
  render() {
    const {
      article: {
        data: article, comments, relations, recommendations
      }
    } = this.props;

    if (!article) {
      return null;
    }

    return (
      <Row className='bg-faded mt-4'>
        <Col sm='12' xl='7'>
          <ArticleItem article={article} relations={relations} />
          <ShareBar />
          {/*<ArticleItemGallery article={article} />*/}
          {/*<ArticleComment comments={comments} />*/}
        </Col>
        <Col sm='12' xl='5'>
          <ArticleRecommendationList recommendations={recommendations} />
        </Col>
      </Row>
    );
  }
}
