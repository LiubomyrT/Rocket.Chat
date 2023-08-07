import { useTranslation } from '@rocket.chat/ui-contexts';
import React from 'react';

import Page from '../../../components/Page';

const ReportsPage = () => {
	const t = useTranslation();

	return (
		<Page>
			<Page.Header title={t('Reports')}></Page.Header>
			<Page.ScrollableContentWithShadow></Page.ScrollableContentWithShadow>
		</Page>
	);
};

export default ReportsPage;
