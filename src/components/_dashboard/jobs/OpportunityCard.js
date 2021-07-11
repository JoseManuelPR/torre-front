import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';

// ----------------------------------------------------------------------

const OpportunityImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

OpportunityCard.propTypes = {
  opportunity: PropTypes.object
};

export default function OpportunityCard({ opportunity }) {
  let visibleCompensation = false;
  let dataCompensation = {};

  const { id, objective, organizations, remote, compensation } = opportunity;

  if (compensation) {
    const { visible } = compensation;
    visibleCompensation = visible;
    if (visibleCompensation) {
      const { data } = compensation;
      dataCompensation = data;
    }
  }

  let cover = '';
  organizations.forEach((organization) => {
    cover = organization.picture;
  });

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color={remote ? 'success' : 'info'}
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase'
          }}
        >
          {remote ? 'Remote' : 'No remote'}
        </Label>
        <OpportunityImgStyle alt={objective} src={cover} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/dashboard/opportunities/${id}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {objective}
          </Typography>
        </Link>

        {visibleCompensation ? (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled'
                  }}
                >
                  Min:{' '}
                  {dataCompensation.minAmount &&
                    fCurrency(dataCompensation.minAmount, dataCompensation.currency)}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled'
                  }}
                >
                  Max:{' '}
                  {dataCompensation.maxAmount &&
                    fCurrency(dataCompensation.maxAmount, dataCompensation.currency)}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body1"
                  style={{ textTransform: 'capitalize' }}
                  sx={{
                    color: 'text.disabled'
                  }}
                >
                  {dataCompensation.periodicity}
                </Typography>
              </Typography>
            </Stack>
          </>
        ) : (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled'
                  }}
                >
                  Sin información de la compensación
                </Typography>
                <br />
              </Typography>
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
}
