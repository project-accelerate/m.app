import * as React from 'react'
import { Paper, Typography } from '@material-ui/core';
import { Query } from 'react-apollo';

import { EventDetailFragment } from '../../queries';

export const EventDetail = ({ id, name }: EventDetailFragment) => (
  <Paper>
    <Typography variant="title">
      {name}
    </Typography>
  </Paper>
)
