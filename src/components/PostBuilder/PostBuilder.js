import React from 'react';
import Tags from './Tags';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Input, Icon } from 'antd';
import PicturesWall from './PicturesWall';

export default class PostBuilder extends React.Component {
  static defaultProps = {
    content: '',
    location: '',
    price: null,
    images: [],
    post_type: 1,
    book_type: 1,
    onRemove: () => null,
  }

  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content,
      images: this.props.images,
      post_type: this.props.post_type,
      book_type: this.props.book_type,
    };
  }

  handleTextareaChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleLocationChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeImages = (data) => {
    this.setState({
      images: data
    });
  }

  onChangeTag = (data) => {
    this.setState({
      book_type: data
    });
  }

  handleBuildPost = () => {
    this.props.onPost({
      ...this.state
    });
    this.setState({
      content: '',
      images: [],
      location: '',
      price: null,
      post_type: 1,
      book_type: 1,
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="post-builder">
          <div className="content-wrap">
            <div className="content">
              <Icon type="edit" className="icon" />
              <TextArea
                name='content'
                value={this.state.content}
                onChange={this.handleTextareaChange}
                autosize
                placeholder='Hãy viết gì đó ...'
              />
            </div>
            <If condition={this.props.type === 3 || this.props.type === 1}>
              <div className="location">
                <Icon type="contacts" className="icon" />
                <Input
                  name='location'
                  value={this.state.location}
                  onChange={this.handleLocationChange}
                  placeholder="Nhập địa chỉ của bạn ..."
                />
              </div>
            </If>
            <If condition={this.props.type === 1}>
              <div className="location">
                <Icon type="dollar" className="icon" />
                <Input
                  name='price'
                  value={this.state.price}
                  onChange={this.handleLocationChange}
                  placeholder="Nhập giá tiền ..."
                />
              </div>
            </If>
            <div className='add-image'>
              <PicturesWall
                fileList={this.state.images}
                handleChangeImages={this.handleChangeImages}
                onRemove={this.props.onRemove}
              />
            </div>
            <div className="tags">
              <Tags tag={this.state.book_type}
                onChangeTag={this.onChangeTag} />
            </div>
            <div className='share-button'>
              <div>
                <Button type='default' onClick={this.handleBuildPost}>
                  <If condition={!this.props.id}>
                    Chia sẻ
                  </If>
                  <If condition={!!this.props.id}>
                    Lưu
                  </If>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
