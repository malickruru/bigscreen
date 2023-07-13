import React from 'react';

const Textarea = ({label,name}) => {
        return (
            <div className="form-control my-10 w-96">
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
                <textarea className="textarea rounded-none w-full bg-transparent border-gray-300" name={name} ></textarea>
            </div>
        );
    }

export default Textarea;
