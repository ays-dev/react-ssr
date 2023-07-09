import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Media from 'reactstrap/lib/Media';
import Button from 'reactstrap/lib/Button';

import { yearOnly } from '../../../utils/filters';

class ArticleRecommendationList extends Component {
  render() {
    const { recommendations } = this.props;

    return (
      <div>
        <div className='clearfix mb-2'>
          <div className='float-left'><h5>Similar interests</h5></div>
        </div>
        {recommendations.map(({ recommendation }) => {
          const label = recommendation && recommendation.translations[0]
            ? recommendation.translations[0].label
            : undefined;
          const images = JSON.parse(recommendation.images);
          const image = recommendation.images
            ? encodeURIComponent(images[0].replace(/ /g, '_'))
            : null;
          const year = yearOnly(recommendation.startAt);

          return (
            <Media className='mb-3' key={recommendation.id}>
              <Media
                className='mr-2'
                object
                style={{
                  width: '70px',
                  height: '105px',
                  backgroundImage: 'url("' + `/cache/${image}` + '.png")',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundColor: image ? '#EEE' : '#EEE'
                }}
                src='/img/pixel.gif'
                alt='Generic placeholder image'
              />
              <Media body>
                <Media style={{ marginBottom: 0 }} heading>
                  <Link to={`/pages/${recommendation.id}`}>
                    {label}
                  </Link>
                </Media>
                <div>
                  {recommendation && recommendation.relations && recommendation.relations.length
                    ? recommendation.relations.slice(0, 2).map((relation, key) => (
                      <small key={key}>
                        <b><Link to={`/pages/${relation.id}`} className='mr-1 text-muted'>{relation.translations[0].label}</Link></b>
                      </small>
                    ))
                    : ''}
                </div>
                <small className='text-muted'>
                  {`${recommendation.category.substring(0, recommendation.category.length - 1)}${year ? ' | ' + year : '' }`}
                </small>
              </Media>
            </Media>
          );
        })}
      </div>
    );
  }
}

export default ArticleRecommendationList;
