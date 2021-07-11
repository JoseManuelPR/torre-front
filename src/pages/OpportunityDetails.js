import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// material
import { Box, Grid, Container, Typography, Stack, Avatar, Card } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import Label from '../components/Label';

import { fCurrency } from '../utils/formatNumber';

// ----------------------------------------------------------------------

const OpportunityImgStyle = styled('img')({
  top: 0,
  width: '20%',
  height: '30%',
  objectFit: 'cover',
  marginLeft: 'auto',
  marginRight: 'auto'
});

export default function OpportunityDetails() {
  const { id } = useParams();

  const opportunityId = id !== undefined ? id : '';

  const [objective, setObjective] = useState('');
  const [timeframe, setTimeframe] = useState({});
  const [stats, setStats] = useState({});
  const [members, setMembers] = useState([]);
  const [details, setDetails] = useState([]);
  const [place, setPlace] = useState({});
  const [languages, setLanguages] = useState([]);
  const [opportunity, setOpportunity] = useState('');
  const [strengths, setStrengths] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [compensation, setCompensation] = useState({});
  const [status, setStatus] = useState('');

  let visibleCompensation = false;
  let dataCompensation = {};

  useEffect(() => {
    fetch(`http://localhost:5023/api/opportunities/${opportunityId}`)
      .then((response) => response.json())
      .then((data) => {
        const {
          objective,
          timeframe,
          stats,
          members,
          details,
          place,
          languages,
          opportunity,
          strengths,
          organizations,
          compensation,
          status
        } = data;
        setObjective(objective || '');
        setTimeframe(timeframe || {});
        setStats(stats || {});
        setMembers(members || []);
        setDetails(details || []);
        setPlace(place || {});
        setLanguages(languages || []);
        setOpportunity(opportunity || '');
        setStrengths(strengths || []);
        setOrganizations(organizations || []);
        setCompensation(compensation || {});
        setStatus(status || '');
      })
      .catch((e) => {
        console.log(e);
      });
  }, [opportunityId]);

  let organizationCover = '';
  let organizationName = '';
  organizations.forEach((organization) => {
    organizationName = organization.name;
    organizationCover = organization.picture;
  });

  let locationName = '';
  if (place.location) {
    place.location.forEach((location) => {
      locationName = location.id;
    });
  }

  if (compensation) {
    const { visible } = compensation;
    visibleCompensation = visible;
    if (visibleCompensation) {
      dataCompensation = compensation;
    }
  }

  return (
    <Page title="Opportunity Details">
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <OpportunityImgStyle alt={objective} src={organizationCover} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="h3">{objective}</Typography>
              <Label
                variant="filled"
                color={place.remote ? 'success' : 'info'}
                sx={{
                  top: 16,
                  right: 16,
                  textTransform: 'uppercase'
                }}
              >
                {place.remote ? 'Remote' : 'No remote'}
              </Label>
              <Label
                variant="filled"
                color="warning"
                style={{ marginLeft: '0.5rem' }}
                sx={{
                  top: 16,
                  right: 16,
                  textTransform: 'uppercase'
                }}
              >
                {locationName || 'No location'}
              </Label>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="h5">Strengths</Typography>
              {strengths.map((strength) => (
                <Label
                  key={strength.id}
                  variant="filled"
                  color="info"
                  style={{ marginLeft: '0.5rem' }}
                  sx={{
                    top: 16,
                    right: 16,
                    textTransform: 'uppercase'
                  }}
                >
                  {strength.name}
                </Label>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="h5">Company Name</Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt={organizationCover} src={organizationCover} />
                <Typography variant="subtitle2" noWrap>
                  {organizationName}
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <Box style={{ margin: 40 }}>
                <Typography align="center" variant="h5">
                  Compensation
                </Typography>
                {visibleCompensation ? (
                  <>
                    <Typography align="center" variant="subtitle1">
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{
                          color: 'text.disabled'
                        }}
                      >
                        {dataCompensation.minAmount &&
                          fCurrency(dataCompensation.minAmount, dataCompensation.currency)}{' '}
                        -{' '}
                        {dataCompensation.maxAmount &&
                          fCurrency(dataCompensation.maxAmount, dataCompensation.currency)}{' '}
                        / {dataCompensation.periodicity}
                      </Typography>
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{
                        color: 'text.disabled'
                      }}
                    >
                      Sin información de la compensación
                    </Typography>
                  </>
                )}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="h5">About this opportunity</Typography>
              {details ? (
                <>
                  <Typography variant="subtitle2" style={{ textTransform: 'capitalize' }} noWrap>
                    details
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="subtitle2" style={{ textTransform: 'capitalize' }} noWrap>
                    The organization not published data about this opportunity
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <Typography variant="h5">Time Frame</Typography>
              <Typography variant="subtitle2" style={{ textTransform: 'capitalize' }} noWrap>
                {timeframe.type || 'No data'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
