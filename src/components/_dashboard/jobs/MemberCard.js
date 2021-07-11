import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const MemberImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.object
};

export default function MemberCard({ member }) {
  const { person } = member;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <MemberImgStyle
          alt={person.username}
          src={
            person.picture
              ? person.picture
              : 'https://res.cloudinary.com/torre-technologies-co/image/upload/v1621443046/origin/bio/organizations/f7t0uvgrihgdrqh6ee9w.png'
          }
        />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/dashboard/bios/${person.username}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {person.name}
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled'
              }}
            >
              {person.professionalHeadline}
            </Typography>
            <br />
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
