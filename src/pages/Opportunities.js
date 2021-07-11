import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { OpportunitiesSort, OpportunitiesList } from '../components/_dashboard/jobs';

// ----------------------------------------------------------------------

export default function Opportunities() {
  const offset = 200;
  const size = 20;
  const aggregate = false;
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(
      `http://localhost:5023/api/opportunities/_search/${offset}/${size}/${aggregate}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        setOpportunities(results || []);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [offset, size, aggregate]);

  return (
    <Page title="Jobs">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Jobs
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <OpportunitiesSort />
          </Stack>
        </Stack>

        <OpportunitiesList opportunities={opportunities} />
      </Container>
    </Page>
  );
}
