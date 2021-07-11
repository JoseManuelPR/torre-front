import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import OpportunityCard from './OpportunityCard';

// ----------------------------------------------------------------------

OpportunitiesList.propTypes = {
  opportunities: PropTypes.array.isRequired
};

export default function OpportunitiesList({ opportunities, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {opportunities.map((opportunity) => (
        <Grid key={opportunity.id} item xs={12} sm={6} md={3}>
          <OpportunityCard opportunity={opportunity} />
        </Grid>
      ))}
    </Grid>
  );
}
