import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
// material
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardHeader,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@material-ui/core';
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
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';

import { fShortenNumber, fCurrency } from '../utils/formatNumber';
// API
import { HOST_API } from '../config/environment';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'objective', label: 'Objective', alignRight: false },
  { id: 'organizations', label: 'Organizations', alignRight: false },
  { id: 'remote', label: 'Remote', alignRight: false },
  { id: 'compensation', label: 'Compensation', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_opportunity) => _opportunity.objective.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Genome() {
  const { user } = useParams();

  const username = user !== undefined ? user : 'josemanuelpr23';

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);

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

  const [probablyOpportunities, setProbablyOpportunities] = useState([]);

  useEffect(() => {
    fetch(`${HOST_API}/api/bios/${username}`)
      .then((response) => response.json())
      .then((data) => {
        try {
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
        } catch (error) {
          setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [username]);

  useEffect(() => {
    fetch(`${HOST_API}/api/opportunities/_search/genome/${username}`)
      .then((response) => response.json())
      .then((data) => {
        const { probablyOpportunities } = data;
        setProbablyOpportunities(probablyOpportunities);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [username]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = probablyOpportunities.map((n) => n.objective);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, objective) => {
    const selectedIndex = selected.indexOf(objective);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, objective);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - probablyOpportunities.length) : 0;

  const filteredOpportunities = applySortFilter(
    probablyOpportunities,
    getComparator(order, orderBy),
    filterName
  );

  const isOpportunityNotFound = filteredOpportunities.length === 0;

  return (
    <Page title="Genome">
      {isLoading ? (
        <>
          {error ? (
            <>
              <Typography variant="h3">This genome don't have a complete profile</Typography>
              <Button variant="contained" component={RouterLink} to="/dashboard/bios">
                Return
              </Button>
            </>
          ) : (
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
          )}
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
          <br />
          <Container maxWidth="xl">
            <Card>
              <CardHeader
                title={`Showing ${probablyOpportunities.length} jobs according to your skills`}
                subheader="This search is based on your skills mentioned in your genome."
              />
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={probablyOpportunities.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredOpportunities
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const { id, remote, compensation, organizations } = row;
                          let { objective } = row;
                          const isItemSelected = selected.indexOf(name) !== -1;

                          if (objective.length > 10) objective = objective.substring(0, 50);

                          let organizationCover = '';
                          let organizationName = '';
                          organizations.forEach((organization) => {
                            organizationName = organization.name;
                            organizationCover = organization.picture;
                          });

                          let visibleCompensation = false;
                          let dataCompensation = {};

                          if (compensation) {
                            const { visible } = compensation;
                            visibleCompensation = visible;
                            if (visibleCompensation) {
                              const { data } = compensation;
                              dataCompensation = data;
                            }
                          }

                          return (
                            <TableRow
                              hover
                              key={id}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, objective)}
                                />
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Avatar alt={objective} src={organizationCover} />
                                  <Typography variant="subtitle2" noWrap>
                                    {objective}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">{organizationName}</TableCell>
                              <TableCell align="left">
                                <Label variant="ghost" color={remote ? 'success' : 'info'}>
                                  {remote ? 'Remote' : 'No remote'}
                                </Label>
                              </TableCell>
                              <TableCell align="left">
                                {dataCompensation.minAmount &&
                                  fCurrency(
                                    dataCompensation.minAmount,
                                    dataCompensation.currency
                                  )}{' '}
                                -{' '}
                                {dataCompensation.maxAmount &&
                                  fCurrency(
                                    dataCompensation.maxAmount,
                                    dataCompensation.currency
                                  )}{' '}
                                / {dataCompensation.periodicity}
                              </TableCell>

                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  component={RouterLink}
                                  to={`/dashboard/opportunities/${id}`}
                                >
                                  Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isOpportunityNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={probablyOpportunities.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </>
      )}
    </Page>
  );
}
