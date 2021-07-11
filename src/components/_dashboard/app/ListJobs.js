import PropTypes from 'prop-types';
// material
import { Box, Stack, Card, Typography, CardHeader } from '@material-ui/core';
//
import { uniqueId } from 'lodash';
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

JobItem.propTypes = {
  jobData: PropTypes.object.isRequired
};

function JobItem({ jobData }) {
  const { organizations, responsibilities, name, remote, fromMonth, fromYear, media } = jobData;

  let address =
    'https://res.cloudinary.com/torre-technologies-co/image/upload/w_36,dpr_2.0/v1621443046/origin/bio/organizations/f7t0uvgrihgdrqh6ee9w.png';
  media.forEach((data) => {
    if (data.mediaType === 'media') {
      data.mediaItems.slice(0, 1).forEach((img) => {
        address = img.address;
      });
    }
  });

  let responsibilitie = '';
  responsibilities.forEach((data) => {
    responsibilitie = data;
  });

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={name}
        src={address}
        sx={{ width: 60, height: 53, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        {organizations.slice(0, 1).map((organization, item) => (
          <Typography key={uniqueId(item)} variant="subtitle1" noWrap>
            {organization.name} ({fromMonth} {fromYear}) - {remote ? 'Remote' : 'Office'}
          </Typography>
        ))}
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {name}
          {responsibilitie ? `- Responsabilidad: ${responsibilitie}` : ''}
        </Typography>
      </Box>
    </Stack>
  );
}

ListJobs.propTypes = {
  listJobs: PropTypes.array
};

export default function ListJobs({ listJobs }) {
  return (
    <Card>
      <CardHeader title="Showing 5 jobs" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {listJobs.slice(0, 5).map((job, item) => (
            <JobItem key={uniqueId(item)} jobData={job} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
