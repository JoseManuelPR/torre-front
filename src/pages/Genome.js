import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  EducationStats,
  JobsStats,
  AwardStats,
  ProjectStats,
  SocialMedias,
  PersonalityTraitsResults,
  ActivitiesStats,
  ListJobs,
  Languages
} from '../components/_dashboard/app';
import { fShortenNumber } from '../utils/formatNumber';

// ----------------------------------------------------------------------

export default function Genome() {
  const { user } = useParams();

  const username = user !== undefined ? user : 'josemanuelpr23';

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [professionalHeadline, setProfessionalHeadline] = useState('');
  const [summaryOfBio, setSummaryOfBio] = useState('');
  const [country, setCountry] = useState('');
  const [weight, setWeight] = useState('');
  const [listJobs, setListJobs] = useState([]);
  const [jobs, setJobs] = useState(0);
  const [education, setEducation] = useState(0);
  const [awards, setAwards] = useState(0);
  const [projects, setProjects] = useState(0);
  const [links, setLinks] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [personalityTraitsResults, setPersonalityTraitsResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5023/api/bios/${username}`)
      .then((response) => response.json())
      .then((data) => {
        const { person, stats, personalityTraitsResults, languages } = data;
        const { name, links, professionalHeadline, summaryOfBio, location, weight } = person;
        const { jobs, education, awards, projects } = stats;
        const { groups } = personalityTraitsResults;
        setName(name || '');
        setProfessionalHeadline(professionalHeadline || '');
        setSummaryOfBio(summaryOfBio || '');
        setCountry(location.country || '');
        setListJobs(data.jobs || []);
        setWeight(weight || '');
        setJobs(jobs || 0);
        setEducation(education || 0);
        setAwards(awards || 0);
        setProjects(projects || 0);
        setLinks(links || []);
        setLanguages(languages || []);
        setPersonalityTraitsResults(groups || '');
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [username]);

  return (
    <Page title="Genome">
      {isLoading ? (
        <>
          <Loader
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%'
            }}
            type="Rings"
            color="#E9FCD4"
            height={200}
            width={200}
          />
        </>
      ) : (
        <>
          <Container maxWidth="xl">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8}>
                <Box>
                  <Typography variant="h3">
                    {name} | {professionalHeadline} | {country}
                  </Typography>
                  <Typography variant="h6">
                    Recommendation Weight: {fShortenNumber(weight)}
                  </Typography>
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
            </Grid>
          </Container>
        </>
      )}
    </Page>
  );
}
