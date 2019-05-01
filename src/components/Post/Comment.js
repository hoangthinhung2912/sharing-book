import React from 'react';
import {
    Input, Button
} from 'antd';

export default class Notification extends React.Component {
    render() {
        return (
            <div>
                <div className="comment-item">
                    <div className="avatar">
                        <img src="/asset/images/ava.jpeg" alt="" />
                        <span>KIKI</span>
                    </div>
                    <div className="comment">
                        KIKI an cut oi
                     </div>
                </div>
                <div className="comment-item">
                    <div className="avatar">
                        <img src="/asset/images/ava.jpeg" alt="" />
                        <span>POPO</span>
                    </div>
                    <div className="comment">
                        KIKI an cut oi cua em oi
                    </div>
                </div>
                <div className="add-comment">
                    <div className="avatar">
                        <img src="/asset/images/ava.jpeg" alt="" />
                    </div>
                    <Input></Input>
                    <div>
                        <Button></Button>
                    </div>
                </div>
            </div>
        )
    }
}
