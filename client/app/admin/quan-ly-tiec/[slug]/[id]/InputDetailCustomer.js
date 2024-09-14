'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, SelectItem } from "@nextui-org/react";

const InputDetailCustomer = ({ svg, title, type = 'text', placeholder, options = [], name }) => {
    const [defaultValue, setDefaultValue] = useState('');

    useEffect(() => {
        // This will run every time options or value changes
        const initialValue = options.find((item) => item.value === defaultValue)?.value;
        if (initialValue) {
            setDefaultValue(initialValue);
        }
    }, [options, defaultValue]);

    const handleInputChange = (e) => {
        const { value } = e.target;

        if (type === 'number') {
            e.target.value = /^\d*$/.test(value) ? value : '';
        }

        console.log(value, name);
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
                {svg}
                <span className='font-bold leading-6 text-base'>{title}</span>
            </div>
            {type === 'select' ? (
                <Select
                    aria-label={title}
                    className='rounded-lg'
                    classNames={{
                        base: "!overflow-hidden !text-white",
                        trigger: "text-sm text-gray-100 !bg-white/20 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                        value: "text-sm !text-white",
                        innerWrapper: "!overflow-hidden",
                        popoverContent: "bg-white/20 backdrop-blur-lg gap-1 rounded-lg",
                    }}
                    defaultSelectedKeys={defaultValue ? [defaultValue] : []}
                >
                    {options.map((option) => (
                        <SelectItem
                            className='p-3 text-white text-base font-medium'
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    className='p-3 bg-whiteAlpha-200 rounded-lg appearance-none'
                    placeholder={placeholder}
                    min={type === 'number' ? 1 : undefined}
                    onChange={handleInputChange}
                    aria-labelledby={name}
                />
            )}
        </div>
    );
};

InputDetailCustomer.propTypes = {
    svg: PropTypes.node,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })),
    name: PropTypes.string.isRequired,
};

export default InputDetailCustomer;
