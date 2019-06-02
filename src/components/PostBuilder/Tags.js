import React from 'react';
import PropTypes from 'prop-types';

import { BOOK_TYPES } from '../../configs';

import { Tag } from 'antd';

class Tags extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  isTagChecked = (tagId) => tagId === this.props.tag;

  handleChangeTag = (tagId) => (checked) => {
    if (checked) {
        this.props.onChangeTag(tagId);
    }
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

export default Tags