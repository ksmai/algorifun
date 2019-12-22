const fs = require('fs');
const path = require('path');

const config = require('./gatsby-config');
const links = config.siteMetadata.navigationLinks;

links.forEach((link) => generatePage(link));

function generatePage(link, parentIDs=[]) {
    if (link.id === 'home') {
        return;
    }
    const ids = [...parentIDs, link.id];
    if (link.children) {
        const dirPath = path.resolve(__dirname, 'src', 'pages', ...ids);
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
        link.children.forEach((child) => generatePage(child, ids));
    } else {
        const idPath = ids.join('/');
        const filePath = path.resolve(__dirname, 'src', 'pages', ...parentIDs, `${link.id}.tsx`);
        const className = link.id.replace(/(^|-)\w/g, (letters) => (letters[letters.length - 1].toUpperCase()));
        const source = `/**
  * Automatically generated with \`node ./generate-page.js\`
  * Please do not edit this file directly
  * Last updated: ${new Date().toISOString()}
  */

import React from 'react';

import VisualizationPage from 'components/visualization-page';
import ${className} from 'algorithms/${idPath}';
import data from 'data/${idPath}.json';

const ${className}Page = () => {
    return (
        <VisualizationPage
            algorithm={new ${className}()}
            inputs={data.data}
        />
    );
};

export default ${className}Page;
        `;
        fs.writeFileSync(filePath, source, 'utf8');
        console.log(`Generated file: ${filePath}`);
    }
}
