import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import { getPeriodRange } from '../../../components/dashboards/periods';
import { usePeriodSelectorState } from '../../../components/dashboards/usePeriodSelectorState';
import { COLORS } from '../components/constants';
import { MOCK_AGENTS_DATA } from '../mock';

const formatChartData = (data: { label: string; value: number }[] | undefined = []) =>
	data.map((item) => ({
		...item,
		color: COLORS.info,
	}));

export const useAgentsSection = () => {
	const [period, periodSelectorProps] = usePeriodSelectorState(
		'today',
		'this week',
		'last 15 days',
		'this month',
		'last 6 months',
		'last year',
	);

	const { start, end } = getPeriodRange(period);

	const getConversationsBySource = useEndpoint('GET', 'livechat/analytics/dashboards/conversations-by-agent');

	const {
		data = [],
		isLoading,
		isError,
	} = useQuery(['reports', 'agents', period], () => {
		// const data = await getConversationsBySource({ start: start.toISOString(), end: end.toISOString() });
		// return formatChartData(data);
		return Promise.resolve(formatChartData(MOCK_AGENTS_DATA.data));
	});

	return {
		data,
		isLoading,
		isError,
		periodSelectorProps,
	};
};
