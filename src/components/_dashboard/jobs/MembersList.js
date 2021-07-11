import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import MemberCard from './MemberCard';

// ----------------------------------------------------------------------

MembersList.propTypes = {
  members: PropTypes.array.isRequired
};

export default function MembersList({ members, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {members.map((member) => (
        <Grid key={member.id} item xs={12} sm={6} md={3}>
          <MemberCard member={member} />
        </Grid>
      ))}
    </Grid>
  );
}
