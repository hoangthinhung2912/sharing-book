import React from 'react';
import Tags from './Tags';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Input, Icon, Form } from 'antd';
import PicturesWall from './PicturesWall';

export class PostBuilder extends React.Component {
  static defaultProps = {
    name: '',
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
      name: this.props.name,
      content: this.props.content,
      price: this.props.price,
      location: this.props.location,
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleBuildPost();
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div className="post-builder">
          <Form className="content-wrap" onSubmit={this.handleSubmit}>
            <If condition={this.props.type === 1}>
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Bạn phải nhập tên sách!' }],
                  initialValue: this.state.name
                })(
                  <div className="location">
                    <Icon type="book" className="icon" />
                    <Input
                      name='name'
                      value={this.state.name}
                      onChange={this.handleLocationChange}
                      placeholder="Nhập tên sách ..."
                    />
                  </div>
                )}
              </Form.Item>
            </If>
            <Form.Item>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: 'Bạn phải nhập nội dung bài viết!' }],
                initialValue: this.state.content
              })(
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
              )}
            </Form.Item>
            <If condition={this.props.type === 3 || this.props.type === 1}>
              <Form.Item>
                {getFieldDecorator('location', {
                  rules: [{ required: true, message: 'Bạn phải nhập địa chỉ!' }],
                  initialValue: this.state.location
                })(
                  <div className="location">
                    <Icon type="contacts" className="icon" />
                    <Input
                      name='location'
                      value={this.state.location}
                      onChange={this.handleLocationChange}
                      placeholder="Nhập địa chỉ của bạn ..."
                    />
                  </div>
                )}
              </Form.Item>
            </If>
            <If condition={this.props.type === 1}>
              <Form.Item>
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: 'Bạn phải nhập giá!' }],
                  initialValue: this.state.price
                })(
                  <div className="location">
                    <Icon type="dollar" className="icon" />
                    <Input
                      name='price'
                      value={this.state.price}
                      onChange={this.handleLocationChange}
                      placeholder="Nhập giá tiền ..."
                    />
                  </div>
                )}
              </Form.Item>
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
                <Form.Item>
                  <Button htmlType="submit" type='default'>
                    <If condition={!this.props.id}>
                      Chia sẻ
                    </If>
                    <If condition={!!this.props.id}>
                      Lưu
                    </If>
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default Form.create({ name: 'post-builder' })(PostBuilder);