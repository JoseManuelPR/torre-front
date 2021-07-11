import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
// import {
//   EducationStats,
//   JobsStats,
//   AwardStats,
//   ProjectStats,
//   SocialMedias,
//   PersonalityTraitsResults,
//   ActivitiesStats,
//   ListJobs,
//   Languages
// } from '../components/_dashboard/app';
// import { fShortenNumber } from '../utils/formatNumber';

// ----------------------------------------------------------------------

export default function Genome() {
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5023/api/opportunities/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  return (
    <Page title="Genome">
      <Container maxWidth="xl">
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <Box>
              <Typography variant="h3">
                {name} | {professionalHeadline} | {country}
              </Typography>
              <Typography variant="h6">Recommendation Weight: {fShortenNumber(weight)}</Typography>
              <br />
              <p>{summaryOfBio}</p>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <SocialMedias links={links} />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <JobsStats value={jobs} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <EducationStats value={education} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AwardStats value={awards} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProjectStats value={projects} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <ListJobs listJobs={listJobs} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <ActivitiesStats activitiesStats={[jobs, education, awards, projects]} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <PersonalityTraitsResults personalityTraitsResults={personalityTraitsResults} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Languages languages={languages} />
          </Grid>
        </Grid> */}
      </Container>
    </Page>
  );
}
