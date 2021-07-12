import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
// material
import { Box, Grid, Card, Paper, Typography, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

SiteItem.propTypes = {
  site: PropTypes.object
};

function SiteItem({ site }) {
  const { address, name } = site;

  return (
    <Grid item xs={6}>
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
        <a href={address || '#'}>
          <Box sx={{ mb: 0.5 }}>
            <Icon
              icon={name === 'linkedin' ? linkedinFill : twitterFill}
              color={name === 'linkedin' ? '#006097' : '#1C9CEA'}
              width={32}
              height={32}
            />
          </Box>
        </a>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
}

SocialMedias.propTypes = {
  links: PropTypes.array
};

export default function SocialMedias({ links }) {
  const filterLinks = [];

  links.forEach((site) => {
    if (site.name === 'linkedin' || site.name === 'twitter') {
      filterLinks.push(site);
    }
  });

  return (
    <Card>
      <CardHeader title="Social Medias" />
      <CardContent>
        <Grid container spacing={2}>
          {filterLinks.map((site) => (
            <SiteItem key={site.name} site={site} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
