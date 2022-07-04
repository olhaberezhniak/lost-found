import React from 'react';

const Feedback_details = ({feedbackDetail}) => {
    const {user, message} = feedbackDetail;
    return (
        <div className="item">
            <div className="shadow-effect">
                <p>{message}</p>
                <p id='user'>{user}</p>
            </div>
        </div>
    );
};

export default Feedback_details;