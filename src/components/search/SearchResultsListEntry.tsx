import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme: Theme) => {
//   createStyles({
//     root: {
//       width: '100%',
//       maxWidth: '50ch',
//     },
//     inline: {
//       display: 'inline',
//     },
//   });
// });

const ResultsListEntry = (props: any) => {
  const {
    user, title, location, avail,
  } = props;
  const { listingCity, listingState } = location;
  const { startAvail, endAvail } = avail;

  return (
    <ListItem
      component={Link}
      to={`/listing/${user}`}
    >
      <ListItemText
        primary={title}
        secondary={`${listingCity}, ${listingState}`}
      />
      available from
      {' '}
      {startAvail}
      {' '}
      to
      {' '}
      {endAvail}
    </ListItem>
  );
};

export default ResultsListEntry;
