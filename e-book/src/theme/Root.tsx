import React from 'react';
import GeminiChatbot from '@site/src/components/GeminiChatbot';

// Default implementation, that you can customize
export default function Root({ children }) {
    return (
        <>
            {children}
            <GeminiChatbot />
        </>
    );
}
