import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

const root = document.getElementById('app');

if (!root) {
	throw new Error('Root element not found');
}

createRoot(root).render(
	<StrictMode>
		<div>TypeScript Template</div>
	</StrictMode>,
);
