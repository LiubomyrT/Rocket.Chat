import { Palette } from '@rocket.chat/fuselage';
import type { TranslationContextValue } from '@rocket.chat/ui-contexts';
import { useTranslation } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { usePeriodSelectorState } from '../../../components/dashboards/usePeriodSelectorState';
import type { StatusData } from '../mock';
import { MOCK_STATUS_DATA } from '../mock';

const colors = {
	warning: Palette.statusColor['status-font-on-warning'].toString(),
	danger: Palette.statusColor['status-font-on-danger'].toString(),
	success: Palette.statusColor['status-font-on-success'].toString(),
	info: Palette.statusColor['status-font-on-info'].toString(),
};

const formatChartData = (data: StatusData['data'] | undefined, t: TranslationContextValue['translate']) => [
	{
		id: 'o',
		label: t('Open'),
		value: data?.open ?? 0,
		color: colors.success,
	},
	{
		id: 'q',
		label: t('Queued'),
		value: data?.queued ?? 0,
		color: colors.info,
	},
	{
		id: 'h',
		label: t('On_Hold'),
		value: data?.onHold ?? 0,
		color: colors.warning,
	},
	{
		id: 'c',
		label: t('Closed'),
		value: data?.closed ?? 0,
		color: colors.danger,
	},
];

export const useStatusSection = () => {
	const t = useTranslation();
	const [period, periodSelectorProps] = usePeriodSelectorState(
		'today',
		'this week',
		'last 15 days',
		'this month',
		'last 6 months',
		'last year',
	);

	const {
		data: { data: rawData } = {},
		isLoading,
		isError,
	} = useQuery(['reports', 'status', period], () => {
		return Promise.resolve(MOCK_STATUS_DATA);
	});

	const data = useMemo(() => formatChartData(rawData, t), [rawData, t]);

	return {
		data,
		isLoading,
		isError,
		periodSelectorProps,
	};
};
