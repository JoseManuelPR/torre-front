import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

PersonalityTraitsResults.propTypes = {
  personalityTraitsResults: PropTypes.array
};

export default function PersonalityTraitsResults({ personalityTraitsResults }) {
  const CATEGORIES_DATA = [];
  const VALUES = [];
  personalityTraitsResults.forEach((group) => {
    CATEGORIES_DATA.push(group.id);
    VALUES.push(group.median);
  });
  const CHART_DATA = [{ data: VALUES }];
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => seriesName,
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: CATEGORIES_DATA
    }
  });

  return (
    <Card>
      <CardHeader
        title="Personality Traits Results"
        subheader="Possible patterns of behavior, thought and emotion."
      />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
