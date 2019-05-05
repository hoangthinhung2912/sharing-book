import React from 'react';
import PropTypes from 'prop-types';

class PostImage extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.MAX_SHOW_IMG = 4;
  }

  get imagesLimited() {
    return this.props.images.slice(0, this.MAX_SHOW_IMG);
  }

  render() {
    return (
      <div className="post-image-wrapper">
        {this.imagesLimited.map((image, index) => (
          <div key={index} className="post-image">
            <img src={`${process.env.REACT_APP_IMAGE_HOST}${image}`} />
            <If condition={this.props.images.length > this.MAX_SHOW_IMG && index + 1 === this.MAX_SHOW_IMG}>
              <div className="more-images">{this.props.images.length - this.MAX_SHOW_IMG}+</div>
            </If>
          </div>
        ))}
      </div>
    );
  }
}

export default PostImage;