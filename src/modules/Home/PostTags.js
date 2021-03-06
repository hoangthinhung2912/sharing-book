import React from 'react';
import PropTypes from 'prop-types';

import { BOOK_TYPES } from '../../configs';

import { Tag } from 'antd';

class PostTags extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listTag: []
    };
  }

  isTagChecked = (tagId) => this.state.listTag.includes(tagId);

  handleChangeTag = (tagId) => (checked) => {
    const newTags = checked ? [...this.state.listTag, tagId] : this.state.listTag.filter(id => id !== tagId);
    this.props.onSearchByTags({book_types: newTags});
    this.setState({
      listTag: newTags
    });
  }

  render() {
    return (
      <React.Fragment>
        {BOOK_TYPES.map(tag => (
          <Tag.CheckableTag
            key={tag.id}
            checked={this.isTagChecked(tag.id)}
            onChange={this.handleChangeTag(tag.id)}
          >{tag.name}</Tag.CheckableTag>
        ))}
      </React.Fragment>
    );
  }
}

export default PostTags