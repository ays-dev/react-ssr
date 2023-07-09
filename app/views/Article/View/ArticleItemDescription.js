// todo: delete
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ArticleItemDescription extends Component {
  render() {
    const { description, relations, wikidataId } = this.props;

    return (
      <div className='mt-4'>
        <div className='clearfix mb-2'>
          <table className='float-left mr-1'>
            <tbody>
              <tr>
                <td>
                  {relations && relations.length
                    ? <b>{relations[0].type}</b>
                    : ''}
                </td>
              </tr>
            </tbody>
          </table>
          <table className='float-left'>
            <tbody>
              {relations && relations.length
                ? relations.map(relation => (
                  <tr key={relation.id}>
                    <td>
                      <Link to={`/pages/${relation.relation.id}`}>
                        {relation.relation.translations[0].label}
                      </Link>
                    </td>
                  </tr>
                ))
                : <tr><td>&nbsp;</td></tr>}
            </tbody>
          </table>
        </div>
        <div className='mb-2'>
          {description}
        </div>
        <div className='text-right'>
          <small>
            {'From '}
            <a target='_blank' href={'https://www.wikidata.org/wiki/' + wikidataId}>
              Wikidata
            </a>
            {', the free knowledge graph. '}
            <a target='_blank' href={'https://www.wikidata.org/wiki/Special:SetLabelDescriptionAliases/' + wikidataId + '/en'}>
              Edit on wikidata.
            </a>
          </small>
        </div>
        <div className='text-right'>
          <i style={{ fontSize: '1rem', verticalAlign: 'middle', color: '#AAA' }} className='icon-lightest icon-inline material-icons'>
            info
          </i>
          {' '}
          <small>
            This page is automaticaly generated based on what users are interested in, and not affiliated with or endorsed by anyone associated with the topic.
          </small>
        </div>
      </div>
    );
  }
}

export default ArticleItemDescription;
