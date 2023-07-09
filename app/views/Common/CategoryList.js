import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { withRouter } from 'react-router';

import Container from 'reactstrap/lib/Container';

class CategoryList extends Component {
  static categories = {
    films: {
      name: 'films',
      text: 'Films',
      description: 'Movies, films & short-films',
      icon: 'movie'
    },
    series: {
      name: 'series',
      text: 'Series',
      description: 'Television series & shows',
      icon: 'ondemand_video'
    },
    videogames: {
      name: 'video-games',
      text: 'Games',
      description: 'Games & video-games',
      icon: 'videogame_asset'
    },
    books: {
      name: 'books',
      text: 'Books',
      description: 'Books, novels & litterature',
      icon: 'book'
    },
    bands: {
      name: 'bands',
      text: 'Bands',
      description: 'Musical bands',
      icon: 'music_note'
    },
    musics: {
      name: 'albums',
      text: 'Albums',
      description: 'Music albums',
      icon: 'music_note'
    },
    peoples: {
      name: 'peoples',
      text: 'Peoples',
      icon: 'people_outline'
    },
    places: {
      name: 'places',
      text: 'Places',
      description: 'Places to visit',
      icon: 'place'
    },
    songs: {
      name: 'songs',
      text: 'Songs',
      icon: 'music_note'
    },
    organizations: {
      name: 'organizations',
      text: 'Organizations',
      description: 'Organizations & groups',
      icon: 'music_note'
    },
    events: {
      name: 'events',
      text: 'Events',
      icon: 'music_note'
    },
    // sports: {
    //   name: 'sports',
    //   text: 'Sports',
    //   icon: 'music_note'
    // },
    // organizations: { slug: 'organizations', name: 'organizations', text: 'Organizations' },
    // technologies: { slug: 'technologies', name: 'technologies', text: 'Technologies' },
    // arts: { slug: 'arts', name: 'arts', text: 'Visuals & arts' },
    // music_instrument: { slug: 'Music instrument', name: 'Music instruments', text: 'Music instruments' },
    // machines: { slug: 'Machines', name: 'machines', text: 'Machines' }
  };

  state = {
    dropdownOpen: false
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  renderCategories() {
    const categoryKeys = Object.keys(CategoryList.categories).slice(0, 10);

    return categoryKeys.map((categoryKey, key) => {
      const category = CategoryList.categories[categoryKey];
      const { match: { params: { categorySlug: activeCategory } } } = this.props;
      const linkIsActive = activeCategory === category.name ? 'active' : null;
      const categorySlug = `/search/${category.name}`;

      return (
        <li key={key} className='CategoryList-item p-0 m-0 mr-1'>
          <Link
            className={cx('CategoryList-link', 'py-4 px-4', {
              'CategoryList-link--active': linkIsActive
            })}
            to={categorySlug}
          >
            <span className='CategoryList-linkwrap'>
              {category.text}
            </span>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='CategoryList-wrapper'>
        <Container className='CategoryList-container p-0'>
          <ul className='CategoryList-list m-0 p-0'>
            {this.renderCategories()}
          </ul>
        </Container>
      </div>
    );
  }
}

export default withRouter(CategoryList);
