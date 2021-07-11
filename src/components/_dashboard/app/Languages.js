import PropTypes from 'prop-types';
// material
import { Card, Typography, CardHeader, CardContent } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@material-ui/lab';

// ----------------------------------------------------------------------

LanguageItem.propTypes = {
  languageData: PropTypes.object,
  isLast: PropTypes.bool
};

function LanguageItem({ languageData, isLast }) {
  const { code, language, fluency } = languageData;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (code === 'es' && 'primary.main') ||
              (code === 'es' && 'success.main') ||
              (code === 'en' && 'info.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">
          {language} ({code.toUpperCase()})
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fluency.toUpperCase()}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

Languages.propTypes = {
  languages: PropTypes.array
};

export default function Languages({ languages }) {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Languages" />
      <CardContent>
        <Timeline>
          {languages.map((language, index) => (
            <LanguageItem
              key={language.code}
              languageData={language}
              isLast={index === languages.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
