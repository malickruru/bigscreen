import React from 'react';

const Input = ({label,type,name,placeholder,}) => {
    return (
        <div className="form-control my-10 w-96">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input type={type} required name={name} placeholder={placeholder} className="input  border-gray-300 rounded-none w-full bg-transparent  " />
        </div>
    );
}

export default Input;
