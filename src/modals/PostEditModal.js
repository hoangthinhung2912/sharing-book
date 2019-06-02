import React from 'react';
import PostBuilder from '../components/PostBuilder/PostBuilder';

class PostEditModal extends React.Component {
    static defaultProps = {
        post: {
            title: '',
            content: '',
            images: [],
            book_type: 1
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            fileRemoved: [],
        }
    }

    getFileAdded = images => images.filter(item => !item.fromServer);
    
    handleEditPost = (data) => {
        data.images = this.getFileAdded(data.images);
        this.props.handleEdit({
            ...data,
            removed_images: this.state.fileRemoved
        });
        this.props.closeModal();
    }

    handleRemove = (fileRemoved) => {
        if (fileRemoved.fromServer) {
            this.setState({
                fileRemoved: [...this.state.fileRemoved, fileRemoved.path], 
            });
        }
    }

    render() {
        return (
            <PostBuilder
                {...this.props.post}
                onPost={this.handleEditPost}
                onRemove={this.handleRemove}
            />
        )
    }
}

export default PostEditModal;