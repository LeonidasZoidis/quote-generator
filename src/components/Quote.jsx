import './Quote.css';
import { useState } from 'react';

export const Quote = () => {
    const [category, setCategory] = useState('');

    const fetchData = async () => {
        const APIKey = import.meta.env.VITE_REACT_APP_API_KEY;

        try {
            const response = await fetch(
                `https://api.api-ninjas.com/v1/quotes?category=${category}`,
                {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': APIKey,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            console.log('API DATA', data);
            return data;
        } catch (error) {
            console.log('API ERROR:', error);
            throw error;
        }
    };

    const displayData = async () => {
        const quoteText = document.querySelector('.quote-text');
        if (document.querySelector('.selection').value === '') {
            quoteText.textContent = 'Please select a quote category';
            return;
        }
        try {
            const data = await fetchData();

            quoteText.innerHTML = `“${data[0].quote}”`;
            document.querySelector(
                '.author'
            ).innerHTML = `Author: ${data[0].author}`;
            document.querySelector(
                '.category-name'
            ).innerHTML = `Category: ${data[0].category}`;
        } catch (error) {
            console.log('API ERROR:', error);
        }
    };

    return (
        <>
            <h1 className="heading">Quote Generator</h1>

            <div className="category">
                <select
                    className="selection"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="quote-selection"
                    id="quote-selection"
                >
                    <optgroup label="Category">
                        <option value="" disabled>
                            Select a category
                        </option>
                        <option value="attitude">Attitude</option>
                        <option value="experience">Experience</option>
                        <option value="dreams">Dreams</option>
                        <option value="life">Life</option>
                        <option value="knowledge">Knowledge</option>
                        <option value="humor">Humor</option>
                        <option value="imagination">Imagination</option>
                        <option value="inspirational">Inspirational</option>
                        <option value="freedom">Freedom</option>
                        <option value="food">Food</option>
                    </optgroup>
                </select>
            </div>
            <div className="container-wrapper">
                <div className="container">
                    <p className="quote-text">To begin select a category</p>
                    <div className="line"></div>
                    <div className="details-wrapper">
                        <p className="author"></p>
                        <p className="category-name"></p>
                    </div>
                    <button className="button" onClick={() => displayData()}>
                        GET RANDOM QUOTE
                    </button>
                </div>
            </div>
        </>
    );
};
