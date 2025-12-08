import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import ChapterActions from '@site/src/components/ChapterActions';

export default function LayoutWrapper(props) {
    return (
        <>
            <div className="margin-vert--md">
                <ChapterActions />
            </div>
            <Layout {...props} />
        </>
    );
}
